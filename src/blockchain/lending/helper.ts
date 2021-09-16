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

import { Errors } from '../../constants'
import {
  Comptroller,
  LiquidityPool,
  LPT,
  Market,
  XAAVEPrice,
  XINCHPrice,
  XKNCPrice,
} from '../../types'
import { ILendingMarket, ILendingPricing } from '../../types/xToken'
import { getContract } from '../utils'

const CONTRACT_ERROR = new Error(Errors.CONTRACT_INITIALIZATION_FAILED)

export const getComptrollerContract = async (provider: BaseProvider) => {
  const network = await provider.getNetwork()
  const comptrollerContract = getContract(
    LENDING_COMPTROLLER,
    provider,
    network
  ) as Comptroller
  if (!comptrollerContract) {
    return Promise.reject(CONTRACT_ERROR)
  }
  return comptrollerContract
}

export const getLiquidityPoolContract = async (provider: BaseProvider) => {
  const network = await provider.getNetwork()
  const liquidityPoolContract = getContract(
    LENDING_LIQUIDITY_POOL,
    provider,
    network
  ) as LiquidityPool
  if (!liquidityPoolContract) {
    return Promise.reject(CONTRACT_ERROR)
  }
  return liquidityPoolContract
}

export const getLPTContract = async (provider: BaseProvider) => {
  const network = await provider.getNetwork()
  const lptContract = getContract(LENDING_LPT, provider, network) as LPT
  if (!lptContract) {
    return Promise.reject(CONTRACT_ERROR)
  }
  return lptContract
}

export const getMarketContracts = async (
  provider: BaseProvider
): Promise<Record<ILendingMarket, Market>> => {
  const network = await provider.getNetwork()

  // xAAVE Market Contracts
  const xAAVEaMarketContract = getContract(
    LENDING_X_AAVE_A_MARKET,
    provider,
    network
  ) as Market
  const xAAVEbMarketContract = getContract(
    LENDING_X_AAVE_B_MARKET,
    provider,
    network
  ) as Market

  // xINCH Market Contracts
  const xINCHaMarketContract = getContract(
    LENDING_X_INCH_A_MARKET,
    provider,
    network
  ) as Market
  const xINCHbMarketContract = getContract(
    LENDING_X_INCH_B_MARKET,
    provider,
    network
  ) as Market

  // xKNC Market Contracts
  const xKNCaMarketContract = getContract(
    LENDING_X_KNC_A_MARKET,
    provider,
    network
  ) as Market
  const xKNCbMarketContract = getContract(
    LENDING_X_KNC_B_MARKET,
    provider,
    network
  ) as Market

  if (
    !xAAVEaMarketContract ||
    !xAAVEbMarketContract ||
    !xINCHaMarketContract ||
    !xINCHbMarketContract ||
    !xKNCaMarketContract ||
    !xKNCbMarketContract
  ) {
    return Promise.reject(CONTRACT_ERROR)
  }

  return {
    [LENDING_X_AAVE_A_MARKET]: xAAVEaMarketContract,
    [LENDING_X_AAVE_B_MARKET]: xAAVEbMarketContract,
    [LENDING_X_INCH_A_MARKET]: xINCHaMarketContract,
    [LENDING_X_INCH_B_MARKET]: xINCHbMarketContract,
    [LENDING_X_KNC_A_MARKET]: xKNCaMarketContract,
    [LENDING_X_KNC_B_MARKET]: xKNCbMarketContract,
  }
}

export const getPricingContracts = async (
  provider: BaseProvider
): Promise<Record<ILendingPricing, XAAVEPrice | XINCHPrice | XKNCPrice>> => {
  const network = await provider.getNetwork()

  // xAAVE Price Contracts
  const xAAVEaPriceContract = getContract(
    LENDING_X_AAVE_A_PRICE,
    provider,
    network
  ) as XAAVEPrice
  const xAAVEbPriceContract = getContract(
    LENDING_X_AAVE_B_PRICE,
    provider,
    network
  ) as XAAVEPrice

  // xINCH Price Contracts
  const xINCHaPriceContract = getContract(
    LENDING_X_INCH_A_PRICE,
    provider,
    network
  ) as XINCHPrice
  const xINCHbPriceContract = getContract(
    LENDING_X_INCH_B_PRICE,
    provider,
    network
  ) as XINCHPrice

  // xKNC Price Contracts
  const xKNCaPriceContract = getContract(
    LENDING_X_KNC_A_PRICE,
    provider,
    network
  ) as XKNCPrice
  const xKNCbPriceContract = getContract(
    LENDING_X_KNC_B_PRICE,
    provider,
    network
  ) as XKNCPrice

  if (
    !xAAVEaPriceContract ||
    !xAAVEbPriceContract ||
    !xINCHaPriceContract ||
    !xINCHbPriceContract ||
    !xKNCaPriceContract ||
    !xKNCbPriceContract
  ) {
    return Promise.reject(CONTRACT_ERROR)
  }

  return {
    [LENDING_X_AAVE_A_PRICE]: xAAVEaPriceContract,
    [LENDING_X_AAVE_B_PRICE]: xAAVEbPriceContract,
    [LENDING_X_INCH_A_PRICE]: xINCHaPriceContract,
    [LENDING_X_INCH_B_PRICE]: xINCHbPriceContract,
    [LENDING_X_KNC_A_PRICE]: xKNCaPriceContract,
    [LENDING_X_KNC_B_PRICE]: xKNCbPriceContract,
  }
}

export const getLendingContracts = async (provider: BaseProvider) => {
  const [
    comptrollerContract,
    liquidityPoolContract,
    lptContract,
    marketContracts,
    pricingContracts,
  ] = await Promise.all([
    getComptrollerContract(provider),
    getLiquidityPoolContract(provider),
    getLPTContract(provider),
    getMarketContracts(provider),
    getPricingContracts(provider),
  ])

  return {
    comptrollerContract,
    liquidityPoolContract,
    lptContract,
    marketContracts,
    pricingContracts,
  }
}
