'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.getPortfolioItemXBnt = void 0
const utils_1 = require('ethers/lib/utils')
const constants_1 = require('../../constants')
const utils_2 = require('../utils')
const helper_1 = require('./helper')
const prices_1 = require('./prices')
const getPortfolioItemXBnt = async (symbol, address, provider) => {
  try {
    const {
      kyberProxyContract,
      xbntContract,
    } = await helper_1.getXBntContracts(symbol, provider)
    const xbntBal = await utils_2.getUserAvailableTokenBalance(
      xbntContract,
      address
    )
    const { priceUsd } = await prices_1.getXBntPrices(
      xbntContract,
      kyberProxyContract
    )
    const xbntValue = (xbntBal * priceUsd).toFixed(2).toString()
    const tokenEquivalent = await getUnderlyingTokenEquivalent(
      xbntContract,
      address
    )
    return {
      symbol,
      quantity: xbntBal.toString(),
      price: priceUsd.toString(),
      value: xbntValue.toString(),
      tokenEquivalent,
    }
  } catch (e) {
    console.error('Error while fetching portfolio balance:', e)
    return Object.assign({ symbol }, constants_1.DEFAULT_PORTFOLIO_ITEM)
  }
}
exports.getPortfolioItemXBnt = getPortfolioItemXBnt
const getUnderlyingTokenEquivalent = async (xbntContract, address) => {
  const [userXbntBal, contractBntBal, xbntSupply] = await Promise.all([
    xbntContract.balanceOf(address),
    xbntContract.getNav(),
    xbntContract.totalSupply(),
  ])
  const userTokenEquivalent = contractBntBal.mul(userXbntBal).div(xbntSupply)
  return utils_1.formatEther(userTokenEquivalent)
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9ydGZvbGlvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veGJudC9wb3J0Zm9saW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsNENBQThDO0FBRTlDLCtDQUF3RDtBQUd4RCxvQ0FBdUQ7QUFFdkQscUNBQTJDO0FBQzNDLHFDQUF3QztBQUVqQyxNQUFNLG9CQUFvQixHQUFHLEtBQUssRUFDdkMsTUFBcUIsRUFDckIsT0FBZSxFQUNmLFFBQXNCLEVBQ0csRUFBRTtJQUMzQixJQUFJO1FBQ0YsTUFBTSxFQUFFLGtCQUFrQixFQUFFLFlBQVksRUFBRSxHQUFHLE1BQU0seUJBQWdCLENBQ2pFLE1BQU0sRUFDTixRQUFRLENBQ1QsQ0FBQTtRQUVELE1BQU0sT0FBTyxHQUFHLE1BQU0sb0NBQTRCLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FBQyxDQUFBO1FBRXpFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxNQUFNLHNCQUFhLENBQUMsWUFBWSxFQUFFLGtCQUFrQixDQUFDLENBQUE7UUFDMUUsTUFBTSxTQUFTLEdBQUcsQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFBO1FBRTVELE1BQU0sZUFBZSxHQUFHLE1BQU0sNEJBQTRCLENBQ3hELFlBQVksRUFDWixPQUFPLENBQ1IsQ0FBQTtRQUVELE9BQU87WUFDTCxNQUFNO1lBQ04sUUFBUSxFQUFFLE9BQU8sQ0FBQyxRQUFRLEVBQUU7WUFDNUIsS0FBSyxFQUFFLFFBQVEsQ0FBQyxRQUFRLEVBQUU7WUFDMUIsS0FBSyxFQUFFLFNBQVMsQ0FBQyxRQUFRLEVBQUU7WUFDM0IsZUFBZTtTQUNoQixDQUFBO0tBQ0Y7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLE9BQU8sQ0FBQyxLQUFLLENBQUMseUNBQXlDLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDM0QsdUJBQ0UsTUFBTSxJQUNILGtDQUFzQixFQUMxQjtLQUNGO0FBQ0gsQ0FBQyxDQUFBO0FBbkNZLFFBQUEsb0JBQW9CLHdCQW1DaEM7QUFFRCxNQUFNLDRCQUE0QixHQUFHLEtBQUssRUFDeEMsWUFBa0IsRUFDbEIsT0FBZSxFQUNmLEVBQUU7SUFDRixNQUFNLENBQUMsV0FBVyxFQUFFLGNBQWMsRUFBRSxVQUFVLENBQUMsR0FBRyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUM7UUFDbEUsWUFBWSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUM7UUFDL0IsWUFBWSxDQUFDLE1BQU0sRUFBRTtRQUNyQixZQUFZLENBQUMsV0FBVyxFQUFFO0tBQzNCLENBQUMsQ0FBQTtJQUVGLE1BQU0sbUJBQW1CLEdBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUE7SUFDM0UsT0FBTyxtQkFBVyxDQUFDLG1CQUFtQixDQUFDLENBQUE7QUFDekMsQ0FBQyxDQUFBIn0=
