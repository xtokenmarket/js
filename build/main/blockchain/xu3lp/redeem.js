'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.getMaximumRedeemableXU3LP = void 0
const utils_1 = require('ethers/lib/utils')
const helper_1 = require('./helper')
const getMaximumRedeemableXU3LP = async (symbol, outputAsset, provider) => {
  const { xu3lpContract } = await helper_1.getXU3LPContracts(symbol, provider)
  const [bufferHoldings, nav, totalSupply] = await Promise.all([
    xu3lpContract.getBufferBalance(),
    xu3lpContract.getNav(),
    xu3lpContract.totalSupply(),
  ])
  const getAmountInAssetTerms = outputAsset
    ? xu3lpContract.getAmountInAsset0Terms
    : xu3lpContract.getAmountInAsset1Terms
  const amount = bufferHoldings.mul(totalSupply).div(nav)
  const redeemable = await getAmountInAssetTerms(amount)
  // Account for slippage buffer of 1%
  const redeemableWithSlippage = redeemable.sub(redeemable.div(100))
  return utils_1.formatEther(redeemableWithSlippage)
}
exports.getMaximumRedeemableXU3LP = getMaximumRedeemableXU3LP
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkZWVtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veHUzbHAvcmVkZWVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLDRDQUE4QztBQUk5QyxxQ0FBNEM7QUFFckMsTUFBTSx5QkFBeUIsR0FBRyxLQUFLLEVBQzVDLE1BQXVCLEVBQ3ZCLFdBQXlCLEVBQ3pCLFFBQXNCLEVBQ3RCLEVBQUU7SUFDRixNQUFNLEVBQUUsYUFBYSxFQUFFLEdBQUcsTUFBTSwwQkFBaUIsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFFbkUsTUFBTSxDQUFDLGNBQWMsRUFBRSxHQUFHLEVBQUUsV0FBVyxDQUFDLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDO1FBQzNELGFBQWEsQ0FBQyxnQkFBZ0IsRUFBRTtRQUNoQyxhQUFhLENBQUMsTUFBTSxFQUFFO1FBQ3RCLGFBQWEsQ0FBQyxXQUFXLEVBQUU7S0FDNUIsQ0FBQyxDQUFBO0lBRUYsTUFBTSxxQkFBcUIsR0FBRyxXQUFXO1FBQ3ZDLENBQUMsQ0FBQyxhQUFhLENBQUMsc0JBQXNCO1FBQ3RDLENBQUMsQ0FBQyxhQUFhLENBQUMsc0JBQXNCLENBQUE7SUFFeEMsTUFBTSxNQUFNLEdBQUcsY0FBYztTQUMxQixHQUFHLENBQUMsV0FBMkIsQ0FBQztTQUNoQyxHQUFHLENBQUMsR0FBbUIsQ0FBQyxDQUFBO0lBRTNCLE1BQU0sVUFBVSxHQUFHLE1BQU0scUJBQXFCLENBQUMsTUFBTSxDQUFDLENBQUE7SUFFdEQsb0NBQW9DO0lBQ3BDLE1BQU0sc0JBQXNCLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7SUFFbEUsT0FBTyxtQkFBVyxDQUFDLHNCQUFzQixDQUFDLENBQUE7QUFDNUMsQ0FBQyxDQUFBO0FBM0JZLFFBQUEseUJBQXlCLDZCQTJCckMifQ==
