import { BaseProvider } from '@ethersproject/providers'
import {
  LENDING_COMPTROLLER,
  LENDING_LIQUIDITY_POOL,
  LENDING_LPT,
  LENDING_X_AAVE_A_MARKET,
  LENDING_X_AAVE_A_PRICE,
  LENDING_X_AAVE_B_MARKET,
  LENDING_X_AAVE_B_PRICE,
  LENDING_X_INCH_A_MARKET,
  LENDING_X_INCH_A_PRICE,
  LENDING_X_INCH_B_MARKET,
  LENDING_X_INCH_B_PRICE,
  LENDING_X_KNC_A_MARKET,
  LENDING_X_KNC_A_PRICE,
  LENDING_X_KNC_B_MARKET,
  LENDING_X_KNC_B_PRICE,
} from '@xtoken/abis'

import {
  Comptroller,
  LiquidityPool,
  LPT,
  Market,
  XAAVEPrice,
  XINCHPrice,
  XKNCPrice,
} from '../../types'
import { getContract } from '../utils'

export const getComptroller = async (provider: BaseProvider) => {
  const network = await provider.getNetwork()
  const comptroller = getContract(
    LENDING_COMPTROLLER,
    provider,
    network
  ) as Comptroller
  if (!comptroller) {
    return Promise.reject(new Error('Could not create Comptroller Contract'))
  }
  return comptroller
}

export const getLiquidityPool = async (provider: BaseProvider) => {
  const network = await provider.getNetwork()
  const liquidityPool = getContract(
    LENDING_LIQUIDITY_POOL,
    provider,
    network
  ) as LiquidityPool
  if (!liquidityPool) {
    return Promise.reject(new Error('Could not create LiquidityPool Contract'))
  }
  return liquidityPool
}

export const getLPT = async (provider: BaseProvider) => {
  const network = await provider.getNetwork()
  const lpt = getContract(LENDING_LPT, provider, network) as LPT
  if (!lpt) {
    return Promise.reject(new Error('Could not create LPT Contract'))
  }
  return lpt
}

export const getMarkets = async (provider: BaseProvider) => {
  const network = await provider.getNetwork()
  const xAAVEaMarket = getContract(
    LENDING_X_AAVE_A_MARKET,
    provider,
    network
  ) as Market
  if (!xAAVEaMarket) {
    return Promise.reject(new Error('Could not create xAAVEaMarket Contract'))
  }
  const xAAVEbMarket = getContract(
    LENDING_X_AAVE_B_MARKET,
    provider,
    network
  ) as Market
  if (!xAAVEbMarket) {
    return Promise.reject(new Error('Could not create xAAVEbMarket Contract'))
  }
  const xINCHaMarket = getContract(
    LENDING_X_INCH_A_MARKET,
    provider,
    network
  ) as Market
  if (!xINCHaMarket) {
    return Promise.reject(new Error('Could not create xINCHaMarket Contract'))
  }
  const xINCHbMarket = getContract(
    LENDING_X_INCH_B_MARKET,
    provider,
    network
  ) as Market
  if (!xINCHbMarket) {
    return Promise.reject(new Error('Could not create xINCHbMarket Contract'))
  }
  const xKNCaMarket = getContract(
    LENDING_X_KNC_A_MARKET,
    provider,
    network
  ) as Market
  if (!xKNCaMarket) {
    return Promise.reject(new Error('Could not create xKNCaMarket Contract'))
  }
  const xKNCbMarket = getContract(
    LENDING_X_KNC_B_MARKET,
    provider,
    network
  ) as Market
  if (!xKNCbMarket) {
    return Promise.reject(new Error('Could not create xKNCbMarket Contract'))
  }
  return {
    xAAVEaMarket: xAAVEaMarket,
    xAAVEbMarket: xAAVEbMarket,
    xINCHaMarket: xINCHaMarket,
    xINCHbMarket: xINCHbMarket,
    xKNCaMarket: xKNCaMarket,
    xKNCbMarket: xKNCbMarket,
  }
}

export const getPricingContracts = async (provider: BaseProvider) => {
  const network = await provider.getNetwork()
  const xAAVEaPrice = getContract(
    LENDING_X_AAVE_A_PRICE,
    provider,
    network
  ) as XAAVEPrice
  if (!xAAVEaPrice) {
    return Promise.reject(new Error('Could not create xAAVEaPrice Contract'))
  }
  const xAAVEbPrice = getContract(
    LENDING_X_AAVE_B_PRICE,
    provider,
    network
  ) as XAAVEPrice
  if (!xAAVEbPrice) {
    return Promise.reject(new Error('Could not create xAAVEbPrice Contract'))
  }
  const xINCHaPrice = getContract(
    LENDING_X_INCH_A_PRICE,
    provider,
    network
  ) as XINCHPrice
  if (!xINCHaPrice) {
    return Promise.reject(new Error('Could not create xINCHaPrice Contract'))
  }
  const xINCHbPrice = getContract(
    LENDING_X_INCH_B_PRICE,
    provider,
    network
  ) as XINCHPrice
  if (!xINCHbPrice) {
    return Promise.reject(new Error('Could not create xINCHbPrice Contract'))
  }
  const xKNCaPrice = getContract(
    LENDING_X_KNC_A_PRICE,
    provider,
    network
  ) as XKNCPrice
  if (!xKNCaPrice) {
    return Promise.reject(new Error('Could not create xKNCaPrice Contract'))
  }
  const xKNCbPrice = getContract(
    LENDING_X_KNC_B_PRICE,
    provider,
    network
  ) as XKNCPrice
  if (!xKNCbPrice) {
    return Promise.reject(new Error('Could not create xKNCbPrice Contract'))
  }
  return {
    xAAVEaPrice: xAAVEaPrice,
    xAAVEbPrice: xAAVEbPrice,
    xINCHaPrice: xINCHaPrice,
    xINCHbPrice: xINCHbPrice,
    xKNCaPrice: xKNCaPrice,
    xKNCbPrice: xKNCbPrice,
  }
}

export const getContracts = async (provider: BaseProvider) => {
  const comptroller = await getComptroller(provider)
  const liquidityPool = await getLiquidityPool(provider)
  const lpt = await getLPT(provider)
  const markets = await getMarkets(provider)
  const prices = await getPricingContracts(provider)
  const baseLendingProtocol = {
    comptroller: comptroller,
    liquidityPool: liquidityPool,
    lpt: lpt,
  }
  return { ...baseLendingProtocol, ...markets, ...prices }
}

export const enum Markets {
  xAAVEaMarket = 'xAAVEaMarket',
  xAAVEbMarket = 'xAAVEbMarket',
  xINCHaMarket = 'xINCHaMarket',
  xINCHbMarket = 'xINCHbMarket',
  xKNCaMarket = 'xKNCaMarket',
  xKNCbMarket = 'xKNCbMarket',
}

export const enum Prices {
  xAAVEaPrice = 'xAAVEaPrice',
  xAAVEbPrice = 'xAAVEbPrice',
  xINCHaPrice = 'xINCHaPrice',
  xINCHbPrice = 'xINCHbPrice',
  xKNCaPrice = 'xKNCaPrice',
  xKNCbPrice = 'xKNCbPrice',
}
