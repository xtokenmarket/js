import { BaseProvider } from '@ethersproject/providers';
import { X_AAVE_A, X_AAVE_B } from '@xtoken/abis';
import { IAsset } from '../../types/xToken';
export declare const getXAaveAsset: (symbol: typeof X_AAVE_A | typeof X_AAVE_B, provider: BaseProvider) => Promise<IAsset>;
