import { BaseProvider } from '@ethersproject/providers';
import { IXAssetLev } from '../../types/xToken';
export declare const getMaximumRedeemableXAssetLev: (symbol: IXAssetLev, provider: BaseProvider) => Promise<string>;
