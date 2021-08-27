import { AAVE_X_AAVE_A_CLR } from '@xtoken/abis'
import test from 'ava'

import { provider } from '../../constants.spec'

import { getMaximumRedeemableXAssetCLR } from './redeem'

test(`Get maximum redeemable ${AAVE_X_AAVE_A_CLR} when burning`, async (t) => {
  const maxRedeemable = await getMaximumRedeemableXAssetCLR(
    AAVE_X_AAVE_A_CLR,
    provider
  )
  console.log(
    `Maximum redeemable ${AAVE_X_AAVE_A_CLR} when burning:`,
    maxRedeemable
  )
  t.true(Number(maxRedeemable) > 0)
})
