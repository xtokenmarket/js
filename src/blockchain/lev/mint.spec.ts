import { X_BTC_3X, X_ETH_3X } from '@xtoken/abis'
import test from 'ava'

import { arbitrumProvider } from '../../constants.spec'

import { getExpectedQuantityOnMintXAssetLev } from './mint'

test('Calculate xBTC3x expected quantity on mint with WBTC', async (t) => {
  const expectedQty = await getExpectedQuantityOnMintXAssetLev(
    X_BTC_3X,
    false,
    '1',
    arbitrumProvider
  )
  console.log('Expected xBTC3x qty for 1 WBTC: ', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate xBTC3x expected quantity on mint with ETH', async (t) => {
  const expectedQty = await getExpectedQuantityOnMintXAssetLev(
    X_BTC_3X,
    true,
    '1',
    arbitrumProvider
  )
  console.log('Expected xBTC3x qty for 1 ETH: ', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate xETH3x expected quantity on mint with WETH', async (t) => {
  const expectedQty = await getExpectedQuantityOnMintXAssetLev(
    X_ETH_3X,
    false,
    '1',
    arbitrumProvider
  )
  console.log('Expected xETH3x qty for 1 WETH: ', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate xETH3x expected quantity on mint with ETH', async (t) => {
  const expectedQty = await getExpectedQuantityOnMintXAssetLev(
    X_ETH_3X,
    true,
    '1',
    arbitrumProvider
  )
  console.log('Expected xETH3x qty for 1 ETH: ', expectedQty)
  t.true(Number(expectedQty) > 0)
})

/*test('Calculate xLINK3x expected quantity on mint with LINK', async (t) => {
  const expectedQty = await getExpectedQuantityOnMintXAssetLev(
    X_LINK_3X,
    false,
    '1',
    arbitrumProvider
  )
  console.log('Expected xLINK3x qty for 1 LINK: ', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate xLINK3x expected quantity on mint with ETH', async (t) => {
  const expectedQty = await getExpectedQuantityOnMintXAssetLev(
    X_LINK_3X,
    true,
    '1',
    arbitrumProvider
  )
  console.log('Expected xLINK3x qty for 1 ETH: ', expectedQty)
  t.true(Number(expectedQty) > 0)
})*/
