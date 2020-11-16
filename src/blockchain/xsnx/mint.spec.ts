import test from 'ava'
import { ethers } from 'ethers'

// XToken
import { getExpectedQuantityOnMintXSnx } from './mint'

const web3Provider = new ethers.providers.InfuraProvider(
  'homestead',
  '645c2c65dd8f4be18a50a0bf011bab85'
)

test('Calculate xSNXa expected quantity on mint with ETH', async (t) => {
  const expectedQty = await getExpectedQuantityOnMintXSnx(
    true,
    '1',
    web3Provider
  )
  console.log('Expected xSNXa qty for 1 ETH:', expectedQty)
  t.is(typeof expectedQty, 'string')
})

test('Calculate xSNXa expected quantity on mint with SNX', async (t) => {
  const expectedQty = await getExpectedQuantityOnMintXSnx(
    false,
    '1',
    web3Provider
  )
  console.log('Expected xSNXa qty for 1 SNX:', expectedQty)
  t.is(typeof expectedQty, 'string')
})
