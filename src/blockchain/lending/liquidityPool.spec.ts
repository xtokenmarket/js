import test from 'ava'

import { arbitrumProvider, testAddress } from '../../constants.spec'

import {
  getBorrowRatePerBlock,
  getLPTBaseValue,
  getLPTValue,
  getOptimalUtilizationRate,
  getUpdatedBorrowBy,
} from './liquidityPool'

test('Get borrow rate per block', async (t) => {
  const borrowRatePerBlock = await getBorrowRatePerBlock(arbitrumProvider)
  console.log('[Lending] Borrow rate per block:', borrowRatePerBlock)
  t.true(Number(borrowRatePerBlock) > 0)
})

test('Get base LPT value', async (t) => {
  const lptBaseValue = await getLPTBaseValue(arbitrumProvider)
  console.log('[Lending] LPT Base Value:', lptBaseValue)
  t.true(Number(lptBaseValue) === 10)
})

test('Get LPT value', async (t) => {
  const lptValue = await getLPTValue(arbitrumProvider)
  console.log('[Lending] LPT Value:', lptValue)
  t.true(Number(lptValue) > 0)
})

test('Get optimal utilization rate', async (t) => {
  const optimalUtilizationRate = await getOptimalUtilizationRate(
    arbitrumProvider
  )
  console.log('[Lending] Utilization rate:', optimalUtilizationRate)
  t.true(Number(optimalUtilizationRate) === 80)
})

test('Get updated borrow by test address', async (t) => {
  const updatedBorrowBy = await getUpdatedBorrowBy(
    testAddress,
    arbitrumProvider
  )
  console.log('[Lending] Updated borrow by test address:', updatedBorrowBy)
  t.true(Number(updatedBorrowBy) > 0)
})
