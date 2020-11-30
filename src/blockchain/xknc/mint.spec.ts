import test from 'ava'
import { ethers } from 'ethers'

// XToken
import { getExpectedQuantityOnMintXKnc } from './mint'

const provider = new ethers.providers.InfuraProvider(
  'homestead',
  '645c2c65dd8f4be18a50a0bf011bab85'
)

test('Calculate xKNCa expected quantity on mint with ETH', async (t) => {
  const expectedQty = await getExpectedQuantityOnMintXKnc(true, '1', provider)
  console.log('Expected xKNCa qty for 1 ETH:', expectedQty)
  t.is(typeof expectedQty, 'string')
})

test('Calculate xKNCa expected quantity on mint with KNC', async (t) => {
  const expectedQty = await getExpectedQuantityOnMintXKnc(false, '1', provider)
  console.log('Expected xKNCa qty for 1 KNC:', expectedQty)
  t.is(typeof expectedQty, 'string')
})
