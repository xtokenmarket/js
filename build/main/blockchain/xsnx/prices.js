'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.getXSnxPrices = void 0
const utils_1 = require('ethers/lib/utils')
const constants_1 = require('../../constants')
const utils_2 = require('../../utils')
const utils_3 = require('../utils')
/**
 * @example
 * ```typescript
 * import { ethers } from 'ethers'
 * import { Abi, ADDRESSES, EXCHANGE_RATES, TRADE_ACCOUNTING, SNX, X_SNX_A, X_SNX_A_ADMIN } from '@xtoken/abis'
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
 *   ADDRESSES[X_SNX_A_ADMIN][chainId],
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
      snxBalanceOwned,
    ] = await Promise.all([
      tradeAccountingContract.getSnxBalance(),
      tradeAccountingContract.getSetHoldingsValueInWei(),
      tradeAccountingContract.getEthBalance(),
      xsnxContract.totalSupply(),
      utils_3.getTokenBalance(snxContract.address, xsnxAdminAddress, provider),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpY2VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veHNueC9wcmljZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsNENBQW1FO0FBRW5FLCtDQUF3RDtBQUd4RCx1Q0FBMEM7QUFDMUMsb0NBQTBDO0FBRTFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQ0c7QUFDSSxNQUFNLGFBQWEsR0FBRyxLQUFLLEVBQ2hDLFlBQWtCLEVBQ2xCLGdCQUF3QixFQUN4Qix1QkFBd0MsRUFDeEMscUJBQW9DLEVBQ3BDLFdBQXFCLEVBQ3JCLFFBQXNCLEVBQ0MsRUFBRTtJQUN6QixJQUFJO1FBQ0YsTUFBTSxDQUNKLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxFQUNyQixFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsRUFDckIsaUJBQWlCLEVBQ2xCLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDO1lBQ3BCLHFCQUFxQixDQUFDLGtCQUFrQixDQUFDLDJCQUFtQixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3BFLHFCQUFxQixDQUFDLGtCQUFrQixDQUFDLDJCQUFtQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3JFLFdBQVcsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLEVBQUUsMkJBQW1CLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDekUsQ0FBQyxDQUFBO1FBQ0YsTUFBTSxZQUFZLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQyxrQkFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFBO1FBRTdELE1BQU0sQ0FDSixnQkFBZ0IsRUFDaEIsV0FBVyxFQUNYLE1BQU0sRUFDTixXQUFXLEVBQ1gsZUFBZSxFQUNoQixHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQztZQUNwQix1QkFBdUIsQ0FBQyxhQUFhLEVBQUU7WUFDdkMsdUJBQXVCLENBQUMsd0JBQXdCLEVBQUU7WUFDbEQsdUJBQXVCLENBQUMsYUFBYSxFQUFFO1lBQ3ZDLFlBQVksQ0FBQyxXQUFXLEVBQUU7WUFDMUIsdUJBQWUsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFFBQVEsQ0FBQztTQUNqRSxDQUFDLENBQUE7UUFDRixNQUFNLGdCQUFnQixHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUE7UUFFaEQsTUFBTSxDQUFDLG9CQUFvQixFQUFFLG1CQUFtQixDQUFDLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDO1lBQ3BFLHVCQUF1QixDQUFDLHdCQUF3QixDQUM5QyxZQUFZLEVBQ1osZ0JBQWdCLEVBQ2hCLGdCQUFnQixFQUNoQixXQUFXLENBQ1o7WUFDRCx1QkFBdUIsQ0FBQyx5QkFBeUIsQ0FDL0MsV0FBVyxFQUNYLGVBQWUsRUFDZixpQkFBaUIsQ0FDbEI7U0FDRixDQUFDLENBQUE7UUFFRixNQUFNLFFBQVEsR0FBRyxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLGtCQUFNLENBQUMsQ0FBQTtRQUNsRSxNQUFNLFlBQVksR0FBRyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLGtCQUFNLENBQUMsQ0FBQTtRQUNyRSxNQUFNLEdBQUcsR0FBRyxXQUFXLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxrQkFBTSxDQUFDLENBQUE7UUFFakQsT0FBTztZQUNMLEdBQUcsRUFBRSxvQkFBWSxDQUFDLG1CQUFXLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3RDLFFBQVEsRUFBRSxvQkFBWSxDQUFDLG1CQUFXLENBQUMsb0JBQW9CLENBQUMsQ0FBQztZQUN6RCxRQUFRLEVBQUUsb0JBQVksQ0FBQyxtQkFBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzdDLFlBQVksRUFBRSxvQkFBWSxDQUFDLG1CQUFXLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUM1RCxZQUFZLEVBQUUsb0JBQVksQ0FBQyxtQkFBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ3RELENBQUE7S0FDRjtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsT0FBTyxDQUFDLEtBQUssQ0FBQyxtQ0FBbUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUNyRCxPQUFPLDBCQUFjLENBQUE7S0FDdEI7QUFDSCxDQUFDLENBQUE7QUFoRVksUUFBQSxhQUFhLGlCQWdFekIifQ==
