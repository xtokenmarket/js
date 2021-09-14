import { BaseProvider } from '@ethersproject/providers'
import { formatEther } from '@ethersproject/units'
import {
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
import { BigNumber } from 'ethers'

import { Errors } from '../../constants'
import { ILendingMarket } from '../../types/xToken'
import { getContract, getSignerAddress } from '../utils'

import { getMarketContracts } from './helper'

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
 * Add xAsset collateral to a Lending Market
 * @param marketName name of the market
 * @param amount amount without decimals
 * @param provider
 * @returns
 */
export const supplyCollateral = async (
  marketName: ILendingMarket,
  amount: BigNumber,
  provider: BaseProvider
) => {
  const marketContracts = await getMarketContracts(provider)
  const marketContract = marketContracts[marketName]
  const address = await getSignerAddress(provider)
  const approvedAmount = await getApprovedAmountXAsset(
    marketName,
    address,
    provider
  )
  if (approvedAmount.lt(amount)) {
    return Promise.reject(
      new Error('Please approve the tokens before adding collateral')
    )
  }
  return marketContract.collateralize(amount)
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
  amount: BigNumber,
  provider: BaseProvider
) => {
  const marketContracts = await getMarketContracts(provider)
  const marketContract = marketContracts[marketName]
  return marketContract.withdraw(amount)
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
