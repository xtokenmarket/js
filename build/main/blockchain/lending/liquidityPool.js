'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.withdrawLiquidity = exports.supplyLiquidity = exports.repayLiquidity = exports.getUtilizationRate = exports.getUpdatedBorrowBy = exports.getOptimalUtilizationRate = exports.getLPTValue = exports.getLPTBaseValue = exports.getBorrowRatePerBlock = exports.borrowLiquidity = exports.approveUsdc = void 0
const units_1 = require('@ethersproject/units')
const abis_1 = require('@xtoken/abis')
const constants_1 = require('../../constants')
const utils_1 = require('../utils')
const helper_1 = require('./helper')
const CONTRACT_ERROR = new Error(
  constants_1.Errors.CONTRACT_INITIALIZATION_FAILED
)
const TOKEN_APPROVE_ERROR = new Error(constants_1.Errors.TOKENS_NOT_APPROVED)
const approveUsdc = async (amount, provider) => {
  const network = await provider.getNetwork()
  const usdcContract = utils_1.getContract(abis_1.USDC, provider, network)
  if (!usdcContract) {
    return Promise.reject(CONTRACT_ERROR)
  }
  return usdcContract.approve(
    abis_1.ADDRESSES[abis_1.LENDING_LIQUIDITY_POOL][network.chainId],
    amount
  )
}
exports.approveUsdc = approveUsdc
/**
 * Borrow USDC from Liquidity Pool
 * @param amount USDC amount to borrow without decimals
 * @param provider
 * @returns
 */
const borrowLiquidity = async (amount, provider) => {
  const liquidityPoolContract = await helper_1.getLiquidityPoolContract(
    provider
  )
  return liquidityPoolContract.borrow(amount)
}
exports.borrowLiquidity = borrowLiquidity
const getBorrowRatePerBlock = async (provider) => {
  const liquidityPoolContract = await helper_1.getLiquidityPoolContract(
    provider
  )
  const borrowRatePerBlock = await liquidityPoolContract.borrowRatePerBlock()
  return units_1.formatEther(borrowRatePerBlock)
}
exports.getBorrowRatePerBlock = getBorrowRatePerBlock
const getLPTBaseValue = async (provider) => {
  const liquidityPoolContract = await helper_1.getLiquidityPoolContract(
    provider
  )
  const lptBaseValue = await liquidityPoolContract.getLPTBaseValue()
  return units_1.formatEther(lptBaseValue)
}
exports.getLPTBaseValue = getLPTBaseValue
const getLPTValue = async (provider) => {
  const liquidityPoolContract = await helper_1.getLiquidityPoolContract(
    provider
  )
  const lptValue = await liquidityPoolContract.getLPTValue()
  return units_1.formatEther(lptValue)
}
exports.getLPTValue = getLPTValue
const getOptimalUtilizationRate = async (provider) => {
  const liquidityPoolContract = await helper_1.getLiquidityPoolContract(
    provider
  )
  const optimalUtilizationRate = await liquidityPoolContract.getOptimalUtilizationRate()
  return optimalUtilizationRate.toString()
}
exports.getOptimalUtilizationRate = getOptimalUtilizationRate
const getUpdatedBorrowBy = async (address, provider) => {
  const liquidityPoolContract = await helper_1.getLiquidityPoolContract(
    provider
  )
  const updatedBorrowBy = await liquidityPoolContract.updatedBorrowBy(address)
  return units_1.formatEther(updatedBorrowBy)
}
exports.getUpdatedBorrowBy = getUpdatedBorrowBy
const getUtilizationRate = async (provider) => {
  const liquidityPoolContract = await helper_1.getLiquidityPoolContract(
    provider
  )
  const utilizationRate = await liquidityPoolContract.utilizationRate()
  return utilizationRate.toString()
}
exports.getUtilizationRate = getUtilizationRate
/**
 * Repay Loan with USDC
 * @param amount USDC amount without decimals
 * @param provider
 * @returns
 */
const repayLiquidity = async (amount, provider) => {
  const liquidityPoolContract = await helper_1.getLiquidityPoolContract(
    provider
  )
  const address = await utils_1.getSignerAddress(provider)
  const approvedAmount = await _getApprovedAmountUSDC(address, provider)
  if (approvedAmount.lt(amount)) {
    return Promise.reject(TOKEN_APPROVE_ERROR)
  }
  return liquidityPoolContract.repay(amount)
}
exports.repayLiquidity = repayLiquidity
/**
 * Supply USDC to Liquidity Pool
 * @param amount amount of USDC without decimals
 * @param provider
 * @returns
 */
const supplyLiquidity = async (amount, provider) => {
  const liquidityPoolContract = await helper_1.getLiquidityPoolContract(
    provider
  )
  const address = await utils_1.getSignerAddress(provider)
  const approvedAmount = await _getApprovedAmountUSDC(address, provider)
  if (approvedAmount.lt(amount)) {
    return Promise.reject(TOKEN_APPROVE_ERROR)
  }
  return liquidityPoolContract.supply(amount)
}
exports.supplyLiquidity = supplyLiquidity
/**
 * Withdraw USDC from Liquidity Pool
 * @param amount amount of LPT without decimals
 * @param provider
 * @returns
 */
