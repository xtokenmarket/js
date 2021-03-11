import { BUY, ETH, SELL, X_AAVE_A, X_AAVE_B, X_SNX_A } from '@xtoken/abis'
import test from 'ava'

import { provider, testAddress } from '../../constants.spec'

import {
  getBalancerEstimatedQuantity,
  getBalancerPortfolioItem,
} from './balancer'

test('Calculate expected quantity on burn of xAAVEa on Balancer', async (t) => {
  const expectedQty = await getBalancerEstimatedQuantity(
    X_AAVE_A,
    X_AAVE_A,
    '1000',
    SELL,
    provider
  )
  console.log('[Balancer] Expected AAVE qty for 1000 xAAVEa:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate expected quantity on mint of xAAVEa on Balancer', async (t) => {
  const expectedQty = await getBalancerEstimatedQuantity(
    ETH,
    X_AAVE_A,
    '1',
    BUY,
    provider
  )
  console.log('[Balancer] Expected xAAVEa qty for 1 ETH:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate expected quantity on burn of xAAVEb on Balancer', async (t) => {
  const expectedQty = await getBalancerEstimatedQuantity(
    X_AAVE_B,
    X_AAVE_B,
    '1000',
    SELL,
    provider
  )
  console.log('[Balancer] Expected AAVE qty for 1000 xAAVEb:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate expected quantity on mint of xAAVEb on Balancer', async (t) => {
  const expectedQty = await getBalancerEstimatedQuantity(
    ETH,
    X_AAVE_B,
    '1',
    BUY,
    provider
  )
  console.log('[Balancer] Expected xAAVEb qty for 1 ETH:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate expected quantity on burn of xSNXa on Balancer', async (t) => {
  const expectedQty = await getBalancerEstimatedQuantity(
    X_SNX_A,
    X_SNX_A,
    '1000',
    SELL,
    provider
  )
  console.log('[Balancer] Expected SNX qty for 1000 xSNXa:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate expected quantity on mint of xSNXa on Balancer', async (t) => {
  const expectedQty = await getBalancerEstimatedQuantity(
    ETH,
    X_SNX_A,
    '1',
    BUY,
    provider
  )
  console.log('[Balancer] Expected xSNXa qty for 1 ETH:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Get Balancer Portfolio of xAAVEa', async (t) => {
  const portfolio = await getBalancerPortfolioItem(
    X_AAVE_A,
    testAddress,
    provider
  )
  console.log('[Balancer] Portfolio value of xAAVEa:', portfolio?.value)
  t.true(Number(portfolio?.value) > 0)
})

test('Get Balancer Portfolio of xAAVEb', async (t) => {
  const portfolio = await getBalancerPortfolioItem(
    X_AAVE_B,
    testAddress,
    provider
  )
  console.log('[Balancer] Portfolio value of xAAVEb:', portfolio?.value)
  t.true(Number(portfolio?.value) > 0)
})

test('Get Balancer Portfolio of xSNXa', async (t) => {
  const portfolio = await getBalancerPortfolioItem(
    X_SNX_A,
    testAddress,
    provider
  )
  console.log('[Balancer] Portfolio value of xSNXa:', portfolio?.value)
  t.true(Number(portfolio?.value) > 0)
})
