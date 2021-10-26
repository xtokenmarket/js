import { BaseProvider } from '@ethersproject/providers'
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
export declare const getComptrollerContract: (
  provider: BaseProvider
) => Promise<Comptroller>
export declare const getLiquidityPoolContract: (
  provider: BaseProvider
) => Promise<LiquidityPool>
export declare const getLPTContract: (provider: BaseProvider) => Promise<LPT>
export declare const getMarketContracts: (
  provider: BaseProvider
) => Promise<Record<ILendingMarket, Market>>
export declare const getPricingContracts: (
  provider: BaseProvider
) => Promise<Record<ILendingPricing, XAAVEPrice | XINCHPrice | XKNCPrice>>
export declare const getLendingContracts: (
  provider: BaseProvider
) => Promise<{
  comptrollerContract: Comptroller
  liquidityPoolContract: LiquidityPool
  lptContract: LPT
  marketContracts: Record<'xINCHaMarket', Market>
  pricingContracts: Record<ILendingPricing, XAAVEPrice | XINCHPrice | XKNCPrice>
}>
