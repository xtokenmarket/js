import test from 'ava'
import { X_INCH_A, X_INCH_B } from 'xtoken-abis'

import { provider, testAddress } from '../../constants.spec'

import { getPortfolioItemXInch } from './portfolio'

test('Get xINCHa portfolio balance', async (t) => {
  const portfolioItem = await getPortfolioItemXInch(
    X_INCH_A,
    testAddress,
    provider
  )
  console.log('Portfolio balance xINCHa:', portfolioItem.quantity)
  t.true(Number(portfolioItem.quantity) > 0)
})

test('Get xINCHb portfolio balance', async (t) => {
  const portfolioItem = await getPortfolioItemXInch(
    X_INCH_B,
    testAddress,
    provider
  )
  console.log('Portfolio balance xINCHb:', portfolioItem.quantity)
  t.true(Number(portfolioItem.quantity) > 0)
})
