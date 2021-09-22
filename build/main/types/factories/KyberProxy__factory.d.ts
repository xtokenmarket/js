import { Signer } from 'ethers'
import { Provider } from '@ethersproject/providers'
import type { KyberProxy } from '../KyberProxy'
export declare class KyberProxy__factory {
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): KyberProxy
}
