'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.getPortfolioItemXInch = void 0
const utils_1 = require('ethers/lib/utils')
const constants_1 = require('../../constants')
const utils_2 = require('../utils')
const helper_1 = require('./helper')
const prices_1 = require('./prices')
const getPortfolioItemXInch = async (symbol, address, provider) => {
  try {
    const {
      kyberProxyContract,
      network,
      xinchContract,
    } = await helper_1.getXInchContracts(symbol, provider)
    const { chainId } = network
    const xinchBal = await utils_2.getUserAvailableTokenBalance(
      xinchContract,
      address
    )
    const { priceUsd } = await prices_1.getXInchPrices(
      xinchContract,
      kyberProxyContract,
      chainId
    )
    const xinchValue = (xinchBal * priceUsd).toFixed(2)
    const tokenEquivalent = await getUnderlyingTokenEquivalent(
      xinchContract,
      address
    )
    return {
      symbol,
      quantity: xinchBal.toString(),
      price: priceUsd.toString(),
      value: xinchValue.toString(),
      tokenEquivalent,
    }
  } catch (e) {
    console.error('Error while fetching portfolio balance:', e)
    return Object.assign({ symbol }, constants_1.DEFAULT_PORTFOLIO_ITEM)
  }
}
exports.getPortfolioItemXInch = getPortfolioItemXInch
const getUnderlyingTokenEquivalent = async (xinchContract, address) => {
  const [userXinchBal, inchHoldings, xinchSupply] = await Promise.all([
    xinchContract.balanceOf(address),
    xinchContract.getNav(),
    xinchContract.totalSupply(),
  ])
  const userTokenEquivalent = inchHoldings.mul(userXinchBal).div(xinchSupply)
  return utils_1.formatEther(userTokenEquivalent)
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9ydGZvbGlvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veGluY2gvcG9ydGZvbGlvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLDRDQUE4QztBQUU5QywrQ0FBd0Q7QUFHeEQsb0NBQXVEO0FBRXZELHFDQUE0QztBQUM1QyxxQ0FBeUM7QUFFbEMsTUFBTSxxQkFBcUIsR0FBRyxLQUFLLEVBQ3hDLE1BQXFCLEVBQ3JCLE9BQWUsRUFDZixRQUFzQixFQUNHLEVBQUU7SUFDM0IsSUFBSTtRQUNGLE1BQU0sRUFDSixrQkFBa0IsRUFDbEIsT0FBTyxFQUNQLGFBQWEsR0FDZCxHQUFHLE1BQU0sMEJBQWlCLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFBO1FBQzdDLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxPQUFPLENBQUE7UUFFM0IsTUFBTSxRQUFRLEdBQUcsTUFBTSxvQ0FBNEIsQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDLENBQUE7UUFFM0UsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLE1BQU0sdUJBQWMsQ0FDdkMsYUFBYSxFQUNiLGtCQUFrQixFQUNsQixPQUFPLENBQ1IsQ0FBQTtRQUNELE1BQU0sVUFBVSxHQUFHLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUVuRCxNQUFNLGVBQWUsR0FBRyxNQUFNLDRCQUE0QixDQUN4RCxhQUFhLEVBQ2IsT0FBTyxDQUNSLENBQUE7UUFFRCxPQUFPO1lBQ0wsTUFBTTtZQUNOLFFBQVEsRUFBRSxRQUFRLENBQUMsUUFBUSxFQUFFO1lBQzdCLEtBQUssRUFBRSxRQUFRLENBQUMsUUFBUSxFQUFFO1lBQzFCLEtBQUssRUFBRSxVQUFVLENBQUMsUUFBUSxFQUFFO1lBQzVCLGVBQWU7U0FDaEIsQ0FBQTtLQUNGO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDVixPQUFPLENBQUMsS0FBSyxDQUFDLHlDQUF5QyxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQzNELHVCQUNFLE1BQU0sSUFDSCxrQ0FBc0IsRUFDMUI7S0FDRjtBQUNILENBQUMsQ0FBQTtBQXpDWSxRQUFBLHFCQUFxQix5QkF5Q2pDO0FBRUQsTUFBTSw0QkFBNEIsR0FBRyxLQUFLLEVBQ3hDLGFBQW9CLEVBQ3BCLE9BQWUsRUFDZixFQUFFO0lBQ0YsTUFBTSxDQUFDLFlBQVksRUFBRSxZQUFZLEVBQUUsV0FBVyxDQUFDLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDO1FBQ2xFLGFBQWEsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDO1FBQ2hDLGFBQWEsQ0FBQyxNQUFNLEVBQUU7UUFDdEIsYUFBYSxDQUFDLFdBQVcsRUFBRTtLQUM1QixDQUFDLENBQUE7SUFFRixNQUFNLG1CQUFtQixHQUFHLFlBQVksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFBO0lBQzNFLE9BQU8sbUJBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFBO0FBQ3pDLENBQUMsQ0FBQSJ9
