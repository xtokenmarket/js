import { X_HEGIC_A, X_HEGIC_B } from '@xtoken/abis'
import test from 'ava'

import { provider } from '../../constants.spec'

import { getExpectedQuantityOnMintXHegic } from './mint'

test('Calculate xHEGICa expected quantity on mint with ETH', async (t) => {
  const expectedQty = await getExpectedQuantityOnMintXHegic(
    X_HEGIC_A,
    true,
    '1',
    provider
  )
  console.log('Expected xHEGICa qty for 1 ETH:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate xHEGICa expected quantity on mint with HEGIC', async (t) => {
  const expectedQty = await getExpectedQuantityOnMintXHegic(
    X_HEGIC_A,
    false,
    '1',
    provider
  )
  console.log('Expected xHEGICa qty for 1 HEGIC:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate xHEGICb expected quantity on mint with ETH', async (t) => {
  const expectedQty = await getExpectedQuantityOnMintXHegic(
    X_HEGIC_B,
    true,
    '1',
    provider
  )
  console.log('Expected xHEGICb qty for 1 ETH:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate xHEGICb expected quantity on mint with HEGIC', async (t) => {
  const expectedQty = await getExpectedQuantityOnMintXHegic(
    X_HEGIC_B,
    false,
    '1',
    provider
  )
  console.log('Expected xHEGICb qty for 1 HEGIC:', expectedQty)
  t.true(Number(expectedQty) > 0)
})
