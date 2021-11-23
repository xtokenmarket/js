import { BaseProvider } from '@ethersproject/providers'
import { X_BNT_A } from '@xtoken/abis'
import { IAsset } from '../../types/xToken'
export declare const getXBntAsset: (
  symbol: typeof X_BNT_A,
  provider: BaseProvider
) => Promise<IAsset>
