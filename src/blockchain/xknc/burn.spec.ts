import test from 'ava'
import { ethers } from 'ethers'

// XToken
import { getExpectedQuantityOnBurnXKnc } from './burn'

const provider = new ethers.providers.InfuraProvider(
  'homestead',
  '645c2c65dd8f4be18a50a0bf011bab85'
)

test('Calculate ETH expected quantity on burn of xKNCa', async (t) => {
  const expectedQty = await getExpectedQuantityOnBurnXKnc(true, '1', provider)
  console.log('Expected ETH qty for 1 xKNCa:', expectedQty)
  t.is(typeof expectedQty, 'string')
})

test('Calculate KNC expected quantity on burn of xKNCa', async (t) => {
  const expectedQty = await getExpectedQuantityOnBurnXKnc(false, '1', provider)
  console.log('Expected KNC qty for 1 xKNCa:', expectedQty)
  t.is(typeof expectedQty, 'string')
})
