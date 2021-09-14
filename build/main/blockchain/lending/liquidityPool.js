'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.approveUsdc = exports.getOptimalUtilizationRate = exports.getLPTValue = exports.getLPTBaseValue = exports.withdrawLiquidity = exports.supplyLiquidity = exports.repayLiquidity = exports.borrowLiquidity = void 0
const units_1 = require('@ethersproject/units')
const abis_1 = require('@xtoken/abis')
const constants_1 = require('../../constants')
const utils_1 = require('../utils')
const helper_1 = require('./helper')
const CONTRACT_ERROR = new Error(
  constants_1.Errors.CONTRACT_INITIALIZATION_FAILED
)
const TOKEN_APPROVE_ERROR = new Error(constants_1.Errors.TOKENS_NOT_APPROVED)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlxdWlkaXR5UG9vbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9ibG9ja2NoYWluL2xlbmRpbmcvbGlxdWlkaXR5UG9vbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxnREFBa0Q7QUFDbEQsdUNBQXNFO0FBR3RFLCtDQUF3QztBQUN4QyxvQ0FBd0Q7QUFFeEQscUNBQW1EO0FBRW5ELE1BQU0sY0FBYyxHQUFHLElBQUksS0FBSyxDQUFDLGtCQUFNLENBQUMsOEJBQThCLENBQUMsQ0FBQTtBQUN2RSxNQUFNLG1CQUFtQixHQUFHLElBQUksS0FBSyxDQUFDLGtCQUFNLENBQUMsbUJBQW1CLENBQUMsQ0FBQTtBQUVqRTs7Ozs7R0FLRztBQUNJLE1BQU0sZUFBZSxHQUFHLEtBQUssRUFDbEMsTUFBaUIsRUFDakIsUUFBc0IsRUFDdEIsRUFBRTtJQUNGLE1BQU0scUJBQXFCLEdBQUcsTUFBTSxpQ0FBd0IsQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUN0RSxPQUFPLHFCQUFxQixDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQTtBQUM3QyxDQUFDLENBQUE7QUFOWSxRQUFBLGVBQWUsbUJBTTNCO0FBRUQ7Ozs7O0dBS0c7QUFDSSxNQUFNLGNBQWMsR0FBRyxLQUFLLEVBQ2pDLE1BQWlCLEVBQ2pCLFFBQXNCLEVBQ3RCLEVBQUU7SUFDRixNQUFNLHFCQUFxQixHQUFHLE1BQU0saUNBQXdCLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDdEUsTUFBTSxPQUFPLEdBQUcsTUFBTSx3QkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUNoRCxNQUFNLGNBQWMsR0FBRyxNQUFNLHNCQUFzQixDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQTtJQUN0RSxJQUFJLGNBQWMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFDN0IsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLENBQUE7S0FDM0M7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
