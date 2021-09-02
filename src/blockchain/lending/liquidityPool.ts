import { BaseProvider } from '@ethersproject/providers'
import { formatEther } from '@ethersproject/units'
import { ADDRESSES, LENDING_LIQUIDITY_POOL, USDC } from '@xtoken/abis'
import { BigNumber } from 'ethers'

import { Errors } from '../../constants'
import { getContract, getSignerAddress } from '../utils'

import { getLiquidityPoolContract } from './helper'

const CONTRACT_ERROR = new Error(Errors.CONTRACT_INITIALIZATION_FAILED)
const TOKEN_APPROVE_ERROR = new Error(Errors.TOKENS_NOT_APPROVED)

/**
 * Borrow USDC from Liquidity Pool
 * @param amount USDC amount to borrow without decimals
 * @param provider
 * @returns
 */
export const borrow = async (amount: BigNumber, provider: BaseProvider) => {
  const liquidityPoolContract = await getLiquidityPoolContract(provider)
  return liquidityPoolContract.borrow(amount)
}

/**
 * Repay Loan with USDC
 * @param amount USDC amount without decimals
 * @param provider
 * @returns
 */
export const repay = async (amount: BigNumber, provider: BaseProvider) => {
  const liquidityPoolContract = await getLiquidityPoolContract(provider)
  const address = await getSignerAddress(provider)
  const approvedAmount = await _getApprovedAmountUSDC(address, provider)
  if (approvedAmount.lt(amount)) {
    return Promise.reject(TOKEN_APPROVE_ERROR)
  }
  return liquidityPoolContract.repay(amount)
}

/**
 * Supply USDC to Liquidity Pool
 * @param amount amount of USDC without decimals
 * @param provider
 * @returns
 */
export const supply = async (amount: BigNumber, provider: BaseProvider) => {
  const liquidityPoolContract = await getLiquidityPoolContract(provider)
  const address = await getSignerAddress(provider)
  const approvedAmount = await _getApprovedAmountUSDC(address, provider)
  if (approvedAmount.lt(amount)) {
    return Promise.reject(TOKEN_APPROVE_ERROR)
  }
  return liquidityPoolContract.supply(amount)
}

/**
 * Withdraw USDC from Liquidity Pool
 * @param amount amount of LPT without decimals
 * @param provider
 * @returns
 */
export const withdraw = async (amount: BigNumber, provider: BaseProvider) => {
  const liquidityPoolContract = await getLiquidityPoolContract(provider)
  return liquidityPoolContract.withdraw(amount)
}

export const getLPTBaseValue = async (provider: BaseProvider) => {
  const liquidityPoolContract = await getLiquidityPoolContract(provider)
  const lptBaseValue = await liquidityPoolContract.getLPTBaseValue()
  return formatEther(lptBaseValue)
}

export const getLPTValue = async (provider: BaseProvider) => {
  const liquidityPoolContract = await getLiquidityPoolContract(provider)
  const lptValue = await liquidityPoolContract.getLPTValue()
  return formatEther(lptValue)
}

export const getOptimalUtilizationRate = async (provider: BaseProvider) => {
  const liquidityPoolContract = await getLiquidityPoolContract(provider)
  const optimalUtilizationRate = await liquidityPoolContract.getOptimalUtilizationRate()
  return optimalUtilizationRate.toString()
}

export const approveUsdc = async (
  amount: BigNumber,
  provider: BaseProvider
) => {
  const network = await provider.getNetwork()
  const usdcContract = getContract(USDC, provider, network)
  if (!usdcContract) {
    return Promise.reject(CONTRACT_ERROR)
  }

  return usdcContract.approve(
    ADDRESSES[LENDING_LIQUIDITY_POOL][network.chainId],
    amount
  )
}

const _getApprovedAmountUSDC = async (
  address: string,
  provider: BaseProvider
) => {
  const network = await provider.getNetwork()
  const usdcContract = getContract(USDC, provider, network)
  if (!usdcContract) {
    return Promise.reject(CONTRACT_ERROR)
  }

  return usdcContract.allowance(
    address,
    ADDRESSES[LENDING_LIQUIDITY_POOL][network.chainId]
  )
}
