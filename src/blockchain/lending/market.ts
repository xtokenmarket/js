import { BaseProvider } from '@ethersproject/providers'
import { parseEther } from '@ethersproject/units'
import { Abi, ADDRESSES, LENDING_LIQUIDITY_POOL } from '@xtoken/abis'
import { BigNumber, Contract } from 'ethers'

import { getSignerAddress } from '../utils'

import { getMarkets, Markets } from './helper'

// --- Market functions ---

/**
 * Add xAsset collateral to a Lending Market
 * @param marketName name of the market
 * @param amount amount without decimals
 * @param provider
 * @returns
 */
export const collateralize = async (
  marketName: Markets,
  amount: string,
  provider: BaseProvider
) => {
  const markets = await getMarkets(provider)
  const market = markets[marketName]
  const inputAmount = parseEther(amount)
  const address = await getSignerAddress(provider)
  const approvedAmount = await getApprovedAmountXAsset(
    marketName,
    address,
    provider
  )
  if (approvedAmount.lt(inputAmount)) {
    return Promise.reject(
      new Error('Please approve the tokens before adding collateral')
    )
  }
  return market.collateralize(inputAmount)
}

/**
 * Withdraw xAsset collateral from a Lending Market
 * @param marketName name of the market
 * @param amount amount without decimals
 * @param provider
 * @returns
 */
export const withdrawCollateral = async (
  marketName: Markets,
  amount: string,
  provider: BaseProvider
) => {
  const markets = await getMarkets(provider)
  const market = markets[marketName]
  const inputAmount = parseEther(amount)
  return market.withdraw(inputAmount)
}

/**
 * Get xAsset collateral deposited in a Lending Market for an address
 * @param marketName name of the market
 * @param provider
 * @param address optional address - checks current signer if not provided
 * @returns
 */
export const getCollateral = async (
  marketName: Markets,
  provider: BaseProvider,
  address?: string
) => {
  const markets = await getMarkets(provider)
  const market = markets[marketName]
  if (!address) {
    address = await getSignerAddress(provider)
  }
  return market.collateral(address)
}

/**
 * Get borrowing limit for an address in a Lending Market
 * @param marketName name of the market
 * @param provider
 * @param address optional address - checks current signer if not provided
 * @returns
 */
export const getBorrowingLimit = async (
  marketName: Markets,
  provider: BaseProvider,
  address?: string
) => {
  const markets = await getMarkets(provider)
  const market = markets[marketName]
  if (!address) {
    address = await getSignerAddress(provider)
  }
  return market.borrowingLimit(address)
}

// cSpell:disable

// -- Approval functions for collateralization of each xAsset ---

export const approveXAAVEa = async (
  amount: BigNumber,
  provider: BaseProvider
) => {
  const network = await provider.getNetwork()
  const contract = new Contract(
    ADDRESSES['X_AAVE_A'][network.chainId],
    Abi.ERC20,
    provider
  )

  return contract.approve(
    ADDRESSES[LENDING_LIQUIDITY_POOL][network.chainId],
    amount
  )
}

export const approveXAAVEb = async (
  amount: BigNumber,
  provider: BaseProvider
) => {
  const network = await provider.getNetwork()
  const contract = new Contract(
    ADDRESSES['X_AAVE_B'][network.chainId],
    Abi.ERC20,
    provider
  )

  return contract.approve(
    ADDRESSES[LENDING_LIQUIDITY_POOL][network.chainId],
    amount
  )
}

export const approveXINCHa = async (
  amount: BigNumber,
  provider: BaseProvider
) => {
  const network = await provider.getNetwork()
  const contract = new Contract(
    ADDRESSES['X_INCH_A'][network.chainId],
    Abi.ERC20,
    provider
  )

  return contract.approve(
    ADDRESSES[LENDING_LIQUIDITY_POOL][network.chainId],
    amount
  )
}

export const approveXINCHb = async (
  amount: BigNumber,
  provider: BaseProvider
) => {
  const network = await provider.getNetwork()
  const contract = new Contract(
    ADDRESSES['X_INCH_B'][network.chainId],
    Abi.ERC20,
    provider
  )

  return contract.approve(
    ADDRESSES[LENDING_LIQUIDITY_POOL][network.chainId],
    amount
  )
}

export const approveXKNCa = async (
  amount: BigNumber,
  provider: BaseProvider
) => {
  const network = await provider.getNetwork()
  const contract = new Contract(
    ADDRESSES['X_KNC_A'][network.chainId],
    Abi.ERC20,
    provider
  )

  return contract.approve(
    ADDRESSES[LENDING_LIQUIDITY_POOL][network.chainId],
    amount
  )
}

export const approveXKNCb = async (
  amount: BigNumber,
  provider: BaseProvider
) => {
  const network = await provider.getNetwork()
  const contract = new Contract(
    ADDRESSES['X_KNC_B'][network.chainId],
    Abi.ERC20,
    provider
  )

  return contract.approve(
    ADDRESSES[LENDING_LIQUIDITY_POOL][network.chainId],
    amount
  )
}

const getApprovedAmountXAsset = async (
  marketName: Markets,
  address: string,
  provider: BaseProvider
) => {
  const network = await provider.getNetwork()
  let marketAddress
  switch (marketName) {
    case Markets.xAAVEaMarket:
      marketAddress = ADDRESSES['X_AAVE_A'][network.chainId]
      break
    case Markets.xAAVEbMarket:
      marketAddress = ADDRESSES['X_AAVE_B'][network.chainId]
      break
    case Markets.xINCHaMarket:
      marketAddress = ADDRESSES['X_INCH_A'][network.chainId]
      break
    case Markets.xINCHbMarket:
      marketAddress = ADDRESSES['X_INCH_B'][network.chainId]
      break
    case Markets.xKNCaMarket:
      marketAddress = ADDRESSES['X_KNC_A'][network.chainId]
      break
    case Markets.xKNCbMarket:
      marketAddress = ADDRESSES['X_KNC_B'][network.chainId]
  }
  const contract = new Contract(marketAddress, Abi.ERC20, provider)

  return contract.allowance(
    address,
    ADDRESSES[LENDING_LIQUIDITY_POOL][network.chainId]
  )
}
