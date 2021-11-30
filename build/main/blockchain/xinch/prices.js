"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getXInchPrices = void 0;
const abis_1 = require("@xtoken/abis");
const utils_1 = require("ethers/lib/utils");
const constants_1 = require("../../constants");
const utils_2 = require("../../utils");
const uniswap_1 = require("../exchanges/uniswap");
/**
 * @example
 * ```typescript
 * import { ethers } from 'ethers'
 * import { Abi, ADDRESSES, INCH_LIQUIDITY_PROTOCOL, X_INCH_A } from '@xtoken/abis'
 * import { getXInchPrices } from '@xtoken/js'
 *
 * const provider = new ethers.providers.InfuraProvider('homestead', <INFURA_API_KEY>)
 * const xinchContract = new ethers.Contract(ADDRESSES[X_INCH_A][chainId], Abi.xINCH, provider)
 *
 * const { priceEth, priceUsd } = await getXInchPrices(xinchContract)
 * ```
 *
 * @param {XINCH} xinchContract xINCHa/xINCHb token contract
 * @returns A promise of the token prices in ETH/USD along with AUM
 */
const getXInchPrices = async (xinchContract) => {
    try {
        const { provider } = xinchContract;
        const { chainId } = await provider.getNetwork();
        const inchAddress = abis_1.ADDRESSES[abis_1.INCH][chainId];
        const [xinchTotalSupply, inchHoldings, inchEthPrice, ethUsdcPrice,] = await Promise.all([
            xinchContract.totalSupply(),
            xinchContract.getNav(),
            uniswap_1.getEthTokenPrice(inchAddress, true, provider),
            uniswap_1.getEthUsdcPrice(provider),
        ]);
        const inchUsdPrice = utils_1.parseEther(inchEthPrice)
            .mul(utils_1.parseEther(ethUsdcPrice))
            .div(constants_1.DEC_18);
        const inchPerToken = inchHoldings.mul(constants_1.DEC_18).div(xinchTotalSupply);
        const priceUsd = inchPerToken.mul(inchUsdPrice).div(constants_1.DEC_18);
        const priceEth = priceUsd.mul(constants_1.DEC_18).div(utils_1.parseEther(ethUsdcPrice));
        const aum = priceUsd.mul(xinchTotalSupply).div(constants_1.DEC_18);
        return {
            aum: utils_2.formatNumber(utils_1.formatEther(aum), 0),
            priceEth: utils_2.formatNumber(utils_1.formatEther(priceEth), 6),
            priceUsd: utils_2.formatNumber(utils_1.formatEther(priceUsd)),
        };
    }
    catch (e) {
        console.error('Error while fetching token price:', e);
        return constants_1.DEFAULT_PRICES;
    }
};
exports.getXInchPrices = getXInchPrices;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpY2VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veGluY2gvcHJpY2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLHVDQUE4QztBQUM5Qyw0Q0FBMEQ7QUFFMUQsK0NBQXdEO0FBR3hELHVDQUEwQztBQUMxQyxrREFBd0U7QUFFeEU7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBQ0ksTUFBTSxjQUFjLEdBQUcsS0FBSyxFQUNqQyxhQUFvQixFQUNHLEVBQUU7SUFDekIsSUFBSTtRQUNGLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxhQUFhLENBQUE7UUFDbEMsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLE1BQU0sUUFBUSxDQUFDLFVBQVUsRUFBRSxDQUFBO1FBQy9DLE1BQU0sV0FBVyxHQUFHLGdCQUFTLENBQUMsV0FBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUE7UUFFNUMsTUFBTSxDQUNKLGdCQUFnQixFQUNoQixZQUFZLEVBQ1osWUFBWSxFQUNaLFlBQVksRUFDYixHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQztZQUNwQixhQUFhLENBQUMsV0FBVyxFQUFFO1lBQzNCLGFBQWEsQ0FBQyxNQUFNLEVBQUU7WUFDdEIsMEJBQWdCLENBQUMsV0FBVyxFQUFFLElBQUksRUFBRSxRQUF3QixDQUFDO1lBQzdELHlCQUFlLENBQUMsUUFBd0IsQ0FBQztTQUMxQyxDQUFDLENBQUE7UUFFRixNQUFNLFlBQVksR0FBRyxrQkFBVSxDQUFDLFlBQVksQ0FBQzthQUMxQyxHQUFHLENBQUMsa0JBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUM3QixHQUFHLENBQUMsa0JBQU0sQ0FBQyxDQUFBO1FBQ2QsTUFBTSxZQUFZLEdBQUcsWUFBWSxDQUFDLEdBQUcsQ0FBQyxrQkFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUE7UUFDbkUsTUFBTSxRQUFRLEdBQUcsWUFBWSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxHQUFHLENBQUMsa0JBQU0sQ0FBQyxDQUFBO1FBQzNELE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsa0JBQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxrQkFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUE7UUFDbkUsTUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxrQkFBTSxDQUFDLENBQUE7UUFFdEQsT0FBTztZQUNMLEdBQUcsRUFBRSxvQkFBWSxDQUFDLG1CQUFXLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3RDLFFBQVEsRUFBRSxvQkFBWSxDQUFDLG1CQUFXLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2hELFFBQVEsRUFBRSxvQkFBWSxDQUFDLG1CQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDOUMsQ0FBQTtLQUNGO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDVixPQUFPLENBQUMsS0FBSyxDQUFDLG1DQUFtQyxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQ3JELE9BQU8sMEJBQWMsQ0FBQTtLQUN0QjtBQUNILENBQUMsQ0FBQTtBQXJDWSxRQUFBLGNBQWMsa0JBcUMxQiJ9