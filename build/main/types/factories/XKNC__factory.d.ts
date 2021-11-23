import { Signer } from 'ethers'
import { Provider } from '@ethersproject/providers'
import type { XKNC } from '../XKNC'
export declare class XKNC__factory {
  static connect(address: string, signerOrProvider: Signer | Provider): XKNC
}
