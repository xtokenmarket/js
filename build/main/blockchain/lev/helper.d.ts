import { Contract } from '@ethersproject/contracts';
import { BaseProvider } from '@ethersproject/providers';
import { XAssetLev } from '../../types';
import { IXAssetLev } from '../../types/xToken';
export declare const getXAssetLevContracts: (symbol: IXAssetLev, provider: BaseProvider) => Promise<{
    network: import("@ethersproject/providers").Network;
    tokenContract: Contract;
    xassetlevContract: XAssetLev;
}>;
