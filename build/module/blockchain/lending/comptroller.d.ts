import { BaseProvider } from '@ethersproject/providers'
/**
 * Get Borrowing Capacity for an address
 * @param address
 * @param provider
 * @returns
 */
export declare const getBorrowingCapacity: (
  address: string,
  provider: BaseProvider
) => Promise<string>
/**
 * Get Health Ratio for an address
 * @param address
 * @param provider
 * @returns
 */
export declare const getHealthRatio: (
  address: string,
  provider: BaseProvider
) => Promise<string>
/**
 * Get all markets registered in Comptroller
 * @param provider
 * @returns
 */
export declare const getAllMarkets: (
  provider: BaseProvider
) => Promise<string[]>
