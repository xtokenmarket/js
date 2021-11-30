import { Signer } from 'ethers';
import { Provider } from '@ethersproject/providers';
import type { Market } from '../Market';
export declare class Market__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): Market;
}
