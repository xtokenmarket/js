import { formatBytes32String, formatEther } from 'ethers/lib/utils'
import { DEC_18, DEFAULT_PRICES } from '../../constants'
import { formatNumber } from '../../utils'
import { getTokenBalance } from '../utils'
/**
 * @example
 * ```typescript
 * import { ethers } from 'ethers'
 * import { Abi, ADDRESSES, EXCHANGE_RATES, TRADE_ACCOUNTING, SNX, X_SNX_A, X_SNX_ADMIN } from '@xtoken/abis'
 * import { getXSnxPrices } from '@xtoken/js'
 *
 * const provider = new ethers.providers.InfuraProvider('homestead', <INFURA_API_KEY>)
 * const network = await provider.getNetwork()
 * const { chainId } = network
 *
 * const xsnxContract = new ethers.Contract(ADDRESSES[X_SNX_A][chainId], Abi.xSNX, provider)
 * const snxContract = new ethers.Contract(ADDRESSES[SNX][chainId], Abi.Synthetix, provider)
 * const exchangeRatesContract = new ethers.Contract(ADDRESSES[EXCHANGE_RATES][chainId], Abi.ExchangeRates, provider)
 * const tradeAccountingContract = new ethers.Contract(ADDRESSES[TRADE_ACCOUNTING][chainId], Abi.TradeAccounting, provider)
 *
 * const { priceEth, priceUsd } = await getXSnxPrices(
 *   xsnxContract,
 *   ADDRESSES[X_SNX_ADMIN][chainId],
 *   tradeAccountingContract,
 *   exchangeRatesContract,
 *   snxContract,
 *   provider
 * )
 * ```
 *
 * @param {XSNX} xsnxContract xSNXa token contract
 * @param {string} xsnxAdminAddress XSNX contract admin address
 * @param {TradeAccounting} tradeAccountingContract Trade accounting contract
 * @param {ExchangeRates} exchangeRatesContract Exchange rates contract
 * @param {Contract} snxContract SNX contract
 * @param {BaseProvider} provider Ether.js Provider
 * @returns A promise of the token prices in ETH/USD along with AUM
 */
