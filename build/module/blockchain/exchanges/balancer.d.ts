import { BaseProvider } from '@ethersproject/providers'
import { ETH, X_AAVE_A, X_AAVE_B, X_SNX_A } from '@xtoken/abis'
import {
  ILiquidityPoolItem,
  ITokenSymbols,
  ITradeType,
} from '../../types/xToken'
export declare const getBalancerEstimatedQuantity: (
  tokenIn: typeof ETH | typeof X_AAVE_A | typeof X_AAVE_B | typeof X_SNX_A,
  symbol: typeof X_AAVE_A | typeof X_AAVE_B | typeof X_SNX_A,
  amount: string,
  tradeType: ITradeType,
  provider: BaseProvider
) => Promise<string>
export declare const getBalancerPortfolioItem: (
  symbol: ITokenSymbols,
  address: string,
  provider: BaseProvider
) => Promise<ILiquidityPoolItem>
