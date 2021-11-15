import { BaseProvider } from '@ethersproject/providers'
import { formatEther } from 'ethers/lib/utils'

import { ILendingPricing } from '../../types/xToken'

import { getPricingContracts } from './helper'

/**
 * Get xAsset Price
 * @param priceName Pricing contract name
 * @param provider
 * @returns
 */
export const getLendingPrice = async (
  priceName: ILendingPricing,
  provider: BaseProvider
) => {
  const pricingContracts = await getPricingContracts(provider)
  const pricingContract = pricingContracts[priceName]
  const lendingPrice = await pricingContract.getPrice()
  return formatEther(lendingPrice)
}
