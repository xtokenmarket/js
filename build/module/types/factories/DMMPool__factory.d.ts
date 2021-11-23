import { Signer } from 'ethers'
import { Provider } from '@ethersproject/providers'
import type { DMMPool } from '../DMMPool'
export declare class DMMPool__factory {
  static connect(address: string, signerOrProvider: Signer | Provider): DMMPool
}
