import { BaseProvider } from '@ethersproject/providers';
import { ETH } from '@xtoken/abis';
import { BigNumber } from 'ethers';
import { ILevToken, ITokenSymbols, ITradeType } from '../../types/xToken';
export declare const getUniswapV3EstimatedQty: (tokenIn: typeof ETH | ITokenSymbols, symbol: ITokenSymbols | ILevToken, amount: string, tradeType: ITradeType, fees: BigNumber | undefined, provider: BaseProvider) => Promise<string>;
export declare const getEthUsdcPriceUniswapV3: (provider: BaseProvider) => Promise<string>;
export declare const getTokenEthPriceUniswapV3: (symbol: ILevToken, provider: BaseProvider) => Promise<string>;
