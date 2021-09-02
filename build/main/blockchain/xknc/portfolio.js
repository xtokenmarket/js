'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.getPortfolioItemXKnc = void 0
const utils_1 = require('ethers/lib/utils')
const constants_1 = require('../../constants')
const utils_2 = require('../utils')
const helper_1 = require('./helper')
const prices_1 = require('./prices')
const getPortfolioItemXKnc = async (symbol, address, provider) => {
  try {
    const {
      kncContract,
      kyberProxyContract,
      xkncContract,
    } = await helper_1.getXKncContracts(symbol, provider)
    const xkncBal = await utils_2.getUserAvailableTokenBalance(
      xkncContract,
      address
    )
    const { priceUsd } = await prices_1.getXKncPrices(
      xkncContract,
      kncContract,
      kyberProxyContract
    )
    const xkncValue = (xkncBal * priceUsd).toFixed(2)
    const tokenEquivalent = await getUnderlyingTokenEquivalent(
      xkncContract,
      address
    )
    return {
      symbol,
      quantity: xkncBal.toString(),
      price: priceUsd.toString(),
      value: xkncValue.toString(),
      tokenEquivalent,
    }
  } catch (e) {
    console.error('Error while fetching portfolio balance:', e)
    return Object.assign({ symbol }, constants_1.DEFAULT_PORTFOLIO_ITEM)
  }
}
exports.getPortfolioItemXKnc = getPortfolioItemXKnc
const getUnderlyingTokenEquivalent = async (xkncContract, address) => {
  const [userXkncBal, contractKncBal, xkncSupply] = await Promise.all([
    xkncContract.balanceOf(address),
    xkncContract.getFundKncBalanceTwei(),
    xkncContract.totalSupply(),
  ])
  const userTokenEquivalent = contractKncBal.mul(userXkncBal).div(xkncSupply)
  return utils_1.formatEther(userTokenEquivalent)
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9ydGZvbGlvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veGtuYy9wb3J0Zm9saW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsNENBQThDO0FBRTlDLCtDQUF3RDtBQUd4RCxvQ0FBdUQ7QUFFdkQscUNBQTJDO0FBQzNDLHFDQUF3QztBQUVqQyxNQUFNLG9CQUFvQixHQUFHLEtBQUssRUFDdkMsTUFBcUIsRUFDckIsT0FBZSxFQUNmLFFBQXNCLEVBQ0csRUFBRTtJQUMzQixJQUFJO1FBQ0YsTUFBTSxFQUNKLFdBQVcsRUFDWCxrQkFBa0IsRUFDbEIsWUFBWSxHQUNiLEdBQUcsTUFBTSx5QkFBZ0IsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUE7UUFFNUMsTUFBTSxPQUFPLEdBQUcsTUFBTSxvQ0FBNEIsQ0FBQyxZQUFZLEVBQUUsT0FBTyxDQUFDLENBQUE7UUFFekUsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLE1BQU0sc0JBQWEsQ0FDdEMsWUFBWSxFQUNaLFdBQXVCLEVBQ3ZCLGtCQUFrQixDQUNuQixDQUFBO1FBQ0QsTUFBTSxTQUFTLEdBQUcsQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ2pELE1BQU0sZUFBZSxHQUFHLE1BQU0sNEJBQTRCLENBQ3hELFlBQVksRUFDWixPQUFPLENBQ1IsQ0FBQTtRQUVELE9BQU87WUFDTCxNQUFNO1lBQ04sUUFBUSxFQUFFLE9BQU8sQ0FBQyxRQUFRLEVBQUU7WUFDNUIsS0FBSyxFQUFFLFFBQVEsQ0FBQyxRQUFRLEVBQUU7WUFDMUIsS0FBSyxFQUFFLFNBQVMsQ0FBQyxRQUFRLEVBQUU7WUFDM0IsZUFBZTtTQUNoQixDQUFBO0tBQ0Y7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLE9BQU8sQ0FBQyxLQUFLLENBQUMseUNBQXlDLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDM0QsdUJBQ0UsTUFBTSxJQUNILGtDQUFzQixFQUMxQjtLQUNGO0FBQ0gsQ0FBQyxDQUFBO0FBdkNZLFFBQUEsb0JBQW9CLHdCQXVDaEM7QUFFRCxNQUFNLDRCQUE0QixHQUFHLEtBQUssRUFDeEMsWUFBa0IsRUFDbEIsT0FBZSxFQUNmLEVBQUU7SUFDRixNQUFNLENBQUMsV0FBVyxFQUFFLGNBQWMsRUFBRSxVQUFVLENBQUMsR0FBRyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUM7UUFDbEUsWUFBWSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUM7UUFDL0IsWUFBWSxDQUFDLHFCQUFxQixFQUFFO1FBQ3BDLFlBQVksQ0FBQyxXQUFXLEVBQUU7S0FDM0IsQ0FBQyxDQUFBO0lBRUYsTUFBTSxtQkFBbUIsR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQTtJQUMzRSxPQUFPLG1CQUFXLENBQUMsbUJBQW1CLENBQUMsQ0FBQTtBQUN6QyxDQUFDLENBQUEifQ==
