import { X_ALPHA_A } from '@xtoken/abis'
import test from 'ava'

import { provider } from '../../constants.spec'

import { getExpectedQuantityOnMintXAlpha } from './mint'

test('Calculate xALPHAa expected quantity on mint with ETH', async (t) => {
  const expectedQty = await getExpectedQuantityOnMintXAlpha(
    X_ALPHA_A,
    true,
    '1',
    provider
  )
  console.log('Expected xALPHAa qty for 1 ETH: ', expectedQty)
  t.true(Number(expectedQty) > 0)
})
