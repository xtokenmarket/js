import { X_U3LP_A } from '@xtoken/abis'
import test from 'ava'

import { provider } from '../../constants.spec'

import { getExpectedQuantityOnMintXU3LP } from './mint'

test('Calculate xU3LPa expected quantity on mint with DAI', async (t) => {
  const expectedQty = await getExpectedQuantityOnMintXU3LP(
    X_U3LP_A,
    '1',
    provider
  )
  console.log('Expected xU3LPa qty for 1 DAI:', expectedQty)
  t.true(Number(expectedQty) > 0)
})
