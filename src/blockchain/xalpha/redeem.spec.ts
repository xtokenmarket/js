import { X_ALPHA_A } from '@xtoken/abis'
import test from 'ava'

import { provider } from '../../constants.spec'

import { getMaximumRedeemableXAlpha } from './redeem'

test('Get maximum redeemable xALPHAa', async (t) => {
  const maxRedeemable = await getMaximumRedeemableXAlpha(X_ALPHA_A, provider)
  console.log('Maximum redeemable xALPHAa: ', maxRedeemable)
  t.true(Number(maxRedeemable) > 0)
})
