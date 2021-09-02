import { BaseProvider } from '@ethersproject/providers'
import { X_KNC_A, X_KNC_B } from '@xtoken/abis'
import { IAsset } from '../../types/xToken'
export declare const getXKncAsset: (
  symbol: typeof X_KNC_A | typeof X_KNC_B,
  provider: BaseProvider
) => Promise<IAsset>
