import test from 'ava'
import { X_AAVE_A, X_AAVE_B } from 'xtoken-abis'

import { provider } from '../../constants.spec'

import { getExpectedQuantityOnMintXAave } from './mint'

test('Calculate xAAVEa expected quantity on mint with ETH', async (t) => {
  const expectedQty = await getExpectedQuantityOnMintXAave(
    X_AAVE_A,
    true,
    '1',
    provider
  )
  console.log('Expected xAAVEa qty for 1 ETH:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate xAAVEa expected quantity on mint with AAVE', async (t) => {
  const expectedQty = await getExpectedQuantityOnMintXAave(
    X_AAVE_A,
    false,
    '1',
    provider
  )
  console.log('Expected xAAVEa qty for 1 AAVE:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate xAAVEb expected quantity on mint with ETH', async (t) => {
  const expectedQty = await getExpectedQuantityOnMintXAave(
    X_AAVE_B,
    true,
    '1',
    provider
  )
  console.log('Expected xAAVEb qty for 1 ETH:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate xAAVEb expected quantity on mint with AAVE', async (t) => {
  const expectedQty = await getExpectedQuantityOnMintXAave(
    X_AAVE_B,
    false,
    '1',
    provider
  )
  console.log('Expected xAAVEb qty for 1 AAVE:', expectedQty)
  t.true(Number(expectedQty) > 0)
})
