import test from 'ava'
import { X_INCH_A, X_INCH_B } from 'xtoken-abis'

import { provider } from '../../constants.spec'

import { getMaximumRedeemableXInch } from './redeem'

test('Get maximum redeemable xINCHa', async (t) => {
  const maxRedeemable = await getMaximumRedeemableXInch(X_INCH_A, provider)
  console.log('Maximum redeemable xINCHa:', maxRedeemable)
  t.true(Number(maxRedeemable) > 0)
})

test('Get maximum redeemable xINCHb', async (t) => {
  const maxRedeemable = await getMaximumRedeemableXInch(X_INCH_B, provider)
  console.log('Maximum redeemable xINCHb:', maxRedeemable)
  t.true(Number(maxRedeemable) > 0)
})
