import { BaseProvider } from '@ethersproject/providers';
import { ILevAsset, IXAssetLev } from '../../types/xToken';
export declare const getXAssetLev: (symbol: IXAssetLev, provider: BaseProvider) => Promise<ILevAsset>;
