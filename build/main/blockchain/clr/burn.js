'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.getExpectedQuantityOnBurnXAssetCLR = exports.burnXAssetCLR = void 0
const ethers_1 = require('ethers')
const constants_1 = require('../../constants')
const utils_1 = require('../../utils')
const helper_1 = require('./helper')
const { formatEther, parseEther } = ethers_1.ethers.utils
const burnXAssetCLR = async (symbol, amount, provider) => {
  const { xAssetCLRContract } = await helper_1.getXAssetCLRContracts(
    symbol,
    provider
  )
  // Estimate `gasLimit`
  const gasLimit = utils_1.getPercentage(
    await xAssetCLRContract.estimateGas.burn(amount),
    constants_1.GAS_LIMIT_PERCENTAGE_DEFAULT
  )
  return xAssetCLRContract.burn(amount, {
    gasLimit,
  })
}
exports.burnXAssetCLR = burnXAssetCLR
const getExpectedQuantityOnBurnXAssetCLR = async (symbol, amount, provider) => {
  const { xAssetCLRContract } = await helper_1.getXAssetCLRContracts(
    symbol,
    provider
  )
  const [totalLiquidity, totalSupply] = await Promise.all([
    xAssetCLRContract.getTotalLiquidity(),
    xAssetCLRContract.totalSupply(),
  ])
  const proRataBalance = parseEther(amount).mul(totalLiquidity).div(totalSupply)
  const { amount0, amount1 } = await xAssetCLRContract.getAmountsForLiquidity(
    proRataBalance
  )
  return {
    0: formatEther(amount0),
    1: formatEther(amount1),
  }
}
exports.getExpectedQuantityOnBurnXAssetCLR = getExpectedQuantityOnBurnXAssetCLR
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVybi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9ibG9ja2NoYWluL2Nsci9idXJuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUdBLG1DQUErQjtBQUUvQiwrQ0FBOEQ7QUFFOUQsdUNBQTJDO0FBRTNDLHFDQUFnRDtBQUVoRCxNQUFNLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxHQUFHLGVBQU0sQ0FBQyxLQUFLLENBQUE7QUFFekMsTUFBTSxhQUFhLEdBQUcsS0FBSyxFQUNoQyxNQUFrQixFQUNsQixNQUFpQixFQUNqQixRQUFzQixFQUNRLEVBQUU7SUFDaEMsTUFBTSxFQUFFLGlCQUFpQixFQUFFLEdBQUcsTUFBTSw4QkFBcUIsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFFM0Usc0JBQXNCO0lBQ3RCLE1BQU0sUUFBUSxHQUFHLHFCQUFhLENBQzVCLE1BQU0saUJBQWlCLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFDaEQsd0NBQTRCLENBQzdCLENBQUE7SUFFRCxPQUFPLGlCQUFpQixDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7UUFDcEMsUUFBUTtLQUNULENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQTtBQWhCWSxRQUFBLGFBQWEsaUJBZ0J6QjtBQUVNLE1BQU0sa0NBQWtDLEdBQUcsS0FBSyxFQUNyRCxNQUFrQixFQUNsQixNQUFjLEVBQ2QsUUFBc0IsRUFDQSxFQUFFO0lBQ3hCLE1BQU0sRUFBRSxpQkFBaUIsRUFBRSxHQUFHLE1BQU0sOEJBQXFCLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBRTNFLE1BQU0sQ0FBQyxjQUFjLEVBQUUsV0FBVyxDQUFDLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDO1FBQ3RELGlCQUFpQixDQUFDLGlCQUFpQixFQUFFO1FBQ3JDLGlCQUFpQixDQUFDLFdBQVcsRUFBRTtLQUNoQyxDQUFDLENBQUE7SUFFRixNQUFNLGNBQWMsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQTtJQUM5RSxNQUFNLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxHQUFHLE1BQU0saUJBQWlCLENBQUMsc0JBQXNCLENBQ3pFLGNBQWMsQ0FDZixDQUFBO0lBRUQsT0FBTztRQUNMLENBQUMsRUFBRSxXQUFXLENBQUMsT0FBTyxDQUFDO1FBQ3ZCLENBQUMsRUFBRSxXQUFXLENBQUMsT0FBTyxDQUFDO0tBQ3hCLENBQUE7QUFDSCxDQUFDLENBQUE7QUFyQlksUUFBQSxrQ0FBa0Msc0NBcUI5QyJ9
