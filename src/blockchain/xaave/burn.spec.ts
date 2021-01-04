import test from 'ava'
import { ethers } from 'ethers'
import { X_AAVE_A } from 'xtoken-abis'

import { getExpectedQuantityOnBurnXAave } from './burn'

const provider = new ethers.providers.InfuraProvider(
  'homestead',
  '645c2c65dd8f4be18a50a0bf011bab85'
)

test('Calculate ETH expected quantity on burn of xAAVEa', async (t) => {
  const expectedQty = await getExpectedQuantityOnBurnXAave(
    X_AAVE_A,
    true,
    '1',
    provider
  )
  console.log('Expected ETH qty for 1 xAAVEa:', expectedQty)
  t.is(typeof expectedQty, 'string')
})

test('Calculate AAVE expected quantity on burn of xAAVEa', async (t) => {
  const expectedQty = await getExpectedQuantityOnBurnXAave(
    X_AAVE_A,
    false,
    '1',
    provider
  )
  console.log('Expected AAVE qty for 1 xAAVEa:', expectedQty)
  t.is(typeof expectedQty, 'string')
})
