import { BaseProvider } from '@ethersproject/providers'
import { ETH, X_SNX_A } from '@xtoken/abis'
import {
  ILiquidityPoolItem,
  ITokenSymbols,
  ITradeType,
} from '../../types/xToken'
export declare const getBalancerV2EstimatedQuantity: (
  tokenIn: typeof ETH | typeof X_SNX_A,
  symbol: typeof X_SNX_A,
  amount: string,
  tradeType: ITradeType,
  provider: BaseProvider
) => Promise<string>
export declare const getBalancerV2PortfolioItem: (
  symbol: ITokenSymbols,
  address: string,
  provider: BaseProvider
) => Promise<ILiquidityPoolItem>
