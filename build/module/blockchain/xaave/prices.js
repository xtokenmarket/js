import { AAVE, ADDRESSES } from '@xtoken/abis';
import { formatEther, parseEther } from 'ethers/lib/utils';
import { DEC_18, DEFAULT_PRICES } from '../../constants';
import { formatNumber } from '../../utils';
import { getEthTokenPrice, getEthUsdcPrice } from '../exchanges/uniswap';
/**
 * @example
 * ```typescript
 * import { ethers } from 'ethers'
 * import { Abi, ADDRESSES, X_AAVE_A } from '@xtoken/abis'
 * import { getXAavePrices } from '@xtoken/js'
 *
 * const provider = new ethers.providers.InfuraProvider('homestead', <INFURA_API_KEY>)
 * const xaaveContract = new ethers.Contract(ADDRESSES[X_AAVE_A][chainId], Abi.xAAVE, provider)
 *
 * const { priceEth, priceUsd } = await getXAavePrices(xaaveContract)
 * ```
 *
 * @param {XAAVE} xaaveContract xAAVEa/xAAVEb token contract
 * @returns A promise of the token prices in ETH/USD along with AUM
 */
export const getXAavePrices = async (xaaveContract) => {
    try {
        const { provider } = xaaveContract;
        const { chainId } = await provider.getNetwork();
        const aaveAddress = ADDRESSES[AAVE][chainId];
        const [xaaveTotalSupply, xaaveAaveBal, aaveEthPrice, ethUsdcPrice,] = await Promise.all([
            xaaveContract.totalSupply(),
            xaaveContract.getFundHoldings(),
            getEthTokenPrice(aaveAddress, true, provider),
            getEthUsdcPrice(provider),
        ]);
        const aaveUsdPrice = parseEther(aaveEthPrice)
            .mul(parseEther(ethUsdcPrice))
            .div(DEC_18);
        const xaavePerToken = xaaveAaveBal.mul(DEC_18).div(xaaveTotalSupply);
        const priceUsd = xaavePerToken.mul(aaveUsdPrice).div(DEC_18);
        const priceEth = priceUsd.mul(DEC_18).div(parseEther(ethUsdcPrice));
        const aum = priceUsd.mul(xaaveTotalSupply).div(DEC_18);
        return {
            aum: formatNumber(formatEther(aum), 0),
            priceEth: formatNumber(formatEther(priceEth), 6),
            priceUsd: formatNumber(formatEther(priceUsd)),
        };
    }
    catch (e) {
        console.error('Error while fetching token price:', e);
        return DEFAULT_PRICES;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpY2VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veGFhdmUvcHJpY2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE1BQU0sY0FBYyxDQUFBO0FBQzlDLE9BQU8sRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLE1BQU0sa0JBQWtCLENBQUE7QUFFMUQsT0FBTyxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQTtBQUd4RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sYUFBYSxDQUFBO0FBQzFDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxlQUFlLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQTtBQUV4RTs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFDSCxNQUFNLENBQUMsTUFBTSxjQUFjLEdBQUcsS0FBSyxFQUNqQyxhQUFvQixFQUNHLEVBQUU7SUFDekIsSUFBSTtRQUNGLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxhQUFhLENBQUE7UUFDbEMsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLE1BQU0sUUFBUSxDQUFDLFVBQVUsRUFBRSxDQUFBO1FBQy9DLE1BQU0sV0FBVyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUU1QyxNQUFNLENBQ0osZ0JBQWdCLEVBQ2hCLFlBQVksRUFDWixZQUFZLEVBQ1osWUFBWSxFQUNiLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDO1lBQ3BCLGFBQWEsQ0FBQyxXQUFXLEVBQUU7WUFDM0IsYUFBYSxDQUFDLGVBQWUsRUFBRTtZQUMvQixnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsSUFBSSxFQUFFLFFBQXdCLENBQUM7WUFDN0QsZUFBZSxDQUFDLFFBQXdCLENBQUM7U0FDMUMsQ0FBQyxDQUFBO1FBRUYsTUFBTSxZQUFZLEdBQUcsVUFBVSxDQUFDLFlBQVksQ0FBQzthQUMxQyxHQUFHLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQzdCLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUNkLE1BQU0sYUFBYSxHQUFHLFlBQVksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUE7UUFDcEUsTUFBTSxRQUFRLEdBQUcsYUFBYSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDNUQsTUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUE7UUFDbkUsTUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUV0RCxPQUFPO1lBQ0wsR0FBRyxFQUFFLFlBQVksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3RDLFFBQVEsRUFBRSxZQUFZLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNoRCxRQUFRLEVBQUUsWUFBWSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUM5QyxDQUFBO0tBQ0Y7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLE9BQU8sQ0FBQyxLQUFLLENBQUMsbUNBQW1DLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDckQsT0FBTyxjQUFjLENBQUE7S0FDdEI7QUFDSCxDQUFDLENBQUEifQ==