import { BaseProvider } from '@ethersproject/providers'
import { ETH, X_KNC_A } from '@xtoken/abis'
import { ILiquidityPoolItem, ITradeType } from '../../types/xToken'
export declare const getKyberEstimatedQuantity: (
  tokenIn: typeof ETH | typeof X_KNC_A,
  symbol: typeof X_KNC_A,
  amount: string,
  tradeType: ITradeType,
  provider: BaseProvider
) => Promise<string>
export declare const getKyberPortfolioItem: (
  symbol: typeof X_KNC_A,
  address: string,
  provider: BaseProvider
) => Promise<ILiquidityPoolItem>
