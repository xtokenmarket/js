import {
  ADDRESSES,
  LENDING_LINK_MARKET,
  LENDING_WBTC_MARKET,
  LENDING_WETH_MARKET,
} from '@xtoken/abis'
import test from 'ava'

import { ChainId } from '../../constants'
import { arbitrumProvider, oneAddress } from '../../constants.spec'

import {
  getAllMarkets,
  getBorrowingCapacity,
  getHealthRatio,
} from './comptroller'

test('Check borrowing capacity for unowned address', async (t) => {
  const borrowingCapacity = await getBorrowingCapacity(
    oneAddress,
    arbitrumProvider
  )
  console.log(
    '[Lending] Borrowing capacity for unowned address:',
    borrowingCapacity
  )
  t.true(Number(borrowingCapacity) === 0)
})

test('Check health ratio for unowned address', async (t) => {
  const healthRatio = await getHealthRatio(oneAddress, arbitrumProvider)
  console.log('[Lending] Health ratio for unowned address:', healthRatio)
  t.true(Number(healthRatio) === 1)
})

test('Check all markets', async (t) => {
  const markets = await getAllMarkets(arbitrumProvider)
  console.log('[Lending] All markets for Comptroller:', markets)
  const expectedMarkets = [
    ADDRESSES[LENDING_WETH_MARKET][ChainId.Arbitrum],
    ADDRESSES[LENDING_WBTC_MARKET][ChainId.Arbitrum],
    ADDRESSES[LENDING_LINK_MARKET][ChainId.Arbitrum],
  ]
  t.deepEqual(markets, expectedMarkets)
})
