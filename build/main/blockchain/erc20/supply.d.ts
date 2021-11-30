import { BaseProvider } from '@ethersproject/providers';
import { LENDING_LPT } from '@xtoken/abis';
import { INativeAssets, IStableAssets, ITokenSymbols } from '../../types/xToken';
export declare const getTokenSupply: (symbol: INativeAssets | ITokenSymbols | IStableAssets | typeof LENDING_LPT, provider: BaseProvider) => Promise<string>;
