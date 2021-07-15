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

import { getExpectedQuantityOnMintXU3LP } from './mint'

test('Calculate xU3LPa expected quantity on mint with DAI', async (t) => {
  const expectedQty = await getExpectedQuantityOnMintXU3LP(
    X_U3LP_A,
    0,
    '1000',
    provider
  )
  console.log('Expected xU3LPa qty for 1000 DAI:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate xU3LPa expected quantity on mint with USDC', async (t) => {
  const expectedQty = await getExpectedQuantityOnMintXU3LP(
    X_U3LP_A,
    1,
    '1000',
    provider
  )
  console.log('Expected xU3LPa qty for 1000 USDC:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate xU3LPb expected quantity on mint with USDC', async (t) => {
  const expectedQty = await getExpectedQuantityOnMintXU3LP(
    X_U3LP_B,
    0,
    '1000',
    provider
  )
  console.log('Expected xU3LPb qty for 1000 USDC:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate xU3LPb expected quantity on mint with USDT', async (t) => {
  const expectedQty = await getExpectedQuantityOnMintXU3LP(
    X_U3LP_B,
    1,
    '1000',
    provider
  )
  console.log('Expected xU3LPb qty for 1000 USDT:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate xU3LPc expected quantity on mint with sUSD', async (t) => {
  const expectedQty = await getExpectedQuantityOnMintXU3LP(
    X_U3LP_C,
    0,
    '1000',
    provider
  )
  console.log('Expected xU3LPc qty for 1000 sUSD:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate xU3LPc expected quantity on mint with USDC', async (t) => {
  const expectedQty = await getExpectedQuantityOnMintXU3LP(
    X_U3LP_C,
    1,
    '1000',
    provider
  )
  console.log('Expected xU3LPc qty for 1000 USDC:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate xU3LPd expected quantity on mint with sETH', async (t) => {
  const expectedQty = await getExpectedQuantityOnMintXU3LP(
    X_U3LP_D,
    0,
    '1000',
    provider
  )
  console.log('Expected xU3LPd qty for 1000 sETH:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate xU3LPd expected quantity on mint with WETH', async (t) => {
  const expectedQty = await getExpectedQuantityOnMintXU3LP(
    X_U3LP_D,
    1,
    '1000',
    provider
  )
  console.log('Expected xU3LPd qty for 1000 WETH:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate xU3LPe expected quantity on mint with WBTC', async (t) => {
  const expectedQty = await getExpectedQuantityOnMintXU3LP(
    X_U3LP_E,
    0,
    '1000',
    provider
  )
  console.log('Expected xU3LPe qty for 1000 WBTC:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate xU3LPe expected quantity on mint with renBTC', async (t) => {
  const expectedQty = await getExpectedQuantityOnMintXU3LP(
    X_U3LP_E,
    1,
    '1000',
    provider
  )
  console.log('Expected xU3LPe qty for 1000 renBTC:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate xU3LPf expected quantity on mint with UST', async (t) => {
  const expectedQty = await getExpectedQuantityOnMintXU3LP(
    X_U3LP_F,
    0,
    '1000',
    provider
  )
  console.log('Expected xU3LPf qty for 1000 UST:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate xU3LPf expected quantity on mint with USDT', async (t) => {
  const expectedQty = await getExpectedQuantityOnMintXU3LP(
    X_U3LP_F,
    1,
    '1000',
    provider
  )
  console.log('Expected xU3LPf qty for 1000 USDT:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate xU3LPg expected quantity on mint with FRAX', async (t) => {
  const expectedQty = await getExpectedQuantityOnMintXU3LP(
    X_U3LP_G,
    0,
    '1000',
    provider
  )
  console.log('Expected xU3LPg qty for 1000 FRAX:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate xU3LPg expected quantity on mint with USDC', async (t) => {
  const expectedQty = await getExpectedQuantityOnMintXU3LP(
    X_U3LP_G,
    1,
    '1000',
    provider
  )
  console.log('Expected xU3LPg qty for 1000 USDC:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate xU3LPh expected quantity on mint with BUSD', async (t) => {
  const expectedQty = await getExpectedQuantityOnMintXU3LP(
    X_U3LP_H,
    0,
    '1000',
    provider
  )
  console.log('Expected xU3LPh qty for 1000 BUSD:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate xU3LPh expected quantity on mint with USDT', async (t) => {
  const expectedQty = await getExpectedQuantityOnMintXU3LP(
    X_U3LP_H,
    1,
    '1000',
    provider
  )
  console.log('Expected xU3LPh qty for 1000 USDT:', expectedQty)
  t.true(Number(expectedQty) > 0)
})
