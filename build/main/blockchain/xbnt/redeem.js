'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.getMaximumRedeemableXBnt = void 0
const utils_1 = require('ethers/lib/utils')
const helper_1 = require('./helper')
const getMaximumRedeemableXBnt = async (symbol, provider) => {
  const { xbntContract } = await helper_1.getXBntContracts(symbol, provider)
  const [bufferHoldings, bntHoldings, totalSupply] = await Promise.all([
    xbntContract.getBufferBalance(),
    xbntContract.getNav(),
    xbntContract.totalSupply(),
  ])
  const redeemable = bufferHoldings.mul(totalSupply).div(bntHoldings)
  return utils_1.formatEther(redeemable)
}
exports.getMaximumRedeemableXBnt = getMaximumRedeemableXBnt
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkZWVtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veGJudC9yZWRlZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsNENBQThDO0FBSTlDLHFDQUEyQztBQUVwQyxNQUFNLHdCQUF3QixHQUFHLEtBQUssRUFDM0MsTUFBcUIsRUFDckIsUUFBc0IsRUFDdEIsRUFBRTtJQUNGLE1BQU0sRUFBRSxZQUFZLEVBQUUsR0FBRyxNQUFNLHlCQUFnQixDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQTtJQUVqRSxNQUFNLENBQUMsY0FBYyxFQUFFLFdBQVcsRUFBRSxXQUFXLENBQUMsR0FBRyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUM7UUFDbkUsWUFBWSxDQUFDLGdCQUFnQixFQUFFO1FBQy9CLFlBQVksQ0FBQyxNQUFNLEVBQUU7UUFDckIsWUFBWSxDQUFDLFdBQVcsRUFBRTtLQUMzQixDQUFDLENBQUE7SUFFRixNQUFNLFVBQVUsR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQTtJQUNuRSxPQUFPLG1CQUFXLENBQUMsVUFBVSxDQUFDLENBQUE7QUFDaEMsQ0FBQyxDQUFBO0FBZFksUUFBQSx3QkFBd0IsNEJBY3BDIn0=
