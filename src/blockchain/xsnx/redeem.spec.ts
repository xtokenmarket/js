import test from 'ava'

import { provider } from '../../constants.spec'

import { getMaximumRedeemableXSnx } from './redeem'

test('Get maximum redeemable xSNX', async (t) => {
  const maxRedeemable = await getMaximumRedeemableXSnx(provider)
  console.log('Maximum redeemable xSNX:', maxRedeemable)
  t.true(Number(maxRedeemable) > 0)
})
