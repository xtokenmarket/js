import { Contract, ContractTransaction } from '@ethersproject/contracts'
import { JsonRpcProvider } from '@ethersproject/providers'
import { BigNumber, ethers } from 'ethers'
import { ADDRESSES, ETH, SNX } from 'xtoken-abis'

import { DEC_18 } from '../../constants'
import { XSNX } from '../../types'
import { getExpectedRate, parseFees } from '../utils'

import { getXSnxContracts } from './helper'

const { formatEther, parseEther } = ethers.utils

export const approveXSnx = async (
  amount: BigNumber,
  provider: JsonRpcProvider
): Promise<ContractTransaction> => {
  const { tokenContract, xsnxContract } = await getXSnxContracts(provider)
  return tokenContract.approve(xsnxContract.address, amount)
}

export const getExpectedQuantityOnMintXSnx = async (
  tradeWithEth: boolean,
  amount: string,
  provider: JsonRpcProvider
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
    const { expectedRate } = await kyberProxyContract.getExpectedRate(
      ADDRESSES[ETH],
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ADDRESSES[SNX][chainId],
      ethContributed.toString()
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
  provider: JsonRpcProvider
): Promise<ContractTransaction> => {
  const {
    kyberProxyContract,
    tokenContract,
    xsnxContract,
  } = await getXSnxContracts(provider)

  if (tradeWithEth) {
    const minRate = await getExpectedRate(
      kyberProxyContract,
      ADDRESSES[ETH],
      tokenContract.address,
      amount,
      true
    )
    return xsnxContract.mint(minRate.toString(), {
      value: amount,
    })
  } else {
    const signer = provider.getSigner()
    const address = await signer.getAddress()
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

    return xsnxContract.mintWithSnx(amount)
  }
}

const _getApprovedAmount = async (
  tokenContract: Contract,
  xsnxContract: XSNX,
  address: string
) => {
  return tokenContract.allowance(address, xsnxContract.address)
}
