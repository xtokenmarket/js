import { BigNumber } from '@ethersproject/bignumber'
import { Contract, ContractTransaction } from '@ethersproject/contracts'
import { BaseProvider } from '@ethersproject/providers'
import { AAVE, ADDRESSES, ETH } from '@xtoken/abis'
import { ethers } from 'ethers'

import {
  DEC_18,
  GAS_LIMIT_PERCENTAGE_DEFAULT,
  GAS_LIMIT_PERCENTAGE_ETH,
} from '../../constants'
import { XAAVE } from '../../types'
import { ITokenSymbols } from '../../types/xToken'
import { getPercentage } from '../../utils'
import { getExpectedRate, getSignerAddress, parseFees } from '../utils'

import { getXAaveContracts } from './helper'

const { formatEther, parseEther } = ethers.utils

export const approveXAave = async (
  symbol: ITokenSymbols,
  amount: BigNumber,
  provider: BaseProvider,
  spenderAddress?: string
): Promise<ContractTransaction> => {
  const { tokenContract, xaaveContract } = await getXAaveContracts(
    symbol,
    provider
  )

  const address = spenderAddress || xaaveContract.address
  const contract = spenderAddress ? xaaveContract : tokenContract

  // Estimate `gasLimit`
  const gasLimit = getPercentage(
    await contract.estimateGas.approve(address, amount),
    GAS_LIMIT_PERCENTAGE_DEFAULT
  )

  return contract.approve(address, amount, { gasLimit })
}

export const getExpectedQuantityOnMintXAave = async (
  symbol: ITokenSymbols,
  tradeWithEth: boolean,
  amount: string,
  provider: BaseProvider
): Promise<string> => {
  const inputAmount = parseEther(amount)
  const {
    kyberProxyContract,
    network,
    xaaveContract,
  } = await getXAaveContracts(symbol, provider)
  const { chainId } = network

  const [aaveHoldings, xaaveSupply, { mintFee }] = await Promise.all([
    xaaveContract.getFundHoldings(),
    xaaveContract.totalSupply(),
    xaaveContract.feeDivisors(),
  ])

  const MINT_FEE = parseFees(mintFee)
  const ethToTrade = inputAmount.mul(MINT_FEE)

  const ethAddress = ADDRESSES[ETH] as string
  const aaveAddress = ADDRESSES[AAVE][chainId]

  let aaveExpected: BigNumber

  if (tradeWithEth) {
    const expectedRate = await getExpectedRate(
      kyberProxyContract,
      ethAddress,
      aaveAddress,
      inputAmount
    )
    aaveExpected = ethToTrade.mul(expectedRate).div(DEC_18)
  } else {
    aaveExpected = ethToTrade
  }

  const xaaveExpected = aaveExpected
    .mul(xaaveSupply)
    .div(aaveHoldings)
    .div(DEC_18)

  return formatEther(xaaveExpected)
}

export const mintXAave = async (
  symbol: ITokenSymbols,
  tradeWithEth: boolean,
  amount: BigNumber,
  affiliate: string,
  provider: BaseProvider
): Promise<ContractTransaction> => {
  const {
    kyberProxyContract,
    tokenContract,
    xaaveContract,
  } = await getXAaveContracts(symbol, provider)

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
      await xaaveContract.estimateGas.mint(minRate.toString(), {
        value: amount,
      }),
      GAS_LIMIT_PERCENTAGE_ETH
    )

    return xaaveContract.mint(minRate.toString(), {
      gasLimit,
      value: amount,
    })
  } else {
    const address = await getSignerAddress(provider)
    const approvedAmount = await _getApprovedAmount(
      tokenContract,
      xaaveContract,
      address
    )

    if (approvedAmount.lt(amount)) {
      return Promise.reject(
        new Error('Please approve the tokens before minting')
      )
    }

    // Estimate `gasLimit`
    const gasLimit = getPercentage(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await xaaveContract.estimateGas.mintWithToken(amount, affiliate),
      GAS_LIMIT_PERCENTAGE_DEFAULT
    )

    return xaaveContract.mintWithToken(amount, affiliate, {
      gasLimit,
    })
  }
}

const _getApprovedAmount = async (
  tokenContract: Contract,
  xaaveContract: XAAVE,
  address: string
) => {
  return tokenContract.allowance(address, xaaveContract.address)
}
