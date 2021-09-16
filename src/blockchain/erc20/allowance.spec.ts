import { AAVE, ADDRESSES, X_AAVE_A } from '@xtoken/abis'
import test from 'ava'

import { provider, testAddress } from '../../constants.spec'

import { getTokenAllowance } from './allowance'

test('Get AAVE token allowance of xAAVEa for test address', async (t) => {
  const tokenAllowance = await getTokenAllowance(
    AAVE,
    testAddress,
    ADDRESSES[X_AAVE_A][1],
    provider
  )
  console.log(
    'AAVE Token allowance of xAAVEa for test address:',
    tokenAllowance
  )
  t.true(Number(tokenAllowance) > 0)
})
