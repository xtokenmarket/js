import { BUY, ETH, SELL, X_KNC_A, X_KNC_B } from '@xtoken/abis'
import test from 'ava'

import { provider, testAddress } from '../../constants.spec'

import {
  getEthUsdcPrice,
  getUniswapEstimatedQuantity,
  getUniswapPortfolioItem,
} from './uniswap'

test('Get ETH<>USDC rate', async (t) => {
  const ethUsdcRate = await getEthUsdcPrice(provider)
  console.log('[Uniswap] ETH<>USDC rate:', ethUsdcRate)
  t.true(Number(ethUsdcRate) > 0)
})

test('Calculate expected quantity on burn of xKNCa on Uniswap', async (t) => {
  const expectedQty = await getUniswapEstimatedQuantity(
    ETH,
    X_KNC_A,
    '1000',
    SELL,
    provider
  )
  console.log('[Uniswap] Expected ETH qty for 1000 xKNCa:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate expected quantity on burn of xKNCa with KNC on Uniswap', async (t) => {
  const expectedQty = await getUniswapEstimatedQuantity(
    X_KNC_A,
    X_KNC_A,
    '1000',
    SELL,
    provider
  )
  console.log('[Uniswap] Expected KNC qty for 1000 xKNCa:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate expected quantity on mint of xKNCa on Uniswap', async (t) => {
  const expectedQty = await getUniswapEstimatedQuantity(
    ETH,
    X_KNC_A,
    '1',
    BUY,
    provider
  )
  console.log('[Uniswap] Expected xKNCa qty for 1 ETH:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate expected quantity on mint of xKNCa with KNC on Uniswap', async (t) => {
  const expectedQty = await getUniswapEstimatedQuantity(
    X_KNC_A,
    X_KNC_A,
    '100',
    BUY,
    provider
  )
  console.log('[Uniswap] Expected xKNCa qty for 100 KNC:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate expected quantity on mint of xKNCb on Uniswap', async (t) => {
  const expectedQty = await getUniswapEstimatedQuantity(
    ETH,
    X_KNC_B,
    '1',
    BUY,
    provider
  )
  console.log('[Uniswap] Expected xKNCb qty for 1 ETH:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate expected quantity on mint of xKNCb with KNC on Uniswap', async (t) => {
  const expectedQty = await getUniswapEstimatedQuantity(
    X_KNC_B,
    X_KNC_B,
    '100',
    BUY,
    provider
  )
  console.log('[Uniswap] Expected xKNCb qty for 100 KNC:', expectedQty)
  t.true(Number(expectedQty) > 0)
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
