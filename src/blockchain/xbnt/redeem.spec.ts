import { X_BNT_A } from '@xtoken/abis'
import test from 'ava'

import { provider } from '../../constants.spec'

import { getMaximumRedeemableXBnt } from './redeem'

test('Get maximum redeemable xBNTa', async (t) => {
  const maxRedeemable = await getMaximumRedeemableXBnt(X_BNT_A, provider)
  console.log('Maximum redeemable xBNTa:', maxRedeemable)
  t.true(Number(maxRedeemable) > 0)
})
