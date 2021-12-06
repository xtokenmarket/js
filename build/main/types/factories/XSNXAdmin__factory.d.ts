import { Signer } from 'ethers';
import { Provider } from '@ethersproject/providers';
import type { XSNXAdmin } from '../XSNXAdmin';
export declare class XSNXAdmin__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): XSNXAdmin;
}
