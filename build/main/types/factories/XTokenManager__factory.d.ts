import { Signer } from 'ethers'
import { Provider } from '@ethersproject/providers'
import type { XTokenManager } from '../XTokenManager'
export declare class XTokenManager__factory {
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): XTokenManager
}
