import test from 'ava'
import { ethers } from 'ethers'
import { X_INCH_A } from 'xtoken-abis'

import { getMaximumRedeemableXInch } from './redeem'

const provider = new ethers.providers.InfuraProvider(
  'homestead',
  '645c2c65dd8f4be18a50a0bf011bab85'
)

test('Get maximum redeemable xINCHa', async (t) => {
  const maxRedeemable = await getMaximumRedeemableXInch(X_INCH_A, provider)
  console.log('Maximum redeemable xINCHa:', maxRedeemable)
  t.is(typeof maxRedeemable, 'string')
})
