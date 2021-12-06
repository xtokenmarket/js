"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XToken = void 0;
const constants_1 = require("@ethersproject/constants");
const units_1 = require("@ethersproject/units");
const abis_1 = require("@xtoken/abis");
const utils_1 = require("ethers/lib/utils");
const clr_1 = require("./blockchain/clr");
const erc20_1 = require("./blockchain/erc20");
const supply_1 = require("./blockchain/erc20/supply");
const balancer_1 = require("./blockchain/exchanges/balancer");
const balancerV2_1 = require("./blockchain/exchanges/balancerV2");
const bancor_1 = require("./blockchain/exchanges/bancor");
const inch_1 = require("./blockchain/exchanges/inch");
const kyber_1 = require("./blockchain/exchanges/kyber");
const uniswapV3_1 = require("./blockchain/exchanges/uniswapV3");
const lending_1 = require("./blockchain/lending");
const lev_1 = require("./blockchain/lev");
const staking_1 = require("./blockchain/staking");
const utils_2 = require("./blockchain/utils");
const xaave_1 = require("./blockchain/xaave");
const xalpha_1 = require("./blockchain/xalpha");
const xbnt_1 = require("./blockchain/xbnt");
const xinch_1 = require("./blockchain/xinch");
const xknc_1 = require("./blockchain/xknc");
const xsnx_1 = require("./blockchain/xsnx");
const xu3lp_1 = require("./blockchain/xu3lp");
const constants_2 = require("./constants");
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
        this.provider = provider;
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
        const value = amount ? utils_1.parseEther(amount) : constants_2.MAX_UINT;
        if (spenderAddress && !utils_1.isAddress(spenderAddress)) {
            return Promise.reject(new Error(constants_2.Errors.INVALID_USER_ADDRESS));
        }
        switch (symbol) {
            case abis_1.X_AAVE_A:
            case abis_1.X_AAVE_B:
                return xaave_1.approveXAave(symbol, value, this.provider, spenderAddress);
            case abis_1.X_ALPHA_A:
                return xalpha_1.approveXAlpha(symbol, value, this.provider, spenderAddress);
            case abis_1.X_BNT_A:
                return xbnt_1.approveXBnt(symbol, value, this.provider, spenderAddress);
            case abis_1.X_INCH_A:
            case abis_1.X_INCH_B:
                return xinch_1.approveXInch(symbol, value, this.provider, spenderAddress);
            case abis_1.X_KNC_A:
            case abis_1.X_KNC_B:
                return xknc_1.approveXKnc(symbol, value, this.provider, spenderAddress);
            case abis_1.X_SNX_A:
                return xsnx_1.approveXSnx(value, this.provider, spenderAddress);
            case abis_1.X_U3LP_A:
            case abis_1.X_U3LP_B:
            case abis_1.X_U3LP_C:
            case abis_1.X_U3LP_D:
            case abis_1.X_U3LP_E:
            case abis_1.X_U3LP_F:
            case abis_1.X_U3LP_G:
            case abis_1.X_U3LP_H:
                return xu3lp_1.approveXU3LP(symbol, value, inputAsset || 0, this.provider);
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
                return clr_1.approveXAssetCLR(symbol, value, inputAsset || 0, this.provider);
            case abis_1.X_BTC_3X:
            case abis_1.X_ETH_3X:
                return lev_1.approveXAssetLev(symbol, value, this.provider, spenderAddress);
            default:
                if (!spenderAddress) {
                    return Promise.reject(new Error(constants_2.Errors.INVALID_USER_ADDRESS));
                }
                return erc20_1.approveErc20(symbol, value, spenderAddress, this.provider);
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
        const value = amount ? units_1.parseUnits(amount, 6) : constants_2.MAX_UINT;
        return lending_1.approveUsdc(value, this.provider);
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
        const value = amount ? utils_1.parseEther(amount) : constants_2.MAX_UINT;
        return staking_1.approveXtk(value, this.provider);
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
    async burn(symbol, sellForEth, amount) {
        if (+amount === 0 || isNaN(+amount)) {
            return Promise.reject(new Error('Invalid value for amount'));
        }
        const value = utils_1.parseEther(amount);
        if (symbol !== abis_1.X_KNC_A && symbol !== abis_1.X_KNC_B) {
            const maxRedeemable = utils_1.parseEther(await this.getMaxRedeemable(symbol, sellForEth ? 1 : 0));
            if (value.gt(maxRedeemable)) {
                return Promise.reject(new Error('Specified amount exceeds maximum redeemable tokens'));
            }
        }
        switch (symbol) {
            case abis_1.X_AAVE_A:
            case abis_1.X_AAVE_B:
                return xaave_1.burnXAave(symbol, sellForEth, value, this.provider);
            case abis_1.X_ALPHA_A:
                return xalpha_1.burnXAlpha(symbol, sellForEth, value, this.provider);
            case abis_1.X_BNT_A:
                return xbnt_1.burnXBnt(symbol, sellForEth, value, this.provider);
            case abis_1.X_INCH_A:
            case abis_1.X_INCH_B:
                return xinch_1.burnXInch(symbol, sellForEth, value, this.provider);
            case abis_1.X_KNC_A:
            case abis_1.X_KNC_B:
                return xknc_1.burnXKnc(symbol, sellForEth, value, this.provider);
            case abis_1.X_SNX_A:
                return xsnx_1.burnXSnx(value, this.provider);
            case abis_1.X_U3LP_A:
            case abis_1.X_U3LP_B:
            case abis_1.X_U3LP_C:
            case abis_1.X_U3LP_D:
            case abis_1.X_U3LP_E:
            case abis_1.X_U3LP_F:
            case abis_1.X_U3LP_G:
            case abis_1.X_U3LP_H:
                return xu3lp_1.burnXU3LP(symbol, sellForEth ? 1 : 0, value, this.provider);
            case abis_1.X_BTC_3X:
            case abis_1.X_ETH_3X:
                return lev_1.burnXAssetLev(symbol, sellForEth, value, this.provider);
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
            return Promise.reject(new Error('Invalid value for amount'));
        }
        const value = utils_1.parseEther(amount);
        const maxRedeemable = utils_1.parseEther(await this.getMaxRedeemable(symbol));
        if (value.gt(maxRedeemable)) {
            return Promise.reject(new Error('Specified amount exceeds maximum redeemable tokens'));
        }
        return clr_1.burnXAssetCLR(symbol, value, this.provider);
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
            return Promise.reject(new Error(constants_2.Errors.INVALID_AMOUNT_VALUE));
        }
        const value = marketName === abis_1.LENDING_WBTC_MARKET
            ? units_1.parseUnits(amount, 8)
            : utils_1.parseEther(amount);
        switch (type) {
            case abis_1.SUPPLY:
                return lending_1.supplyCollateral(marketName, value, this.provider);
            case abis_1.WITHDRAW:
                return lending_1.withdrawCollateral(marketName, value, this.provider);
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
    async getBestReturn(symbol, tradeWithEth, amount, tradeType) {
        if (+amount === 0 || isNaN(+amount)) {
            return Promise.reject(new Error('Invalid value for amount'));
        }
        let dexExpectedQty = '0';
        let dexSource = constants_2.Exchange.KYBER;
        let xTokenExpectedQty;
        if (tradeType === abis_1.BUY) {
            xTokenExpectedQty = await this.getExpectedQuantityOnMint(symbol, tradeWithEth, amount);
        }
        else {
            xTokenExpectedQty = await this.getExpectedQuantityOnBurn(symbol, tradeWithEth, amount);
        }
        const xTokenReturn = {
            expectedQuantity: xTokenExpectedQty,
            source: constants_2.Exchange.XTOKEN,
        };
        if ((symbol === abis_1.X_AAVE_A || symbol === abis_1.X_ALPHA_A) && !tradeWithEth) {
            dexSource = constants_2.Exchange.UNISWAP_V3;
            dexExpectedQty = await uniswapV3_1.getUniswapV3EstimatedQty(symbol, symbol, amount, tradeType, undefined, this.provider);
        }
        else if (symbol === abis_1.X_AAVE_B) {
            dexSource = constants_2.Exchange.BALANCER;
            dexExpectedQty = await balancer_1.getBalancerEstimatedQuantity(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            tradeWithEth ? abis_1.ETH : symbol, symbol, amount, tradeType, this.provider);
        }
        else if ([abis_1.X_INCH_A, abis_1.X_INCH_B].includes(symbol)) {
            dexSource = constants_2.Exchange.INCH;
            dexExpectedQty = await inch_1.getInchEstimatedQuantity(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            tradeWithEth ? abis_1.ETH : symbol, symbol, amount, tradeType, this.provider);
        }
        else if (symbol === abis_1.X_KNC_A) {
            dexSource = constants_2.Exchange.KYBER;
            dexExpectedQty = await kyber_1.getKyberEstimatedQuantity(tradeWithEth ? abis_1.ETH : symbol, symbol, amount, tradeType, this.provider);
        }
        else if (symbol === abis_1.X_SNX_A) {
            dexSource = constants_2.Exchange.BALANCER;
            dexExpectedQty = await balancerV2_1.getBalancerV2EstimatedQuantity(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            tradeWithEth ? abis_1.ETH : symbol, symbol, amount, tradeType, this.provider);
        }
        const dexReturn = {
            expectedQuantity: dexExpectedQty,
            source: dexSource,
        };
        let bestReturn = xTokenReturn;
        if (utils_1.parseEther(xTokenExpectedQty).lt(utils_1.parseEther(dexExpectedQty))) {
            bestReturn = dexReturn;
        }
        return {
            best: bestReturn,
            estimates: [xTokenReturn, dexReturn],
        };
    }
    /**
     * Get Borrowing Capacity for an address
     * @returns
     */
    async getBorrowingCapacity() {
        const address = await utils_2.getSignerAddress(this.provider);
        if (!address || !utils_1.isAddress(address)) {
            return Promise.reject(new Error(constants_2.Errors.INVALID_USER_ADDRESS));
        }
        return lending_1.getBorrowingCapacity(address, this.provider);
    }
    /**
     * Get Borrow rate per block of Liquidity Pool contract
     * @returns
     */
    async getBorrowRatePerBlock() {
        return lending_1.getBorrowRatePerBlock(this.provider);
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
    async getExpectedQuantityOnBurn(symbol, sellForEth, amount) {
        if (+amount === 0 || isNaN(+amount)) {
            return Promise.reject(new Error('Invalid value for amount'));
        }
        switch (symbol) {
            case abis_1.X_AAVE_A:
            case abis_1.X_AAVE_B:
                return xaave_1.getExpectedQuantityOnBurnXAave(symbol, sellForEth, amount, this.provider);
            case abis_1.X_ALPHA_A:
                return xalpha_1.getExpectedQuantityOnBurnXAlpha(symbol, sellForEth, amount, this.provider);
            case abis_1.X_BNT_A:
                return xbnt_1.getExpectedQuantityOnBurnXBnt(symbol, sellForEth, amount, this.provider);
            case abis_1.X_INCH_A:
            case abis_1.X_INCH_B:
                return xinch_1.getExpectedQuantityOnBurnXInch(symbol, sellForEth, amount, this.provider);
            case abis_1.X_KNC_A:
            case abis_1.X_KNC_B:
                return xknc_1.getExpectedQuantityOnBurnXKnc(symbol, sellForEth, amount, this.provider);
            case abis_1.X_SNX_A:
                return xsnx_1.getExpectedQuantityOnBurnXSnx(amount, this.provider);
            case abis_1.X_U3LP_A:
            case abis_1.X_U3LP_B:
            case abis_1.X_U3LP_C:
            case abis_1.X_U3LP_D:
            case abis_1.X_U3LP_E:
            case abis_1.X_U3LP_F:
            case abis_1.X_U3LP_G:
            case abis_1.X_U3LP_H:
                return xu3lp_1.getExpectedQuantityOnBurnXU3LP(symbol, sellForEth ? 1 : 0, amount, this.provider);
            case abis_1.X_BTC_3X:
            case abis_1.X_ETH_3X:
                return lev_1.getExpectedQuantityOnBurnXAssetLev(symbol, sellForEth, amount, this.provider);
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
    async getExpectedQuantityOnMint(symbol, tradeWithEth, amount) {
        if (+amount === 0 || isNaN(+amount)) {
            return Promise.reject(new Error('Invalid value for amount'));
        }
        switch (symbol) {
            case abis_1.X_AAVE_A:
            case abis_1.X_AAVE_B:
                return xaave_1.getExpectedQuantityOnMintXAave(symbol, tradeWithEth, amount, this.provider);
            case abis_1.X_ALPHA_A:
                return xalpha_1.getExpectedQuantityOnMintXAlpha(symbol, tradeWithEth, amount, this.provider);
            case abis_1.X_BNT_A:
                return xbnt_1.getExpectedQuantityOnMintXBnt(symbol, tradeWithEth, amount, this.provider);
            case abis_1.X_INCH_A:
            case abis_1.X_INCH_B:
                return xinch_1.getExpectedQuantityOnMintXInch(symbol, tradeWithEth, amount, this.provider);
            case abis_1.X_KNC_A:
            case abis_1.X_KNC_B:
                return xknc_1.getExpectedQuantityOnMintXKnc(symbol, tradeWithEth, amount, this.provider);
            case abis_1.X_SNX_A:
                return xsnx_1.getExpectedQuantityOnMintXSnx(tradeWithEth, amount, this.provider);
            case abis_1.X_U3LP_A:
            case abis_1.X_U3LP_B:
            case abis_1.X_U3LP_C:
            case abis_1.X_U3LP_D:
            case abis_1.X_U3LP_E:
            case abis_1.X_U3LP_F:
            case abis_1.X_U3LP_G:
            case abis_1.X_U3LP_H:
                return xu3lp_1.getExpectedQuantityOnMintXU3LP(symbol, tradeWithEth ? 1 : 0, amount, this.provider);
            case abis_1.X_BTC_3X:
            case abis_1.X_ETH_3X:
                return lev_1.getExpectedQuantityOnMintXAssetLev(symbol, tradeWithEth, amount, this.provider);
        }
    }
    /**
     * Get Health Ratio for an address
     * @returns
     */
    async getHealthRatio() {
        const address = await utils_2.getSignerAddress(this.provider);
        if (!address || !utils_1.isAddress(address)) {
            return Promise.reject(new Error(constants_2.Errors.INVALID_USER_ADDRESS));
        }
        return lending_1.getHealthRatio(address, this.provider);
    }
    /**
     * Get all Lending Markets info along with xAsset symbol, collateral and total value in USD
     * @returns
     */
    async getLendingMarkets() {
        const address = await utils_2.getSignerAddress(this.provider);
        if (!address || !utils_1.isAddress(address)) {
            return Promise.reject(new Error(constants_2.Errors.INVALID_USER_ADDRESS));
        }
        return lending_1.getLendingMarkets(address, this.provider);
    }
    /**
     * Get xAsset Lending Price
     * @returns
     */
    async getLendingPrice(priceName) {
        return lending_1.getLendingPrice(priceName, this.provider);
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
        const address = await utils_2.getSignerAddress(this.provider);
        if (!address || !utils_1.isAddress(address)) {
            return Promise.reject(new Error(constants_2.Errors.INVALID_USER_ADDRESS));
        }
        const { chainId } = await this.provider.getNetwork();
        switch (chainId) {
            case constants_2.ChainId.Mainnet:
                return Promise.all([
                    balancerV2_1.getBalancerV2PortfolioItem(abis_1.X_SNX_A, address, this.provider),
                    balancer_1.getBalancerPortfolioItem(abis_1.X_AAVE_A, address, this.provider),
                    balancer_1.getBalancerPortfolioItem(abis_1.X_AAVE_B, address, this.provider),
                    kyber_1.getKyberPortfolioItem(abis_1.X_KNC_A, address, this.provider),
                    bancor_1.getBancorPortfolioItem(abis_1.X_BNT_A, address, this.provider),
                ]);
            case constants_2.ChainId.Arbitrum:
                return [];
            default:
                return [];
        }
    }
    /**
     * Get liquidity pool token base value
     * @returns
     */
    async getLPTBaseValue() {
        return lending_1.getLPTBaseValue(this.provider);
    }
    /**
     * Get liquidity pool token value
     * @returns
     */
    async getLPTValue() {
        return lending_1.getLPTValue(this.provider);
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
    async getMaxRedeemable(symbol, outputAsset) {
        switch (symbol) {
            case abis_1.X_AAVE_A:
            case abis_1.X_AAVE_B:
                return xaave_1.getMaximumRedeemableXAave(symbol, this.provider);
            case abis_1.X_ALPHA_A:
                return xalpha_1.getMaximumRedeemableXAlpha(symbol, this.provider);
            case abis_1.X_BNT_A:
                return xbnt_1.getMaximumRedeemableXBnt(symbol, this.provider);
            case abis_1.X_INCH_A:
            case abis_1.X_INCH_B:
                return xinch_1.getMaximumRedeemableXInch(symbol, this.provider);
            case abis_1.X_SNX_A:
                return xsnx_1.getMaximumRedeemableXSnx(this.provider);
            case abis_1.X_U3LP_A:
            case abis_1.X_U3LP_B:
            case abis_1.X_U3LP_C:
            case abis_1.X_U3LP_D:
            case abis_1.X_U3LP_E:
            case abis_1.X_U3LP_F:
            case abis_1.X_U3LP_G:
            case abis_1.X_U3LP_H:
                return xu3lp_1.getMaximumRedeemableXU3LP(symbol, outputAsset || 0, this.provider);
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
                return clr_1.getMaximumRedeemableXAssetCLR(symbol, this.provider);
            case abis_1.X_BTC_3X:
            case abis_1.X_ETH_3X:
                return lev_1.getMaximumRedeemableXAssetLev(symbol, this.provider);
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
        const address = await utils_2.getSignerAddress(this.provider);
        if (!address || !utils_1.isAddress(address)) {
            return Promise.reject(new Error(constants_2.Errors.INVALID_USER_ADDRESS));
        }
        const { chainId } = await this.provider.getNetwork();
        switch (chainId) {
            case constants_2.ChainId.Mainnet:
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
                ]);
            case constants_2.ChainId.Arbitrum:
                return Promise.all([
                    xu3lp_1.getPortfolioItemXU3LP(abis_1.X_U3LP_B, address, this.provider),
                    lev_1.getPortfolioItemXAssetLev(abis_1.X_BTC_3X, address, this.provider),
                    lev_1.getPortfolioItemXAssetLev(abis_1.X_ETH_3X, address, this.provider),
                ]);
            default:
                return [];
        }
    }
    /**
     * Get token allowance for an address on ERC20 token or xAssets
     * @returns
     */
    async getTokenAllowance(symbol, spenderAddress) {
        const address = await utils_2.getSignerAddress(this.provider);
        if (!address || !utils_1.isAddress(address) || !utils_1.isAddress(spenderAddress)) {
            return Promise.reject(new Error(constants_2.Errors.INVALID_USER_ADDRESS));
        }
        return erc20_1.getTokenAllowance(symbol, address, spenderAddress, this.provider);
    }
    /**
     * Get token balance for an address of ERC20 token or xAssets
     * @returns
     */
    async getTokenBalance(symbol) {
        const address = await utils_2.getSignerAddress(this.provider);
        if (!address || !utils_1.isAddress(address)) {
            return Promise.reject(new Error(constants_2.Errors.INVALID_USER_ADDRESS));
        }
        return erc20_1.getTokenBalance(symbol, address, this.provider);
    }
    /**
     * Get token supply of ERC20 token or xAssets
     * @returns
     */
    async getTokenSupply(symbol) {
        return supply_1.getTokenSupply(symbol, this.provider);
    }
    /**
     * Get updated borrow for an address
     * @returns
     */
    async getUpdatedBorrowBy() {
        const address = await utils_2.getSignerAddress(this.provider);
        if (!address || !utils_1.isAddress(address)) {
            return Promise.reject(new Error(constants_2.Errors.INVALID_USER_ADDRESS));
        }
        return lending_1.getUpdatedBorrowBy(address, this.provider);
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
            return Promise.reject(new Error('Invalid value for amount'));
        }
        let expectedQty;
        if (tradeType === abis_1.BUY) {
            expectedQty = await clr_1.getExpectedQuantityOnMintXAssetCLR(symbol, tradeAsset, amount, this.provider);
        }
        else {
            expectedQty = await clr_1.getExpectedQuantityOnBurnXAssetCLR(symbol, amount, this.provider);
        }
        return expectedQty;
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
        return utils_2.getXAssetPrices(symbol, this.provider);
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
        const { chainId } = await this.provider.getNetwork();
        switch (chainId) {
            case constants_2.ChainId.Mainnet:
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
                ]);
            case constants_2.ChainId.Arbitrum:
                return [];
            case constants_2.ChainId.ArbitrumTestnet:
                return [];
            default:
                return Promise.reject(new Error(constants_2.Errors.UNSUPPORTED_NETWORK));
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
    async getXLevAssets() {
        const { chainId } = await this.provider.getNetwork();
        switch (chainId) {
            case constants_2.ChainId.Mainnet:
                return [];
            case constants_2.ChainId.Arbitrum:
                return Promise.all([
                    lev_1.getXAssetLev(abis_1.X_BTC_3X, this.provider),
                    lev_1.getXAssetLev(abis_1.X_ETH_3X, this.provider),
                ]);
            default:
                return Promise.reject(new Error(constants_2.Errors.UNSUPPORTED_NETWORK));
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
        const { chainId } = await this.provider.getNetwork();
        switch (chainId) {
            case constants_2.ChainId.Mainnet:
                return Promise.all([
                    xu3lp_1.getXU3LPAsset(abis_1.X_U3LP_H, this.provider),
                    xu3lp_1.getXU3LPAsset(abis_1.X_U3LP_G, this.provider),
                    xu3lp_1.getXU3LPAsset(abis_1.X_U3LP_F, this.provider),
                    xu3lp_1.getXU3LPAsset(abis_1.X_U3LP_E, this.provider),
                    xu3lp_1.getXU3LPAsset(abis_1.X_U3LP_D, this.provider),
                    xu3lp_1.getXU3LPAsset(abis_1.X_U3LP_C, this.provider),
                    xu3lp_1.getXU3LPAsset(abis_1.X_U3LP_B, this.provider),
                    xu3lp_1.getXU3LPAsset(abis_1.X_U3LP_A, this.provider),
                ]);
            case constants_2.ChainId.Arbitrum:
                return Promise.all([xu3lp_1.getXU3LPAsset(abis_1.X_U3LP_B, this.provider)]);
            case constants_2.ChainId.ArbitrumTestnet:
                return Promise.all([xu3lp_1.getXU3LPAsset(abis_1.X_U3LP_B, this.provider)]);
            default:
                return Promise.reject(new Error(constants_2.Errors.UNSUPPORTED_NETWORK));
        }
    }
    async lend(amount, type) {
        if (+amount === 0 || isNaN(+amount)) {
            return Promise.reject(new Error(constants_2.Errors.INVALID_AMOUNT_VALUE));
        }
        const value = units_1.parseUnits(amount, 6);
        switch (type) {
            case abis_1.BORROW:
                return lending_1.borrowLiquidity(value, this.provider);
            case abis_1.REPAY:
                return lending_1.repayLiquidity(value, this.provider);
            case abis_1.SUPPLY:
                return lending_1.supplyLiquidity(value, this.provider);
            case abis_1.WITHDRAW:
                return lending_1.withdrawLiquidity(value, this.provider);
            default:
                return Promise.reject(new Error('Invalid lending type specified'));
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
    async mint(symbol, tradeWithEth, amount, affiliate = constants_1.AddressZero) {
        if (+amount === 0 || isNaN(+amount)) {
            return Promise.reject(new Error('Invalid value for amount'));
        }
        const value = utils_1.parseEther(amount);
        switch (symbol) {
            case abis_1.X_AAVE_A:
            case abis_1.X_AAVE_B:
                return xaave_1.mintXAave(symbol, tradeWithEth, value, affiliate, this.provider);
            case abis_1.X_ALPHA_A:
                return xalpha_1.mintXAlpha(symbol, tradeWithEth, value, this.provider);
            case abis_1.X_BNT_A:
                return xbnt_1.mintXBnt(symbol, tradeWithEth, value, this.provider);
            case abis_1.X_INCH_A:
            case abis_1.X_INCH_B:
                return xinch_1.mintXInch(symbol, tradeWithEth, value, this.provider);
            case abis_1.X_KNC_A:
            case abis_1.X_KNC_B:
                return xknc_1.mintXKnc(symbol, tradeWithEth, value, this.provider);
            case abis_1.X_SNX_A:
                return xsnx_1.mintXSnx(tradeWithEth, value, this.provider);
            case abis_1.X_U3LP_A:
            case abis_1.X_U3LP_B:
            case abis_1.X_U3LP_C:
            case abis_1.X_U3LP_D:
            case abis_1.X_U3LP_E:
            case abis_1.X_U3LP_F:
            case abis_1.X_U3LP_G:
            case abis_1.X_U3LP_H:
                return xu3lp_1.mintXU3LP(symbol, tradeWithEth ? 1 : 0, value, this.provider);
            case abis_1.X_BTC_3X:
            case abis_1.X_ETH_3X:
                return lev_1.mintXAssetLev(symbol, tradeWithEth, value, this.provider);
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
            return Promise.reject(new Error('Invalid value for amount'));
        }
        const value = utils_1.parseEther(amount);
        return clr_1.mintXAssetCLR(symbol, inputAsset, value, this.provider);
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
            return Promise.reject(new Error('Invalid value for amount'));
        }
        return staking_1.stakeXtk(amount, this.provider);
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
            return Promise.reject(new Error('Invalid value for amount'));
        }
        return staking_1.unstakeXXtkA(amount, this.provider);
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
        const address = await utils_2.getSignerAddress(this.provider);
        if (!address || !utils_1.isAddress(address)) {
            return Promise.reject(new Error(constants_2.Errors.INVALID_USER_ADDRESS));
        }
        return staking_1.getXtkHistory(type, address, this.provider);
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
        return clr_1.getPoolRatioXAssetCLR(symbol, this.provider);
    }
    /**
     * Get liquidity pool token utilization and optimal utilization rates
     * @returns
     */
    async getUtilizationRates() {
        const [utilizationRate, optimalUtilizationRate] = await Promise.all([
            lending_1.getUtilizationRate(this.provider),
            lending_1.getOptimalUtilizationRate(this.provider),
        ]);
        return {
            optimalUtilizationRate,
            utilizationRate,
        };
    }
    /**
     * Get Lending reserveFee and xtkFee factors
     * @returns
     */
    async getFeeFactors() {
        const [reserveFactor, xtkFeeFactor] = await Promise.all([
            lending_1.getReserveFactor(this.provider),
            lending_1.getXtkFeeFactor(this.provider),
        ]);
        return {
            reserveFactor,
            xtkFeeFactor,
        };
    }
}
exports.XToken = XToken;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieFRva2VuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3hUb2tlbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx3REFBc0Q7QUFHdEQsZ0RBQWlEO0FBQ2pELHVDQXVDcUI7QUFDckIsNENBQXdEO0FBRXhELDBDQVF5QjtBQUN6Qiw4Q0FJMkI7QUFDM0Isc0RBQTBEO0FBQzFELDhEQUd3QztBQUN4QyxrRUFHMEM7QUFDMUMsMERBQXNFO0FBQ3RFLHNEQUFzRTtBQUN0RSx3REFHcUM7QUFDckMsZ0VBQTJFO0FBQzNFLGtEQW9CNkI7QUFDN0IsMENBU3lCO0FBQ3pCLGtEQUs2QjtBQUM3Qiw4Q0FBc0U7QUFDdEUsOENBUzJCO0FBQzNCLGdEQVM0QjtBQUM1Qiw0Q0FTMEI7QUFDMUIsOENBUzJCO0FBQzNCLDRDQVEwQjtBQUMxQiw0Q0FTMEI7QUFDMUIsOENBUzJCO0FBQzNCLDJDQUFpRTtBQTJCakU7Ozs7Ozs7Ozs7OztHQVlHO0FBQ0gsTUFBYSxNQUFNO0lBR2pCOztPQUVHO0lBQ0gsWUFBWSxRQUFzQjtRQUNoQyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQTtJQUMxQixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7O09BY0c7SUFDSSxLQUFLLENBQUMsT0FBTyxDQUNsQixNQUtjLEVBQ2QsTUFBZSxFQUNmLFVBQXFCLEVBQ3JCLGNBQXVCO1FBRXZCLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsa0JBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsb0JBQVEsQ0FBQTtRQUVwRCxJQUFJLGNBQWMsSUFBSSxDQUFDLGlCQUFTLENBQUMsY0FBYyxDQUFDLEVBQUU7WUFDaEQsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLGtCQUFNLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFBO1NBQzlEO1FBRUQsUUFBUSxNQUFNLEVBQUU7WUFDZCxLQUFLLGVBQVEsQ0FBQztZ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