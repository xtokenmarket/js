import { ContractTransaction } from '@ethersproject/contracts'
import { JsonRpcProvider } from '@ethersproject/providers'

import {
  burnXAave,
  getExpectedQuantityOnBurnXAave,
} from './blockchain/xaave/burn'
import {
  approveXAave,
  getExpectedQuantityOnMintXAave,
  mintXAave,
} from './blockchain/xaave/mint'
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
import {
  MAX_UINT,
  X_AAVE_A,
  X_AAVE_B,
  X_KNC_A,
  X_KNC_B,
  X_SNX_A,
} from './constants'
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
      case X_AAVE_A:
      case X_AAVE_B:
        return approveXAave(symbol, amount, this.provider)
      case X_KNC_A:
      case X_KNC_B:
        return approveXKnc(symbol, amount, this.provider)
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
      case X_AAVE_A:
      case X_AAVE_B:
        return burnXAave(symbol, sellForEth, amount, this.provider)
      case X_KNC_A:
      case X_KNC_B:
        return burnXKnc(symbol, sellForEth, amount, this.provider)
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
      case X_AAVE_A:
      case X_AAVE_B:
        return getExpectedQuantityOnBurnXAave(
          symbol,
          sellForEth,
          amount,
          this.provider
        )
      case X_KNC_A:
      case X_KNC_B:
        return getExpectedQuantityOnBurnXKnc(
          symbol,
          sellForEth,
          amount,
          this.provider
        )
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
      case X_AAVE_A:
      case X_AAVE_B:
        return getExpectedQuantityOnMintXAave(
          symbol,
          tradeWithEth,
          amount,
          this.provider
        )
      case X_KNC_A:
      case X_KNC_B:
        return getExpectedQuantityOnMintXKnc(
          symbol,
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
      case X_AAVE_A:
      case X_AAVE_B:
        return mintXAave(symbol, tradeWithEth, amount, this.provider)
      case X_KNC_A:
      case X_KNC_B:
        return mintXKnc(symbol, tradeWithEth, amount, this.provider)
      case X_SNX_A:
        return mintXSnx(tradeWithEth, amount, this.provider)
    }
  }
}
