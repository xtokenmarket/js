import { X_U3LP_A } from '@xtoken/abis'
import test from 'ava'

import { provider } from '../../constants.spec'

import { getExpectedQuantityOnBurnXU3LP } from './burn'

test('Calculate expected quantity on burn of xU3LPa', async (t) => {
  const expectedQty = await getExpectedQuantityOnBurnXU3LP(
    X_U3LP_A,
    '1',
    provider
  )
  console.log('Expected qty for 1 xU3LPa:', expectedQty)
  t.true(Number(expectedQty) > 0)
})
