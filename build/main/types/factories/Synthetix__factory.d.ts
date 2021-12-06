import { Signer } from 'ethers';
import { Provider } from '@ethersproject/providers';
import type { Synthetix } from '../Synthetix';
export declare class Synthetix__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): Synthetix;
}
