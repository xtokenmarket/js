import {
  // LENDING_X_AAVE_A_MARKET,
  // LENDING_X_AAVE_B_MARKET,
  LENDING_X_INCH_A_MARKET,
  // LENDING_X_INCH_B_MARKET,
  // LENDING_X_KNC_A_MARKET,
  // LENDING_X_KNC_B_MARKET,
} from '@xtoken/abis'
import test from 'ava'

import { oneAddress, provider } from '../../constants.spec'

import { getBorrowingLimit, getCollateral } from './market'

/*test('Get borrowing limit for xAAVEa market', async (t) => {
  const borrowingLimit = await getBorrowingLimit(
    LENDING_X_AAVE_A_MARKET,
    provider,
    oneAddress
  )
  console.log('[Lending] xAAVEa Borrowing Limit:', borrowingLimit)
  t.true(Number(borrowingLimit) === 0)
})

test('Get borrowing limit for xAAVEb market', async (t) => {
  const borrowingLimit = await getBorrowingLimit(
    LENDING_X_AAVE_B_MARKET,
    provider,
    oneAddress
  )
  console.log('[Lending] xAAVEb Borrowing Limit:', borrowingLimit)
  t.true(Number(borrowingLimit) === 0)
})*/

test('Get borrowing limit for xINCHa market', async (t) => {
  const borrowingLimit = await getBorrowingLimit(
    LENDING_X_INCH_A_MARKET,
    provider,
    oneAddress
  )
  console.log('[Lending] xINCHa Borrowing Limit:', borrowingLimit)
  t.true(Number(borrowingLimit) === 0)
})

/*test('Get borrowing limit for xINCHb market', async (t) => {
  const borrowingLimit = await getBorrowingLimit(
    LENDING_X_INCH_B_MARKET,
    provider,
    oneAddress
  )
  console.log('[Lending] xINCHb Borrowing Limit:', borrowingLimit)
  t.true(Number(borrowingLimit) === 0)
})

test('Get borrowing limit for xKNCa market', async (t) => {
  const borrowingLimit = await getBorrowingLimit(
    LENDING_X_KNC_A_MARKET,
    provider,
    oneAddress
  )
  console.log('[Lending] xKNCa Borrowing Limit:', borrowingLimit)
  t.true(Number(borrowingLimit) === 0)
})

test('Get borrowing limit for xKNCb market', async (t) => {
  const borrowingLimit = await getBorrowingLimit(
    LENDING_X_KNC_B_MARKET,
    provider,
    oneAddress
  )
  console.log('[Lending] xKNCb Borrowing Limit:', borrowingLimit)
  t.true(Number(borrowingLimit) === 0)
})

test('Get collateral for xAAVEa market', async (t) => {
  const collateral = await getCollateral(
    LENDING_X_AAVE_A_MARKET,
    provider,
    oneAddress
  )
  console.log('[Lending] xAAVEa Collateral:', collateral)
  t.true(Number(collateral) === 0)
})

test('Get collateral for xAAVEb market', async (t) => {
  const collateral = await getCollateral(
    LENDING_X_AAVE_B_MARKET,
    provider,
    oneAddress
  )
  console.log('[Lending] xAAVEb Collateral:', collateral)
  t.true(Number(collateral) === 0)
})*/

test('Get collateral for xINCHa market', async (t) => {
  const collateral = await getCollateral(
    LENDING_X_INCH_A_MARKET,
    provider,
    oneAddress
  )
  console.log('[Lending] xINCHa Collateral:', collateral)
  t.true(Number(collateral) === 0)
})

/*test('Get collateral for xINCHb market', async (t) => {
  const collateral = await getCollateral(
    LENDING_X_INCH_B_MARKET,
    provider,
    oneAddress
  )
  console.log('[Lending] xINCHb Collateral:', collateral)
  t.true(Number(collateral) === 0)
})

test('Get collateral for xKNCa market', async (t) => {
  const collateral = await getCollateral(
    LENDING_X_KNC_A_MARKET,
    provider,
    oneAddress
  )
  console.log('[Lending] xKNCa Collateral:', collateral)
  t.true(Number(collateral) === 0)
})

test('Get collateral for xKNCb market', async (t) => {
  const collateral = await getCollateral(
    LENDING_X_KNC_B_MARKET,
    provider,
    oneAddress
  )
  console.log('[Lending] xKNCb Collateral:', collateral)
  t.true(Number(collateral) === 0)
})

test('Get lending markets info', async (t) => {
  const lendingMarkets = await getLendingMarkets(provider)
  console.log('[Lending] Market info:', JSON.stringify(lendingMarkets))
  t.true(lendingMarkets.length === 6)
})*/
