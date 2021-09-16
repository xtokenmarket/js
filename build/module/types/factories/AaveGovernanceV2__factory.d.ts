import { Signer } from 'ethers'
import { Provider } from '@ethersproject/providers'
import type { AaveGovernanceV2 } from '../AaveGovernanceV2'
export declare class AaveGovernanceV2__factory {
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): AaveGovernanceV2
}
