import { Signer } from 'ethers';
import { Provider } from '@ethersproject/providers';
import type { XAssetLev } from '../XAssetLev';
export declare class XAssetLev__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): XAssetLev;
}
