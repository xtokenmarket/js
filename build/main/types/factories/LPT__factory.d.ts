import { Signer } from 'ethers'
import { Provider } from '@ethersproject/providers'
import type { LPT } from '../LPT'
export declare class LPT__factory {
  static connect(address: string, signerOrProvider: Signer | Provider): LPT
}
