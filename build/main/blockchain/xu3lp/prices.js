"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getXU3LPTokenPrices = exports.getXU3LPPrices = void 0;
const abis_1 = require("@xtoken/abis");
const ethers_1 = require("ethers");
const utils_1 = require("ethers/lib/utils");
const constants_1 = require("../../constants");
const utils_2 = require("../../utils");
const uniswap_1 = require("../exchanges/uniswap");
const uniswapV3_1 = require("../exchanges/uniswapV3");
const utils_3 = require("../utils");
/**
 * @example
 * ```typescript
 * import { ethers } from 'ethers'
 * import { Abi, ADDRESSES, KYBER_PROXY, X_U3LP_A } from '@xtoken/abis'
 * import { getXU3LPPrices } from '@xtoken/js'
 *
 * const provider = new ethers.providers.InfuraProvider('homestead', <INFURA_API_KEY>)
 *
 * const xu3lpContract = new ethers.Contract(ADDRESSES[X_U3LP_A][chainId], Abi.xU3LP, provider)
 * const kyberProxyContract = new ethers.Contract(ADDRESSES[KYBER_PROXY][chainId], Abi.KyberProxy, provider)
 *
 * const { priceEth, priceUsd } = await getXU3LPPrices(
 *   xu3lpContract,
 *   kyberProxyContract,
 * )
 * ```
 *
 * @param {XU3LP} xu3lpContract xU3LPa token contract
 * @returns A promise of the token prices in ETH/USD along with AUM
 */
const getXU3LPPrices = async (xu3lpContract) => {
    try {
        const { provider } = xu3lpContract;
        const [symbol, { token0Price, token1Price }, stakedTokenBalances, bufferTokenBalances, xu3lpTotalSupply, ethUsdcPrice,] = await Promise.all([
            xu3lpContract.symbol(),
            exports.getXU3LPTokenPrices(xu3lpContract),
            xu3lpContract.getStakedTokenBalance(),
            xu3lpContract.getBufferTokenBalance(),
            xu3lpContract.totalSupply(),
            uniswapV3_1.getEthUsdcPriceUniswapV3(provider),
        ]);
        const { chainId } = await provider.getNetwork();
        const assets = utils_3.getLPTokenSymbol(symbol, chainId);
        const token0Balance = stakedTokenBalances.amount0.add(bufferTokenBalances.amount0);
        const token1Balance = stakedTokenBalances.amount1.add(bufferTokenBalances.amount1);
        const token0Value = token0Balance.mul(assets[0] !== abis_1.USDC ? token0Price : constants_1.DEC_18);
        const token1Value = token1Balance.mul(assets[1] !== abis_1.USDC ? token1Price : constants_1.DEC_18);
        let aum = token0Value.add(token1Value);
        let priceBtc = ethers_1.BigNumber.from('0');
        let priceEth = ethers_1.BigNumber.from('0');
        let priceUsd;
        if (symbol === abis_1.X_U3LP_D) {
            priceEth = aum.div(xu3lpTotalSupply);
            priceUsd = priceEth.mul(utils_1.parseEther(ethUsdcPrice)).div(constants_1.DEC_18);
            // Convert AUM to USD from ETH
            aum = aum.mul(utils_1.parseEther(ethUsdcPrice)).div(constants_1.DEC_18);
        }
        else if (symbol === abis_1.X_U3LP_E) {
            // TODO: Migrate to Uniswap V3 to fetch BTC price in USDC
            const btcUsdcPrice = await uniswap_1.getBtcUsdcPrice(provider);
            priceBtc = aum.div(xu3lpTotalSupply);
            priceUsd = priceBtc.mul(utils_1.parseEther(btcUsdcPrice)).div(constants_1.DEC_18);
            // Convert AUM to USD from BTC
            aum = aum.mul(utils_1.parseEther(btcUsdcPrice)).div(constants_1.DEC_18);
        }
        else {
            priceUsd = aum.div(xu3lpTotalSupply);
            priceEth = priceUsd.mul(constants_1.DEC_18).div(utils_1.parseEther(ethUsdcPrice));
        }
        return {
            aum: utils_2.formatNumber(utils_1.formatEther(aum.div(constants_1.DEC_18))),
            priceBtc: priceBtc.isZero() ? 0 : utils_2.formatNumber(utils_1.formatEther(priceBtc), 6),
            priceEth: utils_2.formatNumber(utils_1.formatEther(priceEth), 6),
            priceUsd: utils_2.formatNumber(utils_1.formatEther(priceUsd)),
        };
    }
    catch (e) {
        console.error('Error while fetching token price:', e);
        return constants_1.DEFAULT_PRICES;
    }
};
exports.getXU3LPPrices = getXU3LPPrices;
const getXU3LPTokenPrices = async (xu3lpContract) => {
    try {
        const [asset0Price, asset1Price] = await Promise.all([
            xu3lpContract.getAsset0Price(),
            xu3lpContract.getAsset1Price(),
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
exports.getXU3LPTokenPrices = getXU3LPTokenPrices;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpY2VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veHUzbHAvcHJpY2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLHVDQUF1RDtBQUN2RCxtQ0FBZ0Q7QUFDaEQsNENBQTBEO0FBRTFELCtDQUE4RTtBQUc5RSx1Q0FBbUQ7QUFDbkQsa0RBQXNEO0FBQ3RELHNEQUFpRTtBQUNqRSxvQ0FBMkM7QUFFM0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBQ0ksTUFBTSxjQUFjLEdBQUcsS0FBSyxFQUNqQyxhQUFvQixFQUNHLEVBQUU7SUFDekIsSUFBSTtRQUNGLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxhQUFhLENBQUE7UUFDbEMsTUFBTSxDQUNKLE1BQU0sRUFDTixFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsRUFDNUIsbUJBQW1CLEVBQ25CLG1CQUFtQixFQUNuQixnQkFBZ0IsRUFDaEIsWUFBWSxFQUNiLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDO1lBQ3BCLGFBQWEsQ0FBQyxNQUFNLEVBQUU7WUFDdEIsMkJBQW1CLENBQUMsYUFBYSxDQUFDO1lBQ2xDLGFBQWEsQ0FBQyxxQkFBcUIsRUFBRTtZQUNyQyxhQUFhLENBQUMscUJBQXFCLEVBQUU7WUFDckMsYUFBYSxDQUFDLFdBQVcsRUFBRTtZQUMzQixvQ0FBd0IsQ0FBQyxRQUF3QixDQUFDO1NBQ25ELENBQUMsQ0FBQTtRQUVGLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxNQUFNLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQTtRQUMvQyxNQUFNLE1BQU0sR0FBRyx3QkFBZ0IsQ0FBQyxNQUF5QixFQUFFLE9BQU8sQ0FBQyxDQUFBO1FBRW5FLE1BQU0sYUFBYSxHQUFHLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQ25ELG1CQUFtQixDQUFDLE9BQU8sQ0FDNUIsQ0FBQTtRQUNELE1BQU0sYUFBYSxHQUFH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