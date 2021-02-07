import test from 'ava'
import { X_AAVE_A, X_AAVE_B } from 'xtoken-abis'

import { provider, testAddress } from '../../constants.spec'

import { getPortfolioItemXAave } from './portfolio'

test('Get xAAVEa portfolio balance', async (t) => {
  const portfolioItem = await getPortfolioItemXAave(
    X_AAVE_A,
    testAddress,
    provider
  )
  console.log('Portfolio balance xAAVEa:', portfolioItem.quantity)
  t.true(Number(portfolioItem.quantity) > 0)
})

test('Get xAAVEb portfolio balance', async (t) => {
  const portfolioItem = await getPortfolioItemXAave(
    X_AAVE_B,
    testAddress,
    provider
  )
  console.log('Portfolio balance xAAVEb:', portfolioItem.quantity)
  t.true(Number(portfolioItem.quantity) > 0)
})
