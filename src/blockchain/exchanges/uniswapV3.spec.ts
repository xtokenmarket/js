import { BUY, SELL, X_AAVE_A } from '@xtoken/abis'
import test from 'ava'

import { provider } from '../../constants.spec'

import { getEthUsdcPriceUniswapV3, getUniswapV3EstimatedQty } from './uniswapV3'

test('Calculate expected quantity on mint of xAAVEa on UniswapV3', async (t) => {
  const expectedQty = await getUniswapV3EstimatedQty(
    X_AAVE_A,
    X_AAVE_A,
    '1',
    BUY,
    undefined,
    provider
  )
  console.log('[UniswapV3] Expected xAAVEa qty for 1 AAVE:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate expected quantity on burn of xAAVEa on UniswapV3', async (t) => {
  const expectedQty = await getUniswapV3EstimatedQty(
    X_AAVE_A,
    X_AAVE_A,
    '100',
    SELL,
    undefined,
    provider
  )
  console.log('[UniswapV3] Expected AAVE qty for 100 xAAVEa:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Get ETH price in USDC on UniswapV3', async (t) => {
  const expectedQty = await getEthUsdcPriceUniswapV3(provider)
  console.log('[UniswapV3] 1 ETH price in USDC:', expectedQty)
  t.true(Number(expectedQty) > 0)
})
