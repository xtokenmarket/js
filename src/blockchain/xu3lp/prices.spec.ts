import { X_U3LP_A } from '@xtoken/abis'
import test from 'ava'

import { provider } from '../../constants.spec'

import { getXU3LPContracts } from './helper'
import { getXU3LPPrices } from './prices'

test('Get xU3LPa prices', async (t) => {
  const { kyberProxyContract, xu3lpContract } = await getXU3LPContracts(
    X_U3LP_A,
    provider
  )

  const { aum, priceEth, priceUsd } = await getXU3LPPrices(
    xu3lpContract,
    kyberProxyContract
  )

  console.log('xU3LPa aum:', aum)
  console.log('xU3LPa priceEth:', priceEth)
  console.log('xU3LPa priceUsd:', priceUsd)
  t.true(aum > 0)
  t.true(priceEth > 0)
  t.true(priceUsd > 0)
})
