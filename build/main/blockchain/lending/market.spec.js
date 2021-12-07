"use strict";
/*import {
  LENDING_X_AAVE_A_MARKET,
  LENDING_X_AAVE_B_MARKET,
  LENDING_X_INCH_A_MARKET,
  LENDING_X_INCH_B_MARKET,
  LENDING_X_KNC_A_MARKET,
  LENDING_X_KNC_B_MARKET,
} from '@xtoken/abis'
import test from 'ava'

import { oneAddress, provider, testAddress } from '../../constants.spec'

import { getBorrowingLimit, getCollateral, getLendingMarkets } from './market'

test('Get borrowing limit for xAAVEa market', async (t) => {
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
})

test('Get borrowing limit for xINCHa market', async (t) => {
  const borrowingLimit = await getBorrowingLimit(
    LENDING_X_INCH_A_MARKET,
    oneAddress,
    provider
  )
  console.log('[Lending] xINCHa Borrowing Limit:', borrowingLimit)
  t.true(Number(borrowingLimit) === 0)
})

test('Get borrowing limit for xINCHb market', async (t) => {
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
})

test('Get collateral for xINCHa market', async (t) => {
  const collateral = await getCollateral(
    LENDING_X_INCH_A_MARKET,
    oneAddress,
    provider
  )
  console.log('[Lending] xINCHa Collateral:', collateral)
  t.true(Number(collateral) === 0)
})

test('Get collateral for xINCHb market', async (t) => {
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

test('Get lending markets', async (t) => {
  const lendingMarkets = await getLendingMarkets(testAddress, provider)
  console.log('[Lending] Markets:', JSON.stringify(lendingMarkets))
  t.true(lendingMarkets.length === 2)
})*/
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2V0LnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi9sZW5kaW5nL21hcmtldC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBMElJIn0=