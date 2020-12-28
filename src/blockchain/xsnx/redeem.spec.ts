import test from 'ava'
import { ethers } from 'ethers'

import { getMaximumRedeemableXSnx } from './redeem'

const provider = new ethers.providers.InfuraProvider(
  'homestead',
  '645c2c65dd8f4be18a50a0bf011bab85'
)

test('Get maximum redeemable xSNX', async (t) => {
  const maxRedeemable = await getMaximumRedeemableXSnx(provider)
  console.log('Maximum redeemable xSNX:', maxRedeemable)
  t.is(typeof maxRedeemable, 'string')
})
