import test from 'ava'
import { X_AAVE_A } from 'xtoken-abis'

import { provider, ropstenProvider } from './constants.spec'
import { XToken } from './xToken'

const xToken = new XToken(provider)

test('Initialize xToken with wrong network', async (t) => {
  const xTokenRopsten = new XToken(ropstenProvider)

  try {
    // xAAVEa contract doesn't exist for Ropsten
    await xTokenRopsten.getExpectedQuantityOnBurn(X_AAVE_A, true, '1')
  } catch (e) {
    t.is(e.message, 'Unknown error')
  }
})

test('Burn throws exceeded maximum redeemable error for huge amount', async (t) => {
  try {
    await xToken.burn(X_AAVE_A, true, '1000000')
  } catch (e) {
    t.is(e.message, 'Specified amount exceeds maximum redeemable tokens')
  }
})

test('Expected quantity on burn throws error for invalid amount', async (t) => {
  try {
    await xToken.getExpectedQuantityOnBurn(X_AAVE_A, true, '0')
  } catch (e) {
    t.is(e.message, 'Invalid value for amount')
  }
})

test('Expected quantity on mint throws error for invalid amount', async (t) => {
  try {
    await xToken.getExpectedQuantityOnMint(X_AAVE_A, true, '0')
  } catch (e) {
    t.is(e.message, 'Invalid value for amount')
  }
})
