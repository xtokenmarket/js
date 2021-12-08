import { Signer } from 'ethers'
import { Provider } from '@ethersproject/providers'
import type { ArbitrumNFTCore } from '../ArbitrumNFTCore'
export declare class ArbitrumNFTCore__factory {
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ArbitrumNFTCore
}
