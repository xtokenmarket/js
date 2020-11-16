import test from 'ava'
import { ethers } from 'ethers'

// XToken
import { getExpectedQuantityOnMintXKnc, minkXKnc } from './mint'

const web3Provider = new ethers.providers.InfuraProvider(
  'homestead',
  '645c2c65dd8f4be18a50a0bf011bab85'
)

test('Calculate xKNCa expected quantity on mint with ETH', async (t) => {
  const expectedQty = await getExpectedQuantityOnMintXKnc(
    true,
    '1',
    web3Provider
  )
  console.log('Expected xKNCa qty for 1 ETH:', expectedQty)
  t.is(typeof expectedQty, 'string')
})

test('Calculate xKNCa expected quantity on mint with KNC', async (t) => {
  const expectedQty = await getExpectedQuantityOnMintXKnc(
    false,
    '1',
    web3Provider
  )
  console.log('Expected xKNCa qty for 1 KNC:', expectedQty)
  t.is(typeof expectedQty, 'string')
})

test('Mint XKNC throws error using Infura provider', async (t) => {
  try {
    await minkXKnc(true, '1', web3Provider)
  } catch (e) {
    t.is(e.reason, 'sending a transaction requires a signer')
  }
})
