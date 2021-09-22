'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.getMaximumRedeemableXAssetCLR = void 0
const utils_1 = require('ethers/lib/utils')
const helper_1 = require('./helper')
const getMaximumRedeemableXAssetCLR = async (symbol, provider) => {
  const { xAssetCLRContract } = await helper_1.getXAssetCLRContracts(
    symbol,
    provider
  )
  const totalLiquidity = await xAssetCLRContract.getTotalLiquidity()
  return utils_1.formatEther(totalLiquidity)
}
exports.getMaximumRedeemableXAssetCLR = getMaximumRedeemableXAssetCLR
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkZWVtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4vY2xyL3JlZGVlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSw0Q0FBOEM7QUFJOUMscUNBQWdEO0FBRXpDLE1BQU0sNkJBQTZCLEdBQUcsS0FBSyxFQUNoRCxNQUFrQixFQUNsQixRQUFzQixFQUN0QixFQUFFO0lBQ0YsTUFBTSxFQUFFLGlCQUFpQixFQUFFLEdBQUcsTUFBTSw4QkFBcUIsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFDM0UsTUFBTSxjQUFjLEdBQUcsTUFBTSxpQkFBaUIsQ0FBQyxpQkFBaUIsRUFBRSxDQUFBO0lBQ2xFLE9BQU8sbUJBQVcsQ0FBQyxjQUFjLENBQUMsQ0FBQTtBQUNwQyxDQUFDLENBQUE7QUFQWSxRQUFBLDZCQUE2QixpQ0FPekMifQ==
