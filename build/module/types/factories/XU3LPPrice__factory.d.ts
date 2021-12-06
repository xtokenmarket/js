import { Signer } from 'ethers';
import { Provider } from '@ethersproject/providers';
import type { XU3LPPrice } from '../XU3LPPrice';
export declare class XU3LPPrice__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): XU3LPPrice;
}
