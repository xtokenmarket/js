"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getXAlphaPrices = void 0;
const abis_1 = require("@xtoken/abis");
const utils_1 = require("ethers/lib/utils");
const constants_1 = require("../../constants");
const utils_2 = require("../../utils");
const uniswap_1 = require("../exchanges/uniswap");
const uniswap_2 = require("../exchanges/uniswap");
/**
 * @example
 * ```typescript
 * import { ethers } from 'ethers'
 * import { Abi, ADDRESSES, X_ALPHA_A } from '@xtoken/abis'
 * import { getXAlphaPrices } from '@xtoken/js'
 *
 * const provider = new ethers.providers.InfuraProvider('homestead', <INFURA_API_KEY>)
 * const xalphaContract = new ethers.Contract(ADDRESSES[X_ALPHA_A][chainId], Abi.xALPHA, provider)
 *
 * const { priceEth, priceUsd } = await getXAlphaPrices(xalphaContract)
 * ```
 *
 * @param {XALPHA} xalphaContract xALPHAa token contract
 * @returns A promise of the token prices in ETH/USD along with AUM
 */
const getXAlphaPrices = async (xalphaContract) => {
    try {
        const { provider } = xalphaContract;
        const { chainId } = await provider.getNetwork();
        const alphaAddress = abis_1.ADDRESSES[abis_1.ALPHA][chainId];
        const [xalphaTotalSupply, xalphaAlphaBal, alphaEthPrice, ethUsdcPrice,] = await Promise.all([
            xalphaContract.totalSupply(),
            xalphaContract.getNav(),
            uniswap_1.getEthTokenPrice(alphaAddress, true, provider),
            uniswap_2.getEthUsdcPrice(provider),
        ]);
        const alphaUsdPrice = utils_1.parseEther(alphaEthPrice)
            .mul(utils_1.parseEther(ethUsdcPrice))
            .div(constants_1.DEC_18);
        const xalphaPerToken = xalphaAlphaBal.mul(constants_1.DEC_18).div(xalphaTotalSupply);
        const priceUsd = xalphaPerToken.mul(alphaUsdPrice).div(constants_1.DEC_18);
        const priceEth = priceUsd.mul(constants_1.DEC_18).div(utils_1.parseEther(ethUsdcPrice));
        const aum = priceUsd.mul(xalphaTotalSupply).div(constants_1.DEC_18);
        return {
            aum: utils_2.formatNumber(utils_1.formatEther(aum), 0),
            priceEth: utils_2.formatNumber(utils_1.formatEther(priceEth), 6),
            priceUsd: utils_2.formatNumber(utils_1.formatEther(priceUsd)),
        };
    }
    catch (e) {
        console.error('Error fetching token price: ', e);
        return constants_1.DEFAULT_PRICES;
    }
};
exports.getXAlphaPrices = getXAlphaPrices;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpY2VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veGFscGhhL3ByaWNlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSx1Q0FBK0M7QUFDL0MsNENBQTBEO0FBRTFELCtDQUF3RDtBQUd4RCx1Q0FBMEM7QUFDMUMsa0RBQXVEO0FBQ3ZELGtEQUFzRDtBQUV0RDs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFFSSxNQUFNLGVBQWUsR0FBRyxLQUFLLEVBQ2xDLGNBQXNCLEVBQ0MsRUFBRTtJQUN6QixJQUFJO1FBQ0YsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLGNBQWMsQ0FBQTtRQUNuQyxNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsTUFBTSxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUE7UUFDL0MsTUFBTSxZQUFZLEdBQUcsZ0JBQVMsQ0FBQyxZQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUU5QyxNQUFNLENBQ0osaUJBQWlCLEVBQ2pCLGNBQWMsRUFDZCxhQUFhLEVBQ2IsWUFBWSxFQUNiLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDO1lBQ3BCLGNBQWMsQ0FBQyxXQUFXLEVBQUU7WUFDNUIsY0FBYyxDQUFDLE1BQU0sRUFBRTtZQUN2QiwwQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsSUFBSSxFQUFFLFFBQXdCLENBQUM7WUFDOUQseUJBQWUsQ0FBQyxRQUF3QixDQUFDO1NBQzFDLENBQUMsQ0FBQTtRQUVGLE1BQU0sYUFBYSxHQUFHLGtCQUFVLENBQUMsYUFBYSxDQUFDO2FBQzVDLEdBQUcsQ0FBQyxrQkFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQzdCLEdBQUcsQ0FBQyxrQkFBTSxDQUFDLENBQUE7UUFDZCxNQUFNLGNBQWMsR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDLGtCQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtRQUN4RSxNQUFNLFFBQVEsR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxrQkFBTSxDQUFDLENBQUE7UUFDOUQsTUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxrQkFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLGtCQUFVLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQTtRQUNuRSxNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUMsR0FBRyxDQUFDLGtCQUFNLENBQUMsQ0FBQTtRQUV2RCxPQUFPO1lBQ0wsR0FBRyxFQUFFLG9CQUFZLENBQUMsbUJBQVcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDdEMsUUFBUSxFQUFFLG9CQUFZLENBQUMsbUJBQVcsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDaEQsUUFBUSxFQUFFLG9CQUFZLENBQUMsbUJBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUM5QyxDQUFBO0tBQ0Y7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLE9BQU8sQ0FBQyxLQUFLLENBQUMsOEJBQThCLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDaEQsT0FBTywwQkFBYyxDQUFBO0tBQ3RCO0FBQ0gsQ0FBQyxDQUFBO0FBckNZLFFBQUEsZUFBZSxtQkFxQzNCIn0=