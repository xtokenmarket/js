import test from 'ava'

import { provider } from '../../constants.spec'

import { getExpectedQuantityOnMintXSnx } from './mint'

test('Calculate xSNXa expected quantity on mint with ETH', async (t) => {
  const expectedQty = await getExpectedQuantityOnMintXSnx(true, '1', provider)
  console.log('Expected xSNXa qty for 1 ETH:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate xSNXa expected quantity on mint with SNX', async (t) => {
  const expectedQty = await getExpectedQuantityOnMintXSnx(false, '1', provider)
  console.log('Expected xSNXa qty for 1 SNX:', expectedQty)
  t.true(Number(expectedQty) > 0)
})
