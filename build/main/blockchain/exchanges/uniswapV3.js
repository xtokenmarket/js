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
  tokenIn,
  symbol,
  amount,
  tradeType,
  fees,
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
  const wethAddress = abis_1.ADDRESSES[abis_1.WETH][chainId]
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
    tokenInAddress = tokenIn === abis_1.ETH ? wethAddress : assetAddress
    tokenOutAddress = tokenIn === abis_1.ETH ? assetAddress : xAssetAddress
    priceLimit = isAsset0Native ? MIN_PRICE : MAX_PRICE
  } else {
    tokenInAddress = tokenIn === abis_1.ETH ? assetAddress : xAssetAddress
    tokenOutAddress = tokenIn === abis_1.ETH ? wethAddress : assetAddress
    priceLimit = isAsset0Native ? MAX_PRICE : MIN_PRICE
  }
  const estimateQty = await quoterContract.callStatic.quoteExactInputSingle(
    tokenInAddress,
    tokenOutAddress,
    fees || FEES,
    utils_1.parseEther(amount),
    priceLimit
  )
  return utils_1.formatEther(estimateQty)
}
exports.getUniswapV3EstimatedQty = getUniswapV3EstimatedQty
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pc3dhcFYzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4vZXhjaGFuZ2VzL3VuaXN3YXBWMy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSx1R0FBd0c7QUFDeEcsdUNBU3FCO0FBQ3JCLG1DQUE0QztBQUM1Qyw0Q0FBMEQ7QUFHMUQsb0NBQW9EO0FBRXBELE1BQU0sSUFBSSxHQUFHLGtCQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBLENBQUMsMkJBQTJCO0FBQy9ELE1BQU0sU0FBUyxHQUFHLGtCQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFBLENBQUMsd0JBQXdCO0FBQ3ZFLE1BQU0sU0FBUyxHQUFHLGtCQUFTLENBQUMsSUFBSSxDQUM5QixtREFBbUQsQ0FDcEQsQ0FBQSxDQUFDLHdCQUF3QjtBQUMxQixNQUFNLGNBQWMsR0FBRyw0Q0FBNEMsQ0FBQTtBQUU1RCxNQUFNLHdCQUF3QixHQUFHLEtBQUssRUFDM0MsT0FBbUMsRUFDbkMsTUFBcUIsRUFDckIsTUFBYyxFQUNkLFNBQXFCLEVBQ3JCLElBQTJCLEVBQzNCLFFBQXNCLEVBQ3RCLEVBQUU7SUFDRixNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsTUFBTSxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUE7SUFDL0MsTUFBTSxjQUFjLEdBQUcsSUFBSSxpQkFBUSxDQUNqQyxjQUFjLEVBQ2QsaUJBQVMsRUFDVCxpQkFBUyxDQUFDLFFBQVEsQ0FBQyxDQUNwQixDQUFBO0lBRUQsTUFBTSxVQUFVLEdBQUcsU0FBUyxLQUFLLFVBQUcsQ0FBQTtJQUNwQyxNQUFNLFdBQVcsR0FBRyxzQkFBYyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBRTFDLE1BQU0sWUFBWSxHQUFHLGdCQUFTLENBQUMsV0FBVyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDcEQsTUFBTSxhQUFhLEdBQUcsZ0JBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUNoRCxNQUFNLFdBQVcsR0FBRyxnQkFBUyxDQUFDLFdBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBRTVDLDZDQUE2QztJQUM3QyxNQUFNLGNBQWMsR0FDbEIsTUFBTSxLQUFLLGVBQVE7UUFDbkIsTUFBTSxJQUFJLGNBQU87UUFDakIsTUFBTSxLQUFLLGVBQVE7UUFDbkIsTUFBTSxLQUFLLGVBQVEsQ0FBQTtJQUVyQixJQUFJLGNBQWMsQ0FBQTtJQUNsQixJQUFJLGVBQWUsQ0FBQTtJQUNuQixJQUFJLFVBQVUsQ0FBQTtJQUVkLElBQUksVUFBVSxFQUFFO1FBQ2QsY0FBYyxHQUFHLE9BQU8sS0FBSyxVQUFHLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFBO1FBQzdELGVBQWUsR0FBRyxPQUFPLEtBQUssVUFBRyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQTtRQUNoRSxVQUFVLEdBQUcsY0FBYyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQTtLQUNwRDtTQUFNO1FBQ0wsY0FBYyxHQUFHLE9BQU8sS0FBSyxVQUFHLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFBO1FBQy9ELGVBQWUsR0FBRyxPQUFPLEtBQUssVUFBRyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQTtRQUM5RCxVQUFVLEdBQUcsY0FBYyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQTtLQUNwRDtJQUVELE1BQU0sV0FBVyxHQUFHLE1BQU0sY0FBYyxDQUFDLFVBQVUsQ0FBQyxxQkFBcUIsQ0FDdkUsY0FBYyxFQUNkLGVBQWUsRUFDZixJQUFJLElBQUksSUFBSSxFQUNaLGtCQUFVLENBQUMsTUFBTSxDQUFDLEVBQ2xCLFVBQVUsQ0FDWCxDQUFBO0lBRUQsT0FBTyxtQkFBVyxDQUFDLFdBQVcsQ0FBQyxDQUFBO0FBQ2pDLENBQUMsQ0FBQTtBQXBEWSxRQUFBLHdCQUF3Qiw0QkFvRHBDIn0=
