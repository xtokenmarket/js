import { Signer } from 'ethers'
import { Provider } from '@ethersproject/providers'
import type { BalancerV2Vault } from '../BalancerV2Vault'
export declare class BalancerV2Vault__factory {
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): BalancerV2Vault
}
