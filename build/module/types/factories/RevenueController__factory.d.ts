import { Signer } from 'ethers';
import { Provider } from '@ethersproject/providers';
import type { RevenueController } from '../RevenueController';
export declare class RevenueController__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): RevenueController;
}
