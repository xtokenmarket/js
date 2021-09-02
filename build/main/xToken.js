'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.XToken = void 0
const constants_1 = require('@ethersproject/constants')
const units_1 = require('@ethersproject/units')
const abis_1 = require('@xtoken/abis')
const utils_1 = require('ethers/lib/utils')
const balancer_1 = require('./blockchain/exchanges/balancer')
const balancerV2_1 = require('./blockchain/exchanges/balancerV2')
const bancor_1 = require('./blockchain/exchanges/bancor')
const inch_1 = require('./blockchain/exchanges/inch')
const kyber_1 = require('./blockchain/exchanges/kyber')
const lending_1 = require('./blockchain/lending')
const staking_1 = require('./blockchain/staking')
const utils_2 = require('./blockchain/utils')
const xaave_1 = require('./blockchain/xaave')
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
   * @param {ITokenSymbols | ILPTokenSymbols} symbol Symbol of the token to be approved
   * @param {string} amount Amount of the token to be approved, MAX_UINT will be used by default
   * @param {IU3LPAssetId} inputAsset Token0/Token1
   * @returns A promise of the transaction response
   */
  async approve(symbol, amount, inputAsset) {
    const value = amount ? utils_1.parseEther(amount) : constants_2.MAX_UINT
    switch (symbol) {
      case abis_1.X_AAVE_A:
      case abis_1.X_AAVE_B:
        return xaave_1.approveXAave(symbol, value, this.provider)
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
    }
  }
  /**
   * Approve specified amount of USDC by lending liquidity pool contract
   *
   * @example
   * ```typescript
   * const tx = await xToken.approveUsdc('100') // Approve 100 USDC tokens for lending
   * await tx.wait() // Wait for transaction confirmation
   * ```
   *
   * @param {string} amount Amount of the token to be approved, MAX_UINT will be used by default
   * @returns A promise of the transaction response
   */
  // TODO: add spender address
  async approveUsdc(amount) {
    const value = amount ? units_1.parseUnits(amount, 6) : constants_2.MAX_UINT
    return lending_1.approveUsdc(value, this.provider)
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
      expectedQuantity: utils_1.parseEther(xTokenExpectedQty).toString(),
      source: constants_2.Exchange.XTOKEN,
    }
    if ([abis_1.X_AAVE_A, abis_1.X_AAVE_B].includes(symbol)) {
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
      expectedQuantity: utils_1.parseEther(dexExpectedQty).toString(),
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
   * Get Borrowing Capacity for an address
   * @returns
   */
  async getBorrowingCapacity() {
    const address = await utils_2.getSignerAddress(this.provider)
    if (!address || !utils_1.isAddress(address)) {
      return Promise.reject(new Error(constants_2.Errors.INVALID_USER_ADDRESS))
    }
    return lending_1.getBorrowingCapacity(address, this.provider)
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
   * Get Health Ratio for an address
   * @returns
   */
  async getHealthRatio() {
    const address = await utils_2.getSignerAddress(this.provider)
    if (!address || !utils_1.isAddress(address)) {
      return Promise.reject(new Error(constants_2.Errors.INVALID_USER_ADDRESS))
    }
    return lending_1.getHealthRatio(address, this.provider)
  }
  /**
   * Get all Lending Markets registered in Comptroller
   * @returns
   */
  async getLendingMarkets() {
    return lending_1.getAllMarkets(this.provider)
  }
  /**
   * Get xAsset Lending Price
   * @returns
   */
  async getLendingPrice(priceName) {
    return lending_1.getLendingPrice(priceName, this.provider)
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
      return Promise.reject(new Error(constants_2.Errors.INVALID_USER_ADDRESS))
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
   * Get liquidity pool token base value
   * @returns
   */
  async getLPTBaseValue() {
    return lending_1.getLPTBaseValue(this.provider)
  }
  /**
   * Get liquidity pool token value
   * @returns
   */
  async getLPTValue() {
    return lending_1.getLPTValue(this.provider)
  }
  /**
   * @example
   * ```typescript
   * // Get maximum redeemable tokens for xAAVEa
   * const maxRedeemable = await xToken.getMaxRedeemable('xAAVEa')
   * ```
   *
   * @param {'xAAVEa' | 'xAAVEb' | 'xINCHa' | 'xINCHb' | 'xSNXa' | ILPTokenSymbols} symbol Symbol of the xToken
   * @param {IU3LPAssetId} outputAsset Sell for Token0/Token1
   * @returns Maximum redeemable tokens for the given xToken
   */
  async getMaxRedeemable(symbol, outputAsset) {
    switch (symbol) {
      case abis_1.X_AAVE_A:
      case abis_1.X_AAVE_B:
        return xaave_1.getMaximumRedeemableXAave(symbol, this.provider)
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
    }
  }
  /**
   * Get liquidity pool token optimal utilization rate
   * @returns
   */
  async getOptimalUtilizationRate() {
    return lending_1.getOptimalUtilizationRate(this.provider)
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
      return Promise.reject(new Error(constants_2.Errors.INVALID_USER_ADDRESS))
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
   * // Get available xTokens list
   * const xTokensList = await xToken.getXAssets()
   * ```
   *
   * @returns Returns list of all the xTokens along with their asset details:
   * AUM, Mandate & USD price
   */
  async getXAssets() {
    return Promise.all([
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
  async lend(amount, type) {
    if (+amount === 0 || isNaN(+amount)) {
      return Promise.reject(new Error(constants_2.Errors.INVALID_AMOUNT_VALUE))
    }
    const value = units_1.parseUnits(amount, 6)
    switch (type) {
      case abis_1.BORROW:
        return lending_1.borrow(value, this.provider)
      case abis_1.REPAY:
        return lending_1.repay(value, this.provider)
      case abis_1.SUPPLY:
        return lending_1.supply(value, this.provider)
      case abis_1.WITHDRAW:
        return lending_1.withdraw(value, this.provider)
    }
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
      return Promise.reject(new Error(constants_2.Errors.INVALID_USER_ADDRESS))
    }
    return staking_1.getXtkHistory(type, address, this.provider)
  }
}
exports.XToken = XToken
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieFRva2VuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3hUb2tlbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx3REFBc0Q7QUFHdEQsZ0RBQWlEO0FBQ2pELHVDQXVCcUI7QUFDckIsNENBQXdEO0FBRXhELDhEQUd3QztBQUN4QyxrRUFHMEM7QUFDMUMsMERBQXNFO0FBQ3RFLHNEQUFzRTtBQUN0RSx3REFHcUM7QUFDckMsa0RBYTZCO0FBQzdCLGtEQUs2QjtBQUM3Qiw4Q0FBcUQ7QUFDckQsOENBUzJCO0FBQzNCLDRDQVMwQjtBQUMxQiw4Q0FTMkI7QUFDM0IsNENBUTBCO0FBQzFCLDRDQVMwQjtBQUMxQiw4Q0FTMkI7QUFDM0IsMkNBQXdEO0FBZ0J4RDs7Ozs7Ozs7Ozs7O0dBWUc7QUFDSCxNQUFhLE1BQU07SUFHakI7O09BRUc7SUFDSCxZQUFZLFFBQXNCO1FBQ2hDLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFBO0lBQzFCLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7OztPQWFHO0lBQ0ksS0FBSyxDQUFDLE9BQU8sQ0FDbEIsTUFBdUMsRUFDdkMsTUFBZSxFQUNmLFVBQXlCO1FBRXpCLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsa0JBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsb0JBQVEsQ0FBQTtRQUVwRCxRQUFRLE1BQU0sRUFBRTtZQUNkLEtBQUssZUFBUSxDQUFDO1lBQ2QsS0FBSyxlQUFRO2dCQUNYLE9BQU8sb0JBQVksQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtZQUNuRCxLQUFLLGNBQU87Z0JBQ1YsT0FBTyxrQkFBVyxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1lBQ2xELEtBQUssZUFBUSxDQUFDO1lBQ2QsS0FBSyxlQUFRO2dCQUNYLE9BQU8sb0JBQVksQ0FBQyxNQUFN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
