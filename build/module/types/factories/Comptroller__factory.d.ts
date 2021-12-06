import { Signer } from 'ethers';
import { Provider } from '@ethersproject/providers';
import type { Comptroller } from '../Comptroller';
export declare class Comptroller__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): Comptroller;
}
