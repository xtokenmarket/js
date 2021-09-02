import test from 'ava'

import { provider } from '../../constants.spec'

import {
  getLPTBaseValue,
  getLPTValue,
  getOptimalUtilizationRate,
} from './liquidityPool'

test('Get optimal utilization rate', async (t) => {
  const optimalUtilizationRate = await getOptimalUtilizationRate(provider)
  console.log('[Lending] Utilization rate:', optimalUtilizationRate)
  t.true(Number(optimalUtilizationRate) === 80)
})

test('Get LPT value', async (t) => {
  const lptValue = await getLPTValue(provider)
  console.log('[Lending] LPT Value:', lptValue)
  t.true(Number(lptValue) === 10)
})

test('Get base LPT value', async (t) => {
  const lptBaseValue = await getLPTBaseValue(provider)
  console.log('[Lending] LPT Base Value:', lptBaseValue)
  t.true(Number(lptBaseValue) === 10)
})
