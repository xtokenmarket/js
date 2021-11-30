import { Signer } from 'ethers';
import { Provider } from '@ethersproject/providers';
import type { RewardController } from '../RewardController';
export declare class RewardController__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): RewardController;
}
