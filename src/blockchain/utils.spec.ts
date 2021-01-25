import test from 'ava'
import { BigNumber, ethers } from 'ethers'
import { formatEther } from 'ethers/lib/utils'
import { ADDRESSES, ETH, X_AAVE_A } from 'xtoken-abis'

import { estimateGas, getExpectedRate } from './utils'
import { getXAaveContracts } from './xaave/helper'

const provider = new ethers.providers.InfuraProvider(
  'homestead',
  '645c2c65dd8f4be18a50a0bf011bab85'
)

test('Estimate gas', async (t) => {
  const gas = await estimateGas()
  console.log('Estimated gas:', gas)
  t.is(typeof gas, 'string')
})

test('Expected rate', async (t) => {
  const { kyberProxyContract, tokenContract } = await getXAaveContracts(
    X_AAVE_A,
    provider
  )
  const expectedRate = await getExpectedRate(
    kyberProxyContract,
    tokenContract.address,
    ADDRESSES[ETH] as string,
    BigNumber.from('1000')
  )

  console.log('Expected rate:', formatEther(expectedRate))
  t.is(typeof expectedRate, 'object') // BigNumber
})
