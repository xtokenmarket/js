import { X_AAVE_A, X_AAVE_B } from '@xtoken/abis'
import test from 'ava'

import { provider } from '../../constants.spec'

import { getXAaveContracts } from './helper'
import { getXAavePrices } from './prices'

test('Get xAAVEa prices', async (t) => {
  const {
    kyberProxyContract,
    network,
    xaaveContract,
  } = await getXAaveContracts(X_AAVE_A, provider)
  const { chainId } = network

  const { aum, priceEth, priceUsd } = await getXAavePrices(
    xaaveContract,
    kyberProxyContract,
    chainId
  )

  console.log('xAAVEa aum:', aum)
  console.log('xAAVEa priceEth:', priceEth)
  console.log('xAAVEa priceUsd:', priceUsd)
  t.true(aum > 0)
  t.true(priceEth > 0)
  t.true(priceUsd > 0)
})

test('Get xAAVEb prices', async (t) => {
  const {
    kyberProxyContract,
    network,
    xaaveContract,
  } = await getXAaveContracts(X_AAVE_B, provider)
  const { chainId } = network

  const { aum, priceEth, priceUsd } = await getXAavePrices(
    xaaveContract,
    kyberProxyContract,
    chainId
  )

  console.log('xAAVEb aum:', aum)
  console.log('xAAVEb priceEth:', priceEth)
  console.log('xAAVEb priceUsd:', priceUsd)
  t.true(aum > 0)
  t.true(priceEth > 0)
  t.true(priceUsd > 0)
})
