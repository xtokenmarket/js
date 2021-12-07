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
  const redeemable = bufferHoldings
    .mul(totalSupply)
    .div(bufferBalance.add(marketBalance))
    .sub(liquidityBuffer)
  return utils_1.formatEther(redeemable)
}
exports.getMaximumRedeemableXAssetLev = getMaximumRedeemableXAssetLev
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkZWVtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4vbGV2L3JlZGVlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSw0Q0FBOEM7QUFJOUMscUNBQWdEO0FBRXpDLE1BQU0sNkJBQTZCLEdBQUcsS0FBSyxFQUNoRCxNQUFrQixFQUNsQixRQUFzQixFQUN0QixFQUFFO0lBQ0YsTUFBTSxFQUFFLGlCQUFpQixFQUFFLEdBQUcsTUFBTSw4QkFBcUIsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFFM0UsTUFBTSxDQUNKLGNBQWMsRUFDZCxFQUFFLGFBQWEsRUFBRSxhQUFhLEVBQUUsRUFDaEMsV0FBVyxFQUNYLGVBQWUsRUFDaEIsR0FBRyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUM7UUFDcEIsaUJBQWlCLENBQUMsZ0JBQWdCLEVBQUU7UUFDcEMsaUJBQWlCLENBQUMsZUFBZSxFQUFFO1FBQ25DLGlCQUFpQixDQUFDLFdBQVcsRUFBRTtRQUMvQixpQkFBaUIsQ0FBQyxrQkFBa0IsRUFBRTtLQUN2QyxDQUFDLENBQUE7SUFFRixNQUFNLFVBQVUsR0FBRyxjQUFjO1NBQzlCLEdBQUcsQ0FBQyxXQUFXLENBQUM7U0FDaEIsR0FBRyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDckMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFBO0lBQ3ZCLE9BQU8sbUJBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQTtBQUNoQyxDQUFDLENBQUE7QUF2QlksUUFBQSw2QkFBNkIsaUNBdUJ6QyJ9
