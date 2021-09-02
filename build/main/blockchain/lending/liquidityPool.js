'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.approveUsdc = exports.getOptimalUtilizationRate = exports.getLPTValue = exports.getLPTBaseValue = exports.withdraw = exports.supply = exports.repay = exports.borrow = void 0
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
const borrow = async (amount, provider) => {
  const liquidityPoolContract = await helper_1.getLiquidityPoolContract(
    provider
  )
  return liquidityPoolContract.borrow(amount)
}
exports.borrow = borrow
/**
 * Repay Loan with USDC
 * @param amount USDC amount without decimals
 * @param provider
 * @returns
 */
const repay = async (amount, provider) => {
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
exports.repay = repay
/**
 * Supply USDC to Liquidity Pool
 * @param amount amount of USDC without decimals
 * @param provider
 * @returns
 */
const supply = async (amount, provider) => {
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
exports.supply = supply
/**
 * Withdraw USDC from Liquidity Pool
 * @param amount amount of LPT without decimals
 * @param provider
 * @returns
 */
const withdraw = async (amount, provider) => {
  const liquidityPoolContract = await helper_1.getLiquidityPoolContract(
    provider
  )
  return liquidityPoolContract.withdraw(amount)
}
exports.withdraw = withdraw
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlxdWlkaXR5UG9vbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9ibG9ja2NoYWluL2xlbmRpbmcvbGlxdWlkaXR5UG9vbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxnREFBa0Q7QUFDbEQsdUNBQXNFO0FBR3RFLCtDQUF3QztBQUN4QyxvQ0FBd0Q7QUFFeEQscUNBQW1EO0FBRW5ELE1BQU0sY0FBYyxHQUFHLElBQUksS0FBSyxDQUFDLGtCQUFNLENBQUMsOEJBQThCLENBQUMsQ0FBQTtBQUN2RSxNQUFNLG1CQUFtQixHQUFHLElBQUksS0FBSyxDQUFDLGtCQUFNLENBQUMsbUJBQW1CLENBQUMsQ0FBQTtBQUVqRTs7Ozs7R0FLRztBQUNJLE1BQU0sTUFBTSxHQUFHLEtBQUssRUFBRSxNQUFpQixFQUFFLFFBQXNCLEVBQUUsRUFBRTtJQUN4RSxNQUFNLHFCQUFxQixHQUFHLE1BQU0saUNBQXdCLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDdEUsT0FBTyxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUE7QUFDN0MsQ0FBQyxDQUFBO0FBSFksUUFBQSxNQUFNLFVBR2xCO0FBRUQ7Ozs7O0dBS0c7QUFDSSxNQUFNLEtBQUssR0FBRyxLQUFLLEVBQUUsTUFBaUIsRUFBRSxRQUFzQixFQUFFLEVBQUU7SUFDdkUsTUFBTSxxQkFBcUIsR0FBRyxNQUFNLGlDQUF3QixDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQ3RFLE1BQU0sT0FBTyxHQUFHLE1BQU0sd0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDaEQsTUFBTSxjQUFjLEdBQUcsTUFBTSxzQkFBc0IsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFDdEUsSUFBSSxjQUFjLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQzdCLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFBO0tBQzNDO0lBQ0Qs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
