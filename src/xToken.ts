import { ContractTransaction } from '@ethersproject/contracts'
import { JsonRpcProvider } from '@ethersproject/providers'

import { burnXKnc, getExpectedQuantityOnBurnXKnc } from './blockchain/xknc/burn'
import {
  approveXKnc,
  getExpectedQuantityOnMintXKnc,
  mintXKnc,
} from './blockchain/xknc/mint'
import { burnXSnx, getExpectedQuantityOnBurnXSnx } from './blockchain/xsnx/burn'
import {
  approveXSnx,
  getExpectedQuantityOnMintXSnx,
  mintXSnx,
} from './blockchain/xsnx/mint'
import { MAX_UINT, X_KNC_A, X_KNC_B, X_SNX_A } from './constants'
import { ITokenSymbols } from './types/xToken'

export class XToken {
  protected readonly provider: JsonRpcProvider

  /**
   * @param {JsonRpcProvider} provider Ethers.js provider
   */
  constructor(provider: JsonRpcProvider) {
    this.provider = provider
  }

  public async approve(
    symbol: ITokenSymbols,
    amount: string = MAX_UINT.toString()
  ): Promise<ContractTransaction> {
    switch (symbol) {
      case X_KNC_A:
      case X_KNC_B:
        return approveXKnc(amount, this.provider)
      case X_SNX_A:
        return approveXSnx(amount, this.provider)
    }
  }

  public async burn(
    symbol: ITokenSymbols,
    sellForEth: boolean,
    amount: string
  ): Promise<ContractTransaction> {
    if (+amount === 0 || isNaN(+amount)) {
      return Promise.reject(new Error('Invalid value for amount'))
    }

    switch (symbol) {
      case X_KNC_A:
      case X_KNC_B:
        return burnXKnc(sellForEth, amount, this.provider)
      case X_SNX_A:
        return burnXSnx(amount, this.provider)
    }
  }

  public async getExpectedQuantityOnBurn(
    symbol: ITokenSymbols,
    sellForEth: boolean,
    amount: string
  ): Promise<string> {
    if (+amount === 0 || isNaN(+amount)) {
      return Promise.reject(new Error('Invalid value for amount'))
    }

    switch (symbol) {
      case X_KNC_A:
      case X_KNC_B:
        return getExpectedQuantityOnBurnXKnc(sellForEth, amount, this.provider)
      case X_SNX_A:
        return getExpectedQuantityOnBurnXSnx(amount, this.provider)
    }
  }

  public async getExpectedQuantityOnMint(
    symbol: ITokenSymbols,
    tradeWithEth: boolean,
    amount: string
  ): Promise<string> {
    if (+amount === 0 || isNaN(+amount)) {
      return Promise.reject(new Error('Invalid value for amount'))
    }

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
        return mintXKnc(tradeWithEth, amount, this.provider)
      case X_SNX_A:
        return mintXSnx(tradeWithEth, amount, this.provider)
    }
  }
}
