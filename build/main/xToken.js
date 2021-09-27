'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.XToken = void 0
const constants_1 = require('@ethersproject/constants')
const units_1 = require('@ethersproject/units')
const abis_1 = require('@xtoken/abis')
const utils_1 = require('ethers/lib/utils')
const erc20_1 = require('./blockchain/erc20')
const supply_1 = require('./blockchain/erc20/supply')
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
   * @param {ITokenSymbols | ILPTokenSymbols | IStableAssets} symbol Symbol of the token to be approved
   * @param {string} amount Amount of the token to be approved, MAX_UINT will be used by default
   * @param {IU3LPAssetId} inputAsset Token0/Token1
   * @param {string} spenderAddress Spender address to be approved for the specified ERC20 token
   * @returns A promise of the transaction response
   */
  async approve(symbol, amount, inputAsset, spenderAddress) {
    const value = amount ? utils_1.parseEther(amount) : constants_2.MAX_UINT
    if (spenderAddress && !utils_1.isAddress(spenderAddress)) {
      return Promise.reject(new Error(constants_2.Errors.INVALID_USER_ADDRESS))
    }
    switch (symbol) {
      case abis_1.X_AAVE_A:
      case abis_1.X_AAVE_B:
        return xaave_1.approveXAave(
          symbol,
          value,
          this.provider,
          spenderAddress
        )
      case abis_1.X_BNT_A:
        return xbnt_1.approveXBnt(symbol, value, this.provider, spenderAddress)
      case abis_1.X_INCH_A:
      case abis_1.X_INCH_B:
        return xinch_1.approveXInch(
          symbol,
          value,
          this.provider,
          spenderAddress
        )
      case abis_1.X_KNC_A:
      case abis_1.X_KNC_B:
        return xknc_1.approveXKnc(symbol, value, this.provider, spenderAddress)
      case abis_1.X_SNX_A:
        return xsnx_1.approveXSnx(value, this.provider, spenderAddress)
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
      default:
        if (!spenderAddress) {
          return Promise.reject(
            new Error(constants_2.Errors.INVALID_USER_ADDRESS)
          )
        }
        return erc20_1.approveErc20(
          symbol,
          value,
          spenderAddress,
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
   * import { LENDING_X_AAVE_A_MARKET, SUPPLY } from '@xtoken/abis'
   *
   * // Add xAAVEa to Lending market
   * const tx = await xToken.collateral(LENDING_X_AAVE_A_MARKET, '100', SUPPLY)
   * await tx.wait() // Wait for transaction confirmation
   * ```
   *
   * Add/remove xAsset collateral to a Lending Market
   * @param {ILendingMarket} marketName Name of the market
   * @param {string} amount Amount of xAsset to add/remove
   * @param {ICollateralType} type Supply/Withdraw action to be performed on the provided collateral
   * @returns A promise of the transaction response
   */
  async collateral(marketName, amount, type) {
    if (+amount === 0 || isNaN(+amount)) {
      return Promise.reject(new Error(constants_2.Errors.INVALID_AMOUNT_VALUE))
    }
    const value = utils_1.parseEther(amount)
    switch (type) {
      case abis_1.SUPPLY:
        return lending_1.supplyCollateral(marketName, value, this.provider)
      case abis_1.WITHDRAW:
        return lending_1.withdrawCollateral(marketName, value, this.provider)
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
   * Get Borrow rate per block of Liquidity Pool contract
   * @returns
   */
  async getBorrowRatePerBlock() {
    return lending_1.getBorrowRatePerBlock(this.provider)
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
   * Get all Lending Markets info along with xAsset symbol, collateral and total value in USD
   * @returns
   */
  async getLendingMarkets() {
    return lending_1.getLendingMarkets(this.provider)
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
   * Get token allowance for an address on ERC20 token or xAssets
   * @returns
   */
  async getTokenAllowance(symbol, spenderAddress) {
    const address = await utils_2.getSignerAddress(this.provider)
    if (
      !address ||
      !utils_1.isAddress(address) ||
      !utils_1.isAddress(spenderAddress)
    ) {
      return Promise.reject(new Error(constants_2.Errors.INVALID_USER_ADDRESS))
    }
    return erc20_1.getTokenAllowance(
      symbol,
      address,
      spenderAddress,
      this.provider
    )
  }
  /**
   * Get token balance for an address of ERC20 token or xAssets
   * @returns
   */
  async getTokenBalance(symbol) {
    const address = await utils_2.getSignerAddress(this.provider)
    if (!address || !utils_1.isAddress(address)) {
      return Promise.reject(new Error(constants_2.Errors.INVALID_USER_ADDRESS))
    }
    return erc20_1.getTokenBalance(symbol, address, this.provider)
  }
  /**
   * Get token supply of ERC20 token or xAssets
   * @returns
   */
  async getTokenSupply(symbol) {
    return supply_1.getTokenSupply(symbol, this.provider)
  }
  /**
   * Get updated borrow for an address
   * @returns
   */
  async getUpdatedBorrowBy() {
    const address = await utils_2.getSignerAddress(this.provider)
    if (!address || !utils_1.isAddress(address)) {
      return Promise.reject(new Error(constants_2.Errors.INVALID_USER_ADDRESS))
    }
    return lending_1.getUpdatedBorrowBy(address, this.provider)
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
    const value = units_1.parseUnits(
      amount,
      type === abis_1.REPAY || type === abis_1.WITHDRAW ? 18 : 6
    )
    switch (type) {
      case abis_1.BORROW:
        return lending_1.borrowLiquidity(value, this.provider)
      case abis_1.REPAY:
        return lending_1.repayLiquidity(value, this.provider)
      case abis_1.SUPPLY:
        return lending_1.supplyLiquidity(value, this.provider)
      case abis_1.WITHDRAW:
        return lending_1.withdrawLiquidity(value, this.provider)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieFRva2VuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3hUb2tlbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx3REFBc0Q7QUFHdEQsZ0RBQWlEO0FBQ2pELHVDQXdCcUI7QUFDckIsNENBQXdEO0FBRXhELDhDQUkyQjtBQUMzQixzREFBMEQ7QUFDMUQsOERBR3dDO0FBQ3hDLGtFQUcwQztBQUMxQywwREFBc0U7QUFDdEUsc0RBQXNFO0FBQ3RFLHdEQUdxQztBQUNyQyxrREFpQjZCO0FBQzdCLGtEQUs2QjtBQUM3Qiw4Q0FBcUQ7QUFDckQsOENBUzJCO0FBQzNCLDRDQVMwQjtBQUMxQiw4Q0FTMkI7QUFDM0IsNENBUTBCO0FBQzFCLDRDQVMwQjtBQUMxQiw4Q0FTMkI7QUFDM0IsMkNBQXdEO0FBcUJ4RDs7Ozs7Ozs7Ozs7O0dBWUc7QUFDSCxNQUFhLE1BQU07SUFHakI7O09BRUc7SUFDSCxZQUFZLFFBQXNCO1FBQ2hDLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFBO0lBQzFCLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7T0FjRztJQUNJLEtBQUssQ0FBQyxPQUFPLENBQ2xCLE1BQXVELEVBQ3ZELE1BQWUsRUFDZixVQUF5QixFQUN6QixjQUF1QjtRQUV2QixNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLGtCQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLG9CQUFRLENBQUE7UUFFcEQsSUFBSSxjQUFjLElBQUksQ0FBQyxpQkFBUyxDQUFDLGNBQWMsQ0FBQyxFQUFFO1lBQ2hELE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxrQkFBTSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQTtTQUM5RDtRQUVELFFBQVEsTUFBTSxFQUFFO1lBQ2QsS0FBSyxlQUFRLENBQUM7WUFDZCxLQUFLLGVBQVE7Z0JBQ1gsT0FBTyxvQkFBWSxDQUFDLE1BQU0sRUFBRSxLQUFL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
