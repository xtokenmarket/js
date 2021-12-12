import test from 'ava'

import { provider } from '../../constants.spec'

import { getMaximumRedeemableXSnx } from './redeem'

test('Get maximum redeemable xSNXa', async (t) => {
  const maxRedeemable = await getMaximumRedeemableXSnx(provider)
  console.log('Maximum redeemable xSNXa:', maxRedeemable)
  t.true(Number(maxRedeemable) > 0)
})
