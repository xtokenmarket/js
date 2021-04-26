import { X_BNT_A } from '@xtoken/abis'
import test from 'ava'

import { provider } from '../../constants.spec'

import { getExpectedQuantityOnMintXBnt } from './mint'

test('Calculate xBNTa expected quantity on mint with ETH', async (t) => {
  const expectedQty = await getExpectedQuantityOnMintXBnt(
    X_BNT_A,
    true,
    '1',
    provider
  )
  console.log('Expected xBNTa qty for 1 ETH:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate xBNTa expected quantity on mint with BNT', async (t) => {
  const expectedQty = await getExpectedQuantityOnMintXBnt(
    X_BNT_A,
    false,
    '1',
    provider
  )
  console.log('Expected xBNTa qty for 1 BNT:', expectedQty)
  t.true(Number(expectedQty) > 0)
})
