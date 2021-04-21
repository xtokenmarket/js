import { X_KNC_A, X_KNC_B } from '@xtoken/abis'
import test from 'ava'

import { provider } from '../../constants.spec'

import { getExpectedQuantityOnMintXKnc } from './mint'

/*test('Calculate xKNCa expected quantity on mint with ETH', async (t) => {
  const expectedQty = await getExpectedQuantityOnMintXKnc(
    X_KNC_A,
    true,
    '1',
    provider
  )
  console.log('Expected xKNCa qty for 1 ETH:', expectedQty)
  t.true(Number(expectedQty) > 0)
})*/

test('Calculate xKNCa expected quantity on mint with KNC', async (t) => {
  const expectedQty = await getExpectedQuantityOnMintXKnc(
    X_KNC_A,
    false,
    '1',
    provider
  )
  console.log('Expected xKNCa qty for 1 KNC:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

/*test('Calculate xKNCb expected quantity on mint with ETH', async (t) => {
  const expectedQty = await getExpectedQuantityOnMintXKnc(
    X_KNC_B,
    true,
    '1',
    provider
  )
  console.log('Expected xKNCb qty for 1 ETH:', expectedQty)
  t.true(Number(expectedQty) > 0)
})*/

test('Calculate xKNCb expected quantity on mint with KNC', async (t) => {
  const expectedQty = await getExpectedQuantityOnMintXKnc(
    X_KNC_B,
    false,
    '1',
    provider
  )
  console.log('Expected xKNCb qty for 1 KNC:', expectedQty)
  t.true(Number(expectedQty) > 0)
})
