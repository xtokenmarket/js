import { Signer } from 'ethers';
import { Provider } from '@ethersproject/providers';
import type { ERC20 } from '../ERC20';
export declare class ERC20__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): ERC20;
}
