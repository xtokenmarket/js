import { BaseProvider } from '@ethersproject/providers'
import { X_INCH_A, X_INCH_B } from '@xtoken/abis'
import { IAsset } from '../../types/xToken'
export declare const getXInchAsset: (
  symbol: typeof X_INCH_A | typeof X_INCH_B,
  provider: BaseProvider
) => Promise<IAsset>
