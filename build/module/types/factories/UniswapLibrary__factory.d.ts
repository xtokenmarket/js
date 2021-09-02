import { Signer } from 'ethers'
import { Provider } from '@ethersproject/providers'
import type { UniswapLibrary } from '../UniswapLibrary'
export declare class UniswapLibrary__factory {
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): UniswapLibrary
}
