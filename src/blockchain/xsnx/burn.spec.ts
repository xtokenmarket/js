import test from 'ava'
import { ethers } from 'ethers'

import { getExpectedQuantityOnBurnXSnx } from './burn'

const provider = new ethers.providers.InfuraProvider(
  'homestead',
  '645c2c65dd8f4be18a50a0bf011bab85'
)

test('Calculate ETH expected quantity on burn of xSNXa', async (t) => {
  const expectedQty = await getExpectedQuantityOnBurnXSnx('1', provider)
  console.log('Expected ETH qty for 1 xSNXa:', expectedQty)
  t.is(typeof expectedQty, 'string')
})
