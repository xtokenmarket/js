import test from 'ava'
import { ethers } from 'ethers'
import { X_INCH_A } from 'xtoken-abis'

import { getExpectedQuantityOnBurnXInch } from './burn'

const provider = new ethers.providers.InfuraProvider(
  'homestead',
  '645c2c65dd8f4be18a50a0bf011bab85'
)

test('Calculate ETH expected quantity on burn of xINCHa', async (t) => {
  const expectedQty = await getExpectedQuantityOnBurnXInch(
    X_INCH_A,
    true,
    '1',
    provider
  )
  console.log('Expected ETH qty for 1 xINCHa:', expectedQty)
  t.is(typeof expectedQty, 'string')
})

test('Calculate INCH expected quantity on burn of xINCHa', async (t) => {
  const expectedQty = await getExpectedQuantityOnBurnXInch(
    X_INCH_A,
    false,
    '1',
    provider
  )
  console.log('Expected INCH qty for 1 xINCHa:', expectedQty)
  t.is(typeof expectedQty, 'string')
})
