import test from 'ava'
import { BigNumber } from 'ethers'
import { formatEther } from 'ethers/lib/utils'
import {
  ADDRESSES,
  ETH,
  X_AAVE_A,
  X_AAVE_A_BALANCER_POOL,
  X_KNC_A,
} from 'xtoken-abis'

import { Exchange } from '../constants'
import { provider } from '../constants.spec'

import { getBalancerPoolAddress, getExpectedRate } from './utils'
import { getXAaveContracts } from './xaave/helper'

test('Get BalancerPool address for xAAVEa', (t) => {
  const balancerPoolAddress = getBalancerPoolAddress(X_AAVE_A, 1)
  t.is(balancerPoolAddress, ADDRESSES[X_AAVE_A_BALANCER_POOL][1])
})

test('Get BalancerPool address for xKNCa', (t) => {
  const balancerPoolAddress = getBalancerPoolAddress(X_KNC_A, 1)
  t.is(balancerPoolAddress, null)
})

test('Expected rate for xAAVEa', async (t) => {
  const { kyberProxyContract, tokenContract } = await getXAaveContracts(
    X_AAVE_A,
    provider
  )
  const expectedRate = formatEther(
    await getExpectedRate(
      Exchange.INCH,
      kyberProxyContract,
      tokenContract.address,
      ADDRESSES[ETH] as string,
      BigNumber.from('1000')
    )
  )

  console.log('Expected rate for xAAVEa:', expectedRate)
  t.true(Number(expectedRate) > 0)
})
