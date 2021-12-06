import { ADDRESSES, ALPHA } from '@xtoken/abis';
import { formatEther, parseEther } from 'ethers/lib/utils';
import { DEC_18, DEFAULT_PRICES } from '../../constants';
import { formatNumber } from '../../utils';
import { getEthTokenPrice } from '../exchanges/uniswap';
import { getEthUsdcPrice } from '../exchanges/uniswap';
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
export const getXAlphaPrices = async (xalphaContract) => {
    try {
        const { provider } = xalphaContract;
        const { chainId } = await provider.getNetwork();
        const alphaAddress = ADDRESSES[ALPHA][chainId];
        const [xalphaTotalSupply, xalphaAlphaBal, alphaEthPrice, ethUsdcPrice,] = await Promise.all([
            xalphaContract.totalSupply(),
            xalphaContract.getNav(),
            getEthTokenPrice(alphaAddress, true, provider),
            getEthUsdcPrice(provider),
        ]);
        const alphaUsdPrice = parseEther(alphaEthPrice)
            .mul(parseEther(ethUsdcPrice))
            .div(DEC_18);
        const xalphaPerToken = xalphaAlphaBal.mul(DEC_18).div(xalphaTotalSupply);
        const priceUsd = xalphaPerToken.mul(alphaUsdPrice).div(DEC_18);
        const priceEth = priceUsd.mul(DEC_18).div(parseEther(ethUsdcPrice));
        const aum = priceUsd.mul(xalphaTotalSupply).div(DEC_18);
        return {
            aum: formatNumber(formatEther(aum), 0),
            priceEth: formatNumber(formatEther(priceEth), 6),
            priceUsd: formatNumber(formatEther(priceUsd)),
        };
    }
    catch (e) {
        console.error('Error fetching token price: ', e);
        return DEFAULT_PRICES;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpY2VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veGFscGhhL3ByaWNlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGNBQWMsQ0FBQTtBQUMvQyxPQUFPLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxNQUFNLGtCQUFrQixDQUFBO0FBRTFELE9BQU8sRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUFFLE1BQU0saUJBQWlCLENBQUE7QUFHeEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGFBQWEsQ0FBQTtBQUMxQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQTtBQUN2RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0JBQXNCLENBQUE7QUFFdEQ7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBRUgsTUFBTSxDQUFDLE1BQU0sZUFBZSxHQUFHLEtBQUssRUFDbEMsY0FBc0IsRUFDQyxFQUFFO0lBQ3pCLElBQUk7UUFDRixNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsY0FBYyxDQUFBO1FBQ25DLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxNQUFNLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQTtRQUMvQyxNQUFNLFlBQVksR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUE7UUFFOUMsTUFBTSxDQUNKLGlCQUFpQixFQUNqQixjQUFjLEVBQ2QsYUFBYSxFQUNiLFlBQVksRUFDYixHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQztZQUNwQixjQUFjLENBQUMsV0FBVyxFQUFFO1lBQzVCLGNBQWMsQ0FBQyxNQUFNLEVBQUU7WUFDdkIsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLElBQUksRUFBRSxRQUF3QixDQUFDO1lBQzlELGVBQWUsQ0FBQyxRQUF3QixDQUFDO1NBQzFDLENBQUMsQ0FBQTtRQUVGLE1BQU0sYUFBYSxHQUFHLFVBQVUsQ0FBQyxhQUFhLENBQUM7YUFDNUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUM3QixHQUFHLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDZCxNQUFNLGNBQWMsR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO1FBQ3hFLE1BQU0sUUFBUSxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQzlELE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFBO1FBQ25FLE1BQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUE7UUFFdkQsT0FBTztZQUNMLEdBQUcsRUFBRSxZQUFZLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN0QyxRQUFRLEVBQUUsWUFBWSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDaEQsUUFBUSxFQUFFLFlBQVksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDOUMsQ0FBQTtLQUNGO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDVixPQUFPLENBQUMsS0FBSyxDQUFDLDhCQUE4QixFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQ2hELE9BQU8sY0FBYyxDQUFBO0tBQ3RCO0FBQ0gsQ0FBQyxDQUFBIn0=