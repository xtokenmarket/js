import { BaseProvider } from '@ethersproject/providers';
import { BigNumber } from 'ethers';
export declare const approveUsdc: (amount: BigNumber, provider: BaseProvider) => Promise<any>;
/**
 * Borrow USDC from Liquidity Pool
 * @param amount USDC amount to borrow without decimals
 * @param provider
 * @returns
 */
export declare const borrowLiquidity: (amount: BigNumber, provider: BaseProvider) => Promise<import("ethers").ContractTransaction>;
export declare const getBorrowRatePerBlock: (provider: BaseProvider) => Promise<string>;
export declare const getLPTBaseValue: (provider: BaseProvider) => Promise<string>;
export declare const getLPTValue: (provider: BaseProvider) => Promise<string>;
export declare const getOptimalUtilizationRate: (provider: BaseProvider) => Promise<string>;
export declare const getReserveFactor: (provider: BaseProvider) => Promise<string>;
export declare const getXtkFeeFactor: (provider: BaseProvider) => Promise<string>;
export declare const getUpdatedBorrowBy: (address: string, provider: BaseProvider) => Promise<string>;
export declare const getUtilizationRate: (provider: BaseProvider) => Promise<string>;
/**
 * Repay Loan with USDC
 * @param amount USDC amount without decimals
 * @param provider
 * @returns
 */
export declare const repayLiquidity: (amount: BigNumber, provider: BaseProvider) => Promise<import("ethers").ContractTransaction>;
/**
 * Supply USDC to Liquidity Pool
 * @param amount amount of USDC without decimals
 * @param provider
 * @returns
 */
export declare const supplyLiquidity: (amount: BigNumber, provider: BaseProvider) => Promise<import("ethers").ContractTransaction>;
/**
 * Withdraw USDC from Liquidity Pool
 * @param amount amount of LPT without decimals
 * @param provider
 * @returns
 */
export declare const withdrawLiquidity: (amount: BigNumber, provider: BaseProvider) => Promise<import("ethers").ContractTransaction>;
