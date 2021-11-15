'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.getPortfolioItemXAlpha = void 0
const utils_1 = require('ethers/lib/utils')
const constants_1 = require('../../constants')
const utils_2 = require('../utils')
const helper_1 = require('./helper')
const prices_1 = require('./prices')
const getPortfolioItemXAlpha = async (symbol, address, provider) => {
  try {
    const { xalphaContract } = await helper_1.getXAlphaContracts(
      symbol,
      provider
    )
    const [xalphaBal, { priceUsd }, tokenEquivalent] = await Promise.all([
      utils_2.getUserAvailableTokenBalance(xalphaContract, address),
      prices_1.getXAlphaPrices(xalphaContract),
      getUnderlyingTokenEquivalent(xalphaContract, address),
    ])
    const xalphaValue = (xalphaBal * priceUsd).toFixed(2).toString()
    return {
      symbol,
      quantity: xalphaBal.toString(),
      price: priceUsd.toString(),
      value: xalphaValue.toString(),
      tokenEquivalent,
    }
  } catch (e) {
    console.error('Error while fetching portfolio balance: ', e)
    return Object.assign({ symbol }, constants_1.DEFAULT_PORTFOLIO_ITEM)
  }
}
exports.getPortfolioItemXAlpha = getPortfolioItemXAlpha
const getUnderlyingTokenEquivalent = async (xalphaContract, address) => {
  const [userXalphaBal, contractAlphaBal, xalphaSupply] = await Promise.all([
    xalphaContract.balanceOf(address),
    xalphaContract.getNav(),
    xalphaContract.totalSupply(),
  ])
  const userTokenEquivalent = contractAlphaBal
    .mul(userXalphaBal)
    .div(xalphaSupply)
  return utils_1.formatEther(userTokenEquivalent)
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9ydGZvbGlvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veGFscGhhL3BvcnRmb2xpby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSw0Q0FBOEM7QUFFOUMsK0NBQXdEO0FBR3hELG9DQUF1RDtBQUV2RCxxQ0FBNkM7QUFDN0MscUNBQTBDO0FBRW5DLE1BQU0sc0JBQXNCLEdBQUcsS0FBSyxFQUN6QyxNQUFxQixFQUNyQixPQUFlLEVBQ2YsUUFBc0IsRUFDRyxFQUFFO0lBQzNCLElBQUk7UUFDRixNQUFNLEVBQUUsY0FBYyxFQUFFLEdBQUcsTUFBTSwyQkFBa0IsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUE7UUFFckUsTUFBTSxDQUFDLFNBQVMsRUFBRSxFQUFFLFFBQVEsRUFBRSxFQUFFLGVBQWUsQ0FBQyxHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQztZQUNuRSxvQ0FBNEIsQ0FBQyxjQUFjLEVBQUUsT0FBTyxDQUFDO1lBQ3JELHdCQUFlLENBQUMsY0FBYyxDQUFDO1lBQy9CLDRCQUE0QixDQUFDLGNBQWMsRUFBRSxPQUFPLENBQUM7U0FDdEQsQ0FBQyxDQUFBO1FBRUYsTUFBTSxXQUFXLEdBQUcsQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFBO1FBRWhFLE9BQU87WUFDTCxNQUFNO1lBQ04sUUFBUSxFQUFFLFNBQVMsQ0FBQyxRQUFRLEVBQUU7WUFDOUIsS0FBSyxFQUFFLFFBQVEsQ0FBQyxRQUFRLEVBQUU7WUFDMUIsS0FBSyxFQUFFLFdBQVcsQ0FBQyxRQUFRLEVBQUU7WUFDN0IsZUFBZTtTQUNoQixDQUFBO0tBQ0Y7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLE9BQU8sQ0FBQyxLQUFLLENBQUMsMENBQTBDLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDNUQsdUJBQ0UsTUFBTSxJQUNILGtDQUFzQixFQUMxQjtLQUNGO0FBQ0gsQ0FBQyxDQUFBO0FBOUJZLFFBQUEsc0JBQXNCLDBCQThCbEM7QUFFRCxNQUFNLDRCQUE0QixHQUFHLEtBQUssRUFDeEMsY0FBc0IsRUFDdEIsT0FBZSxFQUNmLEVBQUU7SUFDRixNQUFNLENBQUMsYUFBYSxFQUFFLGdCQUFnQixFQUFFLFlBQVksQ0FBQyxHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUN4RSxjQUFjLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQztRQUNqQyxjQUFjLENBQUMsTUFBTSxFQUFFO1FBQ3ZCLGNBQWMsQ0FBQyxXQUFXLEVBQUU7S0FDN0IsQ0FBQyxDQUFBO0lBRUYsTUFBTSxtQkFBbUIsR0FBRyxnQkFBZ0I7U0FDekMsR0FBRyxDQUFDLGFBQWEsQ0FBQztTQUNsQixHQUFHLENBQUMsWUFBWSxDQUFDLENBQUE7SUFDcEIsT0FBTyxtQkFBVyxDQUFDLG1CQUFtQixDQUFDLENBQUE7QUFDekMsQ0FBQyxDQUFBIn0=
