import { BaseProvider } from '@ethersproject/providers';
import { X_SNX_A } from '@xtoken/abis';
import { IAsset } from '../../types/xToken';
export declare const getXSnxAsset: (symbol: typeof X_SNX_A, provider: BaseProvider) => Promise<IAsset>;
