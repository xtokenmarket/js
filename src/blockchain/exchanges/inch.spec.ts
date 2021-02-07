import test from 'ava'
import { X_INCH_A, X_INCH_B } from 'xtoken-abis'

import { provider, testAddress } from '../../constants.spec'

import { getInchPortfolioItem } from './inch'

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
