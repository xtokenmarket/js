import { BaseProvider } from '@ethersproject/providers';
import { BigNumber } from 'ethers';
import { ILendingMarket, ILendingMarketInfo } from '../../types/xToken';
/**
 * Get borrowing limit for an address in a Lending Market
 * @param marketName Name of the market
 * @param address
 * @param provider
 * @returns
 */
export declare const getBorrowingLimit: (marketName: ILendingMarket, address: string, provider: BaseProvider) => Promise<string>;
/**
 * Get xAsset collateral deposited in a Lending Market for an address
 * @param marketName Name of the market
 * @param address
 * @param provider
 * @returns
 */
export declare const getCollateral: (marketName: ILendingMarket, address: string, provider: BaseProvider) => Promise<string>;
export declare const getCollateralCap: (marketName: ILendingMarket, provider: BaseProvider) => Promise<string>;
export declare const getLendingMarkets: (address: string, provider: BaseProvider) => Promise<readonly ILendingMarketInfo[]>;
/**
 * Add xAsset collateral to a Lending Market
 * @param marketName name of the market
 * @param amount amount without decimals
 * @param provider
 * @returns
 */
export declare const supplyCollateral: (marketName: ILendingMarket, amount: BigNumber, provider: BaseProvider) => Promise<import("ethers").ContractTransaction>;
/**
 * Withdraw xAsset collateral from a Lending Market
 * @param marketName name of the market
 * @param amount amount without decimals
 * @param provider
 * @returns
 */
export declare const withdrawCollateral: (marketName: ILendingMarket, amount: BigNumber, provider: BaseProvider) => Promise<import("ethers").ContractTransaction>;