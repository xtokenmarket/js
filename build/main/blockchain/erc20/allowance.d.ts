import { BaseProvider } from '@ethersproject/providers'
import { LENDING_LPT } from '@xtoken/abis'
import {
  ILPTokenSymbols,
  INativeAssets,
  IStableAssets,
  ITokenSymbols,
} from '../../types/xToken'
export declare const getTokenAllowance: (
  symbol:
    | INativeAssets
    | ITokenSymbols
    | ILPTokenSymbols
    | IStableAssets
    | typeof LENDING_LPT,
  address: string,
  spenderAddress: string,
  provider: BaseProvider
) => Promise<string>
