import {
  LENDING_LINK_PRICE,
  LENDING_WBTC_PRICE,
  LENDING_WETH_PRICE,
} from '@xtoken/abis'
import test from 'ava'

import { arbitrumProvider } from '../../constants.spec'

import { getLendingPrice } from './price'

test('Get WBTC lending price', async (t) => {
  const price = await getLendingPrice(LENDING_WBTC_PRICE, arbitrumProvider)
  console.log('[Lending] WBTC lending price:', price)
  t.true(Number(price) >= 0)
})

test('Get WETH lending price', async (t) => {
  const price = await getLendingPrice(LENDING_WETH_PRICE, arbitrumProvider)
  console.log('[Lending] WETH lending price:', price)
  t.true(Number(price) >= 0)
})

test('Get LINK lending price', async (t) => {
  const price = await getLendingPrice(LENDING_LINK_PRICE, arbitrumProvider)
  console.log('[Lending] LINK lending price:', price)
  t.true(Number(price) >= 0)
})
