import { Signer } from 'ethers';
import { Provider } from '@ethersproject/providers';
import type { UniswapV2Pair } from '../UniswapV2Pair';
export declare class UniswapV2Pair__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): UniswapV2Pair;
}
