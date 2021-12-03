import { BaseProvider } from '@ethersproject/providers'
import { formatEther } from '@ethersproject/units'
import {
  ADDRESSES,
  LENDING_LINK_MARKET,
  LENDING_WBTC_MARKET,
  LENDING_WETH_MARKET,
  // LENDING_X_AAVE_A_MARKET,
  // LENDING_X_AAVE_B_MARKET,
  // LENDING_X_INCH_A_MARKET,
  LINK,
  WBTC,
  WETH,
  // LENDING_X_INCH_B_MARKET,
  // LENDING_X_KNC_A_MARKET,
  // LENDING_X_KNC_B_MARKET,
  // X_AAVE_A,
  // X_AAVE_B,
  // X_INCH_A,
  // X_INCH_B,
  // X_KNC_A,
  // X_KNC_B,
} from '@xtoken/abis'
import { BigNumber } from 'ethers'

import { Errors } from '../../constants'
import { ILendingMarket, ILendingMarketInfo } from '../../types/xToken'
import { getTokenAllowance, getTokenBalance } from '../erc20'
import { getContract, getSignerAddress } from '../utils'

import { getMarketContracts } from './helper'

/**
 * Get borrowing limit for an address in a Lending Market
 * @param marketName Name of the market
 * @param address
 * @param provider
 * @returns
 */
export const getBorrowingLimit = async (
  marketName: ILendingMarket,
  address: string,
  provider: BaseProvider
) => {
  const marketContracts = await getMarketContracts(provider)
  const marketContract = marketContracts[marketName]
  const borrowingLimit = await marketContract.borrowingLimit(address)
  return formatEther(borrowingLimit)
}

/**
 * Get xAsset collateral deposited in a Lending Market for an address
 * @param marketName Name of the market
 * @param address
 * @param provider
 * @returns
 */
export const getCollateral = async (
  marketName: ILendingMarket,
  address: string,
  provider: BaseProvider
) => {
  const marketContracts = await getMarketContracts(provider)
  const marketContract = marketContracts[marketName]
  const collateral = await marketContract.collateral(address)
  return formatEther(collateral)
}

export const getCollateralCap = async (
  marketName: ILendingMarket,
  provider: BaseProvider
) => {
  const marketContracts = await getMarketContracts(provider)
  const marketContract = marketContracts[marketName]
  const collateralCap = await marketContract.getCollateralCap()
  return formatEther(collateralCap)
}

