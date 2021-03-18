import { X_HEGIC_A, X_HEGIC_B } from '@xtoken/abis'
import test from 'ava'

import { provider } from '../../constants.spec'

import { getExpectedQuantityOnBurnXHegic } from './burn'

test('Calculate HEGIC expected quantity on burn of xHEGICa', async (t) => {
  const expectedQty = await getExpectedQuantityOnBurnXHegic(
    X_HEGIC_A,
    false,
    '1000',
    provider
  )
  console.log('Expected HEGIC qty for 1000 xHEGICa:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate ETH expected quantity on burn of xHEGICa', async (t) => {
  const expectedQty = await getExpectedQuantityOnBurnXHegic(
    X_HEGIC_A,
    true,
    '1000',
    provider
  )
  console.log('Expected ETH qty for 1000 xHEGICa:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate HEGIC expected quantity on burn of xHEGICb', async (t) => {
  const expectedQty = await getExpectedQuantityOnBurnXHegic(
    X_HEGIC_B,
    false,
    '1000',
    provider
  )
  console.log('Expected HEGIC qty for 1000 xHEGICb:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate ETH expected quantity on burn of xHEGICb', async (t) => {
  const expectedQty = await getExpectedQuantityOnBurnXHegic(
    X_HEGIC_B,
    true,
    '1000',
    provider
  )
  console.log('Expected ETH qty for 1000 xHEGICb:', expectedQty)
  t.true(Number(expectedQty) > 0)
})
