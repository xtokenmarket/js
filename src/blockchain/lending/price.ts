import { BaseProvider } from '@ethersproject/providers'

import { getPricingContracts, Prices } from './helper'

// --- Price contracts functions ---

export const getPrice = async (priceName: Prices, provider: BaseProvider) => {
  const prices = await getPricingContracts(provider)
  const price = prices[priceName]
  return price.getPrice()
}
