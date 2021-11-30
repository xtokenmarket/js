import { Signer } from 'ethers';
import { Provider } from '@ethersproject/providers';
import type { BancorNetwork } from '../BancorNetwork';
export declare class BancorNetwork__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): BancorNetwork;
}
