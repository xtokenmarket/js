import test from 'ava'

import { provider } from '../../constants.spec'

import { Markets } from './helper'
import { getBorrowingLimit, getCollateral } from './market'

const oneAddress = '0x0000000000000000000000000000000000000001'

test('Check Borrowing limit for xAAVEa market', async (t) => {
  const borrowingLimit = await getBorrowingLimit(
    Markets.xAAVEaMarket,
    provider,
    oneAddress
  )
  console.log('[Lending] xAAVEa Borrowing Limit:', borrowingLimit.toString())
  t.true(borrowingLimit.eq(0))
})

test('Check Borrowing limit for xAAVEb market', async (t) => {
  const borrowingLimit = await getBorrowingLimit(
    Markets.xAAVEbMarket,
    provider,
    oneAddress
  )
  console.log('[Lending] xAAVEb Borrowing Limit:', borrowingLimit.toString())
  t.true(borrowingLimit.eq(0))
})

test('Check Borrowing limit for xINCHa market', async (t) => {
  const borrowingLimit = await getBorrowingLimit(
    Markets.xINCHaMarket,
    provider,
    oneAddress
  )
  console.log('[Lending] xINCHa Borrowing Limit:', borrowingLimit.toString())
  t.true(borrowingLimit.eq(0))
})

test('Check Borrowing limit for xINCHb market', async (t) => {
  const borrowingLimit = await getBorrowingLimit(
    Markets.xINCHbMarket,
    provider,
    oneAddress
  )
  console.log('[Lending] xINCHb Borrowing Limit:', borrowingLimit.toString())
  t.true(borrowingLimit.eq(0))
})

test('Check Borrowing limit for xKNCa market', async (t) => {
  const borrowingLimit = await getBorrowingLimit(
    Markets.xKNCaMarket,
    provider,
    oneAddress
  )
  console.log('[Lending] xKNCa Borrowing Limit:', borrowingLimit.toString())
  t.true(borrowingLimit.eq(0))
})

test('Check Borrowing limit for xKNCb market', async (t) => {
  const borrowingLimit = await getBorrowingLimit(
    Markets.xKNCbMarket,
    provider,
    oneAddress
  )
  console.log('[Lending] xKNCb Borrowing Limit:', borrowingLimit.toString())
  t.true(borrowingLimit.eq(0))
})

test('Check collateral for xAAVEa market', async (t) => {
  const collateral = await getCollateral(
    Markets.xAAVEaMarket,
    provider,
    oneAddress
  )
  console.log('[Lending] xAAVEa Collateral:', collateral.toString())
  t.true(collateral.eq(0))
})

test('Check collateral for xAAVEb market', async (t) => {
  const collateral = await getCollateral(
    Markets.xAAVEbMarket,
    provider,
    oneAddress
  )
  console.log('[Lending] xAAVEb Collateral:', collateral.toString())
  t.true(collateral.eq(0))
})

test('Check collateral for xINCHa market', async (t) => {
  const collateral = await getCollateral(
    Markets.xINCHaMarket,
    provider,
    oneAddress
  )
  console.log('[Lending] xINCHa Collateral:', collateral.toString())
  t.true(collateral.eq(0))
})

test('Check collateral for xINCHb market', async (t) => {
  const collateral = await getCollateral(
    Markets.xINCHbMarket,
    provider,
    oneAddress
  )
  console.log('[Lending] xINCHb Collateral:', collateral.toString())
  t.true(collateral.eq(0))
})

test('Check collateral for xKNCa market', async (t) => {
  const collateral = await getCollateral(
    Markets.xKNCaMarket,
    provider,
    oneAddress
  )
  console.log('[Lending] xKNCa Collateral:', collateral.toString())
  t.true(collateral.eq(0))
})

test('Check collateral for xKNCb market', async (t) => {
  const collateral = await getCollateral(
    Markets.xKNCbMarket,
    provider,
    oneAddress
  )
  console.log('[Lending] xKNCb Collateral:', collateral.toString())
  t.true(collateral.eq(0))
})
