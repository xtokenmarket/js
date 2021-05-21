import { AddressZero } from '@ethersproject/constants'
import { ContractTransaction } from '@ethersproject/contracts'
import { BaseProvider } from '@ethersproject/providers'
import {
  BUY,
  ETH,
  X_AAVE_A,
  X_AAVE_B,
  X_BNT_A,
  X_INCH_A,
  X_INCH_B,
  X_KNC_A,
  X_KNC_B,
  X_SNX_A,
  X_U3LP_A,
  X_U3LP_B,
  X_U3LP_C,
  X_U3LP_D,
} from '@xtoken/abis'
import { isAddress, parseEther } from 'ethers/lib/utils'

import {
  getBalancerEstimatedQuantity,
  getBalancerPortfolioItem,
} from './blockchain/exchanges/balancer'
import {
  // getBancorEstimatedQuantity,
  getBancorPortfolioItem,
} from './blockchain/exchanges/bancor'
import { getInchEstimatedQuantity } from './blockchain/exchanges/inch'
import {
  getKyberEstimatedQuantity,
  getKyberPortfolioItem,
} from './blockchain/exchanges/kyber'
import { getSignerAddress } from './blockchain/utils'
import {
  approveXAave,
  burnXAave,
  getExpectedQuantityOnBurnXAave,
  getExpectedQuantityOnMintXAave,
  getMaximumRedeemableXAave,
  getPortfolioItemXAave,
  mintXAave,
} from './blockchain/xaave'
import { getXAaveAsset } from './blockchain/xaave/asset'
import {
  approveXBnt,
  burnXBnt,
  getExpectedQuantityOnBurnXBnt,
  getExpectedQuantityOnMintXBnt,
  getMaximumRedeemableXBnt,
  getPortfolioItemXBnt,
  mintXBnt,
} from './blockchain/xbnt'
import { getXBntAsset } from './blockchain/xbnt/asset'
import {
  approveXInch,
  burnXInch,
  getExpectedQuantityOnBurnXInch,
  getExpectedQuantityOnMintXInch,
  getMaximumRedeemableXInch,
  getPortfolioItemXInch,
  mintXInch,
} from './blockchain/xinch'
import { getXInchAsset } from './blockchain/xinch/asset'
import {
  approveXKnc,
  burnXKnc,
  getExpectedQuantityOnBurnXKnc,
  getExpectedQuantityOnMintXKnc,
  getPortfolioItemXKnc,
  mintXKnc,
} from './blockchain/xknc'
import { getXKncAsset } from './blockchain/xknc/asset'
import {
  approveXSnx,
  burnXSnx,
  getExpectedQuantityOnBurnXSnx,
  getExpectedQuantityOnMintXSnx,
  getMaximumRedeemableXSnx,
  getPortfolioItemXSnx,
  mintXSnx,
} from './blockchain/xsnx'
import { getXSnxAsset } from './blockchain/xsnx/asset'
import {
  approveXU3LP,
  burnXU3LP,
  getExpectedQuantityOnBurnXU3LP,
  getExpectedQuantityOnMintXU3LP,
  mintXU3LP,
} from './blockchain/xu3lp'
import { getXU3LPAsset } from './blockchain/xu3lp/asset'
import { Exchange, MAX_UINT } from './constants'
import {
  IAsset,
  ILiquidityPoolItem,
  ILPAsset,
  ILPTokenSymbols,
  IPortfolioItem,
  IReturns,
  ITokenSymbols,
  ITradeType,
  IU3LPAssetId,
} from './types/xToken'

/**
 * Helper class providing the wrapper around the methods to interact with the xToken contracts.
 * Depends on ethers.js v5
 * @example
 * ```typescript
 * import { ethers } from 'ethers'
 * import { XToken } from '@xtoken/js'
 *
 * // Metamask provider
 * const provider = new ethers.providers.Web3Provider(window.ethereum)
 * const xToken = new XToken(provider)
 * ```
 */
export class XToken {
  protected readonly provider: BaseProvider

