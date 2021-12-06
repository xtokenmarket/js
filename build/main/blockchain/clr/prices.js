"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getXAssetCLRTokenPrices = exports.getXAssetCLRPrices = void 0;
const abis_1 = require("@xtoken/abis");
const ethers_1 = require("ethers");
const utils_1 = require("ethers/lib/utils");
const constants_1 = require("../../constants");
const utils_2 = require("../../utils");
const uniswap_1 = require("../exchanges/uniswap");
const utils_3 = require("../utils");
/**
 * @example
 * ```typescript
 * import { ethers } from 'ethers'
 * import { Abi, ADDRESSES, AAVE_X_AAVE_A_CLR } from '@xtoken/abis'
 * import { getXAssetCLRPrices } from '@xtoken/js'
 *
 * const provider = new ethers.providers.InfuraProvider('homestead', <INFURA_API_KEY>)
 * const xAssetCLRContract = new ethers.Contract(ADDRESSES[AAVE_X_AAVE_A_CLR][chainId], Abi.xAssetCLR, provider)
 *
 * const { priceEth, priceUsd } = await getXAssetCLRPrices(xAssetCLRContract)
 * ```
 *
 * @param {XAssetCLR} xAssetCLRContract xAssetCLR token contract
 * @returns A promise of the token prices in ETH/USD along with AUM
 */
const getXAssetCLRPrices = async (xAssetCLRContract) => {
    try {
        const [symbol, { token0Price, token1Price }, stakedTokenBalances, bufferTokenBalances, xAssetCLRTotalSupply, ethUsdcPrice,] = await Promise.all([
            xAssetCLRContract.symbol(),
            exports.getXAssetCLRTokenPrices(xAssetCLRContract),
            xAssetCLRContract.getStakedTokenBalance(),
            xAssetCLRContract.getBufferTokenBalance(),
            xAssetCLRContract.totalSupply(),
            uniswap_1.getEthUsdcPrice(xAssetCLRContract.provider),
        ]);
        const assets = utils_3.getXAssetCLRTokenSymbol(symbol);
        const token0Balance = stakedTokenBalances.amount0.add(bufferTokenBalances.amount0);
        const token1Balance = stakedTokenBalances.amount1.add(bufferTokenBalances.amount1);
        let isToken0 = true;
        let aum = ethers_1.BigNumber.from('0');
        switch (symbol) {
            case abis_1.X_AAVE_B_AAVE_CLR:
            case abis_1.X_ALPHA_A_ALPHA_CLR:
            case abis_1.X_KNC_A_KNC_CLR:
            case abis_1.X_KNC_B_KNC_CLR:
            case abis_1.X_SNX_A_SNX_CLR:
                aum = token1Balance.mul(token1Price).div(constants_1.DEC_18).add(token0Balance);
                break;
            case abis_1.AAVE_X_AAVE_A_CLR:
            case abis_1.BNT_X_BNT_A_CLR:
            case abis_1.INCH_X_INCH_A_CLR:
            case abis_1.INCH_X_INCH_B_CLR:
            case abis_1.XTK_ETH_CLR:
                isToken0 = false;
                aum = token0Balance.mul(token0Price).div(constants_1.DEC_18).add(token1Balance);
                break;
        }
        let priceEth;
        let priceUsd;
        if (symbol === abis_1.XTK_ETH_CLR) {
            priceEth = aum.mul(constants_1.DEC_18).div(xAssetCLRTotalSupply);
            priceUsd = priceEth.mul(utils_1.parseEther(ethUsdcPrice)).div(constants_1.DEC_18);
            // Convert AUM to USD from ETH
            aum = aum.mul(utils_1.parseEther(ethUsdcPrice));
        }
        else {
            const { priceUsd: xAssetPriceUsd } = await utils_3.getXAssetPrices((isToken0 ? assets[0] : assets[1]), xAssetCLRContract.provider);
            aum = aum.mul(utils_1.parseEther(xAssetPriceUsd.toString()));
            priceUsd = aum.div(xAssetCLRTotalSupply);
            priceEth = priceUsd.mul(constants_1.DEC_18).div(utils_1.parseEther(ethUsdcPrice));
        }
        return {
            aum: utils_2.formatNumber(utils_1.formatEther(aum.div(constants_1.DEC_18))),
            priceBtc: 0,
            priceEth: utils_2.formatNumber(utils_1.formatEther(priceEth), 6),
            priceUsd: utils_2.formatNumber(utils_1.formatEther(priceUsd)),
        };
    }
    catch (e) {
        console.error('Error while fetching token price:', e);
        return constants_1.DEFAULT_PRICES;
    }
};
exports.getXAssetCLRPrices = getXAssetCLRPrices;
const getXAssetCLRTokenPrices = async (XAssetCLR) => {
    try {
        const [asset0Price, asset1Price] = await Promise.all([
            XAssetCLR.getAsset0Price(),
            XAssetCLR.getAsset1Price(),
        ]);
        const token0Price = utils_2.getTWAP(asset0Price);
        const token1Price = utils_2.getTWAP(asset1Price);
        return {
            token0Price,
            token1Price,
        };
    }
    catch (e) {
        console.error('Error while fetching token price:', e);
        return constants_1.DEFAULT_TOKEN_PRICES;
    }
};
exports.getXAssetCLRTokenPrices = getXAssetCLRTokenPrices;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpY2VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4vY2xyL3ByaWNlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSx1Q0FXcUI7QUFDckIsbUNBQWtDO0FBQ2xDLDRDQUEwRDtBQUUxRCwrQ0FBOEU7QUFHOUUsdUNBQW1EO0FBQ25ELGtEQUFzRDtBQUN0RCxvQ0FBbUU7QUFFbkU7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBQ0ksTUFBTSxrQkFBa0IsR0FBRyxLQUFLLEVBQ3JDLGlCQUE0QixFQUNMLEVBQUU7SUFDekIsSUFBSTtRQUNGLE1BQU0sQ0FDSixNQUFNLEVBQ04sRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLEVBQzVCLG1CQUFtQixFQUNuQixtQkFBbUIsRUFDbkIsb0JBQW9CLEVBQ3BCLFlBQVksRUFDYixHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQztZQUNwQixpQkFBaUIsQ0FBQyxNQUFNLEVBQUU7WUFDMUIsK0JBQXVCLENBQUMsaUJBQWlCLENBQUM7WUFDMUMsaUJBQWlCLENBQUMscUJBQXFCLEVBQUU7WUFDekMsaUJBQWlCLENBQUMscUJBQXFCLEVBQUU7WUFDekMsaUJBQWlCLENBQUMsV0FBVyxFQUFFO1lBQy9CLHlCQUFlLENBQUMsaUJBQWlCLENBQUMsUUFBd0IsQ0FBQztTQUM1RCxDQUFDLENBQUE7UUFFRixNQUFNLE1BQU0sR0FBRywrQkFBdUIsQ0FBQyxNQUFvQixDQUFDLENBQUE7UUFFNUQsTUFBTSxhQUFhLEdBQUcsbUJBQW1CLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FDbkQsbUJBQW1CLENBQUMsT0FBTyxDQUM1QixDQUFBO1FBQ0QsTUFBTSxhQUFhLEdBQUcsbUJBQW1CLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FDbkQsbUJBQW1CLENBQUMsT0FBTyxDQUM1QixDQUFBO1FBRUQsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFBO1FBQ25CLElBQUksR0FBRyxH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