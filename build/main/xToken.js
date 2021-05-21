'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.XToken = void 0
const constants_1 = require('@ethersproject/constants')
const abis_1 = require('@xtoken/abis')
const utils_1 = require('ethers/lib/utils')
const balancer_1 = require('./blockchain/exchanges/balancer')
const bancor_1 = require('./blockchain/exchanges/bancor')
const inch_1 = require('./blockchain/exchanges/inch')
const kyber_1 = require('./blockchain/exchanges/kyber')
const utils_2 = require('./blockchain/utils')
const xaave_1 = require('./blockchain/xaave')
const asset_1 = require('./blockchain/xaave/asset')
const xbnt_1 = require('./blockchain/xbnt')
const asset_2 = require('./blockchain/xbnt/asset')
const xinch_1 = require('./blockchain/xinch')
const asset_3 = require('./blockchain/xinch/asset')
const xknc_1 = require('./blockchain/xknc')
const asset_4 = require('./blockchain/xknc/asset')
const xsnx_1 = require('./blockchain/xsnx')
const asset_5 = require('./blockchain/xsnx/asset')
const xu3lp_1 = require('./blockchain/xu3lp')
const asset_6 = require('./blockchain/xu3lp/asset')
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
        return xu3lp_1.approveXU3LP(
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
    if (
      ![
        abis_1.X_KNC_A,
        abis_1.X_KNC_B,
        abis_1.X_U3LP_A,
        abis_1.X_U3LP_B,
        abis_1.X_U3LP_C,
        abis_1.X_U3LP_D,
      ].includes(symbol)
    ) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const maxRedeemable = utils_1.parseEther(
        await this.getMaxRedeemable(symbol)
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
    // TODO: Fetch estimates for xSNXa and xBNTa pools
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
  async getExpectedQuantityOnBalancer(tokenIn, symbol, amount, tradeType) {
    if (+amount === 0 || isNaN(+amount)) {
      return Promise.reject(new Error('Invalid value for amount'))
    }
    return balancer_1.getBalancerEstimatedQuantity(
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
      balancer_1.getBalancerPortfolioItem(
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
   * @param {'xAAVEa' | 'xAAVEb' | 'xINCHa' | 'xINCHb' | 'xSNXa'} symbol Symbol of the xToken
   * @returns Maximum redeemable tokens for the given xToken
   */
  async getMaxRedeemable(symbol) {
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
      asset_4.getXKncAsset(abis_1.X_KNC_A, this.provider),
      asset_4.getXKncAsset(abis_1.X_KNC_B, this.provider),
      asset_5.getXSnxAsset(abis_1.X_SNX_A, this.provider),
      asset_1.getXAaveAsset(abis_1.X_AAVE_A, this.provider),
      asset_1.getXAaveAsset(abis_1.X_AAVE_B, this.provider),
      asset_3.getXInchAsset(abis_1.X_INCH_A, this.provider),
      asset_3.getXInchAsset(abis_1.X_INCH_B, this.provider),
      asset_2.getXBntAsset(abis_1.X_BNT_A, this.provider),
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
      asset_6.getXU3LPAsset(abis_1.X_U3LP_A, this.provider),
      asset_6.getXU3LPAsset(abis_1.X_U3LP_B, this.provider),
      asset_6.getXU3LPAsset(abis_1.X_U3LP_C, this.provider),
      asset_6.getXU3LPAsset(abis_1.X_U3LP_D, this.provider),
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
        return xu3lp_1.mintXU3LP(
          symbol,
          tradeWithEth ? 1 : 0,
          value,
          this.provider
        )
    }
  }
}
exports.XToken = XToken
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieFRva2VuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3hUb2tlbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx3REFBc0Q7QUFHdEQsdUNBZXFCO0FBQ3JCLDRDQUF3RDtBQUV4RCw4REFHd0M7QUFDeEMsMERBR3NDO0FBQ3RDLHNEQUFzRTtBQUN0RSx3REFHcUM7QUFDckMsOENBQXFEO0FBQ3JELDhDQVEyQjtBQUMzQixvREFBd0Q7QUFDeEQsNENBUTBCO0FBQzFCLG1EQUFzRDtBQUN0RCw4Q0FRMkI7QUFDM0Isb0RBQXdEO0FBQ3hELDRDQU8wQjtBQUMxQixtREFBc0Q7QUFDdEQsNENBUTBCO0FBQzFCLG1EQUFzRDtBQUN0RCw4Q0FNMkI7QUFDM0Isb0RBQXdEO0FBQ3hELDJDQUFnRDtBQWFoRDs7Ozs7Ozs7Ozs7O0dBWUc7QUFDSCxNQUFhLE1BQU07SUFHakI7O09BRUc7SUFDSCxZQUFZLFFBQXNCO1FBQ2hDLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFBO0lBQzFCLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7OztPQWFHO0lBQ0ksS0FBSyxDQUFDLE9BQU8sQ0FDbEIsTUFBdUMsRUFDdkMsTUFBZSxFQUNmLFVBQXlCO1FBRXpCLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsa0JBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsb0JBQVEsQ0FBQTtRQUVwRCxRQUFRLE1BQU0sRUFBRTtZQUNkLEtBQUssZUFBUSxDQUFDO1lBQ2QsS0FBSyxlQUFRO2dCQUNYLE9BQU8sb0JBQVksQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtZQUNuRCxLQUFLLGNBQU87Z0JBQ1YsT0FBTyxrQkFBVyxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1lBQ2xELEtBQUssZUFBUSxDQUFDO1lBQ2QsS0FBSyxlQUFRO2dC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