  /**
   * @param {BaseProvider} provider Ethers.js provider
   */
  constructor(provider: BaseProvider) {
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
   * @param {ITokenSymbols | ILPTokenSymbols} symbol Symbol of the token to be approved
   * @param {string} amount Amount of the token to be approved, MAX_UINT will be used by default
   * @param {IU3LPAssetId} inputAsset Token0/Token1
   * @returns A promise of the transaction response
   */
  public async approve(
    symbol: ITokenSymbols | ILPTokenSymbols,
    amount?: string,
    inputAsset?: IU3LPAssetId
  ): Promise<ContractTransaction> {
    const value = amount ? parseEther(amount) : MAX_UINT

    switch (symbol) {
      case X_AAVE_A:
      case X_AAVE_B:
        return approveXAave(symbol, value, this.provider)
      case X_BNT_A:
        return approveXBnt(symbol, value, this.provider)
      case X_INCH_A:
      case X_INCH_B:
        return approveXInch(symbol, value, this.provider)
      case X_KNC_A:
      case X_KNC_B:
        return approveXKnc(symbol, value, this.provider)
      case X_SNX_A:
        return approveXSnx(value, this.provider)
      case X_U3LP_A:
      case X_U3LP_B:
      case X_U3LP_C:
      case X_U3LP_D:
        return approveXU3LP(symbol, value, inputAsset || 0, this.provider)
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
   *
   * // Sell 1000 xU3LPa for USDC
   * const tx = await xToken.burn('xU3LPa', true, '1000') // true = outputAsset `1`
   * await tx.wait() // Wait for transaction confirmation
   * ```
   *
   * @param {ITokenSymbols | ILPTokenSymbols} symbol Symbol of the xToken to be sold
   * @param {boolean} sellForEth Sell for ETH/Token or Token0/Token1 `outputAsset` in boolean value
   * @param {string} amount Amount of xTokens to be sold,
   *                        cannot exceed max redeemable for xAAVEa/xAAVEb/xSNXa tokens
   * @returns A promise of the transaction response
   */
  public async burn(
    symbol: ITokenSymbols | ILPTokenSymbols,
    sellForEth: boolean,
    amount: string
  ): Promise<ContractTransaction> {
    if (+amount === 0 || isNaN(+amount)) {
      return Promise.reject(new Error('Invalid value for amount'))
    }
    const value = parseEther(amount)

    if (
      ![X_KNC_A, X_KNC_B, X_U3LP_A, X_U3LP_B, X_U3LP_C, X_U3LP_D].includes(
        symbol
      )
    ) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const maxRedeemable = parseEther(await this.getMaxRedeemable(symbol))

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
      case X_BNT_A:
        return burnXBnt(symbol, sellForEth, value, this.provider)
      case X_INCH_A:
      case X_INCH_B:
        return burnXInch(symbol, sellForEth, value, this.provider)
      case X_KNC_A:
      case X_KNC_B:
        return burnXKnc(symbol, sellForEth, value, this.provider)
      case X_SNX_A:
        return burnXSnx(value, this.provider)
      case X_U3LP_A:
      case X_U3LP_B:
      case X_U3LP_C:
      case X_U3LP_D:
        return burnXU3LP(symbol, sellForEth ? 1 : 0, value, this.provider)
    }
  }

  /**
   * @example
   * ```typescript
   * // Get best return and estimated quantities for the trading pair from available sources
   * const return = await xToken.getBestReturn('xAAVEa', true, '100')
   * ```
   *
   * @param {ITokenSymbols} symbol Symbol of the xToken to burn
   * @param {boolean} tradeWithEth True, if selling the xToken for ETH
   * @param {string} amount Quantity of the xToken to be traded
   * @param {ITradeType} tradeType Buy/sell type of the trade
   * @returns Estimated quantities from available sources for trading the given xToken
   */
  public async getBestReturn(
    symbol: ITokenSymbols | ILPTokenSymbols,
    tradeWithEth: boolean,
    amount: string,
    tradeType: ITradeType
  ): Promise<IReturns> {
    if (+amount === 0 || isNaN(+amount)) {
      return Promise.reject(new Error('Invalid value for amount'))
    }

    let dexExpectedQty = '0'
    let dexSource = Exchange.KYBER
    let xTokenExpectedQty: string

    if (tradeType === BUY) {
      xTokenExpectedQty = await this.getExpectedQuantityOnMint(
        symbol,
        tradeWithEth,
        amount
      )
    } else {
      xTokenExpectedQty = await this.getExpectedQuantityOnBurn(
        symbol,
        tradeWithEth,
        amount
      )
    }

    const xTokenReturn = {
      expectedQuantity: parseEther(xTokenExpectedQty).toString(),
      source: Exchange.XTOKEN,
    }

    // TODO: Fetch estimates for xSNXa and xBNTa pools
    if ([X_AAVE_A, X_AAVE_B].includes(symbol)) {
      dexSource = Exchange.BALANCER
      dexExpectedQty = await getBalancerEstimatedQuantity(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        tradeWithEth ? ETH : symbol,
        symbol,
        amount,
        tradeType,
        this.provider
      )
    } else if ([X_INCH_A, X_INCH_B].includes(symbol)) {
      dexSource = Exchange.INCH
      dexExpectedQty = await getInchEstimatedQuantity(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        tradeWithEth ? ETH : symbol,
        symbol,
        amount,
        tradeType,
        this.provider
      )
    } else if (symbol === X_KNC_A) {
      dexSource = Exchange.KYBER
      dexExpectedQty = await getKyberEstimatedQuantity(
        tradeWithEth ? ETH : symbol,
        symbol,
        amount,
        tradeType,
        this.provider
      )
    } /* else if (symbol === X_BNT_A) {
      dexSource = Exchange.BANCOR
      dexExpectedQty = await getBancorEstimatedQuantity(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        tradeWithEth ? ETH : symbol,
        symbol,
        amount,
        tradeType,
        this.provider
      )
    }*/

    const dexReturn = {
      expectedQuantity: parseEther(dexExpectedQty).toString(),
      source: dexSource,
    }

    let bestReturn = xTokenReturn
    if (Number(xTokenExpectedQty) < Number(dexExpectedQty)) {
      bestReturn = dexReturn
    }

    return {
      best: bestReturn,
      estimates: [xTokenReturn, dexReturn],
    }
  }

  /**
   * @deprecated Will be removed in favor of [[getBestReturn]]
   * @example
   * ```typescript
   * // Get expected quantity of xAAVEa when minting for 1 ETH
   * const expectedQty = await xToken.getExpectedQuantityOnBalancer('eth', 'xAAVEa', '1', 'buy')
   * ```
   *
   * @param {'eth' | 'xAAVEa' | 'xAAVEb' | 'xSNXa'} tokenIn 'eth' in case buying/selling for Ethereum, if not symbol of the xToken to burn/mint
   * @param {'xAAVEa' | 'xAAVEb' | 'xSNXa'} symbol Symbol of the xToken to burn/mint
   * @param {string} amount Quantity of the xToken to be traded
   * @param {ITradeType} tradeType Buy/sell type of the trade
   * @returns Expected quantity for the particular trade to be made on Balancer
   */
  public async getExpectedQuantityOnBalancer(
    tokenIn: typeof ETH | typeof X_AAVE_A | typeof X_AAVE_B | typeof X_SNX_A,
    symbol: typeof X_AAVE_A | typeof X_AAVE_B | typeof X_SNX_A,
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
   *
   * // Get expected quantity of USDC when selling 100 xU3LPa
   * const expectedQty = await xToken.burn('xU3LPa', true, '100') // true = outputAsset `1`
   * ```
   *
   * @param {ITokenSymbols | ILPTokenSymbols} symbol Symbol of the xToken to burn
   * @param {boolean} sellForEth True, if selling the xToken for ETH or Token0/Token1 `outputAsset` in boolean value
   * @param {string} amount Quantity of the xToken to be traded
   * @returns Expected quantity for selling the given xToken
   */
  public async getExpectedQuantityOnBurn(
    symbol: ITokenSymbols | ILPTokenSymbols,
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
      case X_BNT_A:
        return getExpectedQuantityOnBurnXBnt(
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
      case X_U3LP_A:
      case X_U3LP_B:
      case X_U3LP_C:
      case X_U3LP_D:
        return getExpectedQuantityOnBurnXU3LP(
          symbol,
          sellForEth ? 1 : 0,
          amount,
          this.provider
        )
    }
  }

  /**
   * @example
   * ```typescript
   * // Get expected quantity of xAAVEa for minting 1 ETH
   * const expectedQty = await xToken.getExpectedQuantityOnMint('xAAVEa', true, '1')
   *
   * // Get expected quantity of xU3LPa for minting 1 DAI
   * const expectedQty = await xToken.getExpectedQuantityOnMint('xU3LPa', false, '1') // false = inputAsset `0`
   * ```
   *
   * @param {ITokenSymbols | ILPTokenSymbols} symbol Symbol of the xToken to be minted
   * @param {boolean} tradeWithEth True, if buying the xToken with ETH or Token0/Token1 `inputAsset` in boolean value
   * @param {string} amount Quantity of the token to be traded
   * @returns Expected quantity of xToken upon minting
   */
  public async getExpectedQuantityOnMint(
    symbol: ITokenSymbols | ILPTokenSymbols,
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
      case X_BNT_A:
        return getExpectedQuantityOnMintXBnt(
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
      case X_U3LP_A:
      case X_U3LP_B:
      case X_U3LP_C:
      case X_U3LP_D:
        return getExpectedQuantityOnMintXU3LP(
          symbol,
          tradeWithEth ? 1 : 0,
          amount,
          this.provider
        )
    }
  }

  /**
   * @example
   * ```typescript
   * // Get available liquidity pools for xTokens
   * const liquidityPools = await xToken.getLiquidityPoolItems()
   * ```
   *
   * @returns Returns available liquidity pools for xTokens along with their balances
   */
  public async getLiquidityPoolItems(): Promise<readonly ILiquidityPoolItem[]> {
    const address = await getSignerAddress(this.provider)

    if (!address || !isAddress(address)) {
      return Promise.reject(new Error('Invalid user address'))
    }

    return Promise.all([
      getBalancerPortfolioItem(X_SNX_A, address, this.provider),
      getBalancerPortfolioItem(X_AAVE_A, address, this.provider),
      getBalancerPortfolioItem(X_AAVE_B, address, this.provider),
      getKyberPortfolioItem(X_KNC_A, address, this.provider),
      getBancorPortfolioItem(X_BNT_A, address, this.provider),
    ])
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
      | typeof X_BNT_A
      | typeof X_INCH_A
      | typeof X_INCH_B
      | typeof X_SNX_A
  ): Promise<string> {
    switch (symbol) {
      case X_AAVE_A:
      case X_AAVE_B:
        return getMaximumRedeemableXAave(symbol, this.provider)
      case X_BNT_A:
        return getMaximumRedeemableXBnt(symbol, this.provider)
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
    const address = await getSignerAddress(this.provider)

    if (!address || !isAddress(address)) {
      return Promise.reject(new Error('Invalid user address'))
    }

    return Promise.all([
      getPortfolioItemXKnc(X_KNC_A, address, this.provider),
      getPortfolioItemXKnc(X_KNC_B, address, this.provider),
      getPortfolioItemXSnx(X_SNX_A, address, this.provider),
      getPortfolioItemXAave(X_AAVE_A, address, this.provider),
      getPortfolioItemXAave(X_AAVE_B, address, this.provider),
      getPortfolioItemXInch(X_INCH_A, address, this.provider),
      getPortfolioItemXInch(X_INCH_B, address, this.provider),
      getPortfolioItemXBnt(X_BNT_A, address, this.provider),
    ])
  }

  /**
   * @example
   * ```typescript
   * // Get available xTokens list
   * const xTokensList = await xToken.getXAssets()
   * ```
   *
   * @returns Returns list of all the xTokens along with their asset details:
   * AUM, Mandate & USD price
   */
  public async getXAssets(): Promise<readonly IAsset[]> {
    return Promise.all([
      getXKncAsset(X_KNC_A, this.provider),
      getXKncAsset(X_KNC_B, this.provider),
      getXSnxAsset(X_SNX_A, this.provider),
      getXAaveAsset(X_AAVE_A, this.provider),
      getXAaveAsset(X_AAVE_B, this.provider),
      getXInchAsset(X_INCH_A, this.provider),
      getXInchAsset(X_INCH_B, this.provider),
      getXBntAsset(X_BNT_A, this.provider),
    ])
  }

  /**
   * @example
   * ```typescript
   * // Get available xU3LP tokens list
   * const xU3LPTokensList = await xToken.getXLPAssets()
   * ```
   *
   * @returns Returns list of all the xU3LP tokens along with their asset details, AUM & USD price
   */
  public async getXLPAssets(): Promise<readonly ILPAsset[]> {
    return Promise.all([
      getXU3LPAsset(X_U3LP_A, this.provider),
      getXU3LPAsset(X_U3LP_B, this.provider),
      getXU3LPAsset(X_U3LP_C, this.provider),
      getXU3LPAsset(X_U3LP_D, this.provider),
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
   *
   * // Buy xU3LPa for 1 DAI
   * const tx = await xToken.mint('xU3LPa', false, '1') // false = inputAsset `0`
   * await tx.wait() // Wait for transaction confirmation
   * ```
   *
   * @param {ITokenSymbols} symbol Symbol of the xToken to be minted
   * @param {boolean} tradeWithEth Mint with ETH/Token or Token0/Token1 `inputAsset` in boolean value
   * @param {string} amount Quantity of token to be minted,
   *                        tokens need to be approved before minting using [[approve]] method
   * @param {string} affiliate Affiliate address to whom the affiliate fees should be sent to
   * @returns A promise of the transaction response
   */
  public async mint(
    symbol: ITokenSymbols | ILPTokenSymbols,
    tradeWithEth: boolean,
    amount: string,
    affiliate = AddressZero
  ): Promise<ContractTransaction> {
    if (+amount === 0 || isNaN(+amount)) {
      return Promise.reject(new Error('Invalid value for amount'))
    }
    const value = parseEther(amount)

    switch (symbol) {
      case X_AAVE_A:
      case X_AAVE_B:
        return mintXAave(symbol, tradeWithEth, value, affiliate, this.provider)
      case X_BNT_A:
        return mintXBnt(symbol, tradeWithEth, value, this.provider)
      case X_INCH_A:
      case X_INCH_B:
        return mintXInch(symbol, tradeWithEth, value, this.provider)
      case X_KNC_A:
      case X_KNC_B:
        return mintXKnc(symbol, tradeWithEth, value, this.provider)
      case X_SNX_A:
        return mintXSnx(tradeWithEth, value, this.provider)
      case X_U3LP_A:
      case X_U3LP_B:
      case X_U3LP_C:
      case X_U3LP_D:
        return mintXU3LP(symbol, tradeWithEth ? 1 : 0, value, this.provider)
    }
  }
}
