import {
  X_U3LP_A,
  X_U3LP_B,
  X_U3LP_C,
  X_U3LP_D,
  X_U3LP_E,
  X_U3LP_F,
  X_U3LP_G,
  X_U3LP_H,
} from '@xtoken/abis'
import test from 'ava'

import { provider } from '../../constants.spec'

import { getExpectedQuantityOnBurnXU3LP } from './burn'

test('Calculate expected quantity of DAI on burn of xU3LPa', async (t) => {
  const expectedQty = await getExpectedQuantityOnBurnXU3LP(
    X_U3LP_A,
    0,
    '1000',
    provider
  )
  console.log('Expected qty of DAI for 1000 xU3LPa:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate expected quantity of USDC on burn of xU3LPa', async (t) => {
  const expectedQty = await getExpectedQuantityOnBurnXU3LP(
    X_U3LP_A,
    1,
    '1000',
    provider
  )
  console.log('Expected qty of USDC for 1000 xU3LPa:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate expected quantity of USDC on burn of xU3LPb', async (t) => {
  const expectedQty = await getExpectedQuantityOnBurnXU3LP(
    X_U3LP_B,
    0,
    '1000',
    provider
  )
  console.log('Expected qty of USDC for 1000 xU3LPb:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate expected quantity of USDT on burn of xU3LPb', async (t) => {
  const expectedQty = await getExpectedQuantityOnBurnXU3LP(
    X_U3LP_B,
    1,
    '1000',
    provider
  )
  console.log('Expected qty of USDT for 1000 xU3LPb:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate expected quantity of sUSD on burn of xU3LPc', async (t) => {
  const expectedQty = await getExpectedQuantityOnBurnXU3LP(
    X_U3LP_C,
    0,
    '1000',
    provider
  )
  console.log('Expected qty of sUSD for 1000 xU3LPc:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate expected quantity of USDC on burn of xU3LPc', async (t) => {
  const expectedQty = await getExpectedQuantityOnBurnXU3LP(
    X_U3LP_C,
    1,
    '1000',
    provider
  )
  console.log('Expected qty of USDC for 1000 xU3LPc:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate expected quantity of sETH on burn of xU3LPd', async (t) => {
  const expectedQty = await getExpectedQuantityOnBurnXU3LP(
    X_U3LP_D,
    0,
    '1000',
    provider
  )
  console.log('Expected qty of sETH for 1000 xU3LPd:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate expected quantity of WETH on burn of xU3LPd', async (t) => {
  const expectedQty = await getExpectedQuantityOnBurnXU3LP(
    X_U3LP_D,
    1,
    '1000',
    provider
  )
  console.log('Expected qty of WETH for 1000 xU3LPd:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate expected quantity of WBTC on burn of xU3LPe', async (t) => {
  const expectedQty = await getExpectedQuantityOnBurnXU3LP(
    X_U3LP_E,
    0,
    '1000',
    provider
  )
  console.log('Expected qty of WBTC for 1000 xU3LPe:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate expected quantity of renBTC on burn of xU3LPe', async (t) => {
  const expectedQty = await getExpectedQuantityOnBurnXU3LP(
    X_U3LP_E,
    1,
    '1000',
    provider
  )
  console.log('Expected qty of renBTC for 1000 xU3LPe:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate expected quantity of UST on burn of xU3LPf', async (t) => {
  const expectedQty = await getExpectedQuantityOnBurnXU3LP(
    X_U3LP_F,
    0,
    '1000',
    provider
  )
  console.log('Expected qty of UST for 1000 xU3LPf:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate expected quantity of USDT on burn of xU3LPf', async (t) => {
  const expectedQty = await getExpectedQuantityOnBurnXU3LP(
    X_U3LP_F,
    1,
    '1000',
    provider
  )
  console.log('Expected qty of USDT for 1000 xU3LPf:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate expected quantity of FRAX on burn of xU3LPg', async (t) => {
  const expectedQty = await getExpectedQuantityOnBurnXU3LP(
    X_U3LP_G,
    0,
    '1000',
    provider
  )
  console.log('Expected qty of FRAX for 1000 xU3LPg:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate expected quantity of USDC on burn of xU3LPg', async (t) => {
  const expectedQty = await getExpectedQuantityOnBurnXU3LP(
    X_U3LP_G,
    1,
    '1000',
    provider
  )
  console.log('Expected qty of USDC for 1000 xU3LPg:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate expected quantity of BUSD on burn of xU3LPh', async (t) => {
  const expectedQty = await getExpectedQuantityOnBurnXU3LP(
    X_U3LP_H,
    0,
    '1000',
    provider
  )
  console.log('Expected qty of BUSD for 1000 xU3LPh:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate expected quantity of USDT on burn of xU3LPh', async (t) => {
  const expectedQty = await getExpectedQuantityOnBurnXU3LP(
    X_U3LP_H,
    1,
    '1000',
    provider
  )
  console.log('Expected qty of USDT for 1000 xU3LPh:', expectedQty)
  t.true(Number(expectedQty) > 0)
})
