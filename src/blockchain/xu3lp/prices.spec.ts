import { X_U3LP_A, X_U3LP_B, X_U3LP_C, X_U3LP_D } from '@xtoken/abis'
import test from 'ava'

import { provider } from '../../constants.spec'

import { getXU3LPContracts } from './helper'
import { getXU3LPPrices } from './prices'

test('Get xU3LPa prices', async (t) => {
  const { kyberProxyContract, xu3lpContract } = await getXU3LPContracts(
    X_U3LP_A,
    provider
  )

  const { aum, priceEth, priceUsd } = await getXU3LPPrices(
    xu3lpContract,
    kyberProxyContract
  )

  console.log('xU3LPa aum:', aum)
  console.log('xU3LPa priceEth:', priceEth)
  console.log('xU3LPa priceUsd:', priceUsd)
  t.true(aum > 0)
  t.true(priceEth > 0)
  t.true(priceUsd > 0)
})

test('Get xU3LPb prices', async (t) => {
  const { kyberProxyContract, xu3lpContract } = await getXU3LPContracts(
    X_U3LP_B,
    provider
  )

  const { aum, priceEth, priceUsd } = await getXU3LPPrices(
    xu3lpContract,
    kyberProxyContract
  )

  console.log('xU3LPb aum:', aum)
  console.log('xU3LPb priceEth:', priceEth)
  console.log('xU3LPb priceUsd:', priceUsd)
  t.true(aum > 0)
  t.true(priceEth > 0)
  t.true(priceUsd > 0)
})

test('Get xU3LPc prices', async (t) => {
  const { kyberProxyContract, xu3lpContract } = await getXU3LPContracts(
    X_U3LP_C,
    provider
  )

  const { aum, priceEth, priceUsd } = await getXU3LPPrices(
    xu3lpContract,
    kyberProxyContract
  )

  console.log('xU3LPc aum:', aum)
  console.log('xU3LPc priceEth:', priceEth)
  console.log('xU3LPc priceUsd:', priceUsd)
  t.true(aum > 0)
  t.true(priceEth > 0)
  t.true(priceUsd > 0)
})

test('Get xU3LPd prices', async (t) => {
  const { kyberProxyContract, xu3lpContract } = await getXU3LPContracts(
    X_U3LP_D,
    provider
  )

  const { aum, priceEth, priceUsd } = await getXU3LPPrices(
    xu3lpContract,
    kyberProxyContract
  )

  console.log('xU3LPd aum:', aum)
  console.log('xU3LPd priceEth:', priceEth)
  console.log('xU3LPd priceUsd:', priceUsd)
  t.true(aum > 0)
  t.true(priceEth > 0)
  t.true(priceUsd > 0)
})
