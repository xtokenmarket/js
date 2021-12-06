import { formatEther } from '@ethersproject/units';
import { ADDRESSES, LENDING_LIQUIDITY_POOL, USDC } from '@xtoken/abis';
import { Errors } from '../../constants';
import { getContract, getSignerAddress } from '../utils';
import { getLiquidityPoolContract } from './helper';
const CONTRACT_ERROR = new Error(Errors.CONTRACT_INITIALIZATION_FAILED);
const TOKEN_APPROVE_ERROR = new Error(Errors.TOKENS_NOT_APPROVED);
export const approveUsdc = async (amount, provider) => {
    const network = await provider.getNetwork();
    const usdcContract = getContract(USDC, provider, network);
    if (!usdcContract) {
        return Promise.reject(CONTRACT_ERROR);
    }
    return usdcContract.approve(ADDRESSES[LENDING_LIQUIDITY_POOL][network.chainId], amount);
};
/**
 * Borrow USDC from Liquidity Pool
 * @param amount USDC amount to borrow without decimals
 * @param provider
 * @returns
 */
export const borrowLiquidity = async (amount, provider) => {
    const liquidityPoolContract = await getLiquidityPoolContract(provider);
    return liquidityPoolContract.borrow(amount);
};
export const getBorrowRatePerBlock = async (provider) => {
    const liquidityPoolContract = await getLiquidityPoolContract(provider);
    const borrowRatePerBlock = await liquidityPoolContract.borrowRatePerBlock();
    return formatEther(borrowRatePerBlock);
};
export const getLPTBaseValue = async (provider) => {
    const liquidityPoolContract = await getLiquidityPoolContract(provider);
    const lptBaseValue = await liquidityPoolContract.getLPTBaseValue();
    return formatEther(lptBaseValue);
};
export const getLPTValue = async (provider) => {
    const liquidityPoolContract = await getLiquidityPoolContract(provider);
    const lptValue = await liquidityPoolContract.getLPTValue();
    return formatEther(lptValue);
};
export const getOptimalUtilizationRate = async (provider) => {
    const liquidityPoolContract = await getLiquidityPoolContract(provider);
    const optimalUtilizationRate = await liquidityPoolContract.getOptimalUtilizationRate();
    return optimalUtilizationRate.toString();
};
export const getReserveFactor = async (provider) => {
    const liquidityPoolContract = await getLiquidityPoolContract(provider);
    const reserveFactor = await liquidityPoolContract.getReserveFactor();
    return formatEther(reserveFactor);
};
export const getXtkFeeFactor = async (provider) => {
    const liquidityPoolContract = await getLiquidityPoolContract(provider);
    const xtkFeeFactor = await liquidityPoolContract.getXtkFeeFactor();
    return formatEther(xtkFeeFactor);
};
export const getUpdatedBorrowBy = async (address, provider) => {
    const liquidityPoolContract = await getLiquidityPoolContract(provider);
    const updatedBorrowBy = await liquidityPoolContract.updatedBorrowBy(address);
    return formatEther(updatedBorrowBy);
};
export const getUtilizationRate = async (provider) => {
    const liquidityPoolContract = await getLiquidityPoolContract(provider);
    const utilizationRate = await liquidityPoolContract.utilizationRate();
    return utilizationRate.toString();
};
/**
 * Repay Loan with USDC
 * @param amount USDC amount without decimals
 * @param provider
 * @returns
 */
export const repayLiquidity = async (amount, provider) => {
    const liquidityPoolContract = await getLiquidityPoolContract(provider);
    const address = await getSignerAddress(provider);
    const approvedAmount = await _getApprovedAmountUSDC(address, provider);
    if (approvedAmount.lt(amount)) {
        return Promise.reject(TOKEN_APPROVE_ERROR);
    }
    return liquidityPoolContract.repay(amount);
};
/**
 * Supply USDC to Liquidity Pool
 * @param amount amount of USDC without decimals
 * @param provider
 * @returns
 */
export const supplyLiquidity = async (amount, provider) => {
    const liquidityPoolContract = await getLiquidityPoolContract(provider);
    const address = await getSignerAddress(provider);
    const approvedAmount = await _getApprovedAmountUSDC(address, provider);
    if (approvedAmount.lt(amount)) {
        return Promise.reject(TOKEN_APPROVE_ERROR);
    }
    return liquidityPoolContract.supply(amount);
};
/**
 * Withdraw USDC from Liquidity Pool
 * @param amount amount of LPT without decimals
 * @param provider
 * @returns
 */
export const withdrawLiquidity = async (amount, provider) => {
    const liquidityPoolContract = await getLiquidityPoolContract(provider);
    return liquidityPoolContract.withdraw(amount);
};
const _getApprovedAmountUSDC = async (address, provider) => {
    const network = await provider.getNetwork();
    const usdcContract = getContract(USDC, provider, network);
    if (!usdcContract) {
        return Promise.reject(CONTRACT_ERROR);
    }
    return usdcContract.allowance(address, ADDRESSES[LENDING_LIQUIDITY_POOL][network.chainId]);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlxdWlkaXR5UG9vbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9ibG9ja2NoYWluL2xlbmRpbmcvbGlxdWlkaXR5UG9vbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0JBQXNCLENBQUE7QUFDbEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxzQkFBc0IsRUFBRSxJQUFJLEVBQUUsTUFBTSxjQUFjLENBQUE7QUFHdEUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFBO0FBQ3hDLE9BQU8sRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxVQUFVLENBQUE7QUFFeEQsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sVUFBVSxDQUFBO0FBRW5ELE1BQU0sY0FBYyxHQUFHLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyw4QkFBOEIsQ0FBQyxDQUFBO0FBQ3ZFLE1BQU0sbUJBQW1CLEdBQUcsSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLENBQUE7QUFFakUsTUFBTSxDQUFDLE1BQU0sV0FBVyxHQUFHLEtBQUssRUFDOUIsTUFBaUIsRUFDakIsUUFBc0IsRUFDdEIsRUFBRTtJQUNGLE1BQU0sT0FBTyxHQUFHLE1BQU0sUUFBUSxDQUFDLFVBQVUsRUFBRSxDQUFBO0lBQzNDLE1BQU0sWUFBWSxHQUFHLFdBQVcsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFBO0lBQ3pELElBQUksQ0FBQyxZQUFZLEVBQUU7UUFDakIsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFBO0tBQ3RDO0lBRUQsT0FBTyxZQUFZLENBQUMsT0FBTyxDQUN6QixTQUFTLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQ2xELE1BQU0sQ0FDUCxDQUFBO0FBQ0gsQ0FBQyxDQUFBO0FBRUQ7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