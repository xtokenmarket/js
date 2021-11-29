'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.getXSnxPrices = void 0
const abis_1 = require('@xtoken/abis')
const abis_2 = require('@xtoken/abis')
const utils_1 = require('ethers/lib/utils')
const constants_1 = require('../../constants')
const utils_2 = require('../../utils')
const erc20_1 = require('../erc20')
const utils_3 = require('../utils')
const helper_1 = require('./helper')
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
const getXSnxPrices = async (xsnxContract) => {
  try {
    const { provider } = xsnxContract
    const { chainId } = await provider.getNetwork()
    const xsnxAdminAddress = abis_1.ADDRESSES[abis_1.X_SNX_ADMIN][chainId]
    const {
      snxContract,
      tradeAccountingContract,
    } = await helper_1.getXSnxContracts(provider)
    const exchangeRatesContract = await utils_3.getExchangeRateContract(
      provider
    )
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
      erc20_1.getTokenBalance(abis_2.SNX, xsnxAdminAddress, provider),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpY2VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veHNueC9wcmljZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsdUNBQXFEO0FBQ3JELHVDQUFrQztBQUNsQyw0Q0FBK0U7QUFFL0UsK0NBQXdEO0FBR3hELHVDQUEwQztBQUMxQyxvQ0FBMEM7QUFDMUMsb0NBQWtEO0FBRWxELHFDQUEyQztBQUUzQzs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFDSSxNQUFNLGFBQWEsR0FBRyxLQUFLLEVBQ2hDLFlBQWtCLEVBQ0ssRUFBRTtJQUN6QixJQUFJO1FBQ0YsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLFlBQVksQ0FBQTtRQUNqQyxNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsTUFBTSxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUE7UUFDL0MsTUFBTSxnQkFBZ0IsR0FBRyxnQkFBUyxDQUFDLGtCQUFXLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUV4RCxNQUFNLEVBQUUsV0FBVyxFQUFFLHVCQUF1QixFQUFFLEdBQUcsTUFBTSx5QkFBZ0IsQ0FDckUsUUFBd0IsQ0FDekIsQ0FBQTtRQUNELE1BQU0scUJBQXFCLEdBQUcsQ0FBQyxNQUFNLCtCQUF1QixDQUMxRCxRQUF3QixDQUN6QixDQUFrQixDQUFBO1FBRW5CLE1BQU0sQ0FDSixFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsRUFDckIsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEVBQ3JCLGlCQUFpQixFQUNsQixHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQztZQUNwQixxQkFBcUIsQ0FBQyxrQkFBa0IsQ0FBQywyQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNwRSxxQkFBcUIsQ0FBQyxrQkFBa0IsQ0FBQywyQkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNyRSxXQUFXLENBQUMsYUFBYSxDQUFDLGdCQUFnQixFQUFFLDJCQUFtQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3pFLENBQUMsQ0FBQTtRQUNGLE1BQU0sWUFBWSxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsa0JBQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQTtRQUU3RCxNQUFNLENBQ0osZ0JBQWdCLEVBQ2hCLFdBQVcsRUFDWCxNQUFNLEVBQ04sV0FBVyxFQUNYLGVBQWUsRUFDaEIsR0FBRyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUM7WUFDcEIsdUJBQXVCLENBQUMsYUFBYSxFQUFFO1lBQ3ZDLHVCQUF1QixDQUFDLHdCQUF3QixFQUFFO1lBQ2xELHVCQUF1QixDQUFDLGFBQWEsRUFBRTtZQUN2QyxZQUFZLENBQUMsV0FBVyxFQUFFO1lBQzFCLHVCQUFlLENBQUMsVUFBRyxFQUFFLGdCQUFnQixFQUFFLFFBQXdCLENBQUM7U0FDakUsQ0FBQyxDQUFBO1FBRUYsTUFBTSxlQUFlLEdBQUcsa0JBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQTtRQUNuRCxNQUFNLGdCQUFnQixHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUE7UUFFaEQsTUFBTSxDQUFDLG9CQUFvQixFQUFFLG1CQUFtQixDQUFDLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDO1lBQ3BFLHVCQUF1QixDQUFDLHdCQUF3QixDQUM5QyxZQUFZLEVBQ1osZ0JBQWdCLEVBQ2hCLGdCQUFnQixFQUNoQixXQUFXLENBQ1o7WUFDRCx1QkFBdUIsQ0FBQyx5QkFBeUIsQ0FDL0MsV0FBVyxFQUNYLGVBQWUsRUFDZixpQkFBaUIsQ0FDbEI7U0FDRixDQUFDLENBQUE7UUFFRixNQUFNLFFBQVEsR0FBRyxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLGtCQUFNLENBQUMsQ0FBQTtRQUNsRSxNQUFNLFlBQVksR0FBRyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLGtCQUFNLENBQUMsQ0FBQTtRQUNyRSxNQUFNLEdBQUcsR0FBRyxXQUFXLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxrQkFBTSxDQUFDLENBQUE7UUFFakQsT0FBTztZQUNMLEdBQUcsRUFBRSxvQkFBWSxDQUFDLG1CQUFXLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3RDLFFBQVEsRUFBRSxvQkFBWSxDQUFDLG1CQUFXLENBQUMsb0JBQW9CLENBQUMsQ0FBQztZQUN6RCxRQUFRLEVBQUUsb0JBQVksQ0FBQyxtQkFBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzdDLFlBQVksRUFBRSxvQkFBWSxDQUFDLG1CQUFXLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUM1RCxZQUFZLEVBQUUsb0JBQVksQ0FBQyxtQkFBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ3RELENBQUE7S0FDRjtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsT0FBTyxDQUFDLEtBQUssQ0FBQyxtQ0FBbUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUNyRCxPQUFPLDBCQUFjLENBQUE7S0FDdEI7QUFDSCxDQUFDLENBQUE7QUF4RVksUUFBQSxhQUFhLGlCQXdFekIifQ==
