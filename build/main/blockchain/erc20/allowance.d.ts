import { BaseProvider } from '@ethersproject/providers'
import {
  ILPTokenSymbols,
  INativeAssets,
  IStableAssets,
  ITokenSymbols,
} from '../../types/xToken'
export declare const getTokenAllowance: (
  symbol: INativeAssets | ITokenSymbols | ILPTokenSymbols | IStableAssets,
  address: string,
  spenderAddress: string,
  provider: BaseProvider
) => Promise<string>
