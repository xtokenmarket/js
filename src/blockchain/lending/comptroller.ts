import { BaseProvider } from '@ethersproject/providers'

import { getComptroller } from './helper'

// --- Comptroller functions ---

/**
 * Get Borrowing Capacity for an address
 * @param address
 * @param provider
 * @returns
 */
export const getBorrowingCapacity = async (
  address: string,
  provider: BaseProvider
) => {
  const comptroller = await getComptroller(provider)
  return comptroller.borrowingCapacity(address)
}

/**
 * Get Health Ratio for an address
 * @param address
 * @param provider
 * @returns
 */
export const getHealthRatio = async (
  address: string,
  provider: BaseProvider
) => {
  const comptroller = await getComptroller(provider)
  return comptroller.getHealthRatio(address)
}

/**
 * Get all markets registered in Comptroller
 * @param provider
 * @returns
 */
export const getAllMarkets = async (provider: BaseProvider) => {
  const comptroller = await getComptroller(provider)
  return comptroller.getAllMarkets()
}
