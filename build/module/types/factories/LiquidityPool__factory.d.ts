import { Signer } from 'ethers'
import { Provider } from '@ethersproject/providers'
import type { LiquidityPool } from '../LiquidityPool'
export declare class LiquidityPool__factory {
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): LiquidityPool
}
