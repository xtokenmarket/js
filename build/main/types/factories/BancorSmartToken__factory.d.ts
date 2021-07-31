import { Signer } from 'ethers'
import { Provider } from '@ethersproject/providers'
import type { BancorSmartToken } from '../BancorSmartToken'
export declare class BancorSmartToken__factory {
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): BancorSmartToken
}
