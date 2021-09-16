import { X_AAVE_A } from '@xtoken/abis'
import test from 'ava'

import { provider } from '../../constants.spec'

import { getTokenSupply } from './supply'

test('Get token supply of xAAVEa', async (t) => {
  const tokenSupply = await getTokenSupply(X_AAVE_A, provider)
  console.log('Token supply of xAAVEa:', tokenSupply)
  t.true(Number(tokenSupply) > 0)
})
