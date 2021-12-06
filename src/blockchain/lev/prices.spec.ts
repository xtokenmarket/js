import { X_BTC_3X, X_ETH_3X } from '@xtoken/abis'
import test from 'ava'

import { arbitrumProvider } from '../../constants.spec'

import { getXAssetLevContracts } from './helper'
import { getXAssetLevPrices } from './prices'

test('Get xBTC3x prices', async (t) => {
  const { xassetlevContract } = await getXAssetLevContracts(
    X_BTC_3X,
    arbitrumProvider
  )

  const { aum, priceEth, priceUsd } = await getXAssetLevPrices(
    xassetlevContract
  )

  console.log('xBTC3x aum: ', aum)
  console.log('xBTC3x priceEth: ', priceEth)
  console.log('xBTC3x priceUsd: ', priceUsd)

  t.true(aum > 0)
  t.true(priceEth > 0)
  t.true(priceUsd > 0)
})

test('Get xETH3x prices', async (t) => {
  const { xassetlevContract } = await getXAssetLevContracts(
    X_ETH_3X,
    arbitrumProvider
  )

  const { aum, priceEth, priceUsd } = await getXAssetLevPrices(
    xassetlevContract
  )

  console.log('xETH3x aum: ', aum)
  console.log('xETH3x priceEth: ', priceEth)
  console.log('xETH3x priceUsd: ', priceUsd)

  t.true(aum > 0)
  t.true(priceEth > 0)
  t.true(priceUsd > 0)
})

/*test('Get xLINK3x prices', async (t) => {
  const { xassetlevContract } = await getXAssetLevContracts(
    X_LINK_3X,
    arbitrumProvider
  )

  const { aum, priceEth, priceUsd } = await getXAssetLevPrices(
    xassetlevContract
  )

  console.log('xLINK3x aum: ', aum)
  console.log('xLINK3x priceEth: ', priceEth)
  console.log('xLINK3x priceUsd: ', priceUsd)

  t.true(aum > 0)
  t.true(priceEth > 0)
  t.true(priceUsd > 0)
})*/
