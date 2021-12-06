"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getXKncPrices = void 0;
const abis_1 = require("@xtoken/abis");
const utils_1 = require("ethers/lib/utils");
const constants_1 = require("../../constants");
const utils_2 = require("../../utils");
const uniswap_1 = require("../exchanges/uniswap");
const utils_3 = require("../utils");
/**
 * @example
 * ```typescript
 * import { ethers } from 'ethers'
 * import { Abi, ADDRESSES, X_KNC_A } from '@xtoken/abis'
 * import { getXKncPrices } from '@xtoken/js'
 *
 * const provider = new ethers.providers.InfuraProvider('homestead', <INFURA_API_KEY>)
 * const xkncContract = new ethers.Contract(ADDRESSES[X_KNC_A][chainId], Abi.xKNC, provider)
 *
 * const { priceEth, priceUsd } = await getXKncPrices(xkncContract)
 * ```
 *
 * @param {XKNC} xkncContract xKNCa/xKNCb token contract
 * @returns A promise of the token prices in ETH/USD along with AUM
 */
const getXKncPrices = async (xkncContract) => {
    try {
        const { provider } = xkncContract;
        const network = await provider.getNetwork();
        const { chainId } = network;
        const proxyValue = utils_1.parseEther('1');
        const ethAddress = abis_1.ADDRESSES[abis_1.ETH];
        const kncAddress = abis_1.ADDRESSES[abis_1.KNC][chainId];
        const kyberProxyContract = utils_3.getContract(abis_1.KYBER_PROXY, provider, network);
        const [xkncTotalSupply, xkncKncBal, kncEthPrice, ethUsdcPrice,] = await Promise.all([
            xkncContract.totalSupply(),
            xkncContract.getFundKncBalanceTwei(),
            utils_3.getExpectedRate(kyberProxyContract, kncAddress, ethAddress, proxyValue),
            uniswap_1.getEthUsdcPrice(provider),
        ]);
        const kncUsdcPrice = kncEthPrice.mul(utils_1.parseEther(ethUsdcPrice)).div(constants_1.DEC_18);
        const priceUsd = xkncKncBal.mul(kncUsdcPrice).div(xkncTotalSupply);
        const priceEth = priceUsd.mul(constants_1.DEC_18).div(utils_1.parseEther(ethUsdcPrice));
        const aum = priceUsd.mul(xkncTotalSupply).div(constants_1.DEC_18);
        return {
            priceUsd: utils_2.formatNumber(utils_1.formatEther(priceUsd)),
            priceEth: utils_2.formatNumber(utils_1.formatEther(priceEth), 6),
            aum: utils_2.formatNumber(utils_1.formatEther(aum), 0),
        };
    }
    catch (e) {
        console.error('Error while fetching token price:', e);
        return constants_1.DEFAULT_PRICES;
    }
};
exports.getXKncPrices = getXKncPrices;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpY2VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veGtuYy9wcmljZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsdUNBQStEO0FBQy9ELDRDQUEwRDtBQUUxRCwrQ0FBd0Q7QUFHeEQsdUNBQTBDO0FBQzFDLGtEQUFzRDtBQUN0RCxvQ0FBdUQ7QUFFdkQ7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBQ0ksTUFBTSxhQUFhLEdBQUcsS0FBSyxFQUNoQyxZQUFrQixFQUNLLEVBQUU7SUFDekIsSUFBSTtRQUNGLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxZQUFZLENBQUE7UUFDakMsTUFBTSxPQUFPLEdBQUcsTUFBTSxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUE7UUFDM0MsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLE9BQU8sQ0FBQTtRQUUzQixNQUFNLFVBQVUsR0FBRyxrQkFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ2xDLE1BQU0sVUFBVSxHQUFHLGdCQUFTLENBQUMsVUFBRyxDQUFXLENBQUE7UUFDM0MsTUFBTSxVQUFVLEdBQUcsZ0JBQVMsQ0FBQyxVQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUUxQyxNQUFNLGtCQUFrQixHQUFHLG1CQUFXLENBQ3BDLGtCQUFXLEVBQ1gsUUFBd0IsRUFDeEIsT0FBTyxDQUNNLENBQUE7UUFFZixNQUFNLENBQ0osZUFBZSxFQUNmLFVBQVUsRUFDVixXQUFXLEVBQ1gsWUFBWSxFQUNiLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDO1lBQ3BCLFlBQVksQ0FBQyxXQUFXLEVBQUU7WUFDMUIsWUFBWSxDQUFDLHFCQUFxQixFQUFFO1lBQ3BDLHVCQUFlLENBQUMsa0JBQWtCLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxVQUFVLENBQUM7WUFDdkUseUJBQWUsQ0FBQyxRQUF3QixDQUFDO1NBQzFDLENBQUMsQ0FBQTtRQUVGLE1BQU0sWUFBWSxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsa0JBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxrQkFBTSxDQUFDLENBQUE7UUFDMUUsTUFBTSxRQUFRLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUE7UUFDbEUsTUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxrQkFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLGtCQUFVLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQTtRQUNuRSxNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxrQkFBTSxDQUFDLENBQUE7UUFFckQsT0FBTztZQUNMLFFBQVEsRUFBRSxvQkFBWSxDQUFDLG1CQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDN0MsUUFBUSxFQUFFLG9CQUFZLENBQUMsbUJBQVcsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDaEQsR0FBRyxFQUFFLG9CQUFZLENBQUMsbUJBQVcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDdkMsQ0FBQTtLQUNGO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDVixPQUFPLENBQUMsS0FBSyxDQUFDLG1DQUFtQyxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQ3JELE9BQU8sMEJBQWMsQ0FBQTtLQUN0QjtBQUNILENBQUMsQ0FBQTtBQTVDWSxRQUFBLGFBQWEsaUJBNEN6QiJ9