import { BaseProvider } from '@ethersproject/providers'
import { LENDING_LPT } from '@xtoken/abis'
import { INativeAssets, IStableAssets, ITokenSymbols } from '../../types/xToken'
export declare const getTokenBalance: (
  symbol: INativeAssets | ITokenSymbols | IStableAssets | typeof LENDING_LPT,
  address: string,
  provider: BaseProvider
) => Promise<string>
