import {
  LENDING_X_AAVE_A_PRICE,
  LENDING_X_AAVE_B_PRICE,
  LENDING_X_INCH_A_PRICE,
  LENDING_X_INCH_B_PRICE,
  LENDING_X_KNC_A_PRICE,
  LENDING_X_KNC_B_PRICE,
} from '@xtoken/abis'
import test from 'ava'

import { provider } from '../../constants.spec'

import { getLendingPrice } from './price'

test('Get xAAVEa lending price', async (t) => {
  const price = await getLendingPrice(LENDING_X_AAVE_A_PRICE, provider)
  console.log('[Lending] xAAVEa lending price:', price)
  t.true(Number(price) >= 0)
})

test('Get xAAVEb lending price', async (t) => {
  const price = await getLendingPrice(LENDING_X_AAVE_B_PRICE, provider)
  console.log('[Lending] xAAVEb lending price:', price)
  t.true(Number(price) >= 0)
})

test('Get xINCHa lending price', async (t) => {
  const price = await getLendingPrice(LENDING_X_INCH_A_PRICE, provider)
  console.log('[Lending] xINCHa lending price:', price)
  t.true(Number(price) >= 0)
})

test('Get xINCHb lending price', async (t) => {
  const price = await getLendingPrice(LENDING_X_INCH_B_PRICE, provider)
  console.log('[Lending] xINCHb lending price:', price)
  t.true(Number(price) >= 0)
})

test('Get xKNCa lending price', async (t) => {
  const price = await getLendingPrice(LENDING_X_KNC_A_PRICE, provider)
  console.log('[Lending] xKNCa lending price:', price)
  t.true(Number(price) >= 0)
})

test('Get xKNCb lending price', async (t) => {
  const price = await getLendingPrice(LENDING_X_KNC_B_PRICE, provider)
  console.log('[Lending] xKNCb lending price:', price)
  t.true(Number(price) >= 0)
})
