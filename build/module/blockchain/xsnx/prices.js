import { ADDRESSES, X_SNX_ADMIN } from '@xtoken/abis';
import { SNX } from '@xtoken/abis';
import { formatBytes32String, formatEther, parseEther } from 'ethers/lib/utils';
import { DEC_18, DEFAULT_PRICES } from '../../constants';
import { formatNumber } from '../../utils';
import { getTokenBalance } from '../erc20';
import { getExchangeRateContract } from '../utils';
import { getXSnxContracts } from './helper';
/**
 * @example
 * ```typescript
 * import { ethers } from 'ethers'
 * import { Abi, ADDRESSES, X_SNX_A } from '@xtoken/abis'
 * import { getXSnxPrices } from '@xtoken/js'
 *
 * const provider = new ethers.providers.InfuraProvider('homestead', <INFURA_API_KEY>)
 * const xsnxContract = new ethers.Contract(ADDRESSES[X_SNX_A][chainId], Abi.xSNX, provider)
 *
 * const { priceEth, priceUsd } = await getXSnxPrices(xsnxContract)
 * ```
 *
 * @param {XSNX} xsnxContract xSNXa token contract
 * @returns A promise of the token prices in ETH/USD along with AUM
 */
export const getXSnxPrices = async (xsnxContract) => {
    try {
        const { provider } = xsnxContract;
        const { chainId } = await provider.getNetwork();
        const xsnxAdminAddress = ADDRESSES[X_SNX_ADMIN][chainId];
        const { snxContract, tradeAccountingContract } = await getXSnxContracts(provider);
        const exchangeRatesContract = (await getExchangeRateContract(provider));
        const [{ rate: snxUsdPrice }, { rate: ethUsdPrice }, contractDebtValue,] = await Promise.all([
            exchangeRatesContract.rateAndUpdatedTime(formatBytes32String('SNX')),
            exchangeRatesContract.rateAndUpdatedTime(formatBytes32String('sETH')),
            snxContract.debtBalanceOf(xsnxAdminAddress, formatBytes32String('sUSD')),
        ]);
        const weiPerOneSnx = snxUsdPrice.mul(DEC_18).div(ethUsdPrice);
        const [snxBalanceBefore, setHoldings, ethBal, totalSupply, snxTokenBalance,] = await Promise.all([
            tradeAccountingContract.getSnxBalance(),
            tradeAccountingContract.getSetHoldingsValueInWei(),
            tradeAccountingContract.getEthBalance(),
            xsnxContract.totalSupply(),
            getTokenBalance(SNX, xsnxAdminAddress, provider),
        ]);
        const snxBalanceOwned = parseEther(snxTokenBalance);
        const nonSnxAssetValue = setHoldings.add(ethBal);
        const [issueTokenPriceInEth, redeemTokenPriceEth] = await Promise.all([
            tradeAccountingContract.calculateIssueTokenPrice(weiPerOneSnx, snxBalanceBefore, nonSnxAssetValue, totalSupply),
            tradeAccountingContract.calculateRedeemTokenPrice(totalSupply, snxBalanceOwned, contractDebtValue),
        ]);
        const priceUsd = issueTokenPriceInEth.mul(ethUsdPrice).div(DEC_18);
        const sellPriceUsd = redeemTokenPriceEth.mul(ethUsdPrice).div(DEC_18);
        const aum = totalSupply.mul(priceUsd).div(DEC_18);
        return {
            aum: formatNumber(formatEther(aum), 0),
            priceEth: formatNumber(formatEther(issueTokenPriceInEth)),
            priceUsd: formatNumber(formatEther(priceUsd)),
            sellPriceEth: formatNumber(formatEther(redeemTokenPriceEth)),
            sellPriceUsd: formatNumber(formatEther(sellPriceUsd)),
        };
    }
    catch (e) {
        console.error('Error while fetching token price:', e);
        return DEFAULT_PRICES;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpY2VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veHNueC9wcmljZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsTUFBTSxjQUFjLENBQUE7QUFDckQsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGNBQWMsQ0FBQTtBQUNsQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxNQUFNLGtCQUFrQixDQUFBO0FBRS9FLE9BQU8sRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUFFLE1BQU0saUJBQWlCLENBQUE7QUFHeEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGFBQWEsQ0FBQTtBQUMxQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sVUFBVSxDQUFBO0FBQzFDLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUVsRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxVQUFVLENBQUE7QUFFM0M7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sYUFBYSxHQUFHLEtBQUssRUFDaEMsWUFBa0IsRUFDSyxFQUFFO0lBQ3pCLElBQUk7UUFDRixNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsWUFBWSxDQUFBO1FBQ2pDLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxNQUFNLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQTtRQUMvQyxNQUFNLGdCQUFnQixHQUFHLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUV4RCxNQUFNLEVBQUUsV0FBVyxFQUFFLHVCQUF1QixFQUFFLEdBQUcsTUFBTSxnQkFBZ0IsQ0FDckUsUUFBd0IsQ0FDekIsQ0FBQTtRQUNELE1BQU0scUJBQXFCLEdBQUcsQ0FBQyxNQUFNLHVCQUF1QixDQUMxRCxRQUF3QixDQUN6QixDQUFrQixDQUFBO1FBRW5CLE1BQU0sQ0FDSixFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsRUFDckIsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEVBQ3JCLGlCQUFpQixFQUNsQixHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQztZQUNwQixxQkFBcUIsQ0FBQyxrQkFBa0IsQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNwRSxxQkFBcUIsQ0FBQyxrQkFBa0IsQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNyRSxXQUFXLENBQUMsYUFBYSxDQUFDLGdCQUFnQixFQUFFLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3pFLENBQUMsQ0FBQTtRQUNGLE1BQU0sWUFBWSxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFBO1FBRTdELE1BQU0sQ0FDSixnQkFBZ0IsRUFDaEIsV0FBVyxFQUNYLE1BQU0sRUFDTixXQUFXLEVBQ1gsZUFBZSxFQUNoQixHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQztZQUNwQix1QkFBdUIsQ0FBQyxhQUFhLEVBQUU7WUFDdkMsdUJBQXVCLENBQUMsd0JBQXdCLEVBQUU7WUFDbEQsdUJBQXVCLENBQUMsYUFBYSxFQUFFO1lBQ3ZDLFlBQVksQ0FBQyxXQUFXLEVBQUU7WUFDMUIsZUFBZSxDQUFDLEdBQUcsRUFBRSxnQkFBZ0IsRUFBRSxRQUF3QixDQUFDO1NBQ2pFLENBQUMsQ0FBQTtRQUVGLE1BQU0sZUFBZSxHQUFHLFVBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQTtRQUNuRCxNQUFNLGdCQUFnQixHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUE7UUFFaEQsTUFBTSxDQUFDLG9CQUFvQixFQUFFLG1CQUFtQixDQUFDLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDO1lBQ3BFLHVCQUF1QixDQUFDLHdCQUF3QixDQUM5QyxZQUFZLEVBQ1osZ0JBQWdCLEVBQ2hCLGdCQUFnQixFQUNoQixXQUFXLENBQ1o7WUFDRCx1QkFBdUIsQ0FBQyx5QkFBeUIsQ0FDL0MsV0FBVyxFQUNYLGVBQWUsRUFDZixpQkFBaUIsQ0FDbEI7U0FDRixDQUFDLENBQUE7UUFFRixNQUFNLFFBQVEsR0FBRyxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQ2xFLE1BQU0sWUFBWSxHQUFHLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDckUsTUFBTSxHQUFHLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUE7UUFFakQsT0FBTztZQUNMLEdBQUcsRUFBRSxZQUFZLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN0QyxRQUFRLEVBQUUsWUFBWSxDQUFDLFdBQVcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1lBQ3pELFFBQVEsRUFBRSxZQUFZLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzdDLFlBQVksRUFBRSxZQUFZLENBQUMsV0FBVyxDQUFDLG1CQUFtQixDQUFDLENBQUM7WUFDNUQsWUFBWSxFQUFFLFlBQVksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDdEQsQ0FBQTtLQUNGO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDVixPQUFPLENBQUMsS0FBSyxDQUFDLG1DQUFtQyxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQ3JELE9BQU8sY0FBYyxDQUFBO0tBQ3RCO0FBQ0gsQ0FBQyxDQUFBIn0=