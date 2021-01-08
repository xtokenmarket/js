import test from 'ava'
import { ethers } from 'ethers'
import { BUY, ETH, X_AAVE_A } from 'xtoken-abis'

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
  console.log('Expected xAAVEa qty for 1 ETH:', expectedQty)
  t.is(typeof expectedQty, 'string')
})
