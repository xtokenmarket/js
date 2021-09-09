import { AAVE_X_AAVE_A_CLR, XTK_ETH_CLR } from '@xtoken/abis'
import test from 'ava'

import { provider } from '../../constants.spec'

import {
  getExpectedQuantityOnMintXAssetCLR,
  getPoolRatioXAssetCLR,
} from './mint'

test(`Calculate ${AAVE_X_AAVE_A_CLR} expected quantity on mint with AAVE`, async (t) => {
  const { expectedQty } = await getExpectedQuantityOnMintXAssetCLR(
    AAVE_X_AAVE_A_CLR,
    0,
    '10',
    provider
  )
  console.log(`Expected ${AAVE_X_AAVE_A_CLR} qty for 10 AAVE:`, expectedQty)
  t.true(Number(expectedQty) > 0)
})

test(`Calculate ${AAVE_X_AAVE_A_CLR} expected quantity on mint with xAAVEa`, async (t) => {
  const { expectedQty } = await getExpectedQuantityOnMintXAssetCLR(
    AAVE_X_AAVE_A_CLR,
    1,
    '1000',
    provider
  )
  console.log(`Expected ${AAVE_X_AAVE_A_CLR} qty for 1000 xAAVEa:`, expectedQty)
  t.true(Number(expectedQty) > 0)
})

test(`Get ${AAVE_X_AAVE_A_CLR} pool ratio`, async (t) => {
  const poolRatio = await getPoolRatioXAssetCLR(AAVE_X_AAVE_A_CLR, provider)
  console.log(`Pool ratio of ${AAVE_X_AAVE_A_CLR}:`, poolRatio)
  t.true(Number(poolRatio) > 0)
})

test(`Calculate ${XTK_ETH_CLR} expected quantity on mint with XTK`, async (t) => {
  const { expectedQty } = await getExpectedQuantityOnMintXAssetCLR(
    XTK_ETH_CLR,
    0,
    '100',
    provider
  )
  console.log(`Expected ${XTK_ETH_CLR} qty for 100 XTK:`, expectedQty)
  t.true(Number(expectedQty) > 0)
})

test(`Calculate ${XTK_ETH_CLR} expected quantity on mint with ETH`, async (t) => {
  const { expectedQty } = await getExpectedQuantityOnMintXAssetCLR(
    XTK_ETH_CLR,
    1,
    '1',
    provider
  )
  console.log(`Expected ${XTK_ETH_CLR} qty for 1 ETH:`, expectedQty)
  t.true(Number(expectedQty) > 0)
})

test(`Get ${XTK_ETH_CLR} pool ratio`, async (t) => {
  const poolRatio = await getPoolRatioXAssetCLR(XTK_ETH_CLR, provider)
  console.log(`Pool ratio of ${XTK_ETH_CLR}:`, poolRatio)
  t.true(Number(poolRatio) > 0)
})
