import { BaseProvider } from '@ethersproject/providers'
import { ILPTokenSymbols, IU3LPAssetId } from '../../types/xToken'
export declare const getMaximumRedeemableXU3LP: (
  symbol: ILPTokenSymbols,
  outputAsset: IU3LPAssetId,
  provider: BaseProvider
) => Promise<string>
