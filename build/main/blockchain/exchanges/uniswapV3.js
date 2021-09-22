'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.getUniswapV3EstimatedQty = void 0
const Quoter_json_1 = require('@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json')
const abis_1 = require('@xtoken/abis')
const ethers_1 = require('ethers')
const utils_1 = require('ethers/lib/utils')
const utils_2 = require('../utils')
const FEES = ethers_1.BigNumber.from('3000') // 0.3% for xAssetCLR swaps
const MIN_PRICE = ethers_1.BigNumber.from('4295128740') // asset0 -> asset1 swap
const MAX_PRICE = ethers_1.BigNumber.from(
  '1461446703485210103287273052203988822378723970341'
) // asset1 -> asset0 swap
const QUOTER_ADDRESS = '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6'
const getUniswapV3EstimatedQty = async (
  symbol,
  amount,
  tradeType,
  provider
) => {
  const { chainId } = await provider.getNetwork()
  const quoterContract = new ethers_1.Contract(
    QUOTER_ADDRESS,
    Quoter_json_1.abi,
    utils_2.getSigner(provider)
  )
  const isTradeBuy = tradeType === abis_1.BUY
  const xAssetAddress = abis_1.ADDRESSES[symbol][chainId]
  let assetAddress
  switch (symbol) {
    case abis_1.X_AAVE_A:
    case abis_1.X_AAVE_B:
      assetAddress = abis_1.ADDRESSES[abis_1.AAVE][chainId]
  }
  let tokenInAddress
  let tokenOutAddress
  let priceLimit
  if (isTradeBuy) {
    tokenInAddress = assetAddress
    tokenOutAddress = xAssetAddress
    if (symbol === abis_1.X_AAVE_A) {
      priceLimit = MIN_PRICE
    } else {
      priceLimit = MAX_PRICE
    }
  } else {
    tokenInAddress = xAssetAddress
    tokenOutAddress = assetAddress
    if (symbol === abis_1.X_AAVE_A) {
      priceLimit = MAX_PRICE
    } else {
      priceLimit = MIN_PRICE
    }
  }
  const estimateQty = await quoterContract.callStatic.quoteExactInputSingle(
    tokenInAddress,
    tokenOutAddress,
    FEES,
    utils_1.parseEther(amount),
    priceLimit
  )
  return utils_1.formatEther(estimateQty)
}
exports.getUniswapV3EstimatedQty = getUniswapV3EstimatedQty
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pc3dhcFYzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4vZXhjaGFuZ2VzL3VuaXN3YXBWMy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSx1R0FBd0c7QUFDeEcsdUNBQXVFO0FBQ3ZFLG1DQUE0QztBQUM1Qyw0Q0FBMEQ7QUFHMUQsb0NBQW9DO0FBRXBDLE1BQU0sSUFBSSxHQUFHLGtCQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBLENBQUMsMkJBQTJCO0FBQy9ELE1BQU0sU0FBUyxHQUFHLGtCQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFBLENBQUMsd0JBQXdCO0FBQ3ZFLE1BQU0sU0FBUyxHQUFHLGtCQUFTLENBQUMsSUFBSSxDQUM5QixtREFBbUQsQ0FDcEQsQ0FBQSxDQUFDLHdCQUF3QjtBQUMxQixNQUFNLGNBQWMsR0FBRyw0Q0FBNEMsQ0FBQTtBQUU1RCxNQUFNLHdCQUF3QixHQUFHLEtBQUssRUFDM0MsTUFBeUMsRUFDekMsTUFBYyxFQUNkLFNBQXFCLEVBQ3JCLFFBQXNCLEVBQ3RCLEVBQUU7SUFDRixNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsTUFBTSxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUE7SUFDL0MsTUFBTSxjQUFjLEdBQUcsSUFBSSxpQkFBUSxDQUNqQyxjQUFjLEVBQ2QsaUJBQVMsRUFDVCxpQkFBUyxDQUFDLFFBQVEsQ0FBQyxDQUNwQixDQUFBO0lBRUQsTUFBTSxVQUFVLEdBQUcsU0FBUyxLQUFLLFVBQUcsQ0FBQTtJQUNwQyxNQUFNLGFBQWEsR0FBRyxnQkFBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBRWhELElBQUksWUFBWSxDQUFBO0lBQ2hCLFFBQVEsTUFBTSxFQUFFO1FBQ2QsS0FBSyxlQUFRLENBQUM7UUFDZCxLQUFLLGVBQVE7WUFDWCxZQUFZLEdBQUcsZ0JBQVMsQ0FBQyxXQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtLQUMxQztJQUVELElBQUksY0FBYyxDQUFBO0lBQ2xCLElBQUksZUFBZSxDQUFBO0lBQ25CLElBQUksVUFBVSxDQUFBO0lBRWQsSUFBSSxVQUFVLEVBQUU7UUFDZCxjQUFjLEdBQUcsWUFBWSxDQUFBO1FBQzdCLGVBQWUsR0FBRyxhQUFhLENBQUE7UUFFL0IsSUFBSSxNQUFNLEtBQUssZUFBUSxFQUFFO1lBQ3ZCLFVBQVUsR0FBRyxTQUFTLENBQUE7U0FDdkI7YUFBTTtZQUNMLFVBQVUsR0FBRyxTQUFTLENBQUE7U0FDdkI7S0FDRjtTQUFNO1FBQ0wsY0FBYyxHQUFHLGFBQWEsQ0FBQTtRQUM5QixlQUFlLEdBQUcsWUFBWSxDQUFBO1FBRTlCLElBQUksTUFBTSxLQUFLLGVBQVEsRUFBRTtZQUN2QixVQUFVLEdBQUcsU0FBUyxDQUFBO1NBQ3ZCO2FBQU07WUFDTCxVQUFVLEdBQUcsU0FBUyxDQUFBO1NBQ3ZCO0tBQ0Y7SUFFRCxNQUFNLFdBQVcsR0FBRyxNQUFNLGNBQWMsQ0FBQyxVQUFVLENBQUMscUJBQXFCLENBQ3ZFLGNBQWMsRUFDZCxlQUFlLEVBQ2YsSUFBSSxFQUNKLGtCQUFVLENBQUMsTUFBTSxDQUFDLEVBQ2xCLFVBQVUsQ0FDWCxDQUFBO0lBRUQsT0FBTyxtQkFBVyxDQUFDLFdBQVcsQ0FBQyxDQUFBO0FBQ2pDLENBQUMsQ0FBQTtBQXhEWSxRQUFBLHdCQUF3Qiw0QkF3RHBDIn0=
