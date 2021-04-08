import { X_BNT_A } from '@xtoken/abis'
import test from 'ava'

import { provider, testAddress } from '../../constants.spec'

import { getPortfolioItemXBnt } from './portfolio'

test('Get xBNTa portfolio balance', async (t) => {
  const portfolioItem = await getPortfolioItemXBnt(
    X_BNT_A,
    testAddress,
    provider
  )
  console.log('Portfolio balance xBNTa:', portfolioItem.quantity)
  t.true(Number(portfolioItem.quantity) > 0)
})
