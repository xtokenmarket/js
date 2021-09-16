'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.getMaximumRedeemableXAave = void 0
const utils_1 = require('ethers/lib/utils')
const helper_1 = require('./helper')
const getMaximumRedeemableXAave = async (symbol, provider) => {
  const { xaaveContract } = await helper_1.getXAaveContracts(symbol, provider)
  const [bufferHoldings, aaveHoldings, totalSupply] = await Promise.all([
    xaaveContract.getBufferBalance(),
    xaaveContract.getFundHoldings(),
    xaaveContract.totalSupply(),
  ])
  const redeemable = bufferHoldings.mul(totalSupply).div(aaveHoldings)
  return utils_1.formatEther(redeemable)
}
exports.getMaximumRedeemableXAave = getMaximumRedeemableXAave
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkZWVtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veGFhdmUvcmVkZWVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLDRDQUE4QztBQUk5QyxxQ0FBNEM7QUFFckMsTUFBTSx5QkFBeUIsR0FBRyxLQUFLLEVBQzVDLE1BQXFCLEVBQ3JCLFFBQXNCLEVBQ3RCLEVBQUU7SUFDRixNQUFNLEVBQUUsYUFBYSxFQUFFLEdBQUcsTUFBTSwwQkFBaUIsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFFbkUsTUFBTSxDQUFDLGNBQWMsRUFBRSxZQUFZLEVBQUUsV0FBVyxDQUFDLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDO1FBQ3BFLGFBQWEsQ0FBQyxnQkFBZ0IsRUFBRTtRQUNoQyxhQUFhLENBQUMsZUFBZSxFQUFFO1FBQy9CLGFBQWEsQ0FBQyxXQUFXLEVBQUU7S0FDNUIsQ0FBQyxDQUFBO0lBRUYsTUFBTSxVQUFVLEdBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUE7SUFDcEUsT0FBTyxtQkFBVyxDQUFDLFVBQVUsQ0FBQyxDQUFBO0FBQ2hDLENBQUMsQ0FBQTtBQWRZLFFBQUEseUJBQXlCLDZCQWNyQyJ9
