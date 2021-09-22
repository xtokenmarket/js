import { BaseProvider } from '@ethersproject/providers'
import { IXAssetCLR } from '../../types/xToken'
export declare const getMaximumRedeemableXAssetCLR: (
  symbol: IXAssetCLR,
  provider: BaseProvider
) => Promise<string>
