import test from 'ava'
import { ethers } from 'ethers'
import { X_AAVE_A } from 'xtoken-abis'

import { XToken } from './xToken'

const provider = new ethers.providers.InfuraProvider(
  'homestead',
  '645c2c65dd8f4be18a50a0bf011bab85'
)

const xToken = new XToken(provider)

test('Expected quantity on mint throws error for invalid amount', async (t) => {
  try {
    await xToken.getExpectedQuantityOnMint(X_AAVE_A, true, '0')
  } catch (e) {
    t.is(e.message, 'Invalid value for amount')
  }
})

test('Expected quantity on burn throws error for invalid amount', async (t) => {
  try {
    await xToken.getExpectedQuantityOnBurn(X_AAVE_A, true, '0')
  } catch (e) {
    t.is(e.message, 'Invalid value for amount')
  }
})

test('Initialize xToken with wrong network', async (t) => {
  const ropstenProvider = new ethers.providers.InfuraProvider(
    'ropsten',
    '645c2c65dd8f4be18a50a0bf011bab85'
  )

  const xTokenRopsten = new XToken(ropstenProvider)

  try {
    // xAAVEa contract doesn't exist for Ropsten
    await xTokenRopsten.getExpectedQuantityOnBurn(X_AAVE_A, true, '1')
  } catch (e) {
    console.log(e.message)
    t.is(e.message, 'Unknown error')
  }
})
