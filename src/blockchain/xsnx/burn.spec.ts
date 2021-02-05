import test from 'ava'

import { provider } from '../../constants.spec'

import { getExpectedQuantityOnBurnXSnx } from './burn'

test('Calculate ETH expected quantity on burn of xSNXa', async (t) => {
  const expectedQty = await getExpectedQuantityOnBurnXSnx('1', provider)
  console.log('Expected ETH qty for 1 xSNXa:', expectedQty)
  t.true(Number(expectedQty) > 0)
})
