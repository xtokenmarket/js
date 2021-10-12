'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.XToken = void 0
const constants_1 = require('@ethersproject/constants')
const abis_1 = require('@xtoken/abis')
const utils_1 = require('ethers/lib/utils')
const clr_1 = require('./blockchain/clr')
const balancer_1 = require('./blockchain/exchanges/balancer')
const balancerV2_1 = require('./blockchain/exchanges/balancerV2')
const bancor_1 = require('./blockchain/exchanges/bancor')
const inch_1 = require('./blockchain/exchanges/inch')
const kyber_1 = require('./blockchain/exchanges/kyber')
const uniswapV3_1 = require('./blockchain/exchanges/uniswapV3')
const staking_1 = require('./blockchain/staking')
const utils_2 = require('./blockchain/utils')
const xaave_1 = require('./blockchain/xaave')
const xalpha_1 = require('./blockchain/xalpha')
const xbnt_1 = require('./blockchain/xbnt')
const xinch_1 = require('./blockchain/xinch')
const xknc_1 = require('./blockchain/xknc')
const xsnx_1 = require('./blockchain/xsnx')
const xu3lp_1 = require('./blockchain/xu3lp')
const constants_2 = require('./constants')
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
class XToken {
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
    const value = amount ? utils_1.parseEther(amount) : constants_2.MAX_UINT
    switch (symbol) {
      case abis_1.X_AAVE_A:
      case abis_1.X_AAVE_B:
        return xaave_1.approveXAave(symbol, value, this.provider)
      case abis_1.X_ALPHA_A:
        return xalpha_1.approveXAlpha(symbol, value, this.provider)
      case abis_1.X_BNT_A:
        return xbnt_1.approveXBnt(symbol, value, this.provider)
      case abis_1.X_INCH_A:
      case abis_1.X_INCH_B:
        return xinch_1.approveXInch(symbol, value, this.provider)
      case abis_1.X_KNC_A:
      case abis_1.X_KNC_B:
        return xknc_1.approveXKnc(symbol, value, this.provider)
      case abis_1.X_SNX_A:
        return xsnx_1.approveXSnx(value, this.provider)
      case abis_1.X_U3LP_A:
      case abis_1.X_U3LP_B:
      case abis_1.X_U3LP_C:
      case abis_1.X_U3LP_D:
      case abis_1.X_U3LP_E:
      case abis_1.X_U3LP_F:
      case abis_1.X_U3LP_G:
      case abis_1.X_U3LP_H:
        return xu3lp_1.approveXU3LP(
          symbol,
          value,
          inputAsset || 0,
          this.provider
        )
      case abis_1.AAVE_X_AAVE_A_CLR:
      case abis_1.BNT_X_BNT_A_CLR:
      case abis_1.INCH_X_INCH_A_CLR:
      case abis_1.INCH_X_INCH_B_CLR:
      case abis_1.X_AAVE_B_AAVE_CLR:
      case abis_1.X_ALPHA_A_ALPHA_CLR:
      case abis_1.X_KNC_A_KNC_CLR:
      case abis_1.X_KNC_B_KNC_CLR:
      case abis_1.X_SNX_A_SNX_CLR:
      case abis_1.XTK_ETH_CLR:
        return clr_1.approveXAssetCLR(
          symbol,
          value,
          inputAsset || 0,
          this.provider
        )
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
    const value = utils_1.parseEther(amount)
    if (symbol !== abis_1.X_KNC_A && symbol !== abis_1.X_KNC_B) {
      const maxRedeemable = utils_1.parseEther(
        await this.getMaxRedeemable(symbol, sellForEth ? 1 : 0)
      )
      if (value.gt(maxRedeemable)) {
        return Promise.reject(
          new Error('Specified amount exceeds maximum redeemable tokens')
        )
      }
    }
    switch (symbol) {
      case abis_1.X_AAVE_A:
      case abis_1.X_AAVE_B:
        return xaave_1.burnXAave(symbol, sellForEth, value, this.provider)
      case abis_1.X_ALPHA_A:
        return xalpha_1.burnXAlpha(symbol, sellForEth, value, this.provider)
      case abis_1.X_BNT_A:
        return xbnt_1.burnXBnt(symbol, sellForEth, value, this.provider)
      case abis_1.X_INCH_A:
      case abis_1.X_INCH_B:
        return xinch_1.burnXInch(symbol, sellForEth, value, this.provider)
      case abis_1.X_KNC_A:
      case abis_1.X_KNC_B:
        return xknc_1.burnXKnc(symbol, sellForEth, value, this.provider)
      case abis_1.X_SNX_A:
        return xsnx_1.burnXSnx(value, this.provider)
      case abis_1.X_U3LP_A:
      case abis_1.X_U3LP_B:
      case abis_1.X_U3LP_C:
      case abis_1.X_U3LP_D:
      case abis_1.X_U3LP_E:
      case abis_1.X_U3LP_F:
      case abis_1.X_U3LP_G:
      case abis_1.X_U3LP_H:
        return xu3lp_1.burnXU3LP(
          symbol,
          sellForEth ? 1 : 0,
          value,
          this.provider
        )
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
    const value = utils_1.parseEther(amount)
    const maxRedeemable = utils_1.parseEther(
      await this.getMaxRedeemable(symbol)
    )
    if (value.gt(maxRedeemable)) {
      return Promise.reject(
        new Error('Specified amount exceeds maximum redeemable tokens')
      )
    }
    return clr_1.burnXAssetCLR(symbol, value, this.provider)
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
    let dexSource = constants_2.Exchange.KYBER
    let xTokenExpectedQty
    if (tradeType === abis_1.BUY) {
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
      expectedQuantity: xTokenExpectedQty,
      source: constants_2.Exchange.XTOKEN,
    }
    if (
      (symbol === abis_1.X_AAVE_A || symbol === abis_1.X_ALPHA_A) &&
      !tradeWithEth
    ) {
      dexSource = constants_2.Exchange.UNISWAP_V3
      dexExpectedQty = await uniswapV3_1.getUniswapV3EstimatedQty(
        symbol,
        symbol,
        amount,
        tradeType,
        undefined,
        this.provider
      )
    } else if (symbol === abis_1.X_AAVE_B) {
      dexSource = constants_2.Exchange.BALANCER
      dexExpectedQty = await balancer_1.getBalancerEstimatedQuantity(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        tradeWithEth ? abis_1.ETH : symbol,
        symbol,
        amount,
        tradeType,
        this.provider
      )
    } else if ([abis_1.X_INCH_A, abis_1.X_INCH_B].includes(symbol)) {
      dexSource = constants_2.Exchange.INCH
      dexExpectedQty = await inch_1.getInchEstimatedQuantity(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        tradeWithEth ? abis_1.ETH : symbol,
        symbol,
        amount,
        tradeType,
        this.provider
      )
    } else if (symbol === abis_1.X_KNC_A) {
      dexSource = constants_2.Exchange.KYBER
      dexExpectedQty = await kyber_1.getKyberEstimatedQuantity(
        tradeWithEth ? abis_1.ETH : symbol,
        symbol,
        amount,
        tradeType,
        this.provider
      )
    } else if (symbol === abis_1.X_SNX_A) {
      dexSource = constants_2.Exchange.BALANCER
      dexExpectedQty = await balancerV2_1.getBalancerV2EstimatedQuantity(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        tradeWithEth ? abis_1.ETH : symbol,
        symbol,
        amount,
        tradeType,
        this.provider
      )
    }
    const dexReturn = {
      expectedQuantity: dexExpectedQty,
      source: dexSource,
    }
    let bestReturn = xTokenReturn
    if (
      utils_1
        .parseEther(xTokenExpectedQty)
        .lt(utils_1.parseEther(dexExpectedQty))
    ) {
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
      case abis_1.X_AAVE_A:
      case abis_1.X_AAVE_B:
        return xaave_1.getExpectedQuantityOnBurnXAave(
          symbol,
          sellForEth,
          amount,
          this.provider
        )
      case abis_1.X_ALPHA_A:
        return xalpha_1.getExpectedQuantityOnBurnXAlpha(
          symbol,
          sellForEth,
          amount,
          this.provider
        )
      case abis_1.X_BNT_A:
        return xbnt_1.getExpectedQuantityOnBurnXBnt(
          symbol,
          sellForEth,
          amount,
          this.provider
        )
      case abis_1.X_INCH_A:
      case abis_1.X_INCH_B:
        return xinch_1.getExpectedQuantityOnBurnXInch(
          symbol,
          sellForEth,
          amount,
          this.provider
        )
      case abis_1.X_KNC_A:
      case abis_1.X_KNC_B:
        return xknc_1.getExpectedQuantityOnBurnXKnc(
          symbol,
          sellForEth,
          amount,
          this.provider
        )
      case abis_1.X_SNX_A:
        return xsnx_1.getExpectedQuantityOnBurnXSnx(amount, this.provider)
      case abis_1.X_U3LP_A:
      case abis_1.X_U3LP_B:
      case abis_1.X_U3LP_C:
      case abis_1.X_U3LP_D:
      case abis_1.X_U3LP_E:
      case abis_1.X_U3LP_F:
      case abis_1.X_U3LP_G:
      case abis_1.X_U3LP_H:
        return xu3lp_1.getExpectedQuantityOnBurnXU3LP(
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
      case abis_1.X_AAVE_A:
      case abis_1.X_AAVE_B:
        return xaave_1.getExpectedQuantityOnMintXAave(
          symbol,
          tradeWithEth,
          amount,
          this.provider
        )
      case abis_1.X_ALPHA_A:
        return xalpha_1.getExpectedQuantityOnMintXAlpha(
          symbol,
          tradeWithEth,
          amount,
          this.provider
        )
      case abis_1.X_BNT_A:
        return xbnt_1.getExpectedQuantityOnMintXBnt(
          symbol,
          tradeWithEth,
          amount,
          this.provider
        )
      case abis_1.X_INCH_A:
      case abis_1.X_INCH_B:
        return xinch_1.getExpectedQuantityOnMintXInch(
          symbol,
          tradeWithEth,
          amount,
          this.provider
        )
      case abis_1.X_KNC_A:
      case abis_1.X_KNC_B:
        return xknc_1.getExpectedQuantityOnMintXKnc(
          symbol,
          tradeWithEth,
          amount,
          this.provider
        )
      case abis_1.X_SNX_A:
        return xsnx_1.getExpectedQuantityOnMintXSnx(
          tradeWithEth,
          amount,
          this.provider
        )
      case abis_1.X_U3LP_A:
      case abis_1.X_U3LP_B:
      case abis_1.X_U3LP_C:
      case abis_1.X_U3LP_D:
      case abis_1.X_U3LP_E:
      case abis_1.X_U3LP_F:
      case abis_1.X_U3LP_G:
      case abis_1.X_U3LP_H:
        return xu3lp_1.getExpectedQuantityOnMintXU3LP(
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
    const address = await utils_2.getSignerAddress(this.provider)
    if (!address || !utils_1.isAddress(address)) {
      return Promise.reject(new Error('Invalid user address'))
    }
    return Promise.all([
      balancerV2_1.getBalancerV2PortfolioItem(
        abis_1.X_SNX_A,
        address,
        this.provider
      ),
      balancer_1.getBalancerPortfolioItem(
        abis_1.X_AAVE_A,
        address,
        this.provider
      ),
      balancer_1.getBalancerPortfolioItem(
        abis_1.X_AAVE_B,
        address,
        this.provider
      ),
      kyber_1.getKyberPortfolioItem(abis_1.X_KNC_A, address, this.provider),
      bancor_1.getBancorPortfolioItem(abis_1.X_BNT_A, address, this.provider),
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
      case abis_1.X_AAVE_A:
      case abis_1.X_AAVE_B:
        return xaave_1.getMaximumRedeemableXAave(symbol, this.provider)
      case abis_1.X_ALPHA_A:
        return xalpha_1.getMaximumRedeemableXAlpha(symbol, this.provider)
      case abis_1.X_BNT_A:
        return xbnt_1.getMaximumRedeemableXBnt(symbol, this.provider)
      case abis_1.X_INCH_A:
      case abis_1.X_INCH_B:
        return xinch_1.getMaximumRedeemableXInch(symbol, this.provider)
      case abis_1.X_SNX_A:
        return xsnx_1.getMaximumRedeemableXSnx(this.provider)
      case abis_1.X_U3LP_A:
      case abis_1.X_U3LP_B:
      case abis_1.X_U3LP_C:
      case abis_1.X_U3LP_D:
      case abis_1.X_U3LP_E:
      case abis_1.X_U3LP_F:
      case abis_1.X_U3LP_G:
      case abis_1.X_U3LP_H:
        return xu3lp_1.getMaximumRedeemableXU3LP(
          symbol,
          outputAsset || 0,
          this.provider
        )
      case abis_1.AAVE_X_AAVE_A_CLR:
      case abis_1.BNT_X_BNT_A_CLR:
      case abis_1.INCH_X_INCH_A_CLR:
      case abis_1.INCH_X_INCH_B_CLR:
      case abis_1.X_AAVE_B_AAVE_CLR:
      case abis_1.X_ALPHA_A_ALPHA_CLR:
      case abis_1.X_KNC_A_KNC_CLR:
      case abis_1.X_KNC_B_KNC_CLR:
      case abis_1.X_SNX_A_SNX_CLR:
      case abis_1.XTK_ETH_CLR:
        return clr_1.getMaximumRedeemableXAssetCLR(symbol, this.provider)
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
    const address = await utils_2.getSignerAddress(this.provider)
    if (!address || !utils_1.isAddress(address)) {
      return Promise.reject(new Error('Invalid user address'))
    }
    return Promise.all([
      xknc_1.getPortfolioItemXKnc(abis_1.X_KNC_A, address, this.provider),
      xknc_1.getPortfolioItemXKnc(abis_1.X_KNC_B, address, this.provider),
      xsnx_1.getPortfolioItemXSnx(abis_1.X_SNX_A, address, this.provider),
      xaave_1.getPortfolioItemXAave(abis_1.X_AAVE_A, address, this.provider),
      xaave_1.getPortfolioItemXAave(abis_1.X_AAVE_B, address, this.provider),
      xinch_1.getPortfolioItemXInch(abis_1.X_INCH_A, address, this.provider),
      xinch_1.getPortfolioItemXInch(abis_1.X_INCH_B, address, this.provider),
      xbnt_1.getPortfolioItemXBnt(abis_1.X_BNT_A, address, this.provider),
      xalpha_1.getPortfolioItemXAlpha(abis_1.X_ALPHA_A, address, this.provider),
      xu3lp_1.getPortfolioItemXU3LP(abis_1.X_U3LP_A, address, this.provider),
      xu3lp_1.getPortfolioItemXU3LP(abis_1.X_U3LP_B, address, this.provider),
      xu3lp_1.getPortfolioItemXU3LP(abis_1.X_U3LP_C, address, this.provider),
      xu3lp_1.getPortfolioItemXU3LP(abis_1.X_U3LP_D, address, this.provider),
      xu3lp_1.getPortfolioItemXU3LP(abis_1.X_U3LP_E, address, this.provider),
      xu3lp_1.getPortfolioItemXU3LP(abis_1.X_U3LP_F, address, this.provider),
      xu3lp_1.getPortfolioItemXU3LP(abis_1.X_U3LP_G, address, this.provider),
      xu3lp_1.getPortfolioItemXU3LP(abis_1.X_U3LP_H, address, this.provider),
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
    if (tradeType === abis_1.BUY) {
      expectedQty = await clr_1.getExpectedQuantityOnMintXAssetCLR(
        symbol,
        tradeAsset,
        amount,
        this.provider
      )
    } else {
      expectedQty = await clr_1.getExpectedQuantityOnBurnXAssetCLR(
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
    return utils_2.getXAssetPrices(symbol, this.provider)
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
      xalpha_1.getXAlphaAsset(abis_1.X_ALPHA_A, this.provider),
      xbnt_1.getXBntAsset(abis_1.X_BNT_A, this.provider),
      xinch_1.getXInchAsset(abis_1.X_INCH_A, this.provider),
      xinch_1.getXInchAsset(abis_1.X_INCH_B, this.provider),
      xaave_1.getXAaveAsset(abis_1.X_AAVE_A, this.provider),
      xaave_1.getXAaveAsset(abis_1.X_AAVE_B, this.provider),
      xsnx_1.getXSnxAsset(abis_1.X_SNX_A, this.provider),
      xknc_1.getXKncAsset(abis_1.X_KNC_A, this.provider),
      xknc_1.getXKncAsset(abis_1.X_KNC_B, this.provider),
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
      xu3lp_1.getXU3LPAsset(abis_1.X_U3LP_H, this.provider),
      xu3lp_1.getXU3LPAsset(abis_1.X_U3LP_G, this.provider),
      xu3lp_1.getXU3LPAsset(abis_1.X_U3LP_F, this.provider),
      xu3lp_1.getXU3LPAsset(abis_1.X_U3LP_E, this.provider),
      xu3lp_1.getXU3LPAsset(abis_1.X_U3LP_D, this.provider),
      xu3lp_1.getXU3LPAsset(abis_1.X_U3LP_C, this.provider),
      xu3lp_1.getXU3LPAsset(abis_1.X_U3LP_B, this.provider),
      xu3lp_1.getXU3LPAsset(abis_1.X_U3LP_A, this.provider),
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
  async mint(
    symbol,
    tradeWithEth,
    amount,
    affiliate = constants_1.AddressZero
  ) {
    if (+amount === 0 || isNaN(+amount)) {
      return Promise.reject(new Error('Invalid value for amount'))
    }
    const value = utils_1.parseEther(amount)
    switch (symbol) {
      case abis_1.X_AAVE_A:
      case abis_1.X_AAVE_B:
        return xaave_1.mintXAave(
          symbol,
          tradeWithEth,
          value,
          affiliate,
          this.provider
        )
      case abis_1.X_ALPHA_A:
        return xalpha_1.mintXAlpha(symbol, tradeWithEth, value, this.provider)
      case abis_1.X_BNT_A:
        return xbnt_1.mintXBnt(symbol, tradeWithEth, value, this.provider)
      case abis_1.X_INCH_A:
      case abis_1.X_INCH_B:
        return xinch_1.mintXInch(symbol, tradeWithEth, value, this.provider)
      case abis_1.X_KNC_A:
      case abis_1.X_KNC_B:
        return xknc_1.mintXKnc(symbol, tradeWithEth, value, this.provider)
      case abis_1.X_SNX_A:
        return xsnx_1.mintXSnx(tradeWithEth, value, this.provider)
      case abis_1.X_U3LP_A:
      case abis_1.X_U3LP_B:
      case abis_1.X_U3LP_C:
      case abis_1.X_U3LP_D:
      case abis_1.X_U3LP_E:
      case abis_1.X_U3LP_F:
      case abis_1.X_U3LP_G:
      case abis_1.X_U3LP_H:
        return xu3lp_1.mintXU3LP(
          symbol,
          tradeWithEth ? 1 : 0,
          value,
          this.provider
        )
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
    const value = utils_1.parseEther(amount)
    return clr_1.mintXAssetCLR(symbol, inputAsset, value, this.provider)
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
    const value = amount ? utils_1.parseEther(amount) : constants_2.MAX_UINT
    return staking_1.approveXtk(value, this.provider)
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
    return staking_1.stakeXtk(amount, this.provider)
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
    return staking_1.unstakeXXtkA(amount, this.provider)
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
    const address = await utils_2.getSignerAddress(this.provider)
    if (!address || !utils_1.isAddress(address)) {
      return Promise.reject(new Error('Invalid user address'))
    }
    return staking_1.getXtkHistory(type, address, this.provider)
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
    return clr_1.getPoolRatioXAssetCLR(symbol, this.provider)
  }
}
exports.XToken = XToken
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieFRva2VuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3hUb2tlbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx3REFBc0Q7QUFHdEQsdUNBOEJxQjtBQUNyQiw0Q0FBd0Q7QUFFeEQsMENBUXlCO0FBQ3pCLDhEQUd3QztBQUN4QyxrRUFHMEM7QUFDMUMsMERBQXNFO0FBQ3RFLHNEQUFzRTtBQUN0RSx3REFHcUM7QUFDckMsZ0VBQTJFO0FBQzNFLGtEQUs2QjtBQUM3Qiw4Q0FBc0U7QUFDdEUsOENBUzJCO0FBQzNCLGdEQVM0QjtBQUM1Qiw0Q0FTMEI7QUFDMUIsOENBUzJCO0FBQzNCLDRDQVEwQjtBQUMxQiw0Q0FTMEI7QUFDMUIsOENBUzJCO0FBQzNCLDJDQUFnRDtBQWtCaEQ7Ozs7Ozs7Ozs7OztHQVlHO0FBQ0gsTUFBYSxNQUFNO0lBR2pCOztPQUVHO0lBQ0gsWUFBWSxRQUFzQjtRQUNoQyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQTtJQUMxQixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUNJLEtBQUssQ0FBQyxPQUFPLENBQ2xCLE1BQW9ELEVBQ3BELE1BQWUsRUFDZixVQUFxQjtRQUVyQixNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLGtCQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLG9CQUFRLENBQUE7UUFFcEQsUUFBUSxNQUFNLEVBQUU7WUFDZCxLQUFLLGVBQVEsQ0FBQztZQUNkLEtBQUssZUFBUTtnQkFDWCxPQUFPLG9CQUFZLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUE7WUFDbkQsS0FBSyxnQkFBUztnQkFDWixPQUFPLHNCQUFhLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUE7WUFDcEQsS0FBSyxjQUFPO2dCQUNWLE9BQU8sa0JBQVcsQ0FBQyxNQUFNLEVBQUUs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
