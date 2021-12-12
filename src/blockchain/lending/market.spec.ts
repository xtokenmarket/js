import {
  LENDING_LINK_MARKET,
  LENDING_WBTC_MARKET,
  LENDING_WETH_MARKET,
} from '@xtoken/abis'
import test from 'ava'

import { arbitrumProvider, oneAddress, testAddress } from '../../constants.spec'

import { getBorrowingLimit, getCollateral, getLendingMarkets } from './market'

test('Get borrowing limit for WBTC market', async (t) => {
  const borrowingLimit = await getBorrowingLimit(
    LENDING_WBTC_MARKET,
    oneAddress,
    arbitrumProvider
  )
  console.log('[Lending] WBTC Borrowing Limit:', borrowingLimit)
  t.true(Number(borrowingLimit) === 0)
})

test('Get borrowing limit for WETH market', async (t) => {
  const borrowingLimit = await getBorrowingLimit(
    LENDING_WETH_MARKET,
    oneAddress,
    arbitrumProvider
  )
  console.log('[Lending] WETH Borrowing Limit:', borrowingLimit)
  t.true(Number(borrowingLimit) === 0)
})

test('Get borrowing limit for LINK market', async (t) => {
  const borrowingLimit = await getBorrowingLimit(
    LENDING_LINK_MARKET,
    oneAddress,
    arbitrumProvider
  )
  console.log('[Lending] LINK Borrowing Limit:', borrowingLimit)
  t.true(Number(borrowingLimit) === 0)
})

test('Get collateral for WBTC market', async (t) => {
  const collateral = await getCollateral(
    LENDING_WBTC_MARKET,
    oneAddress,
    arbitrumProvider
  )
  console.log('[Lending] WBTC Collateral:', collateral)
  t.true(Number(collateral) === 0)
})

test('Get collateral for WETH market', async (t) => {
  const collateral = await getCollateral(
    LENDING_WETH_MARKET,
    oneAddress,
    arbitrumProvider
  )
  console.log('[Lending] WETH Collateral:', collateral)
  t.true(Number(collateral) === 0)
})

test('Get collateral for LINK market', async (t) => {
  const collateral = await getCollateral(
    LENDING_LINK_MARKET,
    oneAddress,
    arbitrumProvider
  )
  console.log('[Lending] LINK Collateral:', collateral)
  t.true(Number(collateral) === 0)
})

test('Get lending markets', async (t) => {
  const lendingMarkets = await getLendingMarkets(testAddress, arbitrumProvider)
  console.log('[Lending] Total Markets:', lendingMarkets.length)
  t.true(lendingMarkets.length === 3)
})
