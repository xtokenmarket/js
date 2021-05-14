import { X_U3LP_A } from '@xtoken/abis'
import test from 'ava'

import { provider } from '../../constants.spec'

import { getExpectedQuantityOnBurnXU3LP } from './burn'

test('Calculate expected quantity of DAI on burn of xU3LPa', async (t) => {
  const expectedQty = await getExpectedQuantityOnBurnXU3LP(
    X_U3LP_A,
    0,
    '1000',
    provider
  )
  console.log('Expected qty of DAI for 1000 xU3LPa:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate expected quantity of USDC on burn of xU3LPa', async (t) => {
  const expectedQty = await getExpectedQuantityOnBurnXU3LP(
    X_U3LP_A,
    1,
    '1000',
    provider
  )
  console.log('Expected qty of USDC for 1000 xU3LPa:', expectedQty)
  t.true(Number(expectedQty) > 0)
})
