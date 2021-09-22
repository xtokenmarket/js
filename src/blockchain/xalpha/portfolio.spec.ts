import { X_ALPHA_A } from '@xtoken/abis'
import test from 'ava'

import { provider, testAddress } from '../../constants.spec'

import { getPortfolioItemXAlpha } from './portfolio'

test('Get xALPHAa portfolio balance', async (t) => {
  const portfolioItem = await getPortfolioItemXAlpha(
    X_ALPHA_A,
    testAddress,
    provider
  )
  console.log('Portfolio balance xALPHAa: ', portfolioItem.quantity)
  t.true(Number(portfolioItem.quantity) > 0)
})
