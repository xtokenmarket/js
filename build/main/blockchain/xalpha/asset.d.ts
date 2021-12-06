import { BaseProvider } from '@ethersproject/providers';
import { X_ALPHA_A } from '@xtoken/abis';
import { IAsset } from '../../types/xToken';
export declare const getXAlphaAsset: (symbol: typeof X_ALPHA_A, provider: BaseProvider) => Promise<IAsset>;
