import test from 'ava'
import { Contract, ethers } from 'ethers'
import { KNC, X_KNC_A } from 'xtoken-abis'

import { getContract } from '../utils'

import { getXKncContracts } from './helper'
import { getXKncPrices } from './prices'

const provider = new ethers.providers.InfuraProvider(
  'homestead',
  '645c2c65dd8f4be18a50a0bf011bab85'
)

test('Get xKNCa prices', async (t) => {
  const { kyberProxyContract, network, xkncContract } = await getXKncContracts(
    X_KNC_A,
    provider
  )
  const { chainId } = network
  const kncContract = getContract(KNC, provider, network)

  const { priceEth, priceUsd } = await getXKncPrices(
    xkncContract,
    kncContract as Contract,
    kyberProxyContract,
    chainId
  )

  console.log('xKNCa priceEth:', priceEth)
  console.log('xKNCa priceUsd:', priceUsd)
  t.is(typeof priceEth, 'number')
  t.is(typeof priceUsd, 'number')
})
