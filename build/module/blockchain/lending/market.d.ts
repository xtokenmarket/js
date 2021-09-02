import { BaseProvider } from '@ethersproject/providers'
import { BigNumber } from 'ethers'
import { ILendingMarket } from '../../types/xToken'
/**
 * Add xAsset collateral to a Lending Market
 * @param marketName name of the market
 * @param amount amount without decimals
 * @param provider
 * @returns
 */
export declare const collateralize: (
  marketName: ILendingMarket,
  amount: string,
  provider: BaseProvider
) => Promise<import('ethers').ContractTransaction>
/**
 * Withdraw xAsset collateral from a Lending Market
 * @param marketName name of the market
 * @param amount amount without decimals
 * @param provider
 * @returns
 */
export declare const withdrawCollateral: (
  marketName: ILendingMarket,
  amount: string,
  provider: BaseProvider
) => Promise<import('ethers').ContractTransaction>
/**
 * Get xAsset collateral deposited in a Lending Market for an address
 * @param marketName name of the market
 * @param provider
 * @param address optional address - checks current signer if not provided
 * @returns
 */
export declare const getCollateral: (
  marketName: ILendingMarket,
  provider: BaseProvider,
  address?: string | undefined
) => Promise<string>
/**
 * Get borrowing limit for an address in a Lending Market
 * @param marketName name of the market
 * @param provider
 * @param address optional address - checks current signer if not provided
 * @returns
 */
export declare const getBorrowingLimit: (
  marketName: ILendingMarket,
  provider: BaseProvider,
  address?: string | undefined
) => Promise<string>
export declare const approveXAAVEa: (
  amount: BigNumber,
  provider: BaseProvider
) => Promise<any>
export declare const approveXAAVEb: (
  amount: BigNumber,
  provider: BaseProvider
) => Promise<any>
export declare const approveXINCHa: (
  amount: BigNumber,
  provider: BaseProvider
) => Promise<any>
export declare const approveXINCHb: (
  amount: BigNumber,
  provider: BaseProvider
) => Promise<any>
export declare const approveXKNCa: (
  amount: BigNumber,
  provider: BaseProvider
) => Promise<any>
export declare const approveXKNCb: (
  amount: BigNumber,
  provider: BaseProvider
) => Promise<any>
