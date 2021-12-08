import { Signer } from 'ethers'
import { Provider } from '@ethersproject/providers'
import type { GM } from '../GM'
export declare class GM__factory {
  static connect(address: string, signerOrProvider: Signer | Provider): GM
}
