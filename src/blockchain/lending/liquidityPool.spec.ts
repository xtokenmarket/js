import test from 'ava'

import { provider } from '../../constants.spec'

import {
  getLPTBaseValue,
  getLPTValue,
  getOptimalUtilizationRate,
} from './liquidityPool'

// cSpell:disable

test('Check Optimal Utilization Rate', async (t) => {
  const utilizationRate = await getOptimalUtilizationRate(provider)
  console.log('[Lending] Utilization rate:', utilizationRate.toString())
  t.true(utilizationRate.eq(80))
})

test('Check LPT Value', async (t) => {
  const lptvalue = await getLPTValue(provider)
  console.log('[Lending] LPT Value:', lptvalue.toString())
  t.true(lptvalue.gt(0))
})

test('Check Base LPT Value', async (t) => {
  const lptbasevalue = await getLPTBaseValue(provider)
  console.log('[Lending] LPT Base Value:', lptbasevalue.toString())
  t.true(lptbasevalue.gt(0))
})
