import { X_HEGIC_A, X_HEGIC_B } from '@xtoken/abis'
import test from 'ava'

import { provider, testAddress } from '../../constants.spec'

import { getPortfolioItemXHegic } from './portfolio'

test('Get xHEGICa portfolio balance', async (t) => {
  const portfolioItem = await getPortfolioItemXHegic(
    X_HEGIC_A,
    testAddress,
    provider
  )
  console.log('Portfolio balance xHEGICa:', portfolioItem.quantity)
  t.true(Number(portfolioItem.quantity) > 0)
})

test('Get xHEGICb portfolio balance', async (t) => {
  const portfolioItem = await getPortfolioItemXHegic(
    X_HEGIC_B,
    testAddress,
    provider
  )
  console.log('Portfolio balance xHEGICb:', portfolioItem.quantity)
  t.true(Number(portfolioItem.quantity) > 0)
})
