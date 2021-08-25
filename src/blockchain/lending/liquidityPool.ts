import { BaseProvider } from '@ethersproject/providers'
import { parseEther } from '@ethersproject/units'
import { Abi, ADDRESSES, LENDING_LIQUIDITY_POOL } from '@xtoken/abis'
import { BigNumber, Contract } from 'ethers'

import { getSignerAddress } from '../utils'

import { getLiquidityPool } from './helper'

// --- Liquidity Pool functions ---

export const supply = async (amount: string, provider: BaseProvider) => {
  const liquidityPool = await getLiquidityPool(provider)
  const inputAmount = parseEther(amount)
  const address = await getSignerAddress(provider)
  const approvedAmount = await getApprovedAmountUSDC(address, provider)
  if (approvedAmount.lt(inputAmount)) {
    return Promise.reject(
      new Error('Please approve the tokens before supplying')
    )
  }
  return liquidityPool.supply(inputAmount)
}

export const withdraw = async (amount: string, provider: BaseProvider) => {
  const liquidityPool = await getLiquidityPool(provider)
  const inputAmount = parseEther(amount)
  return liquidityPool.withdraw(inputAmount)
}

export const borrow = async (amount: string, provider: BaseProvider) => {
  const liquidityPool = await getLiquidityPool(provider)
  const inputAmount = parseEther(amount)
  return liquidityPool.borrow(inputAmount)
}

export const repay = async (amount: string, provider: BaseProvider) => {
  const liquidityPool = await getLiquidityPool(provider)
  const inputAmount = parseEther(amount)
  return liquidityPool.repay(inputAmount)
}

export const getOptimalUtilizationRate = async (provider: BaseProvider) => {
  const liquidityPool = await getLiquidityPool(provider)
  return liquidityPool.getOptimalUtilizationRate()
}

export const getLPTValue = async (provider: BaseProvider) => {
  const liquidityPool = await getLiquidityPool(provider)
  return liquidityPool.getLPTValue()
}

export const getLPTBaseValue = async (provider: BaseProvider) => {
  const liquidityPool = await getLiquidityPool(provider)
  return liquidityPool.getLPTBaseValue()
}

export const approveUSDC = async (
  amount: BigNumber,
  provider: BaseProvider
) => {
  const network = await provider.getNetwork()
  const contract = new Contract(
    ADDRESSES['USDC'][network.chainId],
    Abi.ERC20,
    provider
  )

  return contract.approve(
    ADDRESSES[LENDING_LIQUIDITY_POOL][network.chainId],
    amount
  )
}

const getApprovedAmountUSDC = async (
  address: string,
  provider: BaseProvider
) => {
  const network = await provider.getNetwork()
  const contract = new Contract(
    ADDRESSES['USDC'][network.chainId],
    Abi.ERC20,
    provider
  )

  return contract.allowance(
    address,
    ADDRESSES[LENDING_LIQUIDITY_POOL][network.chainId]
  )
}
