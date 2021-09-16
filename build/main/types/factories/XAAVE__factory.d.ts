import { Signer } from 'ethers'
import { Provider } from '@ethersproject/providers'
import type { XAAVE } from '../XAAVE'
export declare class XAAVE__factory {
  static connect(address: string, signerOrProvider: Signer | Provider): XAAVE
}