const withdrawLiquidity = async (amount, provider) => {
  const liquidityPoolContract = await helper_1.getLiquidityPoolContract(
    provider
  )
  return liquidityPoolContract.withdraw(amount)
}
exports.withdrawLiquidity = withdrawLiquidity
const _getApprovedAmountUSDC = async (address, provider) => {
  const network = await provider.getNetwork()
  const usdcContract = utils_1.getContract(abis_1.USDC, provider, network)
  if (!usdcContract) {
    return Promise.reject(CONTRACT_ERROR)
  }
  return usdcContract.allowance(
    address,
    abis_1.ADDRESSES[abis_1.LENDING_LIQUIDITY_POOL][network.chainId]
  )
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlxdWlkaXR5UG9vbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9ibG9ja2NoYWluL2xlbmRpbmcvbGlxdWlkaXR5UG9vbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxnREFBa0Q7QUFDbEQsdUNBQXNFO0FBR3RFLCtDQUF3QztBQUN4QyxvQ0FBd0Q7QUFFeEQscUNBQW1EO0FBRW5ELE1BQU0sY0FBYyxHQUFHLElBQUksS0FBSyxDQUFDLGtCQUFNLENBQUMsOEJBQThCLENBQUMsQ0FBQTtBQUN2RSxNQUFNLG1CQUFtQixHQUFHLElBQUksS0FBSyxDQUFDLGtCQUFNLENBQUMsbUJBQW1CLENBQUMsQ0FBQTtBQUUxRCxNQUFNLFdBQVcsR0FBRyxLQUFLLEVBQzlCLE1BQWlCLEVBQ2pCLFFBQXNCLEVBQ3RCLEVBQUU7SUFDRixNQUFNLE9BQU8sR0FBRyxNQUFNLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQTtJQUMzQyxNQUFNLFlBQVksR0FBRyxtQkFBVyxDQUFDLFdBQUksRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUE7SUFDekQsSUFBSSxDQUFDLFlBQVksRUFBRTtRQUNqQixPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUE7S0FDdEM7SUFFRCxPQUFPLFlBQVksQ0FBQyxPQUFPLENBQ3pCLGdCQUFTLENBQUMsNkJBQXNCLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQ2xELE1BQU0sQ0FDUCxDQUFBO0FBQ0gsQ0FBQyxDQUFBO0FBZFksUUFBQSxXQUFXLGVBY3ZCO0FBRUQ7Ozs7O0dBS0c7QUFDSSxNQUFNLGVBQWUsR0FBRyxLQUFLLEVBQ2xDLE1BQWlCLEVBQ2pCLFFBQXNCLEVBQ3RCLEVBQUU7SUFDRixNQUFNLHFCQUFxQixHQUFHLE1BQU0saUNBQXdCLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDdEUsT0FBTyxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUE7QUFDN0MsQ0FBQyxDQUFBO0FBTlksUUFBQSxlQUFlLG1CQU0zQjtBQUVNLE1BQU0scUJBQXFCLEdBQUcsS0FBSyxFQUFFLFFBQXNCLEVBQUUsRUFBRTtJQUNwRSxNQUFNLHFCQUFxQixHQUFHLE1BQU0saUNBQXdCLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDdEUsTUFBTSxrQkFBa0IsR0FBRyxNQUFNLHFCQUFxQixDQUFDLGtCQUFrQixFQUFFLENBQUE7SUFDM0UsT0FBTyxtQkFBVyxDQUFDLGtCQUFrQixDQUFDLENBQUE7QUFDeEMsQ0FBQyxDQUFBO0FBSlksUUFBQSxxQkFBcUIseUJBSWpDO0FBRU0sTUFBTSxlQUFlLEdBQUcsS0FBSyxFQUFFLFFBQXNCLEVBQUUsRUFBRTtJQUM5RCxNQUFNLHFCQUFxQixHQUFHLE1BQU0saUNBQXdCLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDdEUsTUFBTSxZQUFZLEdBQUcsTUFBTSxxQkFBcUIsQ0FBQyxlQUFlLEVBQUUsQ0FBQTtJQUNsRSxPQUFPLG1CQUFXLENBQUMsWUFBWSxDQUFDLENBQUE7QUFDbEMsQ0FBQyxDQUFBO0FBSlksUUFBQSxlQUFlLG1CQUkzQjtBQUVNLE1BQU0sV0FBVyxHQUFHLEtBQUssRUFBRSxRQUFzQixFQUFFLEVBQUU7SUFDMUQsTUFBTSxxQkFBcUIsR0FBRyxNQUFNLGlDQUF3QixDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQ3RFLE1BQU0sUUFBUSxHQUFHLE1BQU0scUJBQXFCLENBQUMsV0FBVyxFQUFFLENBQUE7SUFDMUQsT0FBTyxtQkFBVyxDQUFDLFFBQVEsQ0FBQyxDQUFBO0FBQzlCLENBQUMsQ0FBQTtBQUpZLFFBQUEsV0FBVyxlQUl2QjtBQUVNLE1BQU0seUJBQXlCLEdBQUcsS0FBSyxFQUFFLFFBQXNCLEVBQUUsRUFBRTtJQUN4RSxNQUFNLHFCQUFxQixHQUFHLE1BQU0saUNBQXdCLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDdEUsTUFBTSxzQkFBc0IsR0FBRyxNQUFNLHFCQUFxQixDQUFDLHlCQUF5QixFQUFFLENBQUE7SUFDdEYsT0FBTyxzQkFBc0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQTtBQUMxQyxDQUFDLENBQUE7QUFKWSxRQUFBLHlCQUF5Qiw2QkFJckM7QUFFTSxNQUFNLGtCQUFrQixHQUFHLEtBQUssRUFDckMsT0FBZSxFQUNmLFFBQXNCLEVBQ3RCLEVBQUU7SUFDRixNQUFNLHFCQUFxQixHQUFHLE1BQU0saUNBQXdCLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDdEUsTUFBTSxlQUFlLEdBQUcsTUFBTSxxQkFBcUIsQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDNUUsT0FBTyxtQkFBVyxDQUFDLGVBQWUsQ0FBQyxDQUFBO0FBQ3JDLENBQUMsQ0FBQTtBQVBZLFFBQUEsa0JBQWtCLHNCQU85QjtBQUVNLE1BQU0sa0JBQWtCLEdBQUcsS0FBSyxFQUFFLFFBQXNCLEVBQUUsRUFBRTtJQUNqRSxNQUFNLHFCQUFxQixHQUFHLE1BQU0saUNBQXdCLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDdEUsTUFBTSxlQUFlLEdBQUcsTUFBTSxxQkFBcUIsQ0FBQyxlQUFlLEVBQUUsQ0FBQTtJQUNyRSxPQUFPLGVBQWUsQ0FBQyxRQUFRLEVBQUUsQ0FBQTtBQUNuQyxDQUFDLENBQUE7QUFKWSxRQUFBLGtCQUFrQixzQkFJOUI7QUFFRDs7Ozs7R0FLRztBQUNJLE1BQU0sY0FBYyxHQUFHLEtBQUssRUFDakMsTUFBaUIsRUFDakIsUUFBc0IsRUFDdEIsRUFBRTtJQUNGLE1BQU0scUJBQXFCLEdBQUcsTUFBTSxpQ0FBd0IsQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUN0RSxNQUFNLE9BQU8sR0FBRyxNQUFNLHdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQ2hELE1BQU0sY0FBYyxHQUFHLE1BQU0sc0JBQXNCLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBQ3RFLElBQUksY0FBYyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUM3QixPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUMsQ0FBQTtLQUMzQztJQUNELE9BQU8scUJBQXFCLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0FBQzVDLENBQUMsQ0FBQTtBQVhZLFFBQUEsY0FBYyxrQkFXMUI7QUFFRDs7Ozs7R0FLRztBQUNJLE1BQU0sZUFBZSxHQUFHLEtBQUssRUFDbEMsTUFBaUIsRUFDakIsUUFBc0IsRUFDdEIsRUFBRTtJQUNGLE1BQU0scUJBQXFCLEdBQUcsTUFBTSxpQ0FBd0IsQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUN0RSxNQUFNLE9BQU8sR0FBRyxNQUFNLHdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQ2hELE1BQU0sY0FBYyxHQUFHLE1BQU0sc0JBQXNCLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBQ3RFLElBQUksY0FBYyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUM3QixPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUMsQ0FBQTtLQUMzQztJQUNELE9BQU8scUJBQXFCLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0FBQzdDLENBQUMsQ0FBQTtBQVhZLFFBQUEsZUFBZSxtQkFXM0I7QUFFRDs7Ozs7R0FLRztBQUNJLE1BQU0saUJBQWlCLEdBQUcsS0FBSyxFQUNwQyxNQUFpQixFQUNqQixRQUFzQixFQUN0QixFQUFFO0lBQ0YsTUFBTSxxQkFBcUIsR0FBRyxNQUFNLGlDQUF3QixDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQ3RFLE9BQU8scUJBQXFCLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0FBQy9DLENBQUMsQ0FBQTtBQU5ZLFFBQUEsaUJBQWlCLHFCQU03QjtBQUVELE1BQU0sc0JBQXNCLEdBQUcsS0FBSyxFQUNsQyxPQUFlLEVBQ2YsUUFBc0IsRUFDdEIsRUFBRTtJQUNGLE1BQU0sT0FBTyxHQUFHLE1BQU0sUUFBUSxDQUFDLFVBQVUsRUFBRSxDQUFBO0lBQzNDLE1BQU0sWUFBWSxHQUFHLG1CQUFXLENBQUMsV0FBSSxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQTtJQUN6RCxJQUFJLENBQUMsWUFBWSxFQUFFO1FBQ2pCLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQTtLQUN0QztJQUVELE9BQU8sWUFBWSxDQUFDLFNBQVMsQ0FDM0IsT0FBTyxFQUNQLGdCQUFTLENBQUMsNkJBQXNCLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQ25ELENBQUE7QUFDSCxDQUFDLENBQUEifQ==
