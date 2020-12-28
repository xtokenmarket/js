import test from 'ava'
import { ethers } from 'ethers'

// XToken
import { X_AAVE_A } from '../../constants'

import { getMaximumRedeemableXAave } from './redeem'

const provider = new ethers.providers.InfuraProvider(
  'homestead',
  '645c2c65dd8f4be18a50a0bf011bab85'
)

test('Get maximum redeemable xAAVE', async (t) => {
  const maxRedeemable = await getMaximumRedeemableXAave(X_AAVE_A, provider)
  console.log('Maximum redeemable xAAVE:', maxRedeemable)
  t.is(typeof maxRedeemable, 'string')
})
