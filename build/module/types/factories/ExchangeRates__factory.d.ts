import { Signer } from 'ethers'
import { Provider } from '@ethersproject/providers'
import type { ExchangeRates } from '../ExchangeRates'
export declare class ExchangeRates__factory {
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ExchangeRates
}
