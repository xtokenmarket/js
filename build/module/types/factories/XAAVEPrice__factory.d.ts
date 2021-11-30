import { Signer } from 'ethers';
import { Provider } from '@ethersproject/providers';
import type { XAAVEPrice } from '../XAAVEPrice';
export declare class XAAVEPrice__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): XAAVEPrice;
}
