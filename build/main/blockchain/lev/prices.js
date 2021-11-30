"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getXAssetLevPrices = void 0;
const abis_1 = require("@xtoken/abis");
const ethers_1 = require("ethers");
const utils_1 = require("ethers/lib/utils");
const constants_1 = require("../../constants");
const utils_2 = require("../../utils");
// import { getEthTokenPrice } from '../exchanges/uniswap'
const uniswapV3_1 = require("../exchanges/uniswapV3");
const utils_3 = require("../utils");
/**
 * @example
 * ```typescript
 * import { ethers } from 'ethers'
 * import { Abi, ADDRESSES, X_ETH_3X } from '@xtoken/abis'
 * import { getXAssetLevPrices } from '@xtoken/js'
 *
 * const provider = new ethers.providers.InfuraProvider('homestead', <INFURA_API_KEY>)
 * const xassetlevContract = new ethers.Contract(ADDRESSES[X_ETH_3X][chainId], Abi.xAssetLev, provider)
 *
 * const { priceEth, priceUsd } = await getXAssetLevPrices(xassetlevContract)
 * ```
 *
 * @param {XAssetLev} xassetlevContract xAssetLev token contract
 * @returns A promise of the token prices in ETH/USD along with AUM
 */
const getXAssetLevPrices = async (xassetlevContract) => {
    try {
        const { provider } = xassetlevContract;
        const symbol = (await xassetlevContract.symbol());
        const token = utils_3.getXAssetLevTokenSymbol(symbol);
        const [xassetlevTotalSupply, { bufferBalance, marketBalance }, ethUsdcPrice,] = await Promise.all([
            xassetlevContract.totalSupply(),
            xassetlevContract.getFundBalances(),
            uniswapV3_1.getEthUsdcPriceUniswapV3(provider),
        ]);
        let tokenEthPrice = ethers_1.BigNumber.from('0');
        if (symbol !== abis_1.X_ETH_3X) {
            tokenEthPrice = utils_1.parseEther(await uniswapV3_1.getTokenEthPriceUniswapV3(token, provider));
        }
        // Price in terms of base asset
        const priceToken = bufferBalance
            .add(marketBalance)
            .mul(constants_1.DEC_18)
            .div(xassetlevTotalSupply);
        let priceBtc = ethers_1.BigNumber.from('0');
        let priceEth;
        if (symbol === abis_1.X_ETH_3X) {
            priceEth = priceToken;
        }
        else {
            if (symbol === abis_1.X_BTC_3X) {
                priceBtc = utils_1.parseUnits(priceToken.toString(), 10);
                priceEth = priceBtc.mul(tokenEthPrice).div(constants_1.DEC_18);
            }
            else {
                priceEth = priceToken.mul(tokenEthPrice).div(constants_1.DEC_18);
            }
        }
        const priceUsd = priceEth.mul(utils_1.parseEther(ethUsdcPrice)).div(constants_1.DEC_18);
        const aum = priceUsd.mul(xassetlevTotalSupply).div(constants_1.DEC_18);
        return {
            aum: utils_2.formatNumber(utils_1.formatEther(aum), 0),
            priceBtc: priceBtc.isZero() ? 0 : utils_2.formatNumber(utils_1.formatEther(priceBtc), 6),
            priceEth: utils_2.formatNumber(utils_1.formatEther(priceEth), 6),
            priceUsd: utils_2.formatNumber(utils_1.formatEther(priceUsd)),
        };
    }
    catch (e) {
        console.error('Error fetching token price: ', e);
        return constants_1.DEFAULT_PRICES;
    }
};
exports.getXAssetLevPrices = getXAssetLevPrices;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpY2VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4vbGV2L3ByaWNlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSx1Q0FBaUQ7QUFDakQsbUNBQWtDO0FBQ2xDLDRDQUFzRTtBQUV0RSwrQ0FBd0Q7QUFHeEQsdUNBQTBDO0FBQzFDLDBEQUEwRDtBQUMxRCxzREFHK0I7QUFDL0Isb0NBQWtEO0FBRWxEOzs7Ozs7Ozs7Ozs7Ozs7R0FlRztBQUNJLE1BQU0sa0JBQWtCLEdBQUcsS0FBSyxFQUNyQyxpQkFBNEIsRUFDTCxFQUFFO0lBQ3pCLElBQUk7UUFDRixNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsaUJBQWlCLENBQUE7UUFDdEMsTUFBTSxNQUFNLEdBQUcsQ0FBQyxNQUFNLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxDQUFlLENBQUE7UUFDL0QsTUFBTSxLQUFLLEdBQUcsK0JBQXVCLENBQUMsTUFBTSxDQUFDLENBQUE7UUFFN0MsTUFBTSxDQUNKLG9CQUFvQixFQUNwQixFQUFFLGFBQWEsRUFBRSxhQUFhLEVBQUUsRUFDaEMsWUFBWSxFQUNiLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDO1lBQ3BCLGlCQUFpQixDQUFDLFdBQVcsRUFBRTtZQUMvQixpQkFBaUIsQ0FBQyxlQUFlLEVBQUU7WUFDbkMsb0NBQXdCLENBQUMsUUFBd0IsQ0FBQztTQUNuRCxDQUFDLENBQUE7UUFFRixJQUFJLGFBQWEsR0FBRyxrQkFBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUN2QyxJQUFJLE1BQU0sS0FBSyxlQUFRLEVBQUU7WUFDdkIsYUFBYSxHQUFHLGtCQUFVLENBQ3hCLE1BQU0scUNBQXlCLENBQUMsS0FBSyxFQUFFLFFBQXdCLENBQUMsQ0FDakUsQ0FBQTtTQUNGO1FBRUQsK0JBQStCO1FBQy9CLE1BQU0sVUFBVSxHQUFHLGFBQWE7YUFDN0IsR0FBRyxDQUFDLGFBQWEsQ0FBQzthQUNsQixHQUFHLENBQUMsa0JBQU0sQ0FBQzthQUNYLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFBO1FBRTVCLElBQUksUUFBUSxHQUFHLGtCQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ2xDLElBQUksUUFBUSxDQUFBO1FBRVosSUFBSSxNQUFNLEtBQUssZUFBUSxFQUFFO1lBQ3ZCLFFBQVEsR0FBRyxVQUFVLENBQUE7U0FDdEI7YUFBTTtZQUNMLElBQUksTUFBTSxLQUFLLGVBQVEsRUFBRTtnQkFDdkIsUUFBUSxHQUFHLGtCQUFVLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFBO2dCQUNoRCxRQUFRLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxHQUFHLENBQUMsa0JBQU0sQ0FBQyxDQUFBO2FBQ25EO2lCQUFNO2dCQUNMLFFBQVEsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxrQkFBTSxDQUFDLENBQUE7YUFDckQ7U0FDRjtRQUVELE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsa0JBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxrQkFBTSxDQUFDLENBQUE7UUFDbkUsTUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxrQkFBTSxDQUFDLENBQUE7UUFFMUQsT0FBTztZQUNMLEdBQUcsRUFBRSxvQkFBWSxDQUFDLG1CQUFXLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3RDLFFBQVEsRUFBRSxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsb0JBQVksQ0FBQyxtQkFBVyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN4RSxRQUFRLEVBQUUsb0JBQVksQ0FBQyxtQkFBVyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNoRCxRQUFRLEVBQUUsb0JBQVksQ0FBQyxtQkFBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQzlDLENBQUE7S0FDRjtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsT0FBTyxDQUFDLEtBQUssQ0FBQyw4QkFBOEIsRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUNoRCxPQUFPLDBCQUFjLENBQUE7S0FDdEI7QUFDSCxDQUFDLENBQUE7QUExRFksUUFBQSxrQkFBa0Isc0JBMEQ5QiJ9