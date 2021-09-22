import { Signer } from 'ethers'
import { Provider } from '@ethersproject/providers'
import type { XBNT } from '../XBNT'
export declare class XBNT__factory {
  static connect(address: string, signerOrProvider: Signer | Provider): XBNT
}
