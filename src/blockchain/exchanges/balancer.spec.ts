import test from 'ava'
import { ethers } from 'ethers'
import { BUY, ETH, SELL, X_AAVE_A } from 'xtoken-abis'

import { getBalancerEstimatedQuantity } from './balancer'

const provider = new ethers.providers.InfuraProvider(
  'homestead',
  '645c2c65dd8f4be18a50a0bf011bab85'
)

test('Calculate expected quantity on mint of xAAVEa on Balancer', async (t) => {
  const expectedQty = await getBalancerEstimatedQuantity(
    ETH,
    X_AAVE_A,
    '1',
    BUY,
    provider
  )
  console.log('[Balancer] Expected xAAVEa qty for 1 ETH:', expectedQty)
  t.is(typeof expectedQty, 'string')
})

test('Calculate expected quantity on burn of xAAVEa on Balancer', async (t) => {
  const expectedQty = await getBalancerEstimatedQuantity(
    X_AAVE_A,
    X_AAVE_A,
    '1000',
    SELL,
    provider
  )
  console.log('[Balancer] Expected AAVE qty for 1000 xAAVEa:', expectedQty)
  t.is(typeof expectedQty, 'string')
})
