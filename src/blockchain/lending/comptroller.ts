import { BaseProvider } from '@ethersproject/providers'
import { formatEther, formatUnits } from 'ethers/lib/utils'

import { DEC_18 } from '../../constants'

import { getComptrollerContract } from './helper'

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
  const comptroller = await getComptrollerContract(provider)
  const borrowingCapacity = await comptroller.borrowingCapacity(address)
  return formatEther(borrowingCapacity)
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
  const comptroller = await getComptrollerContract(provider)
  const healthRatio = await comptroller.getHealthRatio(address)
  return healthRatio.eq(DEC_18)
    ? formatEther(healthRatio)
    : formatUnits(healthRatio, 2)
}

/**
 * Get all markets registered in Comptroller
 * @param provider
 * @returns
 */
export const getAllMarkets = async (provider: BaseProvider) => {
  const comptroller = await getComptrollerContract(provider)
  return comptroller.getAllMarkets()
}
