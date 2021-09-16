'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.getXSnxPrices = void 0
const abis_1 = require('@xtoken/abis')
const utils_1 = require('ethers/lib/utils')
const constants_1 = require('../../constants')
const utils_2 = require('../../utils')
const erc20_1 = require('../erc20')
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
const getXSnxPrices = async (
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
      exchangeRatesContract.rateAndUpdatedTime(
        utils_1.formatBytes32String('SNX')
      ),
      exchangeRatesContract.rateAndUpdatedTime(
        utils_1.formatBytes32String('sETH')
      ),
      snxContract.debtBalanceOf(
        xsnxAdminAddress,
        utils_1.formatBytes32String('sUSD')
      ),
    ])
    const weiPerOneSnx = snxUsdPrice.mul(constants_1.DEC_18).div(ethUsdPrice)
    const [
      snxBalanceBefore,
      setHoldings,
      ethBal,
      totalSupply,
      snxTokenBalance,
    ] = await Promise.all([
      tradeAccountingContract.getSnxBalance(),
      tradeAccountingContract.getSetHoldingsValueInWei(),
      tradeAccountingContract.getEthBalance(),
      xsnxContract.totalSupply(),
      erc20_1.getTokenBalance(abis_1.SNX, xsnxAdminAddress, provider),
    ])
    const snxBalanceOwned = utils_1.parseEther(snxTokenBalance)
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
    const priceUsd = issueTokenPriceInEth
      .mul(ethUsdPrice)
      .div(constants_1.DEC_18)
    const sellPriceUsd = redeemTokenPriceEth
      .mul(ethUsdPrice)
      .div(constants_1.DEC_18)
    const aum = totalSupply.mul(priceUsd).div(constants_1.DEC_18)
    return {
      aum: utils_2.formatNumber(utils_1.formatEther(aum), 0),
      priceEth: utils_2.formatNumber(utils_1.formatEther(issueTokenPriceInEth)),
      priceUsd: utils_2.formatNumber(utils_1.formatEther(priceUsd)),
      sellPriceEth: utils_2.formatNumber(
        utils_1.formatEther(redeemTokenPriceEth)
      ),
      sellPriceUsd: utils_2.formatNumber(utils_1.formatEther(sellPriceUsd)),
    }
  } catch (e) {
    console.error('Error while fetching token price:', e)
    return constants_1.DEFAULT_PRICES
  }
}
exports.getXSnxPrices = getXSnxPrices
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpY2VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veHNueC9wcmljZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsdUNBQWtDO0FBRWxDLDRDQUErRTtBQUUvRSwrQ0FBd0Q7QUFHeEQsdUNBQTBDO0FBQzFDLG9DQUEwQztBQUUxQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUNHO0FBQ0ksTUFBTSxhQUFhLEdBQUcsS0FBSyxFQUNoQyxZQUFrQixFQUNsQixnQkFBd0IsRUFDeEIsdUJBQXdDLEVBQ3hDLHFCQUFvQyxFQUNwQyxXQUFxQixFQUNyQixRQUFzQixFQUNDLEVBQUU7SUFDekIsSUFBSTtRQUNGLE1BQU0sQ0FDSixFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsRUFDckIsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEVBQ3JCLGlCQUFpQixFQUNsQixHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQztZQUNwQixxQkFBcUIsQ0FBQyxrQkFBa0IsQ0FBQywyQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNwRSxxQkFBcUIsQ0FBQyxrQkFBa0IsQ0FBQywyQkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNyRSxXQUFXLENBQUMsYUFBYSxDQUFDLGdCQUFnQixFQUFFLDJCQUFtQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3pFLENBQUMsQ0FBQTtRQUNGLE1BQU0sWUFBWSxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsa0JBQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQTtRQUU3RCxNQUFNLENBQ0osZ0JBQWdCLEVBQ2hCLFdBQVcsRUFDWCxNQUFNLEVBQ04sV0FBVyxFQUNYLGVBQWUsRUFDaEIsR0FBRyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUM7WUFDcEIsdUJBQXVCLENBQUMsYUFBYSxFQUFFO1lBQ3ZDLHVCQUF1QixDQUFDLHdCQUF3QixFQUFFO1lBQ2xELHVCQUF1QixDQUFDLGFBQWEsRUFBRTtZQUN2QyxZQUFZLENBQUMsV0FBVyxFQUFFO1lBQzFCLHVCQUFlLENBQUMsVUFBRyxFQUFFLGdCQUFnQixFQUFFLFFBQVEsQ0FBQztTQUNqRCxDQUFDLENBQUE7UUFFRixNQUFNLGVBQWUsR0FBRyxrQkFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFBO1FBQ25ELE1BQU0sZ0JBQWdCLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUVoRCxNQUFNLENBQUMsb0JBQW9CLEVBQUUsbUJBQW1CLENBQUMsR0FBRyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUM7WUFDcEUsdUJBQXVCLENBQUMsd0JBQXdCLENBQzlDLFlBQVksRUFDWixnQkFBZ0IsRUFDaEIsZ0JBQWdCLEVBQ2hCLFdBQVcsQ0FDWjtZQUNELHVCQUF1QixDQUFDLHlCQUF5QixDQUMvQyxXQUFXLEVBQ1gsZUFBZSxFQUNmLGlCQUFpQixDQUNsQjtTQUNGLENBQUMsQ0FBQTtRQUVGLE1BQU0sUUFBUSxHQUFHLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxHQUFHLENBQUMsa0JBQU0sQ0FBQyxDQUFBO1FBQ2xFLE1BQU0sWUFBWSxHQUFHLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxHQUFHLENBQUMsa0JBQU0sQ0FBQyxDQUFBO1FBQ3JFLE1BQU0sR0FBRyxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLGtCQUFNLENBQUMsQ0FBQTtRQUVqRCxPQUFPO1lBQ0wsR0FBRyxFQUFFLG9CQUFZLENBQUMsbUJBQVcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDdEMsUUFBUSxFQUFFLG9CQUFZLENBQUMsbUJBQVcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1lBQ3pELFFBQVEsRUFBRSxvQkFBWSxDQUFDLG1CQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDN0MsWUFBWSxFQUFFLG9CQUFZLENBQUMsbUJBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBQzVELFlBQVksRUFBRSxvQkFBWSxDQUFDLG1CQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDdEQsQ0FBQTtLQUNGO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDVixPQUFPLENBQUMsS0FBSyxDQUFDLG1DQUFtQyxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQ3JELE9BQU8sMEJBQWMsQ0FBQTtLQUN0QjtBQUNILENBQUMsQ0FBQTtBQWxFWSxRQUFBLGFBQWEsaUJBa0V6QiJ9
