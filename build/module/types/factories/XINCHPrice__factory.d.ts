import { Signer } from 'ethers'
import { Provider } from '@ethersproject/providers'
import type { XINCHPrice } from '../XINCHPrice'
export declare class XINCHPrice__factory {
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): XINCHPrice
}
