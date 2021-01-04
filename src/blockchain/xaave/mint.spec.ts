import test from 'ava'
import { ethers } from 'ethers'
import { X_AAVE_A } from 'xtoken-abis'

import { getExpectedQuantityOnMintXAave } from './mint'

const provider = new ethers.providers.InfuraProvider(
  'homestead',
  '645c2c65dd8f4be18a50a0bf011bab85'
)

test('Calculate xAAVEa expected quantity on mint with ETH', async (t) => {
  const expectedQty = await getExpectedQuantityOnMintXAave(
    X_AAVE_A,
    true,
    '1',
    provider
  )
  console.log('Expected xAAVEa qty for 1 ETH:', expectedQty)
  t.is(typeof expectedQty, 'string')
})

test('Calculate xAAVEa expected quantity on mint with AAVE', async (t) => {
  const expectedQty = await getExpectedQuantityOnMintXAave(
    X_AAVE_A,
    false,
    '1',
    provider
  )
  console.log('Expected xAAVEa qty for 1 AAVE:', expectedQty)
  t.is(typeof expectedQty, 'string')
})
