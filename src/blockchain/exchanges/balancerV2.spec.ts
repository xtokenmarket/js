import { BUY, ETH, SELL, X_SNX_A } from '@xtoken/abis'
import test from 'ava'

import { provider, testAddress } from '../../constants.spec'

import {
  getBalancerV2EstimatedQuantity,
  getBalancerV2PortfolioItem,
} from './balancerV2'

test('Calculate expected quantity on burn of xSNXa on Balancer V2', async (t) => {
  const expectedQty = await getBalancerV2EstimatedQuantity(
    ETH,
    X_SNX_A,
    '10',
    SELL,
    provider
  )
  console.log('[BalancerV2] Expected ETH qty for 10 xSNXa:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate expected quantity on mint of xSNXa on Balancer V2', async (t) => {
  const expectedQty = await getBalancerV2EstimatedQuantity(
    ETH,
    X_SNX_A,
    '0.005',
    BUY,
    provider
  )
  console.log('[BalancerV2] Expected xSNXa qty for 0.005 ETH:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Get Balancer V2 Portfolio of xSNXa', async (t) => {
  const portfolio = await getBalancerV2PortfolioItem(
    X_SNX_A,
    testAddress,
    provider
  )
  console.log('[BalancerV2] Portfolio value of xSNXa:', portfolio?.value)
  t.true(Number(portfolio?.value) > 0)
})
