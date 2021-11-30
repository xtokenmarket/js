import { Signer } from 'ethers';
import { Provider } from '@ethersproject/providers';
import type { XU3LP } from '../XU3LP';
export declare class XU3LP__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): XU3LP;
}
