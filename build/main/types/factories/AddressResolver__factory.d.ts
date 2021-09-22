import { Signer } from 'ethers'
import { Provider } from '@ethersproject/providers'
import type { AddressResolver } from '../AddressResolver'
export declare class AddressResolver__factory {
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): AddressResolver
}
