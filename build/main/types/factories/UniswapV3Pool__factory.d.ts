import { Signer } from 'ethers'
import { Provider } from '@ethersproject/providers'
import type { UniswapV3Pool } from '../UniswapV3Pool'
export declare class UniswapV3Pool__factory {
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): UniswapV3Pool
}
