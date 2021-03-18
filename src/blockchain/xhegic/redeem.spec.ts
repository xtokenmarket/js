import { X_HEGIC_A, X_HEGIC_B } from '@xtoken/abis'
import test from 'ava'

import { provider } from '../../constants.spec'

import { getMaximumRedeemableXHegic } from './redeem'

test('Get maximum redeemable xHEGICa', async (t) => {
  const maxRedeemable = await getMaximumRedeemableXHegic(X_HEGIC_A, provider)
  console.log('Maximum redeemable xHEGICa:', maxRedeemable)
  t.true(Number(maxRedeemable) > 0)
})

test('Get maximum redeemable xHEGICb', async (t) => {
  const maxRedeemable = await getMaximumRedeemableXHegic(X_HEGIC_B, provider)
  console.log('Maximum redeemable xHEGICb:', maxRedeemable)
  t.true(Number(maxRedeemable) > 0)
})
