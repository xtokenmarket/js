import {
  X_U3LP_A,
  X_U3LP_B,
  X_U3LP_C,
  // X_U3LP_D,
  // X_U3LP_E,
  X_U3LP_F,
  X_U3LP_G,
  X_U3LP_H,
} from '@xtoken/abis'
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

/*test('Get xU3LPd portfolio balance', async (t) => {
  const portfolioItem = await getPortfolioItemXU3LP(
    X_U3LP_D,
    testAddress,
    provider
  )
  console.log('Portfolio balance xU3LPd:', portfolioItem.quantity)
  t.true(Number(portfolioItem.quantity) > 0)
})

test('Get xU3LPe portfolio balance', async (t) => {
  const portfolioItem = await getPortfolioItemXU3LP(
    X_U3LP_E,
    testAddress,
    provider
  )
  console.log('Portfolio balance xU3LPe:', portfolioItem.quantity)
  t.true(Number(portfolioItem.quantity) > 0)
})*/

test('Get xU3LPf portfolio balance', async (t) => {
  const portfolioItem = await getPortfolioItemXU3LP(
    X_U3LP_F,
    testAddress,
    provider
  )
  console.log('Portfolio balance xU3LPf:', portfolioItem.quantity)
  t.true(Number(portfolioItem.quantity) > 0)
})

test('Get xU3LPg portfolio balance', async (t) => {
  const portfolioItem = await getPortfolioItemXU3LP(
    X_U3LP_G,
    testAddress,
    provider
  )
  console.log('Portfolio balance xU3LPg:', portfolioItem.quantity)
  t.true(Number(portfolioItem.quantity) > 0)
})

test('Get xU3LPh portfolio balance', async (t) => {
  const portfolioItem = await getPortfolioItemXU3LP(
    X_U3LP_H,
    testAddress,
    provider
  )
  console.log('Portfolio balance xU3LPh:', portfolioItem.quantity)
  t.true(Number(portfolioItem.quantity) > 0)
})
