import { BaseProvider } from '@ethersproject/providers'
import { BigNumber } from 'ethers'
/**
 * Borrow USDC from Liquidity Pool
 * @param amount USDC amount to borrow without decimals
 * @param provider
 * @returns
 */
export declare const borrow: (
  amount: BigNumber,
  provider: BaseProvider
) => Promise<import('ethers').ContractTransaction>
/**
 * Repay Loan with USDC
 * @param amount USDC amount without decimals
 * @param provider
 * @returns
 */
export declare const repay: (
  amount: BigNumber,
  provider: BaseProvider
) => Promise<import('ethers').ContractTransaction>
/**
 * Supply USDC to Liquidity Pool
 * @param amount amount of USDC without decimals
 * @param provider
 * @returns
 */
export declare const supply: (
  amount: BigNumber,
  provider: BaseProvider
) => Promise<import('ethers').ContractTransaction>
/**
 * Withdraw USDC from Liquidity Pool
 * @param amount amount of LPT without decimals
 * @param provider
 * @returns
 */
export declare const withdraw: (
  amount: BigNumber,
  provider: BaseProvider
) => Promise<import('ethers').ContractTransaction>
export declare const getLPTBaseValue: (
  provider: BaseProvider
) => Promise<string>
export declare const getLPTValue: (provider: BaseProvider) => Promise<string>
export declare const getOptimalUtilizationRate: (
  provider: BaseProvider
) => Promise<string>
export declare const approveUsdc: (
  amount: BigNumber,
  provider: BaseProvider
) => Promise<any>
