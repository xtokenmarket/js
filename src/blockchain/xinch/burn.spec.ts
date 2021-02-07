import test from 'ava'
import { X_INCH_A, X_INCH_B } from 'xtoken-abis'

import { provider } from '../../constants.spec'

import { getExpectedQuantityOnBurnXInch } from './burn'

test('Calculate ETH expected quantity on burn of xINCHa', async (t) => {
  const expectedQty = await getExpectedQuantityOnBurnXInch(
    X_INCH_A,
    true,
    '1000',
    provider
  )
  console.log('Expected ETH qty for 1000 xINCHa:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate INCH expected quantity on burn of xINCHa', async (t) => {
  const expectedQty = await getExpectedQuantityOnBurnXInch(
    X_INCH_A,
    false,
    '1000',
    provider
  )
  console.log('Expected INCH qty for 1000 xINCHa:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate ETH expected quantity on burn of xINCHb', async (t) => {
  const expectedQty = await getExpectedQuantityOnBurnXInch(
    X_INCH_B,
    true,
    '1000',
    provider
  )
  console.log('Expected ETH qty for 1000 xINCHb:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate INCH expected quantity on burn of xINCHb', async (t) => {
  const expectedQty = await getExpectedQuantityOnBurnXInch(
    X_INCH_B,
    false,
    '1000',
    provider
  )
  console.log('Expected INCH qty for 1000 xINCHb:', expectedQty)
  t.true(Number(expectedQty) > 0)
})
