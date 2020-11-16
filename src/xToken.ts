import { ContractTransaction } from '@ethersproject/contracts'
import { JsonRpcProvider } from '@ethersproject/providers'

import { getExpectedQuantityOnMintXKnc, minkXKnc } from './blockchain/xknc/mint'
import { getExpectedQuantityOnMintXSnx, minkXSnx } from './blockchain/xsnx/mint'
import { X_KNC_A, X_KNC_B, X_SNX_A } from './constants'
import { ITokenSymbols } from './types/xToken'

export class XToken {
  protected readonly provider: JsonRpcProvider

  /**
   * @param {JsonRpcProvider} provider Ethers.js provider
   */
  constructor(provider: JsonRpcProvider) {
    this.provider = provider
  }

  public async getExpectedQuantityOnMint(
    symbol: ITokenSymbols,
    tradeWithEth: boolean,
    amount: string
  ): Promise<string> {
    if (+amount === 0 || isNaN(+amount)) return '0'

    switch (symbol) {
      case X_KNC_A:
      case X_KNC_B:
        return getExpectedQuantityOnMintXKnc(
          tradeWithEth,
          amount,
          this.provider
        )
      case X_SNX_A:
        return getExpectedQuantityOnMintXSnx(
          tradeWithEth,
          amount,
          this.provider
        )
    }
  }

  public async mint(
    symbol: ITokenSymbols,
    tradeWithEth: boolean,
    amount: string
  ): Promise<ContractTransaction> {
    if (+amount === 0 || isNaN(+amount)) {
      return Promise.reject(new Error('Invalid value for amount'))
    }

    switch (symbol) {
      case X_KNC_A:
      case X_KNC_B:
        return minkXKnc(tradeWithEth, amount, this.provider)
      case X_SNX_A:
        return minkXSnx(tradeWithEth, amount, this.provider)
    }
  }
}
