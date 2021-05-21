import { X_U3LP_A, X_U3LP_B, X_U3LP_C, X_U3LP_D } from '@xtoken/abis'
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

test('Get xU3LPb portfolio balance', async (t) => {
  const portfolioItem = await getPortfolioItemXU3LP(
    X_U3LP_B,
    testAddress,
    provider
  )
  console.log('Portfolio balance xU3LPb:', portfolioItem.quantity)
  t.true(Number(portfolioItem.quantity) > 0)
})

test('Get xU3LPc portfolio balance', async (t) => {
  const portfolioItem = await getPortfolioItemXU3LP(
    X_U3LP_C,
    testAddress,
    provider
  )
  console.log('Portfolio balance xU3LPc:', portfolioItem.quantity)
  t.true(Number(portfolioItem.quantity) > 0)
})

test('Get xU3LPd portfolio balance', async (t) => {
  const portfolioItem = await getPortfolioItemXU3LP(
    X_U3LP_D,
    testAddress,
    provider
  )
  console.log('Portfolio balance xU3LPd:', portfolioItem.quantity)
  t.true(Number(portfolioItem.quantity) > 0)
})
