import test from 'ava'

import { provider } from '../../constants.spec'

import { Prices } from './helper'
import { getPrice } from './price'

test('Check xAAVEa Price', async (t) => {
  const price = await getPrice(Prices.xAAVEaPrice, provider)
  console.log('[Lending] xAAVEa Price:', price.toString())
  t.true(price.gte(0))
})

test('Check xAAVEb Price', async (t) => {
  const price = await getPrice(Prices.xAAVEbPrice, provider)
  console.log('[Lending] xAAVEb Price:', price.toString())
  t.true(price.gte(0))
})

test('Check xINCHa Price', async (t) => {
  const price = await getPrice(Prices.xINCHaPrice, provider)
  console.log('[Lending] xINCHa Price:', price.toString())
  t.true(price.gte(0))
})

test('Check xINCHb Price', async (t) => {
  const price = await getPrice(Prices.xINCHbPrice, provider)
  console.log('[Lending] xINCHb Price:', price.toString())
  t.true(price.gte(0))
})

test('Check xKNCa Price', async (t) => {
  const price = await getPrice(Prices.xKNCaPrice, provider)
  console.log('[Lending] xKNCa Price:', price.toString())
  t.true(price.gte(0))
})

test('Check xKNCb Price', async (t) => {
  const price = await getPrice(Prices.xKNCbPrice, provider)
  console.log('[Lending] xKNCb Price:', price.toString())
  t.true(price.gte(0))
})
