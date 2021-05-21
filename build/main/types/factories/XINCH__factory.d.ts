import { Signer } from 'ethers'
import { Provider } from '@ethersproject/providers'
import type { XINCH } from '../XINCH'
export declare class XINCH__factory {
  static connect(address: string, signerOrProvider: Signer | Provider): XINCH
}
