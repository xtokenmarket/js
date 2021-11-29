import { Signer } from 'ethers'
import { Provider } from '@ethersproject/providers'
import type { TradeAccounting } from '../TradeAccounting'
export declare class TradeAccounting__factory {
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TradeAccounting
}
