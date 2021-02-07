import test from 'ava'
import { Contract } from 'ethers'
import { KNC, X_KNC_A, X_KNC_B } from 'xtoken-abis'

import { provider } from '../../constants.spec'
import { getContract } from '../utils'

import { getXKncContracts } from './helper'
import { getXKncPrices } from './prices'

test('Get xKNCa prices', async (t) => {
  const { kyberProxyContract, network, xkncContract } = await getXKncContracts(
    X_KNC_A,
    provider
  )
  const { chainId } = network
  const kncContract = getContract(KNC, provider, network)

  const { aum, priceEth, priceUsd } = await getXKncPrices(
    xkncContract,
    kncContract as Contract,
    kyberProxyContract,
    chainId
  )

  console.log('xKNCa aum:', aum)
  console.log('xKNCa priceEth:', priceEth)
  console.log('xKNCa priceUsd:', priceUsd)
  t.true(aum > 0)
  t.true(priceEth > 0)
  t.true(priceUsd > 0)
})

test('Get xKNCb prices', async (t) => {
  const { kyberProxyContract, network, xkncContract } = await getXKncContracts(
    X_KNC_B,
    provider
  )
  const { chainId } = network
  const kncContract = getContract(KNC, provider, network)

  const { aum, priceEth, priceUsd } = await getXKncPrices(
    xkncContract,
    kncContract as Contract,
    kyberProxyContract,
    chainId
  )

  console.log('xKNCb aum:', aum)
  console.log('xKNCb priceEth:', priceEth)
  console.log('xKNCb priceUsd:', priceUsd)
  t.true(aum > 0)
  t.true(priceEth > 0)
  t.true(priceUsd > 0)
})
