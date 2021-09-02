import { BaseProvider } from '@ethersproject/providers'
import { formatEther, parseEther } from '@ethersproject/units'
import {
  Abi,
  ADDRESSES,
  LENDING_LIQUIDITY_POOL,
  LENDING_X_AAVE_A_MARKET,
  LENDING_X_AAVE_B_MARKET,
  LENDING_X_INCH_A_MARKET,
  LENDING_X_INCH_B_MARKET,
  LENDING_X_KNC_A_MARKET,
  LENDING_X_KNC_B_MARKET,
  X_AAVE_A,
  X_AAVE_B,
  X_INCH_A,
  X_INCH_B,
  X_KNC_A,
  X_KNC_B,
} from '@xtoken/abis'
import { BigNumber, Contract } from 'ethers'

import { Errors } from '../../constants'
import { ILendingMarket } from '../../types/xToken'
import { getContract, getSignerAddress } from '../utils'

import { getMarketContracts } from './helper'

/**
 * Add xAsset collateral to a Lending Market
 * @param marketName name of the market
 * @param amount amount without decimals
 * @param provider
 * @returns
 */
export const collateralize = async (
  marketName: ILendingMarket,
  amount: string,
  provider: BaseProvider
) => {
  const marketContracts = await getMarketContracts(provider)
  const marketContract = marketContracts[marketName]
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
  return marketContract.collateralize(inputAmount)
}

/**
 * Withdraw xAsset collateral from a Lending Market
 * @param marketName name of the market
 * @param amount amount without decimals
 * @param provider
 * @returns
 */
export const withdrawCollateral = async (
  marketName: ILendingMarket,
  amount: string,
  provider: BaseProvider
) => {
  const marketContracts = await getMarketContracts(provider)
  const marketContract = marketContracts[marketName]
  const inputAmount = parseEther(amount)
  return marketContract.withdraw(inputAmount)
}

/**
 * Get xAsset collateral deposited in a Lending Market for an address
 * @param marketName name of the market
 * @param provider
 * @param address optional address - checks current signer if not provided
 * @returns
 */
export const getCollateral = async (
  marketName: ILendingMarket,
  provider: BaseProvider,
  address?: string
) => {
  const marketContracts = await getMarketContracts(provider)
  const marketContract = marketContracts[marketName]
  if (!address) {
    address = await getSignerAddress(provider)
  }
  const collateral = await marketContract.collateral(address)
  return formatEther(collateral)
}

/**
 * Get borrowing limit for an address in a Lending Market
 * @param marketName name of the market
 * @param provider
 * @param address optional address - checks current signer if not provided
 * @returns
 */
export const getBorrowingLimit = async (
  marketName: ILendingMarket,
  provider: BaseProvider,
  address?: string
) => {
  const marketContracts = await getMarketContracts(provider)
  const marketContract = marketContracts[marketName]
  if (!address) {
    address = await getSignerAddress(provider)
  }
  const borrowingLimit = await marketContract.borrowingLimit(address)
  return formatEther(borrowingLimit)
}

// cSpell:disable

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
  marketName: ILendingMarket,
  address: string,
  provider: BaseProvider
) => {
  const network = await provider.getNetwork()
  let xTokenContract

  switch (marketName) {
    case LENDING_X_AAVE_A_MARKET:
      xTokenContract = getContract(X_AAVE_A, provider, network)
      break
    case LENDING_X_AAVE_B_MARKET:
      xTokenContract = getContract(X_AAVE_B, provider, network)
      break
    case LENDING_X_INCH_A_MARKET:
      xTokenContract = getContract(X_INCH_A, provider, network)
      break
    case LENDING_X_INCH_B_MARKET:
      xTokenContract = getContract(X_INCH_B, provider, network)
      break
    case LENDING_X_KNC_A_MARKET:
      xTokenContract = getContract(X_KNC_A, provider, network)
      break
    case LENDING_X_KNC_B_MARKET:
      xTokenContract = getContract(X_KNC_B, provider, network)
  }

  if (!xTokenContract) {
    return Promise.reject(new Error(Errors.CONTRACT_INITIALIZATION_FAILED))
  }

  return xTokenContract.allowance(
    address,
    ADDRESSES[LENDING_LIQUIDITY_POOL][network.chainId]
  )
}
