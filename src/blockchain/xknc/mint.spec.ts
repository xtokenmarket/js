import test from 'ava'
import { ethers } from 'ethers'
import { X_KNC_A } from 'xtoken-abis'

import { getExpectedQuantityOnMintXKnc } from './mint'

const provider = new ethers.providers.InfuraProvider(
  'homestead',
  '645c2c65dd8f4be18a50a0bf011bab85'
)

test('Calculate xKNCa expected quantity on mint with ETH', async (t) => {
  const expectedQty = await getExpectedQuantityOnMintXKnc(
    X_KNC_A,
    true,
    '1',
    provider
  )
  console.log('Expected xKNCa qty for 1 ETH:', expectedQty)
  t.is(typeof expectedQty, 'string')
})

test('Calculate xKNCa expected quantity on mint with KNC', async (t) => {
  const expectedQty = await getExpectedQuantityOnMintXKnc(
    X_KNC_A,
    false,
    '1',
    provider
  )
  console.log('Expected xKNCa qty for 1 KNC:', expectedQty)
  t.is(typeof expectedQty, 'string')
})
