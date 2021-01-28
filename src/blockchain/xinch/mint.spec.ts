import test from 'ava'
import { ethers } from 'ethers'
import { X_INCH_A, X_INCH_B } from 'xtoken-abis'

import { getExpectedQuantityOnMintXInch } from './mint'

const provider = new ethers.providers.InfuraProvider(
  'homestead',
  '645c2c65dd8f4be18a50a0bf011bab85'
)

test('Calculate xINCHa expected quantity on mint with ETH', async (t) => {
  const expectedQty = await getExpectedQuantityOnMintXInch(
    X_INCH_A,
    true,
    '1',
    provider
  )
  console.log('Expected xINCHa qty for 1 ETH:', expectedQty)
  t.is(typeof expectedQty, 'string')
})

test('Calculate xINCHa expected quantity on mint with INCH', async (t) => {
  const expectedQty = await getExpectedQuantityOnMintXInch(
    X_INCH_A,
    false,
    '1',
    provider
  )
  console.log('Expected xINCHa qty for 1 INCH:', expectedQty)
  t.is(typeof expectedQty, 'string')
})

test('Calculate xINCHb expected quantity on mint with ETH', async (t) => {
  const expectedQty = await getExpectedQuantityOnMintXInch(
    X_INCH_B,
    true,
    '1',
    provider
  )
  console.log('Expected xINCHb qty for 1 ETH:', expectedQty)
  t.is(typeof expectedQty, 'string')
})

test('Calculate xINCHb expected quantity on mint with INCH', async (t) => {
  const expectedQty = await getExpectedQuantityOnMintXInch(
    X_INCH_B,
    false,
    '1',
    provider
  )
  console.log('Expected xINCHb qty for 1 INCH:', expectedQty)
  t.is(typeof expectedQty, 'string')
})
