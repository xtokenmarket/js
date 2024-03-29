import { AAVE_X_AAVE_A_CLR, XTK_ETH_CLR } from '@xtoken/abis'
import test from 'ava'

import { provider } from '../../constants.spec'

import { getExpectedQuantityOnBurnXAssetCLR } from './burn'

test(`Calculate expected quantity of AAVE & xAAVEa on burn of ${AAVE_X_AAVE_A_CLR}`, async (t) => {
  const estimateQty = await getExpectedQuantityOnBurnXAssetCLR(
    AAVE_X_AAVE_A_CLR,
    '1000',
    provider
  )
  console.log(
    `Expected qty of AAVE & xAAVEa for 1000 ${AAVE_X_AAVE_A_CLR}:`,
    estimateQty[0],
    estimateQty[1]
  )
  t.true(Number(estimateQty[0]) > 0 && Number(estimateQty[1]) > 0)
})

test(`Calculate expected quantity of XTK & ETH on burn of ${XTK_ETH_CLR}`, async (t) => {
  const estimateQty = await getExpectedQuantityOnBurnXAssetCLR(
    XTK_ETH_CLR,
    '1000',
    provider
  )
  console.log(
    `Expected qty of XTK & ETH for 1000 ${XTK_ETH_CLR}:`,
    estimateQty[0],
    estimateQty[1]
  )
  t.true(Number(estimateQty[0]) > 0 && Number(estimateQty[1]) > 0)
})
