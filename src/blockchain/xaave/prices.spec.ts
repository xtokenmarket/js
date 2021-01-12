import test from 'ava'
import { ethers } from 'ethers'
import { X_AAVE_A } from 'xtoken-abis'

import { getXAaveContracts } from './helper'
import { getXAavePrices } from './prices'

const provider = new ethers.providers.InfuraProvider(
  'homestead',
  '645c2c65dd8f4be18a50a0bf011bab85'
)

test('Get xAAVEa prices', async (t) => {
  const {
    kyberProxyContract,
    network,
    xaaveContract,
  } = await getXAaveContracts(X_AAVE_A, provider)
  const { chainId } = network

  const { priceEth, priceUsd } = await getXAavePrices(
    xaaveContract,
    kyberProxyContract,
    chainId
  )

  console.log('xAAVEa priceEth:', priceEth)
  console.log('xAAVEa priceUsd:', priceUsd)
  t.is(typeof priceEth, 'number')
  t.is(typeof priceUsd, 'number')
})
