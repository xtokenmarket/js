import { X_INCH_A, X_INCH_B } from '@xtoken/abis'
import test from 'ava'

import { provider } from '../../constants.spec'

import { getExpectedQuantityOnMintXInch } from './mint'

test('Calculate xINCHa expected quantity on mint with ETH', async (t) => {
  const expectedQty = await getExpectedQuantityOnMintXInch(
    X_INCH_A,
    true,
    '1',
    provider
  )
  console.log('Expected xINCHa qty for 1 ETH:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate xINCHa expected quantity on mint with INCH', async (t) => {
  const expectedQty = await getExpectedQuantityOnMintXInch(
    X_INCH_A,
    false,
    '1',
    provider
  )
  console.log('Expected xINCHa qty for 1 INCH:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate xINCHb expected quantity on mint with ETH', async (t) => {
  const expectedQty = await getExpectedQuantityOnMintXInch(
    X_INCH_B,
    true,
    '1',
    provider
  )
  console.log('Expected xINCHb qty for 1 ETH:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate xINCHb expected quantity on mint with INCH', async (t) => {
  const expectedQty = await getExpectedQuantityOnMintXInch(
    X_INCH_B,
    false,
    '1',
    provider
  )
  console.log('Expected xINCHb qty for 1 INCH:', expectedQty)
  t.true(Number(expectedQty) > 0)
})
