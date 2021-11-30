import { Signer } from 'ethers';
import { Provider } from '@ethersproject/providers';
import type { XKNCPrice } from '../XKNCPrice';
export declare class XKNCPrice__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): XKNCPrice;
}
