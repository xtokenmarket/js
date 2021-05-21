import { AddressZero } from '@ethersproject/constants'
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
  getBancorEstimatedQuantity,
  getBancorPortfolioItem,
} from './blockchain/exchanges/bancor'
import {
  getInchEstimatedQuantity,
  getInchPortfolioItem,
} from './blockchain/exchanges/inch'
import {
  // getUniswapEstimatedQuantity,
  getUniswapPortfolioItem,
} from './blockchain/exchanges/uniswap'
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
   * @param {ITokenSymbols | ILPTokenSymbols} symbol Symbol of the token to be approved
   * @param {string} amount Amount of the token to be approved, MAX_UINT will be used by default
   * @param {IU3LPAssetId} inputAsset Token0/Token1
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
  async burn(symbol, sellForEth, amount) {
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
    if ([X_AAVE_A, X_AAVE_B, X_SNX_A].includes(symbol)) {
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
    } else if ([X_KNC_A, X_KNC_B].includes(symbol)) {
      dexSource = Exchange.UNISWAP
      // TODO: Enable after Kyber V3 upgrade fixes
      /*dexExpectedQty = await getUniswapEstimatedQuantity(
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              tradeWithEth ? ETH : symbol,
              symbol,
              amount,
              tradeType,
              this.provider
            )*/
    } else if (symbol === X_BNT_A) {
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
      getBalancerPortfolioItem(X_SNX_A, address, this.provider),
      getBalancerPortfolioItem(X_AAVE_A, address, this.provider),
      getBalancerPortfolioItem(X_AAVE_B, address, this.provider),
      getInchPortfolioItem(X_INCH_A, address, this.provider),
      getInchPortfolioItem(X_INCH_B, address, this.provider),
      getUniswapPortfolioItem(X_KNC_A, address, this.provider),
      getUniswapPortfolioItem(X_KNC_B, address, this.provider),
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
  async getMaxRedeemable(symbol) {
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
  async getXLPAssets() {
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
        return mintXU3LP(symbol, tradeWithEth ? 1 : 0, value, this.provider)
    }
  }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieFRva2VuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3hUb2tlbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMEJBQTBCLENBQUE7QUFHdEQsT0FBTyxFQUNMLEdBQUcsRUFDSCxHQUFHLEVBQ0gsUUFBUSxFQUNSLFFBQVEsRUFDUixPQUFPLEVBQ1AsUUFBUSxFQUNSLFFBQVEsRUFDUixPQUFPLEVBQ1AsT0FBTyxFQUNQLE9BQU8sRUFDUCxRQUFRLEVBQ1IsUUFBUSxFQUNSLFFBQVEsRUFDUixRQUFRLEdBQ1QsTUFBTSxjQUFjLENBQUE7QUFDckIsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQTtBQUV4RCxPQUFPLEVBQ0wsNEJBQTRCLEVBQzVCLHdCQUF3QixHQUN6QixNQUFNLGlDQUFpQyxDQUFBO0FBQ3hDLE9BQU8sRUFDTCwwQkFBMEIsRUFDMUIsc0JBQXNCLEdBQ3ZCLE1BQU0sK0JBQStCLENBQUE7QUFDdEMsT0FBTyxFQUNMLHdCQUF3QixFQUN4QixvQkFBb0IsR0FDckIsTUFBTSw2QkFBNkIsQ0FBQTtBQUNwQyxPQUFPO0FBQ0wsK0JBQStCO0FBQy9CLHVCQUF1QixHQUN4QixNQUFNLGdDQUFnQyxDQUFBO0FBQ3ZDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG9CQUFvQixDQUFBO0FBQ3JELE9BQU8sRUFDTCxZQUFZLEVBQ1osU0FBUyxFQUNULDhCQUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIseUJBQXlCLEVBQ3pCLHFCQUFxQixFQUNyQixTQUFTLEdBQ1YsTUFBTSxvQkFBb0IsQ0FBQTtBQUMzQixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMEJBQTBCLENBQUE7QUFDeEQsT0FBTyxFQUNMLFdBQVcsRUFDWCxRQUFRLEVBQ1IsNkJBQTZCLEVBQzdCLDZCQUE2QixFQUM3Qix3QkFBd0IsRUFDeEIsb0JBQW9CLEVBQ3BCLFFB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
