import { BaseProvider } from '@ethersproject/providers'
import { formatEther } from '@ethersproject/units'
import {
  ADDRESSES,
  LENDING_WBTC_MARKET,
  LENDING_WETH_MARKET,
  // LENDING_X_AAVE_A_MARKET,
  // LENDING_X_AAVE_B_MARKET,
  // LENDING_X_INCH_A_MARKET,
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

export const getLendingMarkets = async (
  address: string,
  provider: BaseProvider
): Promise<readonly ILendingMarketInfo[]> => {
  try {
    const [
      // xaaveaPrices,
      // xaavebPrices,
      // xinchaLendingCollateral,
      // xinchbPrices,
      // xkncaPrices,
      // xkncbPrices,
      wbtcLendingCollateral,
      wethLendingCollateral,
    ] = await Promise.all([
      // getXAavePrices(xaaveaContract, kyberProxyContract, chainId),
      // getXAavePrices(xaavebContract, kyberProxyContract, chainId),
      // getCollateral(LENDING_X_INCH_A_MARKET, address, provider),
      // getXInchPrices(xinchbContract, kyberProxyContract, chainId),
      // getXKncPrices(xkncaContract, kncContract, kyberProxyContract),
      // getXKncPrices(xkncbContract, kncContract, kyberProxyContract),
      getCollateral(LENDING_WBTC_MARKET, address, provider),
      getCollateral(LENDING_WETH_MARKET, address, provider),
    ])

    const [
      // xaaveaLendingCollateral,
      // xaavebLendingCollateral,
      // xinchaBorrowingLimit,
      // xinchbLendingCollateral,
      // xkncaLendingCollateral,
      // xkncbLendingCollateral,
      wbtcBorrowingLimit,
      wethBorrowingLimit,
    ] = await Promise.all([
      /* getTokenBalance(
        X_AAVE_A,
        ADDRESSES[LENDING_X_AAVE_A_MARKET][chainId],
        provider
      ),
      getTokenBalance(
        X_AAVE_B,
        ADDRESSES[LENDING_X_AAVE_B_MARKET][chainId],
        provider
      ),*/
      // getBorrowingLimit(LENDING_X_INCH_A_MARKET, address, provider),
      /*getTokenBalance(
        X_INCH_B,
        ADDRESSES[LENDING_X_INCH_B_MARKET][chainId],
        provider
      ),
      getTokenBalance(
        X_KNC_A,
        ADDRESSES[LENDING_X_KNC_A_MARKET][chainId],
        provider
      ),
      getTokenBalance(
        X_KNC_B,
        ADDRESSES[LENDING_X_KNC_B_MARKET][chainId],
        provider
      ),*/
      getBorrowingLimit(LENDING_WBTC_MARKET, address, provider),
      getBorrowingLimit(LENDING_WETH_MARKET, address, provider),
    ])

    return [
      /*{
        name: LENDING_X_AAVE_A_MARKET,
        xAsset: X_AAVE_A,
        collateral: xaaveaLendingCollateral,
        value: formatEther(
          parseEther(xaaveaLendingCollateral)
            .mul(parseEther(xaaveaPrices.priceUsd.toString()))
            .div(DEC_18)
        ),
      },
      {
        name: LENDING_X_AAVE_B_MARKET,
        xAsset: X_AAVE_B,
        collateral: xaavebLendingCollateral,
        value: formatEther(
          parseEther(xaavebLendingCollateral)
            .mul(parseEther(xaavebPrices.priceUsd.toString()))
            .div(DEC_18)
        ),
      },
      {
        name: LENDING_X_INCH_A_MARKET,
        xAsset: X_INCH_A,
        collateral: xinchaLendingCollateral,
        value: xinchaBorrowingLimit,
      },
      {
        name: LENDING_X_INCH_B_MARKET,
        xAsset: X_INCH_B,
        collateral: xinchbLendingCollateral,
        value: formatEther(
          parseEther(xinchbLendingCollateral)
            .mul(parseEther(xinchbPrices.priceUsd.toString()))
            .div(DEC_18)
        ),
      },
      {
        name: LENDING_X_KNC_A_MARKET,
        xAsset: X_KNC_A,
        collateral: xkncaLendingCollateral,
        value: formatEther(
          parseEther(xkncaLendingCollateral)
            .mul(parseEther(xkncaPrices.priceUsd.toString()))
            .div(DEC_18)
        ),
      },
      {
        name: LENDING_X_KNC_B_MARKET,
        xAsset: X_KNC_B,
        collateral: xkncbLendingCollateral,
        value: formatEther(
          parseEther(xkncbLendingCollateral)
            .mul(parseEther(xkncbPrices.priceUsd.toString()))
            .div(DEC_18)
        ),
      },*/
      {
        asset: WBTC,
        name: LENDING_WBTC_MARKET,
        collateral: wbtcLendingCollateral,
        value: wbtcBorrowingLimit,
      },
      {
        asset: WETH,
        name: LENDING_WETH_MARKET,
        collateral: wethLendingCollateral,
        value: wethBorrowingLimit,
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
  }

  if (!tokenContract) {
    return Promise.reject(new Error(Errors.CONTRACT_INITIALIZATION_FAILED))
  }

  return tokenContract.allowance(
    address,
    ADDRESSES[marketName][network.chainId]
  )
}
