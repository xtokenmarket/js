import { BaseProvider } from '@ethersproject/providers';
import { IAssetId, ILPTokenSymbols } from '../../types/xToken';
export declare const getMaximumRedeemableXU3LP: (symbol: ILPTokenSymbols, outputAsset: IAssetId, provider: BaseProvider) => Promise<string>;
