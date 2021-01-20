import { ContractTransaction } from '@ethersproject/contracts'
import { JsonRpcProvider } from '@ethersproject/providers'
import { parseEther } from 'ethers/lib/utils'
import {
  ETH,
  X_AAVE_A,
  X_AAVE_B,
  X_INCH_A,
  X_INCH_B,
  X_KNC_A,
  X_KNC_B,
  X_SNX_A,
} from 'xtoken-abis'

import { getBalancerEstimatedQuantity } from './blockchain/balancer'
import {
  approveXAave,
  burnXAave,
  getExpectedQuantityOnBurnXAave,
  getExpectedQuantityOnMintXAave,
  getMaximumRedeemableXAave,
  getPortfolioItemXAave,
  mintXAave,
} from './blockchain/xaave'
import {
  approveXInch,
  burnXInch,
  getExpectedQuantityOnBurnXInch,
  getExpectedQuantityOnMintXInch,
  getMaximumRedeemableXInch,
  getPortfolioItemXInch,
  mintXInch,
} from './blockchain/xinch'
import {
  approveXKnc,
  burnXKnc,
  getExpectedQuantityOnBurnXKnc,
  getExpectedQuantityOnMintXKnc,
  getPortfolioItemXKnc,
  mintXKnc,
} from './blockchain/xknc'
import {
  approveXSnx,
  burnXSnx,
  getExpectedQuantityOnBurnXSnx,
  getExpectedQuantityOnMintXSnx,
  getMaximumRedeemableXSnx,
  getPortfolioItemXSnx,
  mintXSnx,
} from './blockchain/xsnx'
import { MAX_UINT } from './constants'
import { IPortfolioItem, ITokenSymbols, ITradeType } from './types/xToken'

/**
 * Helper class providing the wrapper around the methods to interact with the xToken contracts.
 * Depends on ethers.js v5
 * @example
 * ```typescript
 * import { ethers } from 'ethers'
 * import { XToken } from 'xtoken-js'
 *
 * // Metamask provider
 * const provider = new ethers.providers.Web3Provider(window.ethereum)
 * const xToken = new XToken(provider)
 * ```
 */
export class XToken {
  protected readonly provider: JsonRpcProvider

  /**
   * @param {JsonRpcProvider} provider Ethers.js provider
   */
  constructor(provider: JsonRpcProvider) {
    this.provider = provider
  }

  /**
   * Approve specified amount of xToken by contract before minting
   *
   * @example
   * ```typescript
   * const tx = await xToken.approve('xAAVEa', '100') // Approve 100 xAAVEa tokens
   * await tx.wait() // Wait for transaction confirmation
   * ```
   *
   * @param {ITokenSymbols} symbol Symbol of the token to be approved
   * @param {string} amount Amount of the token to be approved, [[MAX_UINT]] will be used by default
   * @returns A promise of the transaction response
   */
  public async approve(
    symbol: ITokenSymbols,
    amount?: string
  ): Promise<ContractTransaction> {
    const value = amount ? parseEther(amount) : MAX_UINT

    switch (symbol) {
      case X_AAVE_A:
      case X_AAVE_B:
        return approveXAave(symbol, value, this.provider)
      case X_INCH_A:
      case X_INCH_B:
        return approveXInch(symbol, value, this.provider)
      case X_KNC_A:
      case X_KNC_B:
        return approveXKnc(symbol, value, this.provider)
      case X_SNX_A:
        return approveXSnx(value, this.provider)
    }
  }

  /**
   * Sell specified amount of xToken, either for ETH or Token
   *
   * @example
   * ```typescript
   * // Sell 1000 xAAVEa for ETH
   * const tx = await xToken.burn('xAAVEa', true, '1000')
   * await tx.wait() // Wait for transaction confirmation
   * ```
   *
   * @param {ITokenSymbols} symbol Symbol of the xToken to be sold
   * @param {boolean} sellForEth Sell for ETH/Token
   * @param {string} amount Amount of xTokens to be sold,
   *                        cannot exceed max redeemable for xAAVEa/xAAVEb/xSNXa tokens
   * @returns A promise of the transaction response
   */
  public async burn(
    symbol: ITokenSymbols,
    sellForEth: boolean,
    amount: string
  ): Promise<ContractTransaction> {
    if (+amount === 0 || isNaN(+amount)) {
      return Promise.reject(new Error('Invalid value for amount'))
    }
    const value = parseEther(amount)

    if (symbol !== X_KNC_A && symbol !== X_KNC_B) {
      const maxRedeemable = await this.getMaxRedeemable(symbol)

      if (value.gt(maxRedeemable)) {
        return Promise.reject(
          new Error('Specified amount exceeds maximum redeemable tokens')
        )
      }
    }

    switch (symbol) {
      case X_AAVE_A:
      case X_AAVE_B:
        return burnXAave(symbol, sellForEth, value, this.provider)
      case X_INCH_A:
      case X_INCH_B:
        return burnXInch(symbol, sellForEth, value, this.provider)
      case X_KNC_A:
      case X_KNC_B:
        return burnXKnc(symbol, sellForEth, value, this.provider)
      case X_SNX_A:
        return burnXSnx(value, this.provider)
    }
  }

