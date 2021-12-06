import { Signer } from 'ethers';
import { Provider } from '@ethersproject/providers';
import type { XALPHA } from '../XALPHA';
export declare class XALPHA__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): XALPHA;
}
