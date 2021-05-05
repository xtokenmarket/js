import { X_U3LP_A } from '@xtoken/abis'
import test from 'ava'

import { provider, testAddress } from '../../constants.spec'

import { getPortfolioItemXU3LP } from './portfolio'

test('Get xU3LPa portfolio balance', async (t) => {
  const portfolioItem = await getPortfolioItemXU3LP(
    X_U3LP_A,
    testAddress,
    provider
  )
  console.log('Portfolio balance xU3LPa:', portfolioItem.quantity)
  t.true(Number(portfolioItem.quantity) > 0)
})
