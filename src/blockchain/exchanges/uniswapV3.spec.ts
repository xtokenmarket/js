import { BUY, X_AAVE_A } from '@xtoken/abis'
import test from 'ava'

import { provider } from '../../constants.spec'

import { getUniswapV3EstimatedQty } from './uniswapV3'

test('Calculate expected quantity on mint of xAAVEa on UniswapV3', async (t) => {
  const expectedQty = await getUniswapV3EstimatedQty(
    X_AAVE_A,
    '0.00001',
    BUY,
    provider
  )
  console.log('[UniswapV3] Expected xAAVEa qty for 0.00001 AAVE:', expectedQty)
  t.true(Number(expectedQty) > 0)
})
