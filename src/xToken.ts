import { AddressZero } from '@ethersproject/constants'
import { ContractTransaction } from '@ethersproject/contracts'
import { BaseProvider } from '@ethersproject/providers'
import { parseUnits } from '@ethersproject/units'
import {
  AAVE_X_AAVE_A_CLR,
  BNT_X_BNT_A_CLR,
  BORROW,
  BUY,
  ETH,
  INCH_X_INCH_A_CLR,
  INCH_X_INCH_B_CLR,
  LENDING_LPT,
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
  X_BTC_3X,
  X_ETH_3X,
  X_INCH_A,
  X_INCH_B,
  X_KNC_A,
  X_KNC_A_KNC_CLR,
  X_KNC_B,
  X_KNC_B_KNC_CLR,
  // X_LINK_3X,
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
  getReserveFactor,
  getUpdatedBorrowBy,
  getUtilizationRate,
  getXtkFeeFactor,
  repayLiquidity,
  supplyCollateral,
  supplyLiquidity,
  withdrawCollateral,
  withdrawLiquidity,
} from './blockchain/lending'
import {
  approveXAssetLev,
  burnXAssetLev,
  getExpectedQuantityOnBurnXAssetLev,
  getExpectedQuantityOnMintXAssetLev,
  getMaximumRedeemableXAssetLev,
  getPortfolioItemXAssetLev,
  getXAssetLev,
  mintXAssetLev,
} from './blockchain/lev'
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
import {
  IAsset,
  IAssetId,
  ICLRBurnQty,
  ICLRMintQty,
  ICollateralType,
  IHistoryType,
  ILendingMarket,
  ILendingMarketInfo,
  ILendingPricing,
  ILendingType,
  ILevAsset,
  ILiquidityPoolItem,
  ILPAsset,
  ILPTokenSymbols,
  INativeAssets,
  IPortfolioItem,
  IReturns,
  IStableAssets,
  ITokenPrices,
  ITokenSymbols,
  ITradeType,
  IXAssetCLR,
  IXAssetLev,
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
   * @param {ITokenSymbols | ILPTokenSymbols | IStableAssets | IXAssetCLR} symbol Symbol of the token to be approved
   * @param {string} amount Amount of the token to be approved, MAX_UINT will be used by default
   * @param {IAssetId} inputAsset Token0/Token1
   * @param {string} spenderAddress Spender address to be approved for the specified ERC20 token
   * @returns A promise of the transaction response
   */
  public async approve(
    symbol:
      | ITokenSymbols
      | ILPTokenSymbols
      | IStableAssets
      | IXAssetCLR
      | IXAssetLev,
    amount?: string,
    inputAsset?: IAssetId,
    spenderAddress?: string
  ): Promise<ContractTransaction> {
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
      case X_BTC_3X:
      case X_ETH_3X:
        return approveXAssetLev(symbol, value, this.provider, spenderAddress)
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
  public async approveUsdc(amount?: string) {
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
  public async approveXtk(amount?: string) {
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
   * @param {ITokenSymbols | ILPTokenSymbols | IXAssetLev} symbol Symbol of the xToken to be sold
   * @param {boolean} sellForEth Sell for ETH/Token or Token0/Token1 `outputAsset` in boolean value
   * @param {string} amount Amount of xTokens to be sold,
   *                        cannot exceed max redeemable for xAAVEa/xAAVEb/xSNXa tokens
   * @returns A promise of the transaction response
   */
  public async burn(
    symbol: ITokenSymbols | ILPTokenSymbols | IXAssetLev,
    sellForEth: boolean,
    amount: string
  ): Promise<ContractTransaction> {
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
      case X_BTC_3X:
      case X_ETH_3X:
        return burnXAssetLev(symbol, sellForEth, value, this.provider)
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
  public async burnXAssetCLR(
    symbol: IXAssetCLR,
    amount: string
  ): Promise<ContractTransaction> {
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
  public async collateral(
    marketName: ILendingMarket,
    amount: string,
    type: ICollateralType
  ) {
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
   * @param {ITokenSymbols | ILPTokenSymbols | IXAssetLev} symbol Symbol of the xToken to burn
   * @param {boolean} tradeWithEth True, if selling the xToken for ETH
   * @param {string} amount Quantity of the xToken to be traded
   * @param {ITradeType} tradeType Buy/sell type of the trade
   * @returns Estimated quantities from available sources for trading the given xToken
   */
  public async getBestReturn(
    symbol: ITokenSymbols | ILPTokenSymbols | IXAssetLev,
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
  public async getBorrowingCapacity() {
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
  public async getBorrowRatePerBlock() {
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
   * @param {ITokenSymbols | ILPTokenSymbols | IXAssetLev} symbol Symbol of the xToken to burn
   * @param {boolean} sellForEth True, if selling the xToken for ETH or Token0/Token1 `outputAsset` in boolean value
   * @param {string} amount Quantity of the xToken to be traded
   * @returns Expected quantity for selling the given xToken / underlying assets in case of xAssetCLR
   */
  public async getExpectedQuantityOnBurn(
    symbol: ITokenSymbols | ILPTokenSymbols | IXAssetLev,
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
      case X_BTC_3X:
      case X_ETH_3X:
        return getExpectedQuantityOnBurnXAssetLev(
          symbol,
          sellForEth,
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
   * @param {ITokenSymbols | ILPTokenSymbols | IXAssetLev} symbol Symbol of the xToken to be minted
   * @param {boolean} tradeWithEth True, if buying the xToken with ETH or Token0/Token1 `inputAsset` in boolean value
   * @param {string} amount Quantity of the token to be traded
   * @returns Expected quantity of xToken upon minting
   */
  public async getExpectedQuantityOnMint(
    symbol: ITokenSymbols | ILPTokenSymbols | IXAssetLev,
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
      case X_BTC_3X:
      case X_ETH_3X:
        return getExpectedQuantityOnMintXAssetLev(
          symbol,
          tradeWithEth,
          amount,
          this.provider
        )
    }
  }

  /**
   * Get Health Ratio for an address
   * @returns
   */
  public async getHealthRatio() {
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
  public async getLendingMarkets(): Promise<readonly ILendingMarketInfo[]> {
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
  public async getLendingPrice(priceName: ILendingPricing) {
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
  public async getLiquidityPoolItems(): Promise<readonly ILiquidityPoolItem[]> {
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
  public async getLPTBaseValue() {
    return getLPTBaseValue(this.provider)
  }

  /**
   * Get liquidity pool token value
   * @returns
   */
  public async getLPTValue() {
    return getLPTValue(this.provider)
  }

  /**
   * @example
   * ```typescript
   * // Get maximum redeemable tokens for xAAVEa
   * const maxRedeemable = await xToken.getMaxRedeemable('xAAVEa')
   * ```
   *
   * @param {'xAAVEa' | 'xAAVEb' | 'xINCHa' | 'xINCHb' | 'xSNXa' | ILPTokenSymbols | IXAssetCLR | IXAssetLev} symbol Symbol of the xToken
   * @param {IAssetId} outputAsset Sell for Token0/Token1
   * @returns Maximum redeemable tokens for the given xToken
   */
  public async getMaxRedeemable(
    symbol:
      | typeof X_AAVE_A
      | typeof X_AAVE_B
      | typeof X_ALPHA_A
      | typeof X_BNT_A
      | typeof X_INCH_A
      | typeof X_INCH_B
      | typeof X_SNX_A
      | typeof X_U3LP_A
      | typeof X_U3LP_B
      | typeof X_U3LP_C
      | typeof X_U3LP_D
      | typeof X_U3LP_E
      | typeof X_U3LP_F
      | typeof X_U3LP_G
      | typeof X_U3LP_H
      | typeof AAVE_X_AAVE_A_CLR
      | typeof BNT_X_BNT_A_CLR
      | typeof INCH_X_INCH_A_CLR
      | typeof INCH_X_INCH_B_CLR
      | typeof X_AAVE_B_AAVE_CLR
      | typeof X_ALPHA_A_ALPHA_CLR
      | typeof X_KNC_A_KNC_CLR
      | typeof X_KNC_B_KNC_CLR
      | typeof X_SNX_A_SNX_CLR
      | typeof XTK_ETH_CLR
      | typeof X_BTC_3X
      | typeof X_ETH_3X,
    outputAsset?: IAssetId
  ): Promise<string> {
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
      case X_BTC_3X:
      case X_ETH_3X:
        return getMaximumRedeemableXAssetLev(symbol, this.provider)
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
          getPortfolioItemXU3LP(X_U3LP_A, address, this.provider),
          getPortfolioItemXU3LP(X_U3LP_B, address, this.provider),
          getPortfolioItemXAssetLev(X_BTC_3X, address, this.provider),
          getPortfolioItemXAssetLev(X_ETH_3X, address, this.provider),
        ])
      default:
        return []
    }
  }

  /**
   * Get token allowance for an address on ERC20 token or xAssets
   * @returns
   */
  public async getTokenAllowance(
    symbol:
      | INativeAssets
      | ITokenSymbols
      | ILPTokenSymbols
      | IStableAssets
      | typeof LENDING_LPT,
    spenderAddress: string
  ) {
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
  public async getTokenBalance(
    symbol: INativeAssets | ITokenSymbols | IStableAssets | typeof LENDING_LPT
  ) {
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
  public async getTokenSupply(
    symbol: INativeAssets | ITokenSymbols | IStableAssets | typeof LENDING_LPT
  ) {
    return getTokenSupply(symbol, this.provider)
  }

  /**
   * Get updated borrow for an address
   * @returns
   */
  public async getUpdatedBorrowBy() {
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
  public async getTradeEstimateXAssetCLR(
    symbol: IXAssetCLR,
    tradeAsset: IAssetId,
    amount: string,
    tradeType: ITradeType
  ): Promise<ICLRBurnQty | ICLRMintQty> {
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
  public async getXAssetPrices(symbol: ITokenSymbols): Promise<ITokenPrices> {
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
  public async getXAssets(): Promise<readonly IAsset[]> {
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
      default:
        return Promise.reject(new Error(Errors.UNSUPPORTED_NETWORK))
    }
  }

  /**
   * @example
   * ```typescript
   * // Get available xAssetLev tokens list
   * const xAssetLevTokensList = await xToken.getXLevAssets()
   * ```
   *
   * @returns Returns list of all the xAssetLev tokens along with their asset details, AUM & USD price
   */
  public async getXLevAssets(): Promise<readonly ILevAsset[]> {
    const { chainId } = await this.provider.getNetwork()

    switch (chainId) {
      case ChainId.Mainnet:
        return []
      case ChainId.Arbitrum:
        return Promise.all([
          getXAssetLev(X_ETH_3X, this.provider),
          getXAssetLev(X_BTC_3X, this.provider),
          // getXAssetLev(X_LINK_3X, this.provider),
        ])
      default:
        return Promise.reject(new Error(Errors.UNSUPPORTED_NETWORK))
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
  public async getXLPAssets(): Promise<readonly ILPAsset[]> {
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
        return Promise.all([
          getXU3LPAsset(X_U3LP_B, this.provider),
          getXU3LPAsset(X_U3LP_A, this.provider),
        ])
      default:
        return Promise.reject(new Error(Errors.UNSUPPORTED_NETWORK))
    }
  }

  public async lend(amount: string, type: ILendingType) {
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
   * @param {ITokenSymbols | ILPTokenSymbols | IXAssetLev} symbol Symbol of the xAsset to be minted
   * @param {boolean} tradeWithEth Mint with ETH/Token or Token0/Token1 `inputAsset` in boolean value
   * @param {string} amount Quantity of token to be minted,
   *                        tokens need to be approved before minting using [[approve]] method
   * @param {string} affiliate Affiliate address to whom the affiliate fees should be sent to
   * @returns A promise of the transaction response
   */
  public async mint(
    symbol: ITokenSymbols | ILPTokenSymbols | IXAssetLev,
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
      case X_BTC_3X:
      case X_ETH_3X:
        return mintXAssetLev(symbol, tradeWithEth, value, this.provider)
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
  public async mintXAssetCLR(
    symbol: IXAssetCLR,
    inputAsset: IAssetId,
    amount: string
  ): Promise<ContractTransaction> {
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
  public async stakeXtk(amount: string) {
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
  public async unstakeXXtkA(amount: string) {
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
  public async getXtkHistory(type: IHistoryType) {
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
  public async getPoolRatio(symbol: IXAssetCLR) {
    return getPoolRatioXAssetCLR(symbol, this.provider)
  }

  /**
   * Get liquidity pool token utilization and optimal utilization rates
   * @returns
   */
  public async getUtilizationRates() {
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
  public async getFeeFactors() {
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
