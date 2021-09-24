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
  const tokenSymbol = utils_2.getTokenSymbol(symbol)
  const assetAddress = abis_1.ADDRESSES[tokenSymbol][chainId]
  const xAssetAddress = abis_1.ADDRESSES[symbol][chainId]
  // If asset0 is not xAsset in xAssetCLR token
  const isAsset0Native =
    symbol === abis_1.X_AAVE_A ||
    symbol == abis_1.X_BNT_A ||
    symbol === abis_1.X_INCH_A ||
    symbol === abis_1.X_INCH_B
  let tokenInAddress
  let tokenOutAddress
  let priceLimit
  if (isTradeBuy) {
    tokenInAddress = assetAddress
    tokenOutAddress = xAssetAddress
    priceLimit = isAsset0Native ? MIN_PRICE : MAX_PRICE
  } else {
    tokenInAddress = xAssetAddress
    tokenOutAddress = assetAddress
    priceLimit = isAsset0Native ? MAX_PRICE : MIN_PRICE
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pc3dhcFYzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4vZXhjaGFuZ2VzL3VuaXN3YXBWMy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSx1R0FBd0c7QUFDeEcsdUNBT3FCO0FBQ3JCLG1DQUE0QztBQUM1Qyw0Q0FBMEQ7QUFHMUQsb0NBQW9EO0FBRXBELE1BQU0sSUFBSSxHQUFHLGtCQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBLENBQUMsMkJBQTJCO0FBQy9ELE1BQU0sU0FBUyxHQUFHLGtCQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFBLENBQUMsd0JBQXdCO0FBQ3ZFLE1BQU0sU0FBUyxHQUFHLGtCQUFTLENBQUMsSUFBSSxDQUM5QixtREFBbUQsQ0FDcEQsQ0FBQSxDQUFDLHdCQUF3QjtBQUMxQixNQUFNLGNBQWMsR0FBRyw0Q0FBNEMsQ0FBQTtBQUU1RCxNQUFNLHdCQUF3QixHQUFHLEtBQUssRUFDM0MsTUFBcUIsRUFDckIsTUFBYyxFQUNkLFNBQXFCLEVBQ3JCLFFBQXNCLEVBQ3RCLEVBQUU7SUFDRixNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsTUFBTSxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUE7SUFDL0MsTUFBTSxjQUFjLEdBQUcsSUFBSSxpQkFBUSxDQUNqQyxjQUFjLEVBQ2QsaUJBQVMsRUFDVCxpQkFBUyxDQUFDLFFBQVEsQ0FBQyxDQUNwQixDQUFBO0lBRUQsTUFBTSxVQUFVLEdBQUcsU0FBUyxLQUFLLFVBQUcsQ0FBQTtJQUNwQyxNQUFNLFdBQVcsR0FBRyxzQkFBYyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBRTFDLE1BQU0sWUFBWSxHQUFHLGdCQUFTLENBQUMsV0FBVyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDcEQsTUFBTSxhQUFhLEdBQUcsZ0JBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUVoRCw2Q0FBNkM7SUFDN0MsTUFBTSxjQUFjLEdBQ2xCLE1BQU0sS0FBSyxlQUFRO1FBQ25CLE1BQU0sSUFBSSxjQUFPO1FBQ2pCLE1BQU0sS0FBSyxlQUFRO1FBQ25CLE1BQU0sS0FBSyxlQUFRLENBQUE7SUFFckIsSUFBSSxjQUFjLENBQUE7SUFDbEIsSUFBSSxlQUFlLENBQUE7SUFDbkIsSUFBSSxVQUFVLENBQUE7SUFFZCxJQUFJLFVBQVUsRUFBRTtRQUNkLGNBQWMsR0FBRyxZQUFZLENBQUE7UUFDN0IsZUFBZSxHQUFHLGFBQWEsQ0FBQTtRQUMvQixVQUFVLEdBQUcsY0FBYyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQTtLQUNwRDtTQUFNO1FBQ0wsY0FBYyxHQUFHLGFBQWEsQ0FBQTtRQUM5QixlQUFlLEdBQUcsWUFBWSxDQUFBO1FBQzlCLFVBQVUsR0FBRyxjQUFjLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFBO0tBQ3BEO0lBRUQsTUFBTSxXQUFXLEdBQUcsTUFBTSxjQUFjLENBQUMsVUFBVSxDQUFDLHFCQUFxQixDQUN2RSxjQUFjLEVBQ2QsZUFBZSxFQUNmLElBQUksRUFDSixrQkFBVSxDQUFDLE1BQU0sQ0FBQyxFQUNsQixVQUFVLENBQ1gsQ0FBQTtJQUVELE9BQU8sbUJBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQTtBQUNqQyxDQUFDLENBQUE7QUFqRFksUUFBQSx3QkFBd0IsNEJBaURwQyJ9
