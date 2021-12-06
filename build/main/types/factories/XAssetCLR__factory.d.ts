import { Signer } from 'ethers';
import { Provider } from '@ethersproject/providers';
import type { XAssetCLR } from '../XAssetCLR';
export declare class XAssetCLR__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): XAssetCLR;
}