  /**
   * @example
   * ```typescript
   * // Get expected quantity of xAAVEa when minting for 1 ETH
   * const expectedQty = await xToken.getExpectedQuantityOnBalancer('eth', 'xAAVEa', '1', 'buy')
   * ```
   *
   * @param {'eth' | ITokenSymbols} tokenIn 'eth' in case buying/selling for Ethereum, if not symbol of the xToken to burn/mint
   * @param {ITokenSymbols} symbol Symbol of the xToken to burn/mint
   * @param {string} amount Quantity of the xToken to be traded
   * @param {ITradeType} tradeType Buy/sell type of the trade
   * @returns Expected quantity for the particular trade to be made on Balancer
   */
  public async getExpectedQuantityOnBalancer(
    tokenIn: typeof ETH | ITokenSymbols,
    symbol: ITokenSymbols,
    amount: string,
    tradeType: ITradeType
  ): Promise<string> {
    if (+amount === 0 || isNaN(+amount)) {
      return Promise.reject(new Error('Invalid value for amount'))
    }

    return getBalancerEstimatedQuantity(
      tokenIn,
      symbol,
      amount,
      tradeType,
      this.provider
    )
  }

  /**
   * @example
   * ```typescript
   * // Get expected quantity of ETH when selling 100 xAAVEa
   * const expectedQty = await xToken.getExpectedQuantityOnBurn('xAAVEa', true, '100')
   * ```
   *
   * @param {ITokenSymbols} symbol Symbol of the xToken to burn
   * @param {boolean} sellForEth True, if selling the xToken for ETH
   * @param {string} amount Quantity of the xToken to be traded
   * @returns Expected quantity for selling the given xToken
   */
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
      case X_INCH_A:
      case X_INCH_B:
        return getExpectedQuantityOnBurnXInch(
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

  /**
   * @example
   * ```typescript
   * // Get expected quantity of xAAVEa for minting 1 ETH
   * const expectedQty = await xToken.getExpectedQuantityOnMint('xAAVEa', true, '1')
   * ```
   *
   * @param {ITokenSymbols} symbol Symbol of the xToken to be minted
   * @param {boolean} tradeWithEth True, if buying the xToken with ETH
   * @param {string} amount Quantity of the token to be traded
   * @returns Expected quantity of xToken upon minting
   */
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
      case X_INCH_A:
      case X_INCH_B:
        return getExpectedQuantityOnMintXInch(
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

  /**
   * @example
   * ```typescript
   * // Get maximum redeemable tokens for xAAVEa
   * const maxRedeemable = await xToken.getMaxRedeemable('xAAVEa')
   * ```
   *
   * @param {'xAAVEa' | 'xAAVEb' | 'xINCHa' | 'xINCHb' | 'xSNXa'} symbol Symbol of the xToken
   * @returns Maximum redeemable tokens for the given xToken
   */
  public async getMaxRedeemable(
    symbol:
      | typeof X_AAVE_A
      | typeof X_AAVE_B
      | typeof X_INCH_A
      | typeof X_INCH_B
      | typeof X_SNX_A
  ): Promise<string> {
    switch (symbol) {
      case X_AAVE_A:
      case X_AAVE_B:
        return getMaximumRedeemableXAave(symbol, this.provider)
      case X_INCH_A:
      case X_INCH_B:
        return getMaximumRedeemableXInch(symbol, this.provider)
      case X_SNX_A:
        return getMaximumRedeemableXSnx(this.provider)
    }
  }

  /**
   * Returns balances along with prices for all the xTokens
   * owned by an address
   *
   * @example
   * ```typescript
   * // Get portfolio items for the logged in address
   * const portfolio = await xToken.getPortfolioItems()
   * ```
   *
   * @returns Array of each xToken in the portfolio
   *          with their corresponding balance and price
   */
  public async getPortfolioItems(): Promise<readonly IPortfolioItem[]> {
    const signer = this.provider.getSigner()
    const address = await signer.getAddress()

    return Promise.all([
      getPortfolioItemXKnc(X_KNC_A, address, this.provider),
      getPortfolioItemXKnc(X_KNC_B, address, this.provider),
      getPortfolioItemXSnx(X_SNX_A, address, this.provider),
      getPortfolioItemXAave(X_AAVE_A, address, this.provider),
      getPortfolioItemXAave(X_AAVE_B, address, this.provider),
      getPortfolioItemXInch(X_INCH_A, address, this.provider),
      getPortfolioItemXInch(X_INCH_B, address, this.provider),
    ])
  }

  /**
   * Mint xToken for specified amount of ETH/Token
   *
   * @example
   * ```typescript
   * // Buy xAAVEa for 1 ETH
   * const tx = await xToken.mint('xAAVEa', true, '1')
   * await tx.wait() // Wait for transaction confirmation
   * ```
   *
   * @param {ITokenSymbols} symbol Symbol of the xToken to be minted
   * @param {boolean} tradeWithEth Mint with ETH/Token
   * @param {string} amount Quantity of token to be minted,
   *                        tokens need to be approved before minting using [[approve]] method
   * @returns A promise of the transaction response
   */
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
      case X_INCH_A:
      case X_INCH_B:
        return mintXInch(symbol, tradeWithEth, value, this.provider)
      case X_KNC_A:
      case X_KNC_B:
        return mintXKnc(symbol, tradeWithEth, value, this.provider)
      case X_SNX_A:
        return mintXSnx(tradeWithEth, value, this.provider)
    }
  }
}
