import { formatEther } from '@ethersproject/units'
import { ADDRESSES, LENDING_LIQUIDITY_POOL, USDC } from '@xtoken/abis'
import { Errors } from '../../constants'
import { getContract, getSignerAddress } from '../utils'
import { getLiquidityPoolContract } from './helper'
const CONTRACT_ERROR = new Error(Errors.CONTRACT_INITIALIZATION_FAILED)
const TOKEN_APPROVE_ERROR = new Error(Errors.TOKENS_NOT_APPROVED)
/**
 * Borrow USDC from Liquidity Pool
 * @param amount USDC amount to borrow without decimals
 * @param provider
 * @returns
 */
export const borrowLiquidity = async (amount, provider) => {
  const liquidityPoolContract = await getLiquidityPoolContract(provider)
  return liquidityPoolContract.borrow(amount)
}
/**
 * Repay Loan with USDC
 * @param amount USDC amount without decimals
 * @param provider
 * @returns
 */
export const repayLiquidity = async (amount, provider) => {
  const liquidityPoolContract = await getLiquidityPoolContract(provider)
  const address = await getSignerAddress(provider)
  const approvedAmount = await _getApprovedAmountUSDC(address, provider)
  if (approvedAmount.lt(amount)) {
    return Promise.reject(TOKEN_APPROVE_ERROR)
  }
  return liquidityPoolContract.repay(amount)
}
/**
 * Supply USDC to Liquidity Pool
 * @param amount amount of USDC without decimals
 * @param provider
 * @returns
 */
export const supplyLiquidity = async (amount, provider) => {
  const liquidityPoolContract = await getLiquidityPoolContract(provider)
  const address = await getSignerAddress(provider)
  const approvedAmount = await _getApprovedAmountUSDC(address, provider)
  if (approvedAmount.lt(amount)) {
    return Promise.reject(TOKEN_APPROVE_ERROR)
  }
  return liquidityPoolContract.supply(amount)
}
/**
 * Withdraw USDC from Liquidity Pool
 * @param amount amount of LPT without decimals
 * @param provider
 * @returns
 */
export const withdrawLiquidity = async (amount, provider) => {
  const liquidityPoolContract = await getLiquidityPoolContract(provider)
  return liquidityPoolContract.withdraw(amount)
}
export const getLPTBaseValue = async (provider) => {
  const liquidityPoolContract = await getLiquidityPoolContract(provider)
  const lptBaseValue = await liquidityPoolContract.getLPTBaseValue()
  return formatEther(lptBaseValue)
}
export const getLPTValue = async (provider) => {
  const liquidityPoolContract = await getLiquidityPoolContract(provider)
  const lptValue = await liquidityPoolContract.getLPTValue()
  return formatEther(lptValue)
}
export const getOptimalUtilizationRate = async (provider) => {
  const liquidityPoolContract = await getLiquidityPoolContract(provider)
  const optimalUtilizationRate = await liquidityPoolContract.getOptimalUtilizationRate()
  return optimalUtilizationRate.toString()
}
export const approveUsdc = async (amount, provider) => {
  const network = await provider.getNetwork()
  const usdcContract = getContract(USDC, provider, network)
  if (!usdcContract) {
    return Promise.reject(CONTRACT_ERROR)
  }
  return usdcContract.approve(
    ADDRESSES[LENDING_LIQUIDITY_POOL][network.chainId],
    amount
  )
}
const _getApprovedAmountUSDC = async (address, provider) => {
  const network = await provider.getNetwork()
  const usdcContract = getContract(USDC, provider, network)
  if (!usdcContract) {
    return Promise.reject(CONTRACT_ERROR)
  }
  return usdcContract.allowance(
    address,
    ADDRESSES[LENDING_LIQUIDITY_POOL][network.chainId]
  )
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlxdWlkaXR5UG9vbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9ibG9ja2NoYWluL2xlbmRpbmcvbGlxdWlkaXR5UG9vbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0JBQXNCLENBQUE7QUFDbEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxzQkFBc0IsRUFBRSxJQUFJLEVBQUUsTUFBTSxjQUFjLENBQUE7QUFHdEUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFBO0FBQ3hDLE9BQU8sRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxVQUFVLENBQUE7QUFFeEQsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sVUFBVSxDQUFBO0FBRW5ELE1BQU0sY0FBYyxHQUFHLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyw4QkFBOEIsQ0FBQyxDQUFBO0FBQ3ZFLE1BQU0sbUJBQW1CLEdBQUcsSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLENBQUE7QUFFakU7Ozs7O0dBS0c7QUFDSCxNQUFNLENBQUMsTUFBTSxlQUFlLEdBQUcsS0FBSyxFQUNsQyxNQUFpQixFQUNqQixRQUFzQixFQUN0QixFQUFFO0lBQ0YsTUFBTSxxQkFBcUIsR0FBRyxNQUFNLHdCQUF3QixDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQ3RFLE9BQU8scUJBQXFCLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0FBQzdDLENBQUMsQ0FBQTtBQUVEOzs7OztHQUtHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sY0FBYyxHQUFHLEtBQUssRUFDakMsTUFBaUIsRUFDakIsUUFBc0IsRUFDdEIsRUFBRTtJQUNGLE1BQU0scUJBQXFCLEdBQUcsTUFBTSx3QkFBd0IsQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUN0RSxNQUFNLE9BQU8sR0FBRyxNQUFNLGdCQUFnQixDQUFDLFFBQVEs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
