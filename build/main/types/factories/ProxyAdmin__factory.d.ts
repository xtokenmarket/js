import { Signer } from 'ethers';
import { Provider } from '@ethersproject/providers';
import type { ProxyAdmin } from '../ProxyAdmin';
export declare class ProxyAdmin__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): ProxyAdmin;
}
