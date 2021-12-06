import { X_BTC_3X, X_ETH_3X } from '@xtoken/abis'
import test from 'ava'

import { arbitrumProvider } from '../../constants.spec'

import { getExpectedQuantityOnBurnXAssetLev } from './burn'

test('Calculate WBTC expected quantity on burn of xBTC3x', async (t) => {
  const expectedQty = await getExpectedQuantityOnBurnXAssetLev(
    X_BTC_3X,
    false,
    '1000',
    arbitrumProvider
  )
  console.log('Expected WBTC qty for 1000 xBTC3x: ', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate ETH expected quantity on burn of xBTC3x', async (t) => {
  const expectedQty = await getExpectedQuantityOnBurnXAssetLev(
    X_BTC_3X,
    true,
    '1000',
    arbitrumProvider
  )
  console.log('Expected ETH qty for 1000 xBTC3x: ', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate WETH expected quantity on burn of xETH3x', async (t) => {
  const expectedQty = await getExpectedQuantityOnBurnXAssetLev(
    X_ETH_3X,
    false,
    '1000',
    arbitrumProvider
  )
  console.log('Expected WETH qty for 1000 xETH3x: ', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate ETH expected quantity on burn of xETH3x', async (t) => {
  const expectedQty = await getExpectedQuantityOnBurnXAssetLev(
    X_ETH_3X,
    true,
    '1000',
    arbitrumProvider
  )
  console.log('Expected ETH qty for 1000 xETH3x: ', expectedQty)
  t.true(Number(expectedQty) > 0)
})

/*test('Calculate LINK expected quantity on burn of xLINK3x', async (t) => {
  const expectedQty = await getExpectedQuantityOnBurnXAssetLev(
    X_LINK_3X,
    false,
    '1000',
    arbitrumProvider
  )
  console.log('Expected LINK qty for 1000 xLINK3x: ', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate ETH expected quantity on burn of xLINK3x', async (t) => {
  const expectedQty = await getExpectedQuantityOnBurnXAssetLev(
    X_LINK_3X,
    true,
    '1000',
    arbitrumProvider
  )
  console.log('Expected ETH qty for 1000 xLINK3x: ', expectedQty)
  t.true(Number(expectedQty) > 0)
})*/
