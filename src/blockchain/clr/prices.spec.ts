import {
  AAVE_X_AAVE_A_CLR,
  X_ALPHA_A_ALPHA_CLR,
  XTK_ETH_CLR,
} from '@xtoken/abis'
import test from 'ava'

import { provider } from '../../constants.spec'

import { getXAssetCLRContracts } from './helper'
import { getXAssetCLRPrices } from './prices'

test(`Get ${AAVE_X_AAVE_A_CLR} prices`, async (t) => {
  const { xAssetCLRContract } = await getXAssetCLRContracts(
    AAVE_X_AAVE_A_CLR,
    provider
  )

  const { aum, priceEth, priceUsd } = await getXAssetCLRPrices(
    xAssetCLRContract
  )

  console.log(`${AAVE_X_AAVE_A_CLR} aum:`, aum)
  console.log(`${AAVE_X_AAVE_A_CLR} priceEth:`, priceEth)
  console.log(`${AAVE_X_AAVE_A_CLR} priceUsd:`, priceUsd)
  t.true(aum > 0)
  t.true(priceEth > 0)
  t.true(priceUsd > 0)
})

test(`Get ${X_ALPHA_A_ALPHA_CLR} prices`, async (t) => {
  const { xAssetCLRContract } = await getXAssetCLRContracts(
    X_ALPHA_A_ALPHA_CLR,
    provider
  )

  const { aum, priceEth, priceUsd } = await getXAssetCLRPrices(
    xAssetCLRContract
  )

  console.log(`${X_ALPHA_A_ALPHA_CLR} aum:`, aum)
  console.log(`${X_ALPHA_A_ALPHA_CLR} priceEth:`, priceEth)
  console.log(`${X_ALPHA_A_ALPHA_CLR} priceUsd:`, priceUsd)
  t.true(aum > 0)
  t.true(priceEth > 0)
  t.true(priceUsd > 0)
})

test(`Get ${XTK_ETH_CLR} prices`, async (t) => {
  const { xAssetCLRContract } = await getXAssetCLRContracts(
    XTK_ETH_CLR,
    provider
  )

  const { aum, priceEth, priceUsd } = await getXAssetCLRPrices(
    xAssetCLRContract
  )

  console.log(`${XTK_ETH_CLR} aum:`, aum)
  console.log(`${XTK_ETH_CLR} priceEth:`, priceEth)
  console.log(`${XTK_ETH_CLR} priceUsd:`, priceUsd)
  t.true(aum > 0)
  t.true(priceEth > 0)
  t.true(priceUsd > 0)
})
