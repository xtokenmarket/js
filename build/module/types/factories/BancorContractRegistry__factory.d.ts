import { Signer } from 'ethers';
import { Provider } from '@ethersproject/providers';
import type { BancorContractRegistry } from '../BancorContractRegistry';
export declare class BancorContractRegistry__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): BancorContractRegistry;
}
