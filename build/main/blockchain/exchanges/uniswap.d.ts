import { BaseProvider } from '@ethersproject/providers'
import { ETH, X_KNC_A, X_KNC_B } from '@xtoken/abis'
import { ILiquidityPoolItem, ITradeType } from '../../types/xToken'
export declare const getBtcUsdcPrice: (
  provider: BaseProvider
) => Promise<string>
export declare const getEthUsdcPrice: (
  provider: BaseProvider
) => Promise<string>
export declare const getEthTokenPrice: (
  tokenAddress: string,
  isPriceInvert: boolean,
  provider: BaseProvider
) => Promise<string>
export declare const getUniswapEstimatedQuantity: (
  tokenIn: typeof ETH | typeof X_KNC_A | typeof X_KNC_B,
  symbol: typeof X_KNC_A | typeof X_KNC_B,
  amount: string,
  tradeType: ITradeType,
  provider: BaseProvider
) => Promise<string>
export declare const getUniswapPortfolioItem: (
  symbol: typeof X_KNC_A | typeof X_KNC_B,
  address: string,
  provider: BaseProvider
) => Promise<ILiquidityPoolItem>