export const getLendingMarkets = async (
  address: string,
  provider: BaseProvider
): Promise<readonly ILendingMarketInfo[]> => {
  try {
    const { chainId } = await provider.getNetwork()

    const [
      wbtcLendingCollateral,
      wethLendingCollateral,
      linkLendingCollateral,
    ] = await Promise.all([
      getCollateral(LENDING_WBTC_MARKET, address, provider),
      getCollateral(LENDING_WETH_MARKET, address, provider),
      getCollateral(LENDING_LINK_MARKET, address, provider),
    ])

    const [
      wbtcLendingCollateralCap,
      wethLendingCollateralCap,
      linkLendingCollateralCap,
    ] = await Promise.all([
      getCollateralCap(LENDING_WBTC_MARKET, provider),
      getCollateralCap(LENDING_WETH_MARKET, provider),
      getCollateralCap(LENDING_LINK_MARKET, provider),
    ])

    const [
      wbtcLendingCollateralDeposited,
      wethLendingCollateralDeposited,
      linkLendingCollateralDeposited,
    ] = await Promise.all([
      getTokenBalance(WBTC, ADDRESSES[LENDING_WBTC_MARKET][chainId], provider),
      getTokenBalance(WETH, ADDRESSES[LENDING_WETH_MARKET][chainId], provider),
      getTokenBalance(LINK, ADDRESSES[LENDING_LINK_MARKET][chainId], provider),
    ])

    const [
      wbtcBorrowingLimit,
      wethBorrowingLimit,
      linkBorrowingLimit,
    ] = await Promise.all([
      getBorrowingLimit(LENDING_WBTC_MARKET, address, provider),
      getBorrowingLimit(LENDING_WETH_MARKET, address, provider),
      getBorrowingLimit(LENDING_LINK_MARKET, address, provider),
    ])

    const [wbtcBalance, wethBalance, linkBalance] = await Promise.all([
      getTokenBalance(WBTC, address, provider),
      getTokenBalance(WETH, address, provider),
      getTokenBalance(LINK, address, provider),
    ])

    const [wbtcAllowance, wethAllowance, linkAllowance] = await Promise.all([
      getTokenAllowance(
        WBTC,
        address,
        ADDRESSES[LENDING_WBTC_MARKET][chainId],
        provider
      ),
      getTokenAllowance(
        WETH,
        address,
        ADDRESSES[LENDING_WETH_MARKET][chainId],
        provider
      ),
      getTokenAllowance(
        LINK,
        address,
        ADDRESSES[LENDING_LINK_MARKET][chainId],
        provider
      ),
    ])

    return [
      {
        asset: WBTC,
        name: LENDING_WBTC_MARKET,
        collateral: wbtcLendingCollateral,
        tokenAllowance: wbtcAllowance,
        tokenBalance: wbtcBalance,
        value: wbtcBorrowingLimit,
        collateralDeposited: wbtcLendingCollateralDeposited,
        collateralCap: wbtcLendingCollateralCap,
      },
      {
        asset: WETH,
        name: LENDING_WETH_MARKET,
        collateral: wethLendingCollateral,
        tokenAllowance: wethAllowance,
        tokenBalance: wethBalance,
        value: wethBorrowingLimit,
        collateralDeposited: wethLendingCollateralDeposited,
        collateralCap: wethLendingCollateralCap,
      },
      {
        asset: LINK,
        name: LENDING_LINK_MARKET,
        collateral: linkLendingCollateral,
        tokenAllowance: linkAllowance,
        tokenBalance: linkBalance,
        value: linkBorrowingLimit,
        collateralDeposited: linkLendingCollateralDeposited,
        collateralCap: linkLendingCollateralCap,
      },
    ]
  } catch (e) {
    console.warn('Error while fetching lending markets', e)
    return Promise.reject(new Error('Error while fetching lending markets'))
  }
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
  const [address, marketContracts] = await Promise.all([
    getSignerAddress(provider),
    getMarketContracts(provider),
  ])
  const marketContract = marketContracts[marketName]
  const approvedAmount = await _getApprovedAmount(marketName, address, provider)
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

const _getApprovedAmount = async (
  marketName: ILendingMarket,
  address: string,
  provider: BaseProvider
) => {
  const network = await provider.getNetwork()
  let tokenContract

  switch (marketName) {
    /*case LENDING_X_AAVE_A_MARKET:
      tokenContract = getContract(X_AAVE_A, provider, network)
      break
    case LENDING_X_AAVE_B_MARKET:
      tokenContract = getContract(X_AAVE_B, provider, network)
      break
    case LENDING_X_INCH_A_MARKET:
      tokenContract = getContract(X_INCH_A, provider, network)
      break
    case LENDING_X_INCH_B_MARKET:
      tokenContract = getContract(X_INCH_B, provider, network)
      break
    case LENDING_X_KNC_A_MARKET:
      tokenContract = getContract(X_KNC_A, provider, network)
      break
    case LENDING_X_KNC_B_MARKET:
      tokenContract = getContract(X_KNC_B, provider, network)*/
    case LENDING_WBTC_MARKET:
      tokenContract = getContract(WBTC, provider, network)
      break
    case LENDING_WETH_MARKET:
      tokenContract = getContract(WETH, provider, network)
      break
    case LENDING_LINK_MARKET:
      tokenContract = getContract(LINK, provider, network)
      break
  }

  if (!tokenContract) {
    return Promise.reject(new Error(Errors.CONTRACT_INITIALIZATION_FAILED))
  }

  return tokenContract.allowance(
    address,
    ADDRESSES[marketName][network.chainId]
  )
}
