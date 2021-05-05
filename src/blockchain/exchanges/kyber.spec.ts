import { BUY, ETH, SELL, X_KNC_A } from '@xtoken/abis'
import test from 'ava'

import { provider, testAddress } from '../../constants.spec'

import { getKyberEstimatedQuantity, getKyberPortfolioItem } from './kyber'

test('Calculate expected quantity on burn of xKNCa on Kyber', async (t) => {
  const expectedQty = await getKyberEstimatedQuantity(
    ETH,
    X_KNC_A,
    '1000',
    SELL,
    provider
  )
  console.log('[Kyber] Expected ETH qty for 1000 xKNCa:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate expected quantity on burn of xKNCa with KNC on Kyber', async (t) => {
  const expectedQty = await getKyberEstimatedQuantity(
    X_KNC_A,
    X_KNC_A,
    '1000',
    SELL,
    provider
  )
  console.log('[Kyber] Expected KNC qty for 1000 xKNCa:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate expected quantity on mint of xKNCa on Kyber', async (t) => {
  const expectedQty = await getKyberEstimatedQuantity(
    ETH,
    X_KNC_A,
    '1',
    BUY,
    provider
  )
  console.log('[Kyber] Expected xKNCa qty for 1 ETH:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate expected quantity on mint of xKNCa with KNC on Kyber', async (t) => {
  const expectedQty = await getKyberEstimatedQuantity(
    X_KNC_A,
    X_KNC_A,
    '100',
    BUY,
    provider
  )
  console.log('[Kyber] Expected xKNCa qty for 100 KNC:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Get Kyber Portfolio of xKNCa', async (t) => {
  const portfolio = await getKyberPortfolioItem(X_KNC_A, testAddress, provider)
  console.log('[Kyber] Portfolio value of xKNCa:', portfolio?.value)
  t.true(Number(portfolio?.value) > 0)
})
