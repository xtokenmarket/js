import { X_AAVE_A, X_AAVE_B } from '@xtoken/abis'
import test from 'ava'

import { provider } from '../../constants.spec'

import { getExpectedQuantityOnBurnXAave } from './burn'

test('Calculate AAVE expected quantity on burn of xAAVEa', async (t) => {
  const expectedQty = await getExpectedQuantityOnBurnXAave(
    X_AAVE_A,
    false,
    '1000',
    provider
  )
  console.log('Expected AAVE qty for 1000 xAAVEa:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate ETH expected quantity on burn of xAAVEa', async (t) => {
  const expectedQty = await getExpectedQuantityOnBurnXAave(
    X_AAVE_A,
    true,
    '1000',
    provider
  )
  console.log('Expected ETH qty for 1000 xAAVEa:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate AAVE expected quantity on burn of xAAVEb', async (t) => {
  const expectedQty = await getExpectedQuantityOnBurnXAave(
    X_AAVE_B,
    false,
    '1000',
    provider
  )
  console.log('Expected AAVE qty for 1000 xAAVEb:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate ETH expected quantity on burn of xAAVEb', async (t) => {
  const expectedQty = await getExpectedQuantityOnBurnXAave(
    X_AAVE_B,
    true,
    '1000',
    provider
  )
  console.log('Expected ETH qty for 1000 xAAVEb:', expectedQty)
  t.true(Number(expectedQty) > 0)
})
