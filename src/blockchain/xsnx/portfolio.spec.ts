import { X_SNX_A } from '@xtoken/abis'
import test from 'ava'

import { provider, testAddress } from '../../constants.spec'

import { getPortfolioItemXSnx } from './portfolio'

test('Get xSNXa portfolio balance', async (t) => {
  const portfolioItem = await getPortfolioItemXSnx(
    X_SNX_A,
    testAddress,
    provider
  )
  console.log('Portfolio balance xSNXa:', portfolioItem.quantity)
  t.true(Number(portfolioItem.quantity) > 0)
})
