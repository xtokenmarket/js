import { BaseProvider } from '@ethersproject/providers';
import { ETH, X_BNT_A } from '@xtoken/abis';
import { ILiquidityPoolItem, ITradeType } from '../../types/xToken';
export declare const getBancorNetworkAddress: (provider: BaseProvider) => Promise<string>;
export declare const getBntEthPrice: (provider: BaseProvider) => Promise<string>;
export declare const getBancorEstimatedQuantity: (tokenIn: typeof ETH | typeof X_BNT_A, symbol: typeof X_BNT_A, amount: string, tradeType: ITradeType, provider: BaseProvider) => Promise<string>;
export declare const getBancorPortfolioItem: (symbol: typeof X_BNT_A, address: string, provider: BaseProvider) => Promise<ILiquidityPoolItem>;
