'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.getPortfolioItemXAave = void 0
const utils_1 = require('ethers/lib/utils')
const constants_1 = require('../../constants')
const utils_2 = require('../utils')
const helper_1 = require('./helper')
const prices_1 = require('./prices')
const getPortfolioItemXAave = async (symbol, address, provider) => {
  try {
    const {
      kyberProxyContract,
      network,
      xaaveContract,
    } = await helper_1.getXAaveContracts(symbol, provider)
    const { chainId } = network
    const xaaveBal = await utils_2.getUserAvailableTokenBalance(
      xaaveContract,
      address
    )
    const { priceUsd } = await prices_1.getXAavePrices(
      xaaveContract,
      kyberProxyContract,
      chainId
    )
    const xaaveValue = (xaaveBal * priceUsd).toFixed(2).toString()
    const tokenEquivalent = await getUnderlyingTokenEquivalent(
      xaaveContract,
      address
    )
    return {
      symbol,
      quantity: xaaveBal.toString(),
      price: priceUsd.toString(),
      value: xaaveValue.toString(),
      tokenEquivalent,
    }
  } catch (e) {
    console.error('Error while fetching portfolio balance:', e)
    return Object.assign({ symbol }, constants_1.DEFAULT_PORTFOLIO_ITEM)
  }
}
exports.getPortfolioItemXAave = getPortfolioItemXAave
const getUnderlyingTokenEquivalent = async (xaaveContract, address) => {
  const [userXaaveBal, contractAaveBal, xaaveSupply] = await Promise.all([
    xaaveContract.balanceOf(address),
    xaaveContract.getFundHoldings(),
    xaaveContract.totalSupply(),
  ])
  const userTokenEquivalent = contractAaveBal.mul(userXaaveBal).div(xaaveSupply)
  return utils_1.formatEther(userTokenEquivalent)
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9ydGZvbGlvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veGFhdmUvcG9ydGZvbGlvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLDRDQUE4QztBQUU5QywrQ0FBd0Q7QUFHeEQsb0NBQXVEO0FBRXZELHFDQUE0QztBQUM1QyxxQ0FBeUM7QUFFbEMsTUFBTSxxQkFBcUIsR0FBRyxLQUFLLEVBQ3hDLE1BQXFCLEVBQ3JCLE9BQWUsRUFDZixRQUFzQixFQUNHLEVBQUU7SUFDM0IsSUFBSTtRQUNGLE1BQU0sRUFDSixrQkFBa0IsRUFDbEIsT0FBTyxFQUNQLGFBQWEsR0FDZCxHQUFHLE1BQU0sMEJBQWlCLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFBO1FBQzdDLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxPQUFPLENBQUE7UUFFM0IsTUFBTSxRQUFRLEdBQUcsTUFBTSxvQ0FBNEIsQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDLENBQUE7UUFFM0UsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLE1BQU0sdUJBQWMsQ0FDdkMsYUFBYSxFQUNiLGtCQUFrQixFQUNsQixPQUFPLENBQ1IsQ0FBQTtRQUNELE1BQU0sVUFBVSxHQUFHLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQTtRQUU5RCxNQUFNLGVBQWUsR0FBRyxNQUFNLDRCQUE0QixDQUN4RCxhQUFhLEVBQ2IsT0FBTyxDQUNSLENBQUE7UUFFRCxPQUFPO1lBQ0wsTUFBTTtZQUNOLFFBQVEsRUFBRSxRQUFRLENBQUMsUUFBUSxFQUFFO1lBQzdCLEtBQUssRUFBRSxRQUFRLENBQUMsUUFBUSxFQUFFO1lBQzFCLEtBQUssRUFBRSxVQUFVLENBQUMsUUFBUSxFQUFFO1lBQzVCLGVBQWU7U0FDaEIsQ0FBQTtLQUNGO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDVixPQUFPLENBQUMsS0FBSyxDQUFDLHlDQUF5QyxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQzNELHVCQUNFLE1BQU0sSUFDSCxrQ0FBc0IsRUFDMUI7S0FDRjtBQUNILENBQUMsQ0FBQTtBQXpDWSxRQUFBLHFCQUFxQix5QkF5Q2pDO0FBRUQsTUFBTSw0QkFBNEIsR0FBRyxLQUFLLEVBQ3hDLGFBQW9CLEVBQ3BCLE9BQWUsRUFDZixFQUFFO0lBQ0YsTUFBTSxDQUFDLFlBQVksRUFBRSxlQUFlLEVBQUUsV0FBVyxDQUFDLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDO1FBQ3JFLGFBQWEsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDO1FBQ2hDLGFBQWEsQ0FBQyxlQUFlLEVBQUU7UUFDL0IsYUFBYSxDQUFDLFdBQVcsRUFBRTtLQUM1QixDQUFDLENBQUE7SUFFRixNQUFNLG1CQUFtQixHQUFHLGVBQWUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFBO0lBQzlFLE9BQU8sbUJBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFBO0FBQ3pDLENBQUMsQ0FBQSJ9
