'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.getMaximumRedeemableXAssetLev = void 0
const utils_1 = require('ethers/lib/utils')
const helper_1 = require('./helper')
const getMaximumRedeemableXAssetLev = async (symbol, provider) => {
  const { xassetlevContract } = await helper_1.getXAssetLevContracts(
    symbol,
    provider
  )
  const [
    bufferHoldings,
    { bufferBalance, marketBalance },
    totalSupply,
    liquidityBuffer,
  ] = await Promise.all([
    xassetlevContract.getBufferBalance(),
    xassetlevContract.getFundBalances(),
    xassetlevContract.totalSupply(),
    xassetlevContract.getLiquidityBuffer(),
  ])
  if (bufferHoldings.sub(liquidityBuffer).lt('0')) {
    return '0'
  }
  const redeemable = bufferHoldings
    .sub(liquidityBuffer)
    .mul(totalSupply)
    .div(bufferBalance.add(marketBalance))
  return utils_1.formatEther(redeemable)
}
exports.getMaximumRedeemableXAssetLev = getMaximumRedeemableXAssetLev
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkZWVtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4vbGV2L3JlZGVlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSw0Q0FBOEM7QUFJOUMscUNBQWdEO0FBRXpDLE1BQU0sNkJBQTZCLEdBQUcsS0FBSyxFQUNoRCxNQUFrQixFQUNsQixRQUFzQixFQUN0QixFQUFFO0lBQ0YsTUFBTSxFQUFFLGlCQUFpQixFQUFFLEdBQUcsTUFBTSw4QkFBcUIsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFFM0UsTUFBTSxDQUNKLGNBQWMsRUFDZCxFQUFFLGFBQWEsRUFBRSxhQUFhLEVBQUUsRUFDaEMsV0FBVyxFQUNYLGVBQWUsRUFDaEIsR0FBRyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUM7UUFDcEIsaUJBQWlCLENBQUMsZ0JBQWdCLEVBQUU7UUFDcEMsaUJBQWlCLENBQUMsZUFBZSxFQUFFO1FBQ25DLGlCQUFpQixDQUFDLFdBQVcsRUFBRTtRQUMvQixpQkFBaUIsQ0FBQyxrQkFBa0IsRUFBRTtLQUN2QyxDQUFDLENBQUE7SUFFRixJQUFJLGNBQWMsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQy9DLE9BQU8sR0FBRyxDQUFBO0tBQ1g7SUFFRCxNQUFNLFVBQVUsR0FBRyxjQUFjO1NBQzlCLEdBQUcsQ0FBQyxlQUFlLENBQUM7U0FDcEIsR0FBRyxDQUFDLFdBQVcsQ0FBQztTQUNoQixHQUFHLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFBO0lBRXhDLE9BQU8sbUJBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQTtBQUNoQyxDQUFDLENBQUE7QUE1QlksUUFBQSw2QkFBNkIsaUNBNEJ6QyJ9
