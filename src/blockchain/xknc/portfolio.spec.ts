import { X_KNC_A, X_KNC_B } from '@xtoken/abis'
import test from 'ava'

import { provider, testAddress } from '../../constants.spec'

import { getPortfolioItemXKnc } from './portfolio'

test('Get xKNCa portfolio balance', async (t) => {
  const portfolioItem = await getPortfolioItemXKnc(
    X_KNC_A,
    testAddress,
    provider
  )
  console.log('Portfolio balance xKNCa:', portfolioItem.quantity)
  t.true(Number(portfolioItem.quantity) > 0)
})

test('Get xKNCb portfolio balance', async (t) => {
  const portfolioItem = await getPortfolioItemXKnc(
    X_KNC_B,
    testAddress,
    provider
  )
  console.log('Portfolio balance xKNCb:', portfolioItem.quantity)
  t.true(Number(portfolioItem.quantity) > 0)
})
