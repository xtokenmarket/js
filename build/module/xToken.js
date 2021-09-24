import { AddressZero } from '@ethersproject/constants'
import {
  AAVE_X_AAVE_A_CLR,
  BNT_X_BNT_A_CLR,
  BUY,
  ETH,
  INCH_X_INCH_A_CLR,
  INCH_X_INCH_B_CLR,
  X_AAVE_A,
  X_AAVE_B,
  X_AAVE_B_AAVE_CLR,
  X_BNT_A,
  X_INCH_A,
  X_INCH_B,
  X_KNC_A,
  X_KNC_A_KNC_CLR,
  X_KNC_B,
  X_KNC_B_KNC_CLR,
  X_SNX_A,
  X_SNX_A_SNX_CLR,
  X_U3LP_A,
  X_U3LP_B,
  X_U3LP_C,
  X_U3LP_D,
  X_U3LP_E,
  X_U3LP_F,
  X_U3LP_G,
  X_U3LP_H,
  XTK_ETH_CLR,
} from '@xtoken/abis'
import { isAddress, parseEther } from 'ethers/lib/utils'
import {
  approveXAssetCLR,
  burnXAssetCLR,
  getExpectedQuantityOnBurnXAssetCLR,
  getExpectedQuantityOnMintXAssetCLR,
  getMaximumRedeemableXAssetCLR,
  getPoolRatioXAssetCLR,
  mintXAssetCLR,
} from './blockchain/clr'
import {
  getBalancerEstimatedQuantity,
  getBalancerPortfolioItem,
} from './blockchain/exchanges/balancer'
import {
  getBalancerV2EstimatedQuantity,
  getBalancerV2PortfolioItem,
} from './blockchain/exchanges/balancerV2'
import { getBancorPortfolioItem } from './blockchain/exchanges/bancor'
import { getInchEstimatedQuantity } from './blockchain/exchanges/inch'
import {
  getKyberEstimatedQuantity,
  getKyberPortfolioItem,
} from './blockchain/exchanges/kyber'
import {
  approveXtk,
  getXtkHistory,
  stakeXtk,
  unstakeXXtkA,
} from './blockchain/staking'
import { getSignerAddress, getXAssetPrices } from './blockchain/utils'
import {
  approveXAave,
  burnXAave,
  getExpectedQuantityOnBurnXAave,
  getExpectedQuantityOnMintXAave,
  getMaximumRedeemableXAave,
  getPortfolioItemXAave,
  getXAaveAsset,
  mintXAave,
} from './blockchain/xaave'
import {
  approveXBnt,
  burnXBnt,
  getExpectedQuantityOnBurnXBnt,
  getExpectedQuantityOnMintXBnt,
  getMaximumRedeemableXBnt,
  getPortfolioItemXBnt,
  getXBntAsset,
  mintXBnt,
} from './blockchain/xbnt'
import {
  approveXInch,
  burnXInch,
  getExpectedQuantityOnBurnXInch,
  getExpectedQuantityOnMintXInch,
  getMaximumRedeemableXInch,
  getPortfolioItemXInch,
  getXInchAsset,
  mintXInch,
} from './blockchain/xinch'
import {
  approveXKnc,
  burnXKnc,
  getExpectedQuantityOnBurnXKnc,
  getExpectedQuantityOnMintXKnc,
  getPortfolioItemXKnc,
  getXKncAsset,
  mintXKnc,
} from './blockchain/xknc'
import {
  approveXSnx,
  burnXSnx,
  getExpectedQuantityOnBurnXSnx,
  getExpectedQuantityOnMintXSnx,
  getMaximumRedeemableXSnx,
  getPortfolioItemXSnx,
  getXSnxAsset,
  mintXSnx,
} from './blockchain/xsnx'
import {
  approveXU3LP,
  burnXU3LP,
  getExpectedQuantityOnBurnXU3LP,
  getExpectedQuantityOnMintXU3LP,
  getMaximumRedeemableXU3LP,
  getPortfolioItemXU3LP,
  getXU3LPAsset,
  mintXU3LP,
} from './blockchain/xu3lp'
import { Exchange, MAX_UINT } from './constants'
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
  /**
   * @param {BaseProvider} provider Ethers.js provider
   */
  constructor(provider) {
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
   * @param {ITokenSymbols | ILPTokenSymbols | IXAssetCLR} symbol Symbol of the token to be approved
   * @param {string} amount Amount of the token to be approved, MAX_UINT will be used by default
   * @param {IAssetId} inputAsset Token0/Token1
   * @returns A promise of the transaction response
   */
  async approve(symbol, amount, inputAsset) {
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
      case X_U3LP_E:
      case X_U3LP_F:
      case X_U3LP_G:
      case X_U3LP_H:
        return approveXU3LP(symbol, value, inputAsset || 0, this.provider)
      case AAVE_X_AAVE_A_CLR:
      case BNT_X_BNT_A_CLR:
      case INCH_X_INCH_A_CLR:
      case INCH_X_INCH_B_CLR:
      case X_AAVE_B_AAVE_CLR:
      case X_KNC_A_KNC_CLR:
      case X_KNC_B_KNC_CLR:
      case X_SNX_A_SNX_CLR:
      case XTK_ETH_CLR:
        return approveXAssetCLR(symbol, value, inputAsset || 0, this.provider)
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
  async burn(symbol, sellForEth, amount) {
    if (+amount === 0 || isNaN(+amount)) {
      return Promise.reject(new Error('Invalid value for amount'))
    }
    const value = parseEther(amount)
    if (symbol !== X_KNC_A && symbol !== X_KNC_B) {
      const maxRedeemable = parseEther(
        await this.getMaxRedeemable(symbol, sellForEth ? 1 : 0)
      )
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
      case X_U3LP_E:
      case X_U3LP_F:
      case X_U3LP_G:
      case X_U3LP_H:
        return burnXU3LP(symbol, sellForEth ? 1 : 0, value, this.provider)
    }
  }
  /**
   * Sell specified amount of xAssetCLR tokens
   *
   * @example
   * ```typescript
   * import { AAVE_X_AAVE_A_CLR } from '@xtoken/abis'
   *
   * // Sell 100 AAVE_X_AAVE_A_CLR
   * const tx = await xToken.burnXAssetCLR(AAVE_X_AAVE_A_CLR, '100')
   * await tx.wait() // Wait for transaction confirmation
   * ```
   *
   * @param {IXAssetCLR} symbol Symbol of the xAssetCLR to be sold
   * @param {string} amount Amount of xAssetCLR tokens to be sold,
   *                        cannot exceed max redeemable tokens
   * @returns A promise of the transaction response
   */
  async burnXAssetCLR(symbol, amount) {
    if (+amount === 0 || isNaN(+amount)) {
      return Promise.reject(new Error('Invalid value for amount'))
    }
    const value = parseEther(amount)
    const maxRedeemable = parseEther(await this.getMaxRedeemable(symbol))
    if (value.gt(maxRedeemable)) {
      return Promise.reject(
        new Error('Specified amount exceeds maximum redeemable tokens')
      )
    }
    return burnXAssetCLR(symbol, value, this.provider)
  }
  /**
   * @example
   * ```typescript
   * // Get best return and estimated quantities for the trading pair from available sources
   * const return = await xToken.getBestReturn('xAAVEa', true, '100')
   * ```
   *
   * @param {ITokenSymbols | ILPTokenSymbols} symbol Symbol of the xToken to burn
   * @param {boolean} tradeWithEth True, if selling the xToken for ETH
   * @param {string} amount Quantity of the xToken to be traded
   * @param {ITradeType} tradeType Buy/sell type of the trade
   * @returns Estimated quantities from available sources for trading the given xToken
   */
  async getBestReturn(symbol, tradeWithEth, amount, tradeType) {
    if (+amount === 0 || isNaN(+amount)) {
      return Promise.reject(new Error('Invalid value for amount'))
    }
    let dexExpectedQty = '0'
    let dexSource = Exchange.KYBER
    let xTokenExpectedQty
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
    // TODO: Add support for xAssetCLR return estimates
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
    } else if (symbol === X_SNX_A) {
      dexSource = Exchange.BALANCER
      dexExpectedQty = await getBalancerV2EstimatedQuantity(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        tradeWithEth ? ETH : symbol,
        symbol,
        amount,
        tradeType,
        this.provider
      )
    }
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
   * @returns Expected quantity for selling the given xToken / underlying assets in case of xAssetCLR
   */
  async getExpectedQuantityOnBurn(symbol, sellForEth, amount) {
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
      case X_U3LP_E:
      case X_U3LP_F:
      case X_U3LP_G:
      case X_U3LP_H:
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
  async getExpectedQuantityOnMint(symbol, tradeWithEth, amount) {
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
      case X_U3LP_E:
      case X_U3LP_F:
      case X_U3LP_G:
      case X_U3LP_H:
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
  async getLiquidityPoolItems() {
    const address = await getSignerAddress(this.provider)
    if (!address || !isAddress(address)) {
      return Promise.reject(new Error('Invalid user address'))
    }
    return Promise.all([
      getBalancerV2PortfolioItem(X_SNX_A, address, this.provider),
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
   * @param {'xAAVEa' | 'xAAVEb' | 'xINCHa' | 'xINCHb' | 'xSNXa' | ILPTokenSymbols | IXAssetCLR} symbol Symbol of the xToken
   * @param {IAssetId} outputAsset Sell for Token0/Token1
   * @returns Maximum redeemable tokens for the given xToken
   */
  async getMaxRedeemable(symbol, outputAsset) {
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
      case X_U3LP_A:
      case X_U3LP_B:
      case X_U3LP_C:
      case X_U3LP_D:
      case X_U3LP_E:
      case X_U3LP_F:
      case X_U3LP_G:
      case X_U3LP_H:
        return getMaximumRedeemableXU3LP(
          symbol,
          outputAsset || 0,
          this.provider
        )
      case AAVE_X_AAVE_A_CLR:
      case BNT_X_BNT_A_CLR:
      case INCH_X_INCH_A_CLR:
      case INCH_X_INCH_B_CLR:
      case X_AAVE_B_AAVE_CLR:
      case X_KNC_A_KNC_CLR:
      case X_KNC_B_KNC_CLR:
      case X_SNX_A_SNX_CLR:
      case XTK_ETH_CLR:
        return getMaximumRedeemableXAssetCLR(symbol, this.provider)
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
  async getPortfolioItems() {
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
      getPortfolioItemXU3LP(X_U3LP_A, address, this.provider),
      getPortfolioItemXU3LP(X_U3LP_B, address, this.provider),
      getPortfolioItemXU3LP(X_U3LP_C, address, this.provider),
      getPortfolioItemXU3LP(X_U3LP_D, address, this.provider),
      getPortfolioItemXU3LP(X_U3LP_E, address, this.provider),
      getPortfolioItemXU3LP(X_U3LP_F, address, this.provider),
      getPortfolioItemXU3LP(X_U3LP_G, address, this.provider),
      getPortfolioItemXU3LP(X_U3LP_H, address, this.provider),
    ])
  }
  /**
   * @example
   * ```typescript
   * import { AAVE_X_AAVE_A_CLR } from '@xtoken/abis'
   *
   * // Get estimated quantity of minting AAVE_X_AAVE_A_CLR for 100 xAAVEa
   * const return = await xToken.getTradeEstimateXAssetCLR(AAVE_X_AAVE_A_CLR, 1, '100')
   * ```
   *
   * @param {IXAssetCLR} symbol Symbol of the xToken to burn
   * @param {IAssetId} tradeAsset True, if selling the xToken for ETH
   * @param {string} amount Quantity of the xToken to be traded
   * @param {ITradeType} tradeType Buy/sell type of the trade
   * @returns Estimated quantity for trading the given xAssetCLR
   */
  async getTradeEstimateXAssetCLR(symbol, tradeAsset, amount, tradeType) {
    if (+amount === 0 || isNaN(+amount)) {
      return Promise.reject(new Error('Invalid value for amount'))
    }
    let expectedQty
    if (tradeType === BUY) {
      expectedQty = await getExpectedQuantityOnMintXAssetCLR(
        symbol,
        tradeAsset,
        amount,
        this.provider
      )
    } else {
      expectedQty = await getExpectedQuantityOnBurnXAssetCLR(
        symbol,
        amount,
        this.provider
      )
    }
    return expectedQty
  }
  /**
   * @example
   * ```typescript
   * import { X_AAVE_A } from '@xtoken/abis'
   *
   * // Get xAAVEa asset price
   * const xTokensList = await xToken.getXAssetPrices(X_AAVE_A)
   * ```
   *
   * @param {ITokenSymbols} symbol Symbol of the xToken to fetch prices of
   * @returns A promise of the xAsset prices in ETH/USD along with AUM
   */
  async getXAssetPrices(symbol) {
    return getXAssetPrices(symbol, this.provider)
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
  async getXAssets() {
    return Promise.all([
      getXBntAsset(X_BNT_A, this.provider),
      getXInchAsset(X_INCH_A, this.provider),
      getXInchAsset(X_INCH_B, this.provider),
      getXAaveAsset(X_AAVE_A, this.provider),
      getXAaveAsset(X_AAVE_B, this.provider),
      getXSnxAsset(X_SNX_A, this.provider),
      getXKncAsset(X_KNC_A, this.provider),
      getXKncAsset(X_KNC_B, this.provider),
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
  async getXLPAssets() {
    return Promise.all([
      getXU3LPAsset(X_U3LP_H, this.provider),
      getXU3LPAsset(X_U3LP_G, this.provider),
      getXU3LPAsset(X_U3LP_F, this.provider),
      getXU3LPAsset(X_U3LP_E, this.provider),
      getXU3LPAsset(X_U3LP_D, this.provider),
      getXU3LPAsset(X_U3LP_C, this.provider),
      getXU3LPAsset(X_U3LP_B, this.provider),
      getXU3LPAsset(X_U3LP_A, this.provider),
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
  async mint(symbol, tradeWithEth, amount, affiliate = AddressZero) {
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
      case X_U3LP_E:
      case X_U3LP_F:
      case X_U3LP_G:
      case X_U3LP_H:
        return mintXU3LP(symbol, tradeWithEth ? 1 : 0, value, this.provider)
    }
  }
  /**
   * Mint xAssetCLR token for specified amount of Token0/Token1
   *
   * @example
   * ```typescript
   * import { AAVE_X_AAVE_A_CLR } from '@xtoken/abis'
   *
   * // Buy AAVE_X_AAVE_A_CLR for 1 AAVE
   * const tx = await xToken.mintXAssetCLR(AAVE_X_AAVE_A_CLR, 0, '1')
   * await tx.wait() // Wait for transaction confirmation
   * ```
   *
   * @param {IXAssetCLR} symbol Symbol of the xAssetCLR to be minted
   * @param {IAssetId} inputAsset Mint with Token0/Token1 `inputAsset`
   * @param {string} amount Quantity of xAssetCLR token to be minted,
   *                        tokens need to be approved before minting using [[approve]] method
   * @returns A promise of the transaction response
   */
  async mintXAssetCLR(symbol, inputAsset, amount) {
    if (+amount === 0 || isNaN(+amount)) {
      return Promise.reject(new Error('Invalid value for amount'))
    }
    const value = parseEther(amount)
    return mintXAssetCLR(symbol, inputAsset, value, this.provider)
  }
  /**
   * Approve specified amount of XTK by staking contract
   *
   * @example
   * ```typescript
   * const tx = await xToken.approveXtk('100') // Approve 100 XTK tokens for staking
   * await tx.wait() // Wait for transaction confirmation
   * ```
   *
   * @param {string} amount Amount of the token to be approved, MAX_UINT will be used by default
   * @returns A promise of the transaction response
   */
  // TODO: add spender address
  async approveXtk(amount) {
    const value = amount ? parseEther(amount) : MAX_UINT
    return approveXtk(value, this.provider)
  }
  /**
   * Stake XTK
   *
   * @example
   * ```typescript
   * // Stake 10 XTK
   * const tx = await xToken.stakeXtk('10')
   * await tx.wait() // Wait for transaction confirmation
   * ```
   *
   * @param {string} amount Quantity of token to be staked,
   *                        tokens need to be approved before staking using [[approve]] method
   * @returns A promise of the transaction response
   */
  async stakeXtk(amount) {
    if (+amount === 0 || isNaN(+amount)) {
      return Promise.reject(new Error('Invalid value for amount'))
    }
    return stakeXtk(amount, this.provider)
  }
  /**
   * Unstake xXTKa to get back XTK
   *
   * @example
   * ```typescript
   * // Unstake 10 xXTKa
   * const tx = await xToken.unstakeXXtkA('10')
   * await tx.wait() // Wait for transaction confirmation
   * ```
   *
   * @param {string} amount Quantity of token to be unstaked
   * @returns A promise of the transaction response
   */
  async unstakeXXtkA(amount) {
    if (+amount === 0 || isNaN(+amount)) {
      return Promise.reject(new Error('Invalid value for amount'))
    }
    return unstakeXXtkA(amount, this.provider)
  }
  /**
   * Get Stake/Unstake history of XTK
   *
   * @example
   * ```typescript
   * // Stake history of XTK
   * const history = await xToken.getXtkHistory('Stake')
   * ```
   *
   * @param {IHistoryType} type Get Stake/Unstake history of XTK
   * @returns Returns list of all Stake/Unstake history of XTK
   */
  async getXtkHistory(type) {
    const address = await getSignerAddress(this.provider)
    if (!address || !isAddress(address)) {
      return Promise.reject(new Error('Invalid user address'))
    }
    return getXtkHistory(type, address, this.provider)
  }
  /**
   * Get xAssetCLR pool deposit ratio
   *
   * @example
   * ```typescript
   * // Pool deposit ratio for AAVE-xAAVEa CLR
   * const history = await xToken.getPoolRatio('AAVE-xAAVEa-CLR')
   * ```
   *
   * @param {IXAssetCLR} symbol Symbol of xAssetCLR
   * @returns Returns ratio of liquidity deposited in the pool
   */
  async getPoolRatio(symbol) {
    return getPoolRatioXAssetCLR(symbol, this.provider)
  }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieFRva2VuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3hUb2tlbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMEJBQTBCLENBQUE7QUFHdEQsT0FBTyxFQUNMLGlCQUFpQixFQUNqQixlQUFlLEVBQ2YsR0FBRyxFQUNILEdBQUcsRUFDSCxpQkFBaUIsRUFDakIsaUJBQWlCLEVBQ2pCLFFBQVEsRUFDUixRQUFRLEVBQ1IsaUJBQWlCLEVBQ2pCLE9BQU8sRUFDUCxRQUFRLEVBQ1IsUUFBUSxFQUNSLE9BQU8sRUFDUCxlQUFlLEVBQ2YsT0FBTyxFQUNQLGVBQWUsRUFDZixPQUFPLEVBQ1AsZUFBZSxFQUNmLFFBQVEsRUFDUixRQUFRLEVBQ1IsUUFBUSxFQUNSLFFBQVEsRUFDUixRQUFRLEVBQ1IsUUFBUSxFQUNSLFFBQVEsRUFDUixRQUFRLEVBQ1IsV0FBVyxHQUNaLE1BQU0sY0FBYyxDQUFBO0FBQ3JCLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sa0JBQWtCLENBQUE7QUFFeEQsT0FBTyxFQUNMLGdCQUFnQixFQUNoQixhQUFhLEVBQ2Isa0NBQWtDLEVBQ2xDLGtDQUFrQyxFQUNsQyw2QkFBNkIsRUFDN0IscUJBQXFCLEVBQ3JCLGFBQWEsR0FDZCxNQUFNLGtCQUFrQixDQUFBO0FBQ3pCLE9BQU8sRUFDTCw0QkFBNEIsRUFDNUIsd0JBQXdCLEdBQ3pCLE1BQU0saUNBQWlDLENBQUE7QUFDeEMsT0FBTyxFQUNMLDhCQUE4QixFQUM5QiwwQkFBMEIsR0FDM0IsTUFBTSxtQ0FBbUMsQ0FBQTtBQUMxQyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQTtBQUN0RSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQTtBQUN0RSxPQUFPLEVBQ0wseUJBQXlCLEVBQ3pCLHFCQUFxQixHQUN0QixNQUFNLDhCQUE4QixDQUFBO0FB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
