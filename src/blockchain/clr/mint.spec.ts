import { AAVE_X_AAVE_A_CLR } from '@xtoken/abis'
import test from 'ava'

import { provider } from '../../constants.spec'

import {
  getExpectedQuantityOnMintXAssetCLR,
  getPoolRatioXAssetCLR,
} from './mint'

test(`Calculate ${AAVE_X_AAVE_A_CLR} expected quantity on mint with AAVE`, async (t) => {
  const expectedQty = await getExpectedQuantityOnMintXAssetCLR(
    AAVE_X_AAVE_A_CLR,
    0,
    '10',
    provider
  )
  console.log(`Expected ${AAVE_X_AAVE_A_CLR} qty for 10 AAVE:`, expectedQty)
  t.true(Number(expectedQty) > 0)
})

test(`Calculate ${AAVE_X_AAVE_A_CLR} expected quantity on mint with xAAVEa`, async (t) => {
  const expectedQty = await getExpectedQuantityOnMintXAssetCLR(
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