export const getXSnxPrices = async (
  xsnxContract,
  xsnxAdminAddress,
  tradeAccountingContract,
  exchangeRatesContract,
  snxContract,
  provider
) => {
  try {
    const [
      { rate: snxUsdPrice },
      { rate: ethUsdPrice },
      contractDebtValue,
    ] = await Promise.all([
      exchangeRatesContract.rateAndUpdatedTime(formatBytes32String('SNX')),
      exchangeRatesContract.rateAndUpdatedTime(formatBytes32String('sETH')),
      snxContract.debtBalanceOf(xsnxAdminAddress, formatBytes32String('sUSD')),
    ])
    const weiPerOneSnx = snxUsdPrice.mul(DEC_18).div(ethUsdPrice)
    const [
      snxBalanceBefore,
      setHoldings,
      ethBal,
      totalSupply,
      snxBalanceOwned,
    ] = await Promise.all([
      tradeAccountingContract.getSnxBalance(),
      tradeAccountingContract.getSetHoldingsValueInWei(),
      tradeAccountingContract.getEthBalance(),
      xsnxContract.totalSupply(),
      getTokenBalance(snxContract.address, xsnxAdminAddress, provider),
    ])
    const nonSnxAssetValue = setHoldings.add(ethBal)
    const [issueTokenPriceInEth, redeemTokenPriceEth] = await Promise.all([
      tradeAccountingContract.calculateIssueTokenPrice(
        weiPerOneSnx,
        snxBalanceBefore,
        nonSnxAssetValue,
        totalSupply
      ),
      tradeAccountingContract.calculateRedeemTokenPrice(
        totalSupply,
        snxBalanceOwned,
        contractDebtValue
      ),
    ])
    const priceUsd = issueTokenPriceInEth.mul(ethUsdPrice).div(DEC_18)
    const sellPriceUsd = redeemTokenPriceEth.mul(ethUsdPrice).div(DEC_18)
    const aum = totalSupply.mul(priceUsd).div(DEC_18)
    return {
      aum: formatNumber(formatEther(aum), 0),
      priceEth: formatNumber(formatEther(issueTokenPriceInEth)),
      priceUsd: formatNumber(formatEther(priceUsd)),
      sellPriceEth: formatNumber(formatEther(redeemTokenPriceEth)),
      sellPriceUsd: formatNumber(formatEther(sellPriceUsd)),
    }
  } catch (e) {
    console.error('Error while fetching token price:', e)
    return DEFAULT_PRICES
  }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpY2VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veHNueC9wcmljZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsT0FBTyxFQUFFLG1CQUFtQixFQUFFLFdBQVcsRUFBRSxNQUFNLGtCQUFrQixDQUFBO0FBRW5FLE9BQU8sRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUFFLE1BQU0saUJBQWlCLENBQUE7QUFHeEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGFBQWEsQ0FBQTtBQUMxQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sVUFBVSxDQUFBO0FBRTFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQ0c7QUFDSCxNQUFNLENBQUMsTUFBTSxhQUFhLEdBQUcsS0FBSyxFQUNoQyxZQUFrQixFQUNsQixnQkFBd0IsRUFDeEIsdUJBQXdDLEVBQ3hDLHFCQUFvQyxFQUNwQyxXQUFxQixFQUNyQixRQUFzQixFQUNDLEVBQUU7SUFDekIsSUFBSTtRQUNGLE1BQU0sQ0FDSixFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsRUFDckIsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEVBQ3JCLGlCQUFpQixFQUNsQixHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQztZQUNwQixxQkFBcUIsQ0FBQyxrQkFBa0IsQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNwRSxxQkFBcUIsQ0FBQyxrQkFBa0IsQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNyRSxXQUFXLENBQUMsYUFBYSxDQUFDLGdCQUFnQixFQUFFLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3pFLENBQUMsQ0FBQTtRQUNGLE1BQU0sWUFBWSxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFBO1FBRTdELE1BQU0sQ0FDSixnQkFBZ0IsRUFDaEIsV0FBVyxFQUNYLE1BQU0sRUFDTixXQUFXLEVBQ1gsZUFBZSxFQUNoQixHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQztZQUNwQix1QkFBdUIsQ0FBQyxhQUFhLEVBQUU7WUFDdkMsdUJBQXVCLENBQUMsd0JBQXdCLEVBQUU7WUFDbEQsdUJBQXVCLENBQUMsYUFBYSxFQUFFO1lBQ3ZDLFlBQVksQ0FBQyxXQUFXLEVBQUU7WUFDMUIsZUFBZSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxDQUFDO1NBQ2pFLENBQUMsQ0FBQTtRQUNGLE1BQU0sZ0JBQWdCLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUVoRCxNQUFNLENBQUMsb0JBQW9CLEVBQUUsbUJBQW1CLENBQUMsR0FBRyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUM7WUFDcEUsdUJBQXVCLENBQUMsd0JBQXdCLENBQzlDLFlBQVksRUFDWixnQkFBZ0IsRUFDaEIsZ0JBQWdCLEVBQ2hCLFdBQVcsQ0FDWjtZQUNELHVCQUF1QixDQUFDLHlCQUF5QixDQUMvQyxXQUFXLEVBQ1gsZUFBZSxFQUNmLGlCQUFpQixDQUNsQjtTQUNGLENBQUMsQ0FBQTtRQUVGLE1BQU0sUUFBUSxHQUFHLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDbEUsTUFBTSxZQUFZLEdBQUcsbUJBQW1CLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUNyRSxNQUFNLEdBQUcsR0FBRyxXQUFXLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUVqRCxPQUFPO1lBQ0wsR0FBRyxFQUFFLFlBQVksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3RDLFFBQVEsRUFBRSxZQUFZLENBQUMsV0FBVyxDQUFDLG9CQUFvQixDQUFDLENBQUM7WUFDekQsUUFBUSxFQUFFLFlBQVksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDN0MsWUFBWSxFQUFFLFlBQVksQ0FBQyxXQUFXLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUM1RCxZQUFZLEVBQUUsWUFBWSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUN0RCxDQUFBO0tBQ0Y7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLE9BQU8sQ0FBQyxLQUFLLENBQUMsbUNBQW1DLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDckQsT0FBTyxjQUFjLENBQUE7S0FDdEI7QUFDSCxDQUFDLENBQUEifQ==
