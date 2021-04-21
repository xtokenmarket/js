import { X_KNC_A, X_KNC_B } from '@xtoken/abis'
import test from 'ava'

import { provider } from '../../constants.spec'

import { getExpectedQuantityOnBurnXKnc } from './burn'

/*test('Calculate ETH expected quantity on burn of xKNCa', async (t) => {
  const expectedQty = await getExpectedQuantityOnBurnXKnc(
    X_KNC_A,
    true,
    '1',
    provider
  )
  console.log('Expected ETH qty for 1 xKNCa:', expectedQty)
  t.true(Number(expectedQty) > 0)
})*/

test('Calculate KNC expected quantity on burn of xKNCa', async (t) => {
  const expectedQty = await getExpectedQuantityOnBurnXKnc(
    X_KNC_A,
    false,
    '1',
    provider
  )
  console.log('Expected KNC qty for 1 xKNCa:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

/*test('Calculate ETH expected quantity on burn of xKNCb', async (t) => {
  const expectedQty = await getExpectedQuantityOnBurnXKnc(
    X_KNC_B,
    true,
    '1',
    provider
  )
  console.log('Expected ETH qty for 1 xKNCb:', expectedQty)
  t.true(Number(expectedQty) > 0)
})*/

test('Calculate KNC expected quantity on burn of xKNCb', async (t) => {
  const expectedQty = await getExpectedQuantityOnBurnXKnc(
    X_KNC_B,
    false,
    '1',
    provider
  )
  console.log('Expected KNC qty for 1 xKNCb:', expectedQty)
  t.true(Number(expectedQty) > 0)
})
