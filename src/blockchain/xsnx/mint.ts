import { Contract, ContractTransaction } from '@ethersproject/contracts'
import { BaseProvider } from '@ethersproject/providers'
import { ADDRESSES, ETH, SNX } from '@xtoken/abis'
import { BigNumber, ethers } from 'ethers'

import {
  DEC_18,
  GAS_LIMIT_PERCENTAGE_DEFAULT,
  GAS_LIMIT_PERCENTAGE_ETH,
} from '../../constants'
import { XSNX } from '../../types'
import { getPercentage } from '../../utils'
import { getExpectedRate, getSignerAddress, parseFees } from '../utils'

import { getXSnxContracts } from './helper'

const { formatEther, parseEther } = ethers.utils

export const approveXSnx = async (
  amount: BigNumber,
  provider: BaseProvider
): Promise<ContractTransaction> => {
  const { tokenContract, xsnxContract } = await getXSnxContracts(provider)

  // Estimate `gasLimit`
  const gasLimit = getPercentage(
    await tokenContract.estimateGas.approve(xsnxContract.address, amount),
    GAS_LIMIT_PERCENTAGE_DEFAULT
  )

  return tokenContract.approve(xsnxContract.address, amount, { gasLimit })
}

export const getExpectedQuantityOnMintXSnx = async (
  tradeWithEth: boolean,
  amount: string,
  provider: BaseProvider
) => {
  const inputAmount = parseEther(amount)
  const {
    kyberProxyContract,
    network,
    tradeAccountingContract,
    xsnxContract,
  } = await getXSnxContracts(provider)
  const { chainId } = network

  const [snxBalanceBefore, totalSupply, { mintFee }] = await Promise.all([
    tradeAccountingContract.getSnxBalance(),
    xsnxContract.totalSupply(),
    xsnxContract.feeDivisors(),
  ])

  const MINT_FEE = parseFees(mintFee)

  if (tradeWithEth) {
    const ethContributed = inputAmount.mul(MINT_FEE).div(DEC_18)
    const expectedRate = await getExpectedRate(
      kyberProxyContract,
      ADDRESSES[ETH] as string,
      ADDRESSES[SNX][chainId],
      ethContributed
    )

    const [setHoldingsWei, ethBal] = await Promise.all([
      tradeAccountingContract.getSetHoldingsValueInWei(),
      tradeAccountingContract.getEthBalance(),
    ])

    const nonSnxAssetValue = setHoldingsWei.add(ethBal)
    const weiPerOneSnx = DEC_18.mul(DEC_18).div(expectedRate)

    const pricePerToken = await tradeAccountingContract.calculateIssueTokenPrice(
      weiPerOneSnx.toString(),
      snxBalanceBefore,
      nonSnxAssetValue,
      totalSupply
    )

    const expectedTokenReturn = ethContributed.mul(DEC_18).div(pricePerToken)
    return formatEther(expectedTokenReturn)
  } else {
    const expQuantity = await tradeAccountingContract.calculateTokensToMintWithSnx(
      snxBalanceBefore,
      inputAmount,
      totalSupply
    )
    return formatEther(expQuantity)
  }
}

export const mintXSnx = async (
  tradeWithEth: boolean,
  amount: BigNumber,
  provider: BaseProvider
): Promise<ContractTransaction> => {
  const {
    kyberProxyContract,
    tokenContract,
    xsnxContract,
  } = await getXSnxContracts(provider)

  if (tradeWithEth) {
    const minRate = await getExpectedRate(
      kyberProxyContract,
      ADDRESSES[ETH] as string,
      tokenContract.address,
      amount,
      true
    )

    // Estimate `gasLimit`
    const gasLimit = getPercentage(
      await xsnxContract.estimateGas.mint(minRate.toString(), {
        value: amount,
      }),
      GAS_LIMIT_PERCENTAGE_ETH
    )

    return xsnxContract.mint(minRate.toString(), {
      gasLimit,
      value: amount,
    })
  } else {
    const address = await getSignerAddress(provider)
    const approvedAmount = await _getApprovedAmount(
      tokenContract,
      xsnxContract,
      address
    )

    if (approvedAmount.lt(amount)) {
      return Promise.reject(
        new Error('Please approve the tokens before minting')
      )
    }

    // Estimate `gasLimit`
    const gasLimit = getPercentage(
      await xsnxContract.estimateGas.mintWithSnx(amount),
      GAS_LIMIT_PERCENTAGE_DEFAULT
    )

    return xsnxContract.mintWithSnx(amount, { gasLimit })
  }
}

const _getApprovedAmount = async (
  tokenContract: Contract,
  xsnxContract: XSNX,
  address: string
) => {
  return tokenContract.allowance(address, xsnxContract.address)
}
