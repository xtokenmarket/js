import { Signer } from 'ethers';
import { Provider } from '@ethersproject/providers';
import type { MerkleClaim } from '../MerkleClaim';
export declare class MerkleClaim__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): MerkleClaim;
}
