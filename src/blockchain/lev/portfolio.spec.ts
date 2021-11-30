import { X_BTC_3X, X_ETH_3X } from '@xtoken/abis'
import test from 'ava'

import { arbitrumProvider, testAddress } from '../../constants.spec'

import { getPortfolioItemXAssetLev } from './portfolio'

test('Get xBTC3x portfolio balance', async (t) => {
  const portfolioItem = await getPortfolioItemXAssetLev(
    X_BTC_3X,
    testAddress,
    arbitrumProvider
  )
  console.log('Portfolio balance xBTC3x: ', portfolioItem.quantity)
  t.true(Number(portfolioItem.quantity) > 0)
})

test('Get xETH3x portfolio balance', async (t) => {
  const portfolioItem = await getPortfolioItemXAssetLev(
    X_ETH_3X,
    testAddress,
    arbitrumProvider
  )
  console.log('Portfolio balance xETH3x: ', portfolioItem.quantity)
  t.true(Number(portfolioItem.quantity) > 0)
})

/*test('Get xLINK3x portfolio balance', async (t) => {
  const portfolioItem = await getPortfolioItemXAssetLev(
    X_LINK_3X,
    testAddress,
    arbitrumProvider
  )
  console.log('Portfolio balance xLINK3x: ', portfolioItem.quantity)
  t.true(Number(portfolioItem.quantity) > 0)
})*/
