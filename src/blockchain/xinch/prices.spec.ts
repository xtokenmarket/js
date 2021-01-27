import test from 'ava'
import { ethers } from 'ethers'
import { X_INCH_A } from 'xtoken-abis'

import { getXInchContracts } from './helper'
import { getXInchPrices } from './prices'

const provider = new ethers.providers.InfuraProvider(
  'homestead',
  '645c2c65dd8f4be18a50a0bf011bab85'
)

test('Get xINCHa prices', async (t) => {
  const {
    kyberProxyContract,
    network,
    xinchContract,
  } = await getXInchContracts(X_INCH_A, provider)
  const { chainId } = network

  const { aum, priceEth, priceUsd } = await getXInchPrices(
    xinchContract,
    kyberProxyContract,
    chainId
  )

  console.log('xINCHa aum:', aum)
  console.log('xINCHa priceEth:', priceEth)
  console.log('xINCHa priceUsd:', priceUsd)
  t.true(aum > 0)
  t.true(priceEth > 0)
  t.true(priceUsd > 0)
})
