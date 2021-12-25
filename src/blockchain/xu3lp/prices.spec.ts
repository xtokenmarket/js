import {
  X_U3LP_A,
  X_U3LP_B,
  X_U3LP_C,
  X_U3LP_D,
  X_U3LP_E,
  X_U3LP_F,
  X_U3LP_G,
  X_U3LP_H,
} from '@xtoken/abis'
import test from 'ava'

import { arbitrumProvider, provider } from '../../constants.spec'

import { getXU3LPContracts } from './helper'
import { getXU3LPPrices } from './prices'

test('[Mainnet] Get xU3LPa prices', async (t) => {
  const { xu3lpContract } = await getXU3LPContracts(X_U3LP_A, provider)

  const { aum, priceEth, priceUsd } = await getXU3LPPrices(xu3lpContract)

  console.log('[Mainnet] xU3LPa aum:', aum)
  console.log('[Mainnet] xU3LPa priceEth:', priceEth)
  console.log('[Mainnet] xU3LPa priceUsd:', priceUsd)
  t.true(aum > 0)
  t.true(priceEth > 0)
  t.true(priceUsd > 0)
})

test('[Arbitrum] Get xU3LPa prices', async (t) => {
  const { xu3lpContract } = await getXU3LPContracts(X_U3LP_A, arbitrumProvider)

  const { aum, priceEth, priceUsd } = await getXU3LPPrices(xu3lpContract)

  console.log('[Arbitrum] xU3LPa aum:', aum)
  console.log('[Arbitrum] xU3LPa priceEth:', priceEth)
  console.log('[Arbitrum] xU3LPa priceUsd:', priceUsd)
  t.true(aum > 0)
  t.true(priceEth > 0)
  t.true(priceUsd > 0)
})

test('[Mainnet] Get xU3LPb prices', async (t) => {
  const { xu3lpContract } = await getXU3LPContracts(X_U3LP_B, provider)

  const { aum, priceEth, priceUsd } = await getXU3LPPrices(xu3lpContract)

  console.log('[Mainnet] xU3LPb aum:', aum)
  console.log('[Mainnet] xU3LPb priceEth:', priceEth)
  console.log('[Mainnet] xU3LPb priceUsd:', priceUsd)
  t.true(aum > 0)
  t.true(priceEth > 0)
  t.true(priceUsd > 0)
})

test('[Arbitrum] Get xU3LPb prices', async (t) => {
  const { xu3lpContract } = await getXU3LPContracts(X_U3LP_B, arbitrumProvider)

  const { aum, priceEth, priceUsd } = await getXU3LPPrices(xu3lpContract)

  console.log('[Arbitrum] xU3LPb aum:', aum)
  console.log('[Arbitrum] xU3LPb priceEth:', priceEth)
  console.log('[Arbitrum] xU3LPb priceUsd:', priceUsd)
  t.true(aum > 0)
  t.true(priceEth > 0)
  t.true(priceUsd > 0)
})

test('[Mainnet] Get xU3LPc prices', async (t) => {
  const { xu3lpContract } = await getXU3LPContracts(X_U3LP_C, provider)

  const { aum, priceEth, priceUsd } = await getXU3LPPrices(xu3lpContract)

  console.log('[Mainnet] xU3LPc aum:', aum)
  console.log('[Mainnet] xU3LPc priceEth:', priceEth)
  console.log('[Mainnet] xU3LPc priceUsd:', priceUsd)
  t.true(aum > 0)
  t.true(priceEth > 0)
  t.true(priceUsd > 0)
})

test('[Mainnet] Get xU3LPd prices', async (t) => {
  const { xu3lpContract } = await getXU3LPContracts(X_U3LP_D, provider)

  const { aum, priceEth, priceUsd } = await getXU3LPPrices(xu3lpContract)

  console.log('[Mainnet] xU3LPd aum:', aum)
  console.log('[Mainnet] xU3LPd priceEth:', priceEth)
  console.log('[Mainnet] xU3LPd priceUsd:', priceUsd)
  t.true(aum > 0)
  t.true(priceEth > 0)
  t.true(priceUsd > 0)
})

test('[Mainnet] Get xU3LPe prices', async (t) => {
  const { xu3lpContract } = await getXU3LPContracts(X_U3LP_E, provider)

  const { aum, priceBtc, priceUsd } = await getXU3LPPrices(xu3lpContract)

  console.log('[Mainnet] xU3LPe aum:', aum)
  console.log('[Mainnet] xU3LPe priceBtc:', priceBtc)
  console.log('[Mainnet] xU3LPe priceUsd:', priceUsd)
  t.true(aum > 0)
  t.true(Number(priceBtc) > 0)
  t.true(priceUsd > 0)
})

test('[Mainnet] Get xU3LPf prices', async (t) => {
  const { xu3lpContract } = await getXU3LPContracts(X_U3LP_F, provider)

  const { aum, priceEth, priceUsd } = await getXU3LPPrices(xu3lpContract)

  console.log('[Mainnet] xU3LPf aum:', aum)
  console.log('[Mainnet] xU3LPf priceEth:', priceEth)
  console.log('[Mainnet] xU3LPf priceUsd:', priceUsd)
  t.true(aum > 0)
  t.true(priceEth > 0)
  t.true(priceUsd > 0)
})

test('[Mainnet] Get xU3LPg prices', async (t) => {
  const { xu3lpContract } = await getXU3LPContracts(X_U3LP_G, provider)

  const { aum, priceEth, priceUsd } = await getXU3LPPrices(xu3lpContract)

  console.log('[Mainnet] xU3LPg aum:', aum)
  console.log('[Mainnet] xU3LPg priceEth:', priceEth)
  console.log('[Mainnet] xU3LPg priceUsd:', priceUsd)
  t.true(aum > 0)
  t.true(priceEth > 0)
  t.true(priceUsd > 0)
})

test('[Mainnet] Get xU3LPh prices', async (t) => {
  const { xu3lpContract } = await getXU3LPContracts(X_U3LP_H, provider)

  const { aum, priceEth, priceUsd } = await getXU3LPPrices(xu3lpContract)

  console.log('[Mainnet] xU3LPh aum:', aum)
  console.log('[Mainnet] xU3LPh priceEth:', priceEth)
  console.log('[Mainnet] xU3LPh priceUsd:', priceUsd)
  t.true(aum > 0)
  t.true(priceEth > 0)
  t.true(priceUsd > 0)
})
