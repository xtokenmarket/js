import { BaseProvider } from '@ethersproject/providers';
import { ETH, X_INCH_A, X_INCH_B } from '@xtoken/abis';
import { ILiquidityPoolItem, ITradeType } from '../../types/xToken';
export declare const getInchEstimatedQuantity: (tokenIn: typeof ETH | typeof X_INCH_A | typeof X_INCH_B, symbol: typeof X_INCH_A | typeof X_INCH_B, amount: string, tradeType: ITradeType, provider: BaseProvider) => Promise<string>;
export declare const getInchPortfolioItem: (symbol: typeof X_INCH_A | typeof X_INCH_B, address: string, provider: BaseProvider) => Promise<ILiquidityPoolItem>;
