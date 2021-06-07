'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.getExpectedQuantityOnBurnXU3LP = exports.burnXU3LP = void 0
const ethers_1 = require('ethers')
const constants_1 = require('../../constants')
const utils_1 = require('../../utils')
const utils_2 = require('../utils')
const helper_1 = require('./helper')
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
  const { xu3lpContract } = await helper_1.getXU3LPContracts(symbol, provider)
  const [nav, totalSupply, { burnFee }] = await Promise.all([
    xu3lpContract.getNav(),
    xu3lpContract.totalSupply(),
    xu3lpContract.feeDivisors(),
  ])
  const getAmountInAssetTerms = !outputAsset
    ? xu3lpContract.getAmountInAsset0Terms
    : xu3lpContract.getAmountInAsset1Terms
  const BURN_FEE = utils_2.parseFees(burnFee)
  const inputAmount = parseEther(amount).mul(nav).div(totalSupply)
  const expectedQty = await getAmountInAssetTerms(inputAmount)
  return formatEther(expectedQty.mul(BURN_FEE).div(constants_1.DEC_18))
}
exports.getExpectedQuantityOnBurnXU3LP = getExpectedQuantityOnBurnXU3LP
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVybi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9ibG9ja2NoYWluL3h1M2xwL2J1cm4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBR0EsbUNBQTZDO0FBRTdDLCtDQUFzRTtBQUV0RSx1Q0FBMkM7QUFDM0Msb0NBQW9DO0FBRXBDLHFDQUE0QztBQUU1QyxNQUFNLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxHQUFHLGVBQU0sQ0FBQyxLQUFLLENBQUE7QUFFekMsTUFBTSxTQUFTLEdBQUcsS0FBSyxFQUM1QixNQUF1QixFQUN2QixXQUF5QixFQUN6QixNQUFpQixFQUNqQixRQUFzQixFQUNRLEVBQUU7SUFDaEMsTUFBTSxFQUFFLGFBQWEsRUFBRSxHQUFHLE1BQU0sMEJBQWlCLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBRW5FLHNCQUFzQjtJQUN0QixNQUFNLFFBQVEsR0FBRyxxQkFBYSxDQUM1QixNQUFNLGFBQWEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsRUFDekQsd0NBQTRCLENBQzdCLENBQUE7SUFFRCxPQUFPLGFBQWEsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLE1BQU0sRUFBRTtRQUM3QyxRQUFRO0tBQ1QsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFBO0FBakJZLFFBQUEsU0FBUyxhQWlCckI7QUFFTSxNQUFNLDhCQUE4QixHQUFHLEtBQUssRUFDakQsTUFBdUIsRUFDdkIsV0FBeUIsRUFDekIsTUFBYyxFQUNkLFFBQXNCLEVBQ3RCLEVBQUU7SUFDRixNQUFNLEVBQUUsYUFBYSxFQUFFLEdBQUcsTUFBTSwwQkFBaUIsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFFbkUsTUFBTSxDQUFDLEdBQUcsRUFBRSxXQUFXLEVBQUUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUN4RCxhQUFhLENBQUMsTUFBTSxFQUFFO1FBQ3RCLGFBQWEsQ0FBQyxXQUFXLEVBQUU7UUFDM0IsYUFBYSxDQUFDLFdBQVcsRUFBRTtLQUM1QixDQUFDLENBQUE7SUFFRixNQUFNLHFCQUFxQixHQUFHLENBQUMsV0FBVztRQUN4QyxDQUFDLENBQUMsYUFBYSxDQUFDLHNCQUFzQjtRQUN0QyxDQUFDLENBQUMsYUFBYSxDQUFDLHNCQUFzQixDQUFBO0lBRXhDLE1BQU0sUUFBUSxHQUFHLGlCQUFTLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDbkMsTUFBTSxXQUFXLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQztTQUNuQyxHQUFHLENBQUMsR0FBbUIsQ0FBQztTQUN4QixHQUFHLENBQUMsV0FBMkIsQ0FBQyxDQUFBO0lBRW5DLE1BQU0sV0FBVyxHQUFHLE1BQU0scUJBQXFCLENBQUMsV0FBVyxDQUFDLENBQUE7SUFFNUQsT0FBTyxXQUFXLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsa0JBQU0sQ0FBQyxDQUFDLENBQUE7QUFDM0QsQ0FBQyxDQUFBO0FBMUJZLFFBQUEsOEJBQThCLGtDQTBCMUMifQ==
