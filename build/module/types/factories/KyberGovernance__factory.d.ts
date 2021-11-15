import { Signer } from 'ethers'
import { Provider } from '@ethersproject/providers'
import type { KyberGovernance } from '../KyberGovernance'
export declare class KyberGovernance__factory {
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): KyberGovernance
}
