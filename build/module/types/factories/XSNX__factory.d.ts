import { Signer } from 'ethers';
import { Provider } from '@ethersproject/providers';
import type { XSNX } from '../XSNX';
export declare class XSNX__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): XSNX;
}
