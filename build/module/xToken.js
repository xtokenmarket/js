import { AddressZero } from '@ethersproject/constants'
import { parseUnits } from '@ethersproject/units'
import {
  AAVE_X_AAVE_A_CLR,
  BNT_X_BNT_A_CLR,
  BORROW,
  BUY,
  ETH,
  INCH_X_INCH_A_CLR,
  INCH_X_INCH_B_CLR,
  LENDING_WBTC_MARKET,
  REPAY,
  SUPPLY,
  WITHDRAW,
  X_AAVE_A,
  X_AAVE_B,
  X_AAVE_B_AAVE_CLR,
  X_ALPHA_A,
  X_ALPHA_A_ALPHA_CLR,
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
  approveErc20,
  getTokenAllowance,
  getTokenBalance,
} from './blockchain/erc20'
import { getTokenSupply } from './blockchain/erc20/supply'
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
import { getUniswapV3EstimatedQty } from './blockchain/exchanges/uniswapV3'
import {
  approveUsdc,
  borrowLiquidity,
  getBorrowingCapacity,
  getBorrowRatePerBlock,
  getHealthRatio,
  getLendingMarkets,
  getLendingPrice,
  getLPTBaseValue,
  getLPTValue,
  getOptimalUtilizationRate,
  getUpdatedBorrowBy,
  getUtilizationRate,
  getReserveFactor,
  getXtkFeeFactor,
  repayLiquidity,
  supplyCollateral,
  supplyLiquidity,
  withdrawCollateral,
  withdrawLiquidity,
} from './blockchain/lending'
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
  approveXAlpha,
  burnXAlpha,
  getExpectedQuantityOnBurnXAlpha,
  getExpectedQuantityOnMintXAlpha,
  getMaximumRedeemableXAlpha,
  getPortfolioItemXAlpha,
  getXAlphaAsset,
  mintXAlpha,
} from './blockchain/xalpha'
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
import { ChainId, Errors, Exchange, MAX_UINT } from './constants'
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
   * @param {ITokenSymbols | ILPTokenSymbols | IStableAssets | IXAssetCLR} symbol Symbol of the token to be approved
   * @param {string} amount Amount of the token to be approved, MAX_UINT will be used by default
   * @param {IAssetId} inputAsset Token0/Token1
   * @param {string} spenderAddress Spender address to be approved for the specified ERC20 token
   * @returns A promise of the transaction response
   */
  async approve(symbol, amount, inputAsset, spenderAddress) {
    const value = amount ? parseEther(amount) : MAX_UINT
    if (spenderAddress && !isAddress(spenderAddress)) {
      return Promise.reject(new Error(Errors.INVALID_USER_ADDRESS))
    }
    switch (symbol) {
      case X_AAVE_A:
      case X_AAVE_B:
        return approveXAave(symbol, value, this.provider, spenderAddress)
      case X_ALPHA_A:
        return approveXAlpha(symbol, value, this.provider, spenderAddress)
      case X_BNT_A:
        return approveXBnt(symbol, value, this.provider, spenderAddress)
      case X_INCH_A:
      case X_INCH_B:
        return approveXInch(symbol, value, this.provider, spenderAddress)
      case X_KNC_A:
      case X_KNC_B:
        return approveXKnc(symbol, value, this.provider, spenderAddress)
      case X_SNX_A:
        return approveXSnx(value, this.provider, spenderAddress)
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
      case X_ALPHA_A_ALPHA_CLR:
      case X_KNC_A_KNC_CLR:
      case X_KNC_B_KNC_CLR:
      case X_SNX_A_SNX_CLR:
      case XTK_ETH_CLR:
        return approveXAssetCLR(symbol, value, inputAsset || 0, this.provider)
      default:
        if (!spenderAddress) {
          return Promise.reject(new Error(Errors.INVALID_USER_ADDRESS))
        }
        return approveErc20(symbol, value, spenderAddress, this.provider)
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
    const value = amount ? parseUnits(amount, 6) : MAX_UINT
    return approveUsdc(value, this.provider)
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
      case X_ALPHA_A:
        return burnXAlpha(symbol, sellForEth, value, this.provider)
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
      return Promise.reject(new Error(Errors.INVALID_AMOUNT_VALUE))
    }
    const value =
      marketName === LENDING_WBTC_MARKET
        ? parseUnits(amount, 8)
        : parseEther(amount)
    switch (type) {
      case SUPPLY:
        return supplyCollateral(marketName, value, this.provider)
      case WITHDRAW:
        return withdrawCollateral(marketName, value, this.provider)
    }
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
      expectedQuantity: xTokenExpectedQty,
      source: Exchange.XTOKEN,
    }
    if ((symbol === X_AAVE_A || symbol === X_ALPHA_A) && !tradeWithEth) {
      dexSource = Exchange.UNISWAP_V3
      dexExpectedQty = await getUniswapV3EstimatedQty(
        symbol,
        symbol,
        amount,
        tradeType,
        undefined,
        this.provider
      )
    } else if (symbol === X_AAVE_B) {
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
      expectedQuantity: dexExpectedQty,
      source: dexSource,
    }
    let bestReturn = xTokenReturn
    if (parseEther(xTokenExpectedQty).lt(parseEther(dexExpectedQty))) {
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
    const address = await getSignerAddress(this.provider)
    if (!address || !isAddress(address)) {
      return Promise.reject(new Error(Errors.INVALID_USER_ADDRESS))
    }
    return getBorrowingCapacity(address, this.provider)
  }
  /**
   * Get Borrow rate per block of Liquidity Pool contract
   * @returns
   */
  async getBorrowRatePerBlock() {
    return getBorrowRatePerBlock(this.provider)
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
      case X_ALPHA_A:
        return getExpectedQuantityOnBurnXAlpha(
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
      case X_ALPHA_A:
        return getExpectedQuantityOnMintXAlpha(
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
   * Get Health Ratio for an address
   * @returns
   */
  async getHealthRatio() {
    const address = await getSignerAddress(this.provider)
    if (!address || !isAddress(address)) {
      return Promise.reject(new Error(Errors.INVALID_USER_ADDRESS))
    }
    return getHealthRatio(address, this.provider)
  }
  /**
   * Get all Lending Markets info along with xAsset symbol, collateral and total value in USD
   * @returns
   */
  async getLendingMarkets() {
    const address = await getSignerAddress(this.provider)
    if (!address || !isAddress(address)) {
      return Promise.reject(new Error(Errors.INVALID_USER_ADDRESS))
    }
    return getLendingMarkets(address, this.provider)
  }
  /**
   * Get xAsset Lending Price
   * @returns
   */
  async getLendingPrice(priceName) {
    return getLendingPrice(priceName, this.provider)
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
      return Promise.reject(new Error(Errors.INVALID_USER_ADDRESS))
    }
    const { chainId } = await this.provider.getNetwork()
    switch (chainId) {
      case ChainId.Mainnet:
        return Promise.all([
          getBalancerV2PortfolioItem(X_SNX_A, address, this.provider),
          getBalancerPortfolioItem(X_AAVE_A, address, this.provider),
          getBalancerPortfolioItem(X_AAVE_B, address, this.provider),
          getKyberPortfolioItem(X_KNC_A, address, this.provider),
          getBancorPortfolioItem(X_BNT_A, address, this.provider),
        ])
      case ChainId.Arbitrum:
        return []
      default:
        return []
    }
  }
  /**
   * Get liquidity pool token base value
   * @returns
   */
  async getLPTBaseValue() {
    return getLPTBaseValue(this.provider)
  }
  /**
   * Get liquidity pool token value
   * @returns
   */
  async getLPTValue() {
    return getLPTValue(this.provider)
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
      case X_ALPHA_A:
        return getMaximumRedeemableXAlpha(symbol, this.provider)
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
      case X_ALPHA_A_ALPHA_CLR:
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
      return Promise.reject(new Error(Errors.INVALID_USER_ADDRESS))
    }
    const { chainId } = await this.provider.getNetwork()
    switch (chainId) {
      case ChainId.Mainnet:
        return Promise.all([
          getPortfolioItemXKnc(X_KNC_A, address, this.provider),
          getPortfolioItemXKnc(X_KNC_B, address, this.provider),
          getPortfolioItemXSnx(X_SNX_A, address, this.provider),
          getPortfolioItemXAave(X_AAVE_A, address, this.provider),
          getPortfolioItemXAave(X_AAVE_B, address, this.provider),
          getPortfolioItemXInch(X_INCH_A, address, this.provider),
          getPortfolioItemXInch(X_INCH_B, address, this.provider),
          getPortfolioItemXBnt(X_BNT_A, address, this.provider),
          getPortfolioItemXAlpha(X_ALPHA_A, address, this.provider),
          getPortfolioItemXU3LP(X_U3LP_A, address, this.provider),
          getPortfolioItemXU3LP(X_U3LP_B, address, this.provider),
          getPortfolioItemXU3LP(X_U3LP_C, address, this.provider),
          getPortfolioItemXU3LP(X_U3LP_D, address, this.provider),
          getPortfolioItemXU3LP(X_U3LP_E, address, this.provider),
          getPortfolioItemXU3LP(X_U3LP_F, address, this.provider),
          getPortfolioItemXU3LP(X_U3LP_G, address, this.provider),
          getPortfolioItemXU3LP(X_U3LP_H, address, this.provider),
        ])
      case ChainId.Arbitrum:
        return Promise.all([
          getPortfolioItemXU3LP(X_U3LP_B, address, this.provider),
        ])
      default:
        return []
    }
  }
  /**
   * Get token allowance for an address on ERC20 token or xAssets
   * @returns
   */
  async getTokenAllowance(symbol, spenderAddress) {
    const address = await getSignerAddress(this.provider)
    if (!address || !isAddress(address) || !isAddress(spenderAddress)) {
      return Promise.reject(new Error(Errors.INVALID_USER_ADDRESS))
    }
    return getTokenAllowance(symbol, address, spenderAddress, this.provider)
  }
  /**
   * Get token balance for an address of ERC20 token or xAssets
   * @returns
   */
  async getTokenBalance(symbol) {
    const address = await getSignerAddress(this.provider)
    if (!address || !isAddress(address)) {
      return Promise.reject(new Error(Errors.INVALID_USER_ADDRESS))
    }
    return getTokenBalance(symbol, address, this.provider)
  }
  /**
   * Get token supply of ERC20 token or xAssets
   * @returns
   */
  async getTokenSupply(symbol) {
    return getTokenSupply(symbol, this.provider)
  }
  /**
   * Get updated borrow for an address
   * @returns
   */
  async getUpdatedBorrowBy() {
    const address = await getSignerAddress(this.provider)
    if (!address || !isAddress(address)) {
      return Promise.reject(new Error(Errors.INVALID_USER_ADDRESS))
    }
    return getUpdatedBorrowBy(address, this.provider)
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
    const { chainId } = await this.provider.getNetwork()
    switch (chainId) {
      case ChainId.Mainnet:
        return Promise.all([
          getXAlphaAsset(X_ALPHA_A, this.provider),
          getXBntAsset(X_BNT_A, this.provider),
          getXInchAsset(X_INCH_A, this.provider),
          getXInchAsset(X_INCH_B, this.provider),
          getXAaveAsset(X_AAVE_A, this.provider),
          getXAaveAsset(X_AAVE_B, this.provider),
          getXSnxAsset(X_SNX_A, this.provider),
          getXKncAsset(X_KNC_A, this.provider),
          getXKncAsset(X_KNC_B, this.provider),
        ])
      case ChainId.Arbitrum:
        return []
      case ChainId.ArbitrumTestnet:
        return []
      default:
        return Promise.reject(new Error('Wrong Network'))
    }
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
    const { chainId } = await this.provider.getNetwork()
    switch (chainId) {
      case ChainId.Mainnet:
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
      case ChainId.Arbitrum:
        return Promise.all([getXU3LPAsset(X_U3LP_B, this.provider)])
      case ChainId.ArbitrumTestnet:
        return Promise.all([getXU3LPAsset(X_U3LP_B, this.provider)])
      default:
        return Promise.reject(new Error('Wrong Network'))
    }
  }
  async lend(amount, type) {
    if (+amount === 0 || isNaN(+amount)) {
      return Promise.reject(new Error(Errors.INVALID_AMOUNT_VALUE))
    }
    const value = parseUnits(amount, 6)
    switch (type) {
      case BORROW:
        return borrowLiquidity(value, this.provider)
      case REPAY:
        return repayLiquidity(value, this.provider)
      case SUPPLY:
        return supplyLiquidity(value, this.provider)
      case WITHDRAW:
        return withdrawLiquidity(value, this.provider)
      default:
        return Promise.reject(new Error('Invalid lending type specified'))
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
  async mint(symbol, tradeWithEth, amount, affiliate = AddressZero) {
    if (+amount === 0 || isNaN(+amount)) {
      return Promise.reject(new Error('Invalid value for amount'))
    }
    const value = parseEther(amount)
    switch (symbol) {
      case X_AAVE_A:
      case X_AAVE_B:
        return mintXAave(symbol, tradeWithEth, value, affiliate, this.provider)
      case X_ALPHA_A:
        return mintXAlpha(symbol, tradeWithEth, value, this.provider)
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
      return Promise.reject(new Error(Errors.INVALID_USER_ADDRESS))
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
  /**
   * Get liquidity pool token utilization and optimal utilization rates
   * @returns
   */
  async getUtilizationRates() {
    const [utilizationRate, optimalUtilizationRate] = await Promise.all([
      getUtilizationRate(this.provider),
      getOptimalUtilizationRate(this.provider),
    ])
    return {
      optimalUtilizationRate,
      utilizationRate,
    }
  }
  /**
   * Get Lending reserveFee and xtkFee factors
   * @returns
   */
  async getFeeFactors() {
    const [reserveFactor, xtkFeeFactor] = await Promise.all([
      getReserveFactor(this.provider),
      getXtkFeeFactor(this.provider),
    ])
    return {
      reserveFactor,
      xtkFeeFactor,
    }
  }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieFRva2VuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3hUb2tlbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMEJBQTBCLENBQUE7QUFHdEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFBO0FBQ2pELE9BQU8sRUFDTCxpQkFBaUIsRUFDakIsZUFBZSxFQUNmLE1BQU0sRUFDTixHQUFHLEVBQ0gsR0FBRyxFQUNILGlCQUFpQixFQUNqQixpQkFBaUIsRUFFakIsbUJBQW1CLEVBQ25CLEtBQUssRUFDTCxNQUFNLEVBQ04sUUFBUSxFQUNSLFFBQVEsRUFDUixRQUFRLEVBQ1IsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxtQkFBbUIsRUFDbkIsT0FBTyxFQUNQLFFBQVEsRUFDUixRQUFRLEVBQ1IsT0FBTyxFQUNQLGVBQWUsRUFDZixPQUFPLEVBQ1AsZUFBZSxFQUNmLE9BQU8sRUFDUCxlQUFlLEVBQ2YsUUFBUSxFQUNSLFFBQVEsRUFDUixRQUFRLEVBQ1IsUUFBUSxFQUNSLFFBQVEsRUFDUixRQUFRLEVBQ1IsUUFBUSxFQUNSLFFBQVEsRUFDUixXQUFXLEdBQ1osTUFBTSxjQUFjLENBQUE7QUFDckIsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQTtBQUV4RCxPQUFPLEVBQ0wsZ0JBQWdCLEVBQ2hCLGFBQWEsRUFDYixrQ0FBa0MsRUFDbEMsa0NBQWtDLEVBQ2xDLDZCQUE2QixFQUM3QixxQkFBcUIsRUFDckIsYUFBYSxHQUNkLE1BQU0sa0JBQWtCLENBQUE7QUFDekIsT0FBTyxFQUNMLFlBQVksRUFDWixpQkFBaUIsRUFDakIsZUFBZSxHQUNoQixNQUFNLG9CQUFvQixDQUFBO0FBQzNCLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQTtBQUMxRCxPQUFPLEVBQ0wsNEJBQTRCLEVBQzVCLHdCQUF3QixHQUN6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TUFBTSxDQUFDLENBQUE7UUFFaEMsUUFBUSxNQUFNLEVBQUU7WUFDZCxLQUFLLFFBQVEsQ0FBQztZQUNkLEtBQUssUUFBUTtnQkFDWCxPQUFPLFNBQVMsQ0FBQyxNQUFNLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1lBQ3pFLEtBQUssU0FBUztnQkFDWixPQUFPLFVBQVUsQ0FBQyxNQUFNLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUE7WUFDL0QsS0FBSyxPQUFPO2dCQUNWLE9BQU8sUUFBUSxDQUFDLE1BQU0sRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtZQUM3RCxLQUFLLFFBQVEsQ0FBQztZQUNkLEtBQUssUUFBUTtnQkFDWCxPQUFPLFNBQVMsQ0FBQyxNQUFNLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUE7WUFDOUQsS0FBSyxPQUFPLENBQUM7WUFDYixLQUFLLE9BQU87Z0JBQ1YsT0FBTyxRQUFRLENBQUMsTUFBTSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1lBQzdELEtBQUssT0FBTztnQkFDVixPQUFPLFFBQVEsQ0FBQyxZQUFZLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtZQUNyRCxLQUFLLFFBQVEsQ0FBQztZQUNkLEtBQUssUUFBUSxDQUFDO1lBQ2QsS0FBSyxRQUFRLENBQUM7WUFDZCxLQUFLLFFBQVEsQ0FBQztZQUNkLEtBQUssUUFBUSxDQUFDO1lBQ2QsS0FBSyxRQUFRLENBQUM7WUFDZCxLQUFLLFFBQVEsQ0FBQztZQUNkLEtBQUssUUFBUTtnQkFDWCxPQUFPLFNBQVMsQ0FBQyxNQUFNLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxD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
