'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.getEthUsdcPriceUniswapV3 = exports.getUniswapV3EstimatedQty = void 0
const Quoter_json_1 = require('@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json')
const abis_1 = require('@xtoken/abis')
const abis_2 = require('@xtoken/abis')
const ethers_1 = require('ethers')
const utils_1 = require('ethers/lib/utils')
const constants_1 = require('../../constants')
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
  const isTradeBuy = tradeType === abis_2.BUY
  const tokenSymbol = utils_2.getTokenSymbol(symbol)
  const assetAddress = abis_2.ADDRESSES[tokenSymbol][chainId]
  const xAssetAddress = abis_2.ADDRESSES[symbol][chainId]
  const wethAddress = abis_2.ADDRESSES[abis_2.WETH][chainId]
  // If asset0 is not xAsset in xAssetCLR token
  const isAsset0Native =
    symbol === abis_2.X_AAVE_A ||
    symbol == abis_2.X_BNT_A ||
    symbol === abis_2.X_INCH_A ||
    symbol === abis_2.X_INCH_B
  let tokenInAddress
  let tokenOutAddress
  let priceLimit
  if (isTradeBuy) {
    tokenInAddress = tokenIn === abis_2.ETH ? wethAddress : assetAddress
    tokenOutAddress = tokenIn === abis_2.ETH ? assetAddress : xAssetAddress
    priceLimit = isAsset0Native ? MIN_PRICE : MAX_PRICE
  } else {
    tokenInAddress = tokenIn === abis_2.ETH ? assetAddress : xAssetAddress
    tokenOutAddress = tokenIn === abis_2.ETH ? wethAddress : assetAddress
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
const getEthUsdcPriceUniswapV3 = async (provider) => {
  const { chainId } = await provider.getNetwork()
  const quoterContract = new ethers_1.Contract(
    QUOTER_ADDRESS,
    Quoter_json_1.abi,
    provider
  )
  const usdcAddress = abis_2.ADDRESSES[abis_1.USDC][chainId]
  const wethAddress = abis_2.ADDRESSES[abis_2.WETH][chainId]
  const quantity = await quoterContract.callStatic.quoteExactInputSingle(
    wethAddress,
    usdcAddress,
    FEES,
    constants_1.DEC_18,
    // In case of Token0 to Token1 trade, the price limit is `MIN_PRICE` and the reverse would be `MAX_PRICE`
    ethers_1.BigNumber.from(usdcAddress).gt(
      ethers_1.BigNumber.from(wethAddress)
    )
      ? MIN_PRICE
      : MAX_PRICE
  )
  return utils_1.formatUnits(quantity, 6)
}
exports.getEthUsdcPriceUniswapV3 = getEthUsdcPriceUniswapV3
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pc3dhcFYzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4vZXhjaGFuZ2VzL3VuaXN3YXBWMy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSx1R0FBd0c7QUFDeEcsdUNBQW1DO0FBQ25DLHVDQVNxQjtBQUNyQixtQ0FBNEM7QUFDNUMsNENBQXVFO0FBRXZFLCtDQUF3QztBQUV4QyxvQ0FBb0Q7QUFFcEQsTUFBTSxJQUFJLEdBQUcsa0JBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUEsQ0FBQywyQkFBMkI7QUFDL0QsTUFBTSxTQUFTLEdBQUcsa0JBQVMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUEsQ0FBQyx3QkFBd0I7QUFDdkUsTUFBTSxTQUFTLEdBQUcsa0JBQVMsQ0FBQyxJQUFJLENBQzlCLG1EQUFtRCxDQUNwRCxDQUFBLENBQUMsd0JBQXdCO0FBQzFCLE1BQU0sY0FBYyxHQUFHLDRDQUE0QyxDQUFBO0FBRTVELE1BQU0sd0JBQXdCLEdBQUcsS0FBSyxFQUMzQyxPQUFtQyxFQUNuQyxNQUFxQixFQUNyQixNQUFjLEVBQ2QsU0FBcUIsRUFDckIsSUFBMkIsRUFDM0IsUUFBc0IsRUFDdEIsRUFBRTtJQUNGLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxNQUFNLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQTtJQUMvQyxNQUFNLGNBQWMsR0FBRyxJQUFJLGlCQUFRLENBQ2pDLGNBQWMsRUFDZCxpQkFBUyxFQUNULGlCQUFTLENBQUMsUUFBUSxDQUFDLENBQ3BCLENBQUE7SUFFRCxNQUFNLFVBQVUsR0FBRyxTQUFTLEtBQUssVUFBRyxDQUFBO0lBQ3BDLE1BQU0sV0FBVyxHQUFHLHNCQUFjLENBQUMsTUFBTSxDQUFDLENBQUE7SUFFMUMsTUFBTSxZQUFZLEdBQUcsZ0JBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUNwRCxNQUFNLGFBQWEs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
