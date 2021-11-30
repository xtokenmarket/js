import { BaseProvider } from '@ethersproject/providers';
import { ETH, X_AAVE_A, X_AAVE_B } from '@xtoken/abis';
import { ILiquidityPoolItem, ITokenSymbols, ITradeType } from '../../types/xToken';
export declare const getBalancerEstimatedQuantity: (tokenIn: typeof ETH | typeof X_AAVE_A | typeof X_AAVE_B, symbol: typeof X_AAVE_A | typeof X_AAVE_B, amount: string, tradeType: ITradeType, provider: BaseProvider) => Promise<string>;
export declare const getBalancerPortfolioItem: (symbol: ITokenSymbols, address: string, provider: BaseProvider) => Promise<ILiquidityPoolItem>;
