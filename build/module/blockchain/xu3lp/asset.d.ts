import { BaseProvider } from '@ethersproject/providers'
import { ILPAsset, ILPTokenSymbols } from '../../types/xToken'
export declare const getXU3LPAsset: (
  symbol: ILPTokenSymbols,
  provider: BaseProvider
) => Promise<ILPAsset>
