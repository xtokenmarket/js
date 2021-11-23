import { Signer } from 'ethers'
import { Provider } from '@ethersproject/providers'
import type { NativePrice } from '../NativePrice'
export declare class NativePrice__factory {
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): NativePrice
}
