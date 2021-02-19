import test from 'ava'
import { BUY, ETH, SELL, X_INCH_A, X_INCH_B } from 'xtoken-abis'

import { provider, testAddress } from '../../constants.spec'

import { getInchEstimatedQuantity, getInchPortfolioItem } from './inch'

test('Calculate expected quantity on burn of xINCHa for ETH on 1Inch', async (t) => {
  const expectedQty = await getInchEstimatedQuantity(
    ETH,
    X_INCH_A,
    '1000',
    SELL,
    provider
  )
  console.log('[1Inch] Expected ETH qty for 1000 xINCHa:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate expected quantity on burn of xINCHa for INCH on 1Inch', async (t) => {
  const expectedQty = await getInchEstimatedQuantity(
    X_INCH_A,
    X_INCH_A,
    '1000',
    SELL,
    provider
  )
  console.log('[1Inch] Expected INCH qty for 1000 xINCHa:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate expected quantity on mint of xINCHa from ETH on 1Inch', async (t) => {
  const expectedQty = await getInchEstimatedQuantity(
    ETH,
    X_INCH_A,
    '1',
    BUY,
    provider
  )
  console.log('[1Inch] Expected xINCHa qty for 1 ETH:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate expected quantity on mint of xINCHa from INCH on 1Inch', async (t) => {
  const expectedQty = await getInchEstimatedQuantity(
    X_INCH_A,
    X_INCH_A,
    '100',
    BUY,
    provider
  )
  console.log('[1Inch] Expected xINCHa qty for 100 INCH:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Get Inch Portfolio of xINCHa', async (t) => {
  const portfolio = await getInchPortfolioItem(X_INCH_A, testAddress, provider)
  console.log('[1Inch] Portfolio value of xINCHa:', portfolio?.value)
  t.true(Number(portfolio?.value) > 0)
})

test('Get Inch Portfolio of xINCHb', async (t) => {
  const portfolio = await getInchPortfolioItem(X_INCH_B, testAddress, provider)
  console.log('[1Inch] Portfolio value of xINCHb:', portfolio?.value)
  t.true(Number(portfolio?.value) > 0)
})
