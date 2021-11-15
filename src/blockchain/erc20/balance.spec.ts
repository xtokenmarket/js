import { X_AAVE_A } from '@xtoken/abis'
import test from 'ava'

import { provider, testAddress } from '../../constants.spec'

import { getTokenBalance } from './balance'

test('Get token balance of xAAVEa for test address', async (t) => {
  const tokenBalance = await getTokenBalance(X_AAVE_A, testAddress, provider)
  console.log('Token balance of xAAVEa for test address:', tokenBalance)
  t.true(Number(tokenBalance) > 0)
})
