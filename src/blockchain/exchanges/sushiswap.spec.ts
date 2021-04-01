import { BUY, ETH, SELL, X_HEGIC_A, X_HEGIC_B } from '@xtoken/abis'
import test from 'ava'

import { provider, testAddress } from '../../constants.spec'

import {
  getSushiswapEstimatedQuantity,
  getSushiswapPortfolioItem,
} from './sushiswap'

test('Calculate expected quantity on burn of xHEGICa on Sushiswap', async (t) => {
  const expectedQty = await getSushiswapEstimatedQuantity(
    ETH,
    X_HEGIC_A,
    '1000',
    SELL,
    provider
  )
  console.log('[Sushiswap] Expected ETH qty for 1000 xHEGICa:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate expected quantity on burn of xHEGICa with HEGIC on Sushiswap', async (t) => {
  const expectedQty = await getSushiswapEstimatedQuantity(
    X_HEGIC_A,
    X_HEGIC_A,
    '1000',
    SELL,
    provider
  )
  console.log('[Sushiswap] Expected HEGIC qty for 1000 xHEGICa:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate expected quantity on mint of xHEGICa on Sushiswap', async (t) => {
  const expectedQty = await getSushiswapEstimatedQuantity(
    ETH,
    X_HEGIC_A,
    '1',
    BUY,
    provider
  )
  console.log('[Sushiswap] Expected xHEGICa qty for 1 ETH:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate expected quantity on mint of xHEGICa with HEGIC on Sushiswap', async (t) => {
  const expectedQty = await getSushiswapEstimatedQuantity(
    X_HEGIC_A,
    X_HEGIC_A,
    '100',
    BUY,
    provider
  )
  console.log('[Sushiswap] Expected xHEGICa qty for 100 HEGIC:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate expected quantity on mint of xHEGICb on Sushiswap', async (t) => {
  const expectedQty = await getSushiswapEstimatedQuantity(
    ETH,
    X_HEGIC_B,
    '1',
    BUY,
    provider
  )
  console.log('[Sushiswap] Expected xHEGICb qty for 1 ETH:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate expected quantity on mint of xHEGICb with HEGIC on Sushiswap', async (t) => {
  const expectedQty = await getSushiswapEstimatedQuantity(
    X_HEGIC_B,
    X_HEGIC_B,
    '100',
    BUY,
    provider
  )
  console.log('[Sushiswap] Expected xHEGICb qty for 100 HEGIC:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Get Sushiswap Portfolio of xHEGICa', async (t) => {
  const portfolio = await getSushiswapPortfolioItem(
    X_HEGIC_A,
    testAddress,
    provider
  )
  console.log('[Sushiswap] Portfolio value of xHEGICa:', portfolio?.value)
  t.true(Number(portfolio?.value) > 0)
})

test('Get Sushiswap Portfolio of xHEGICb', async (t) => {
  const portfolio = await getSushiswapPortfolioItem(
    X_HEGIC_B,
    testAddress,
    provider
  )
  console.log('[Sushiswap] Portfolio value of xHEGICb:', portfolio?.value)
  t.true(Number(portfolio?.value) > 0)
})
