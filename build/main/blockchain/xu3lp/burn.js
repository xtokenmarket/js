'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.getExpectedQuantityOnBurnXU3LP = exports.burnXU3LP = void 0
const ethers_1 = require('ethers')
const constants_1 = require('../../constants')
const utils_1 = require('../../utils')
const utils_2 = require('../utils')
const helper_1 = require('./helper')
const prices_1 = require('./prices')
const { formatEther, parseEther } = ethers_1.ethers.utils
const burnXU3LP = async (symbol, outputAsset, amount, provider) => {
  const { xu3lpContract } = await helper_1.getXU3LPContracts(symbol, provider)
  // Estimate `gasLimit`
  const gasLimit = utils_1.getPercentage(
    await xu3lpContract.estimateGas.burn(outputAsset, amount),
    constants_1.GAS_LIMIT_PERCENTAGE_DEFAULT
  )
  return xu3lpContract.burn(outputAsset, amount, {
    gasLimit,
  })
}
exports.burnXU3LP = burnXU3LP
const getExpectedQuantityOnBurnXU3LP = async (
  symbol,
  outputAsset,
  amount,
  provider
) => {
  const inputAmount = parseEther(amount)
  const { xu3lpContract } = await helper_1.getXU3LPContracts(symbol, provider)
  const [
    nav,
    totalSupply,
    { burnFee },
    { token0Price, token1Price },
  ] = await Promise.all([
    xu3lpContract.getNav(),
    xu3lpContract.totalSupply(),
    xu3lpContract.feeDivisors(),
    prices_1.getXU3LPTokenPrices(xu3lpContract),
  ])
  // Get amount in asset0 or asset1 terms
  const tokenPrice = !outputAsset ? token1Price : token0Price
  const BURN_FEE = utils_2.parseFees(burnFee)
  const expectedQty = inputAmount
    .mul(tokenPrice)
    .mul(nav)
    .div(totalSupply)
    .div(constants_1.DEC_18)
  return formatEther(expectedQty.mul(BURN_FEE).div(constants_1.DEC_18))
}
exports.getExpectedQuantityOnBurnXU3LP = getExpectedQuantityOnBurnXU3LP
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVybi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9ibG9ja2NoYWluL3h1M2xwL2J1cm4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBR0EsbUNBQTZDO0FBRTdDLCtDQUFzRTtBQUV0RSx1Q0FBMkM7QUFDM0Msb0NBQW9DO0FBRXBDLHFDQUE0QztBQUM1QyxxQ0FBOEM7QUFFOUMsTUFBTSxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsR0FBRyxlQUFNLENBQUMsS0FBSyxDQUFBO0FBRXpDLE1BQU0sU0FBUyxHQUFHLEtBQUssRUFDNUIsTUFBdUIsRUFDdkIsV0FBeUIsRUFDekIsTUFBaUIsRUFDakIsUUFBc0IsRUFDUSxFQUFFO0lBQ2hDLE1BQU0sRUFBRSxhQUFhLEVBQUUsR0FBRyxNQUFNLDBCQUFpQixDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQTtJQUVuRSxzQkFBc0I7SUFDdEIsTUFBTSxRQUFRLEdBQUcscUJBQWEsQ0FDNUIsTUFBTSxhQUFhLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLEVBQ3pELHdDQUE0QixDQUM3QixDQUFBO0lBRUQsT0FBTyxhQUFhLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxNQUFNLEVBQUU7UUFDN0MsUUFBUTtLQUNULENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQTtBQWpCWSxRQUFBLFNBQVMsYUFpQnJCO0FBRU0sTUFBTSw4QkFBOEIsR0FBRyxLQUFLLEVBQ2pELE1BQXVCLEVBQ3ZCLFdBQXlCLEVBQ3pCLE1BQWMsRUFDZCxRQUFzQixFQUN0QixFQUFFO0lBQ0YsTUFBTSxXQUFXLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQ3RDLE1BQU0sRUFBRSxhQUFhLEVBQUUsR0FBRyxNQUFNLDBCQUFpQixDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQTtJQUVuRSxNQUFNLENBQ0osR0FBRyxFQUNILFdBQVcsRUFDWCxFQUFFLE9BQU8sRUFBRSxFQUNYLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxFQUM3QixHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUNwQixhQUFhLENBQUMsTUFBTSxFQUFFO1FBQ3RCLGFBQWEsQ0FBQyxXQUFXLEVBQUU7UUFDM0IsYUFBYSxDQUFDLFdBQVcsRUFBRTtRQUMzQiw0QkFBbUIsQ0FBQyxhQUFhLENBQUM7S0FDbkMsQ0FBQyxDQUFBO0lBRUYsdUNBQXVDO0lBQ3ZDLE1BQU0sVUFBVSxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQTtJQUUzRCxNQUFNLFFBQVEsR0FBRyxpQkFBUyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ25DLE1BQU0sV0FBVyxHQUFHLFdBQVc7U0FDNUIsR0FBRyxDQUFDLFVBQVUsQ0FBQztTQUNmLEdBQUcsQ0FBQyxHQUFtQixDQUFDO1NBQ3hCLEdBQUcsQ0FBQyxXQUEyQixDQUFDO1NBQ2hDLEdBQUcsQ0FBQyxrQkFBTSxDQUFDLENBQUE7SUFFZCxPQUFPLFdBQVcsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxrQkFBTSxDQUFDLENBQUMsQ0FBQTtBQUMzRCxDQUFDLENBQUE7QUFoQ1ksUUFBQSw4QkFBOEIsa0NBZ0MxQyJ9
