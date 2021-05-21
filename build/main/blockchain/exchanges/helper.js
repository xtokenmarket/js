'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.getBalances = void 0
const bignumber_1 = require('@ethersproject/bignumber')
const abis_1 = require('@xtoken/abis')
const ethers_1 = require('ethers')
const utils_1 = require('ethers/lib/utils')
const constants_1 = require('../../constants')
const utils_2 = require('../utils')
const uniswap_1 = require('./uniswap')
const getBalances = async (
  symbol,
  poolAddress,
  tokenPrice,
  provider,
  chainId,
  underlyingPrice,
  isWeth
) => {
  // Addresses
  const xTokenAddress = abis_1.ADDRESSES[symbol][chainId]
  // Contracts
  const xTokenContract = new ethers_1.ethers.Contract(
    xTokenAddress,
    abis_1.Abi.ERC20,
    provider
  )
  let xTokenBalance = bignumber_1.BigNumber.from('0')
  try {
    // Balances
    xTokenBalance = await xTokenContract.balanceOf(poolAddress)
  } catch (e) {
    console.error('Error while fetching user balance:', e)
  }
  // ETH price in USD
  const ethUsdcPrice = await uniswap_1.getEthUsdcPrice(provider)
  const tokenVal = xTokenBalance
    .mul(utils_1.parseEther(tokenPrice.toString()))
    .div(constants_1.DEC_18)
  let ethVal
  let ethBalance
  if (isWeth) {
    const wethAddress = abis_1.ADDRESSES[abis_1.WETH][chainId]
    const wethContract = new ethers_1.ethers.Contract(
      wethAddress,
      abis_1.Abi.ERC20,
      provider
    )
    const wethBalance = await wethContract.balanceOf(poolAddress)
    ethBalance = wethBalance
    ethVal = wethBalance
      .mul(utils_1.parseEther(ethUsdcPrice))
      .div(constants_1.DEC_18)
  } else {
    ethBalance = await provider.getBalance(poolAddress)
    ethVal = ethBalance
      .mul(utils_1.parseEther(ethUsdcPrice))
      .div(constants_1.DEC_18)
  }
  let underlying
  let underlyingVal = bignumber_1.BigNumber.from('0')
  if (underlyingPrice) {
    const tokenSymbol = utils_2.getTokenSymbol(symbol)
    const underlyingToken = tokenSymbol.toUpperCase()
    const underlyingAddress = abis_1.ADDRESSES[tokenSymbol][chainId]
    const underlyingContract = new ethers_1.ethers.Contract(
      underlyingAddress,
      abis_1.Abi.ERC20,
      provider
    )
    const underlyingBalance = await underlyingContract.balanceOf(poolAddress)
    underlyingVal = underlyingBalance
      .mul(underlyingPrice)
      .div(constants_1.DEC_18)
    underlying = {
      name: underlyingToken,
      amt: utils_1.formatEther(underlyingBalance),
      val: utils_1.formatEther(underlyingVal),
    }
  }
  const totalVal = ethVal.add(tokenVal).add(underlyingVal)
  return {
    totalVal: utils_1.formatEther(totalVal),
    token: {
      name: symbol,
      amt: utils_1.formatEther(xTokenBalance),
      val: utils_1.formatEther(tokenVal),
    },
    underlying,
    eth: {
      name: abis_1.ETH.toUpperCase(),
      amt: utils_1.formatEther(ethBalance),
      val: utils_1.formatEther(ethVal),
    },
  }
}
exports.getBalances = getBalances
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4vZXhjaGFuZ2VzL2hlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx3REFBb0Q7QUFFcEQsdUNBQXdEO0FBQ3hELG1DQUErQjtBQUMvQiw0Q0FBMEQ7QUFFMUQsK0NBQXdDO0FBRXhDLG9DQUF5QztBQUV6Qyx1Q0FBMkM7QUFFcEMsTUFBTSxXQUFXLEdBQUcsS0FBSyxFQUM5QixNQUFxQixFQUNyQixXQUFtQixFQUNuQixVQUFrQixFQUNsQixRQUFzQixFQUN0QixPQUFlLEVBQ2YsZUFBMkIsRUFDM0IsTUFBZ0IsRUFDaEIsRUFBRTtJQUNGLFlBQVk7SUFDWixNQUFNLGFBQWEsR0FBRyxnQkFBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBRWhELFlBQVk7SUFDWixNQUFNLGNBQWMsR0FBRyxJQUFJLGVBQU0sQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLFVBQUcsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFFOUUsSUFBSSxhQUFhLEdBQUcscUJBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDdkMsSUFBSTtRQUNGLFdBQVc7UUFDWCxhQUFhLEdBQUcsTUFBTSxjQUFjLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFBO0tBQzVEO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDVixPQUFPLENBQUMsS0FBSyxDQUFDLG9DQUFvQyxFQUFFLENBQUMsQ0FBQyxDQUFBO0tBQ3ZEO0lBRUQsbUJBQW1CO0lBQ25CLE1BQU0sWUFBWSxHQUFHLE1BQU0seUJBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUVwRCxNQUFNLFFBQVEsR0FBRyxhQUFhO1NBQzNCLEdBQUcsQ0FBQyxrQkFBVSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1NBQ3RDLEdBQUcsQ0FBQyxrQkFB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
