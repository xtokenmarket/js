import test from 'ava'
import { X_INCH_A, X_INCH_B } from 'xtoken-abis'

import { provider } from '../../constants.spec'

import { getXInchContracts } from './helper'
import { getXInchPrices } from './prices'

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

test('Get xINCHb prices', async (t) => {
  const {
    kyberProxyContract,
    network,
    xinchContract,
  } = await getXInchContracts(X_INCH_B, provider)
  const { chainId } = network

  const { aum, priceEth, priceUsd } = await getXInchPrices(
    xinchContract,
    kyberProxyContract,
    chainId
  )

  console.log('xINCHb aum:', aum)
  console.log('xINCHb priceEth:', priceEth)
  console.log('xINCHb priceUsd:', priceUsd)
  t.true(aum > 0)
  t.true(priceEth > 0)
  t.true(priceUsd > 0)
})
