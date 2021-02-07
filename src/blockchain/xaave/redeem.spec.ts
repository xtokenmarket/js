import test from 'ava'
import { X_AAVE_A, X_AAVE_B } from 'xtoken-abis'

import { provider } from '../../constants.spec'

import { getMaximumRedeemableXAave } from './redeem'

test('Get maximum redeemable xAAVEa', async (t) => {
  const maxRedeemable = await getMaximumRedeemableXAave(X_AAVE_A, provider)
  console.log('Maximum redeemable xAAVEa:', maxRedeemable)
  t.true(Number(maxRedeemable) > 0)
})

test('Get maximum redeemable xAAVEb', async (t) => {
  const maxRedeemable = await getMaximumRedeemableXAave(X_AAVE_B, provider)
  console.log('Maximum redeemable xAAVEb:', maxRedeemable)
  t.true(Number(maxRedeemable) > 0)
})
