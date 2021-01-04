import { ContractTransaction } from '@ethersproject/contracts'
import { JsonRpcProvider } from '@ethersproject/providers'
import { parseEther } from 'ethers/lib/utils'

import {
  burnXAave,
  getExpectedQuantityOnBurnXAave,
} from './blockchain/xaave/burn'
import {
  approveXAave,
  getExpectedQuantityOnMintXAave,
  mintXAave,
} from './blockchain/xaave/mint'
import { getPortfolioItemXAave } from './blockchain/xaave/portfolio'
import { burnXKnc, getExpectedQuantityOnBurnXKnc } from './blockchain/xknc/burn'
import {
  approveXKnc,
  getExpectedQuantityOnMintXKnc,
  mintXKnc,
} from './blockchain/xknc/mint'
import { getPortfolioItemXKnc } from './blockchain/xknc/portfolio'
import { burnXSnx, getExpectedQuantityOnBurnXSnx } from './blockchain/xsnx/burn'
import {
  approveXSnx,
  getExpectedQuantityOnMintXSnx,
  mintXSnx,
} from './blockchain/xsnx/mint'
import { getPortfolioItemXSnx } from './blockchain/xsnx/portfolio'
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
    amount: string
  ): Promise<ContractTransaction> {
    const value = amount ? parseEther(amount) : MAX_UINT

    switch (symbol) {
      case X_AAVE_A:
      case X_AAVE_B:
        return approveXAave(symbol, value, this.provider)
      case X_KNC_A:
      case X_KNC_B:
        return approveXKnc(symbol, value, this.provider)
      case X_SNX_A:
        return approveXSnx(value, this.provider)
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
    const value = parseEther(amount)

    switch (symbol) {
      case X_AAVE_A:
      case X_AAVE_B:
        return burnXAave(symbol, sellForEth, value, this.provider)
      case X_KNC_A:
      case X_KNC_B:
        return burnXKnc(symbol, sellForEth, value, this.provider)
      case X_SNX_A:
        return burnXSnx(value, this.provider)
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

  public async getPortfolioItems(isLoggedIn: boolean) {
    const signer = this.provider.getSigner()
    const address = await signer.getAddress()

    return Promise.all([
      getPortfolioItemXKnc(X_KNC_A, address, this.provider, isLoggedIn),
      getPortfolioItemXKnc(X_KNC_B, address, this.provider, isLoggedIn),
      getPortfolioItemXSnx(X_SNX_A, address, this.provider, isLoggedIn),
      getPortfolioItemXAave(X_AAVE_A, address, this.provider, isLoggedIn),
      getPortfolioItemXAave(X_AAVE_B, address, this.provider, isLoggedIn),
    ])
  }

  public async mint(
    symbol: ITokenSymbols,
    tradeWithEth: boolean,
    amount: string
  ): Promise<ContractTransaction> {
    if (+amount === 0 || isNaN(+amount)) {
      return Promise.reject(new Error('Invalid value for amount'))
    }
    const value = parseEther(amount)

    switch (symbol) {
      case X_AAVE_A:
      case X_AAVE_B:
        return mintXAave(symbol, tradeWithEth, value, this.provider)
      case X_KNC_A:
      case X_KNC_B:
        return mintXKnc(symbol, tradeWithEth, value, this.provider)
      case X_SNX_A:
        return mintXSnx(tradeWithEth, value, this.provider)
    }
  }
}
