import { X_ALPHA_A } from '@xtoken/abis'
import test from 'ava'

import { provider } from '../../constants.spec'

import { getExpectedQuantityOnMintXAlpha } from './mint'

test('Calculate xALPHAa expected quantity on mint with ALPHA', async (t) => {
  const expectedQty = await getExpectedQuantityOnMintXAlpha(
    X_ALPHA_A,
    false,
    '1',
    provider
  )
  console.log('Expected xALPHAa qty for 1 ALPHA: ', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate xALPHAa expected quantity on mint with ETH', async (t) => {
  const expectedQty = await getExpectedQuantityOnMintXAlpha(
    X_ALPHA_A,
    true,
    '0.001',
    provider
  )
  console.log('Expected xALPHAa qty for 0.001 ETH: ', expectedQty)
  t.true(Number(expectedQty) > 0)
})
