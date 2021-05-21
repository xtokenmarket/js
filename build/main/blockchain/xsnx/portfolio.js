'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.getPortfolioItemXSnx = void 0
const abis_1 = require('@xtoken/abis')
const utils_1 = require('ethers/lib/utils')
const constants_1 = require('../../constants')
const utils_2 = require('../utils')
const helper_1 = require('./helper')
const prices_1 = require('./prices')
// Might need to refactor if we add xSNX instance
const getPortfolioItemXSnx = async (symbol, address, provider) => {
  try {
    const {
      network,
      snxContract,
      tradeAccountingContract,
      xsnxContract,
    } = await helper_1.getXSnxContracts(provider)
    const { chainId } = network
    const xsnxAdminAddress = abis_1.ADDRESSES[abis_1.X_SNX_A_ADMIN][chainId]
    const exchangeRatesContract = await utils_2.getExchangeRateContract(
      provider
    )
    const xsnxBal = await utils_2.getUserAvailableTokenBalance(
      xsnxContract,
      address
    )
    const {
      rate: snxPriceInUsd,
    } = await exchangeRatesContract.rateAndUpdatedTime(
      utils_1.formatBytes32String('SNX')
    )
    const { priceUsd } = await prices_1.getXSnxPrices(
      xsnxContract,
      xsnxAdminAddress,
      tradeAccountingContract,
      exchangeRatesContract,
      snxContract,
      provider
    )
    const xsnxValue = utils_1.parseEther((xsnxBal * priceUsd).toString())
    const tokenEquivalent = xsnxValue.div(snxPriceInUsd).toString()
    return {
      symbol,
      quantity: xsnxBal.toString(),
      price: priceUsd.toString(),
      value: utils_1.formatEther(xsnxValue),
      tokenEquivalent,
    }
  } catch (e) {
    console.error('Error while fetching portfolio balance:', e)
    return Object.assign({ symbol }, constants_1.DEFAULT_PORTFOLIO_ITEM)
  }
}
exports.getPortfolioItemXSnx = getPortfolioItemXSnx
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9ydGZvbGlvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veHNueC9wb3J0Zm9saW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsdUNBQXVEO0FBRXZELDRDQUErRTtBQUUvRSwrQ0FBd0Q7QUFHeEQsb0NBQWdGO0FBRWhGLHFDQUEyQztBQUMzQyxxQ0FBd0M7QUFFeEMsaURBQWlEO0FBQzFDLE1BQU0sb0JBQW9CLEdBQUcsS0FBSyxFQUN2QyxNQUFxQixFQUNyQixPQUFlLEVBQ2YsUUFBc0IsRUFDRyxFQUFFO0lBQzNCLElBQUk7UUFDRixNQUFNLEVBQ0osT0FBTyxFQUNQLFdBQVcsRUFDWCx1QkFBdUIsRUFDdkIsWUFBWSxHQUNiLEdBQUcsTUFBTSx5QkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUNwQyxNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsT0FBTyxDQUFBO1FBRTNCLE1BQU0sZ0JBQWdCLEdBQUcsZ0JBQVMsQ0FBQyxvQkFBYSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDMUQsTUFBTSxxQkFBcUIsR0FBRyxDQUFDLE1BQU0sK0JBQXVCLENBQzFELFFBQVEsQ0FDVCxDQUFrQixDQUFBO1FBRW5CLE1BQU0sT0FBTyxHQUFHLE1BQU0sb0NBQTRCLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FBQyxDQUFBO1FBQ3pFLE1BQU0sRUFDSixJQUFJLEVBQUUsYUFBYSxHQUNwQixHQUFHLE1BQU0scUJBQXFCLENBQUMsa0JBQWtCLENBQ2hELDJCQUFtQixDQUFDLEtBQUssQ0FBQyxDQUMzQixDQUFBO1FBQ0QsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLE1BQU0sc0JBQWEsQ0FDdEMsWUFBWSxFQUNaLGdCQUFnQixFQUNoQix1QkFBdUIsRUFDdkIscUJBQXFCLEVBQ3JCLFdBQXVCLEVBQ3ZCLFFBQVEsQ0FDVCxDQUFBO1FBRUQsTUFBTSxTQUFTLEdBQUcsa0JBQVUsQ0FBQyxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFBO1FBQzdELE1BQU0sZUFBZSxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUE7UUFFL0QsT0FBTztZQUNMLE1BQU07WUFDTixRQUFRLEVBQUUsT0FBTyxDQUFDLFFBQVEsRUFBRTtZQUM1QixLQUFLLEVBQUUsUUFBUSxDQUFDLFFBQVEsRUFBRTtZQUMxQixLQUFLLEVBQUUsbUJBQVcsQ0FBQyxTQUFTLENBQUM7WUFDN0IsZUFBZTtTQUNoQixDQUFBO0tBQ0Y7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLE9BQU8sQ0FBQyxLQUFLLENBQUMseUNBQXlDLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDM0QsdUJBQ0UsTUFBTSxJQUNILGtDQUFzQixFQUMxQjtLQUNGO0FBQ0gsQ0FBQyxDQUFBO0FBbkRZLFFBQUEsb0JBQW9CLHdCQW1EaEMifQ==
