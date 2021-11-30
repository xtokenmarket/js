import { Signer } from 'ethers';
import { Provider } from '@ethersproject/providers';
import type { BalancerPool } from '../BalancerPool';
export declare class BalancerPool__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): BalancerPool;
}
