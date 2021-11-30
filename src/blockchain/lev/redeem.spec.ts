import { X_BTC_3X, X_ETH_3X } from '@xtoken/abis'
import test from 'ava'

import { arbitrumProvider } from '../../constants.spec'

import { getMaximumRedeemableXAssetLev } from './redeem'

test('Get maximum redeemable xBTC3x', async (t) => {
  const maxRedeemable = await getMaximumRedeemableXAssetLev(
    X_BTC_3X,
    arbitrumProvider
  )
  console.log('Maximum redeemable xBTC3x: ', maxRedeemable)
  t.true(Number(maxRedeemable) > 0)
})

test('Get maximum redeemable xETH3x', async (t) => {
  const maxRedeemable = await getMaximumRedeemableXAssetLev(
    X_ETH_3X,
    arbitrumProvider
  )
  console.log('Maximum redeemable xETH3x: ', maxRedeemable)
  t.true(Number(maxRedeemable) > 0)
})

/*test('Get maximum redeemable xLINK3x', async (t) => {
  const maxRedeemable = await getMaximumRedeemableXAssetLev(
    X_LINK_3X,
    arbitrumProvider
  )
  console.log('Maximum redeemable xLINK3x: ', maxRedeemable)
  t.true(Number(maxRedeemable) > 0)
})*/
