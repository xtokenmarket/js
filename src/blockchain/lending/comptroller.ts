import { BaseProvider } from '@ethersproject/providers'

import { getComptroller } from './helper'

// --- Comptroller functions ---

export const getBorrowingCapacity = async (
  address: string,
  provider: BaseProvider
) => {
  const comptroller = await getComptroller(provider)
  return comptroller.borrowingCapacity(address)
}

export const getHealthRatio = async (
  address: string,
  provider: BaseProvider
) => {
  const comptroller = await getComptroller(provider)
  return comptroller.getHealthRatio(address)
}

export const getAllMarkets = async (provider: BaseProvider) => {
  const comptroller = await getComptroller(provider)
  return comptroller.getAllMarkets()
}
