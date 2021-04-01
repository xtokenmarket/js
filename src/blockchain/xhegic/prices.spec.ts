import { X_HEGIC_A, X_HEGIC_B } from '@xtoken/abis'
import test from 'ava'

import { provider } from '../../constants.spec'

import { getXHegicContracts } from './helper'
import { getXHegicPrices } from './prices'

test('Get xHEGICa prices', async (t) => {
  const {
    kyberProxyContract,
    network,
    xhegicContract,
  } = await getXHegicContracts(X_HEGIC_A, provider)
  const { chainId } = network

  const { aum, priceEth, priceUsd } = await getXHegicPrices(
    xhegicContract,
    kyberProxyContract,
    chainId
  )

  console.log('xHEGICa aum:', aum)
  console.log('xHEGICa priceEth:', priceEth)
  console.log('xHEGICa priceUsd:', priceUsd)
  t.true(aum > 0)
  t.true(priceEth > 0)
  t.true(priceUsd > 0)
})

test('Get xHEGICb prices', async (t) => {
  const {
    kyberProxyContract,
    network,
    xhegicContract,
  } = await getXHegicContracts(X_HEGIC_B, provider)
  const { chainId } = network

  const { aum, priceEth, priceUsd } = await getXHegicPrices(
    xhegicContract,
    kyberProxyContract,
    chainId
  )

  console.log('xHEGICb aum:', aum)
  console.log('xHEGICb priceEth:', priceEth)
  console.log('xHEGICb priceUsd:', priceUsd)
  t.true(aum > 0)
  t.true(priceEth > 0)
  t.true(priceUsd > 0)
})
