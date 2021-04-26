import { X_BNT_A } from '@xtoken/abis'
import test from 'ava'

import { provider } from '../../constants.spec'

import { getExpectedQuantityOnBurnXBnt } from './burn'

test('Calculate BNT expected quantity on burn of xBNTa', async (t) => {
  const expectedQty = await getExpectedQuantityOnBurnXBnt(
    X_BNT_A,
    false,
    '1000',
    provider
  )
  console.log('Expected BNT qty for 1000 xBNTa:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate ETH expected quantity on burn of xBNTa', async (t) => {
  const expectedQty = await getExpectedQuantityOnBurnXBnt(
    X_BNT_A,
    true,
    '1000',
    provider
  )
  console.log('Expected ETH qty for 1000 xBNTa:', expectedQty)
  t.true(Number(expectedQty) > 0)
})
