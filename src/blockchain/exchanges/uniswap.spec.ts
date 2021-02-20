import test from 'ava'
import { X_KNC_A, X_KNC_B } from 'xtoken-abis'

import { provider, testAddress } from '../../constants.spec'

import { getEthUsdcPrice, getUniswapPortfolioItem } from './uniswap'

test('Get ETH<>USDC rate', async (t) => {
  const ethUsdcRate = await getEthUsdcPrice(provider)
  console.log('[Uniswap] ETH<>USDC rate:', ethUsdcRate)
  t.true(Number(ethUsdcRate) > 0)
})

test('Get Uniswap Portfolio of xKNCa', async (t) => {
  const portfolio = await getUniswapPortfolioItem(
    X_KNC_A,
    testAddress,
    provider
  )
  console.log('[Uniswap] Portfolio value of xKNCa:', portfolio?.value)
  t.true(Number(portfolio?.value) > 0)
})

test('Get Uniswap Portfolio of xKNCb', async (t) => {
  const portfolio = await getUniswapPortfolioItem(
    X_KNC_B,
    testAddress,
    provider
  )
  console.log('[Uniswap] Portfolio value of xKNCb:', portfolio?.value)
  t.true(Number(portfolio?.value) > 0)
})
