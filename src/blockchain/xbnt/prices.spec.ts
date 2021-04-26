import { X_BNT_A } from '@xtoken/abis'
import test from 'ava'

import { provider } from '../../constants.spec'

import { getXBntContracts } from './helper'
import { getXBntPrices } from './prices'

test('Get xBNTa prices', async (t) => {
  const { kyberProxyContract, xbntContract } = await getXBntContracts(
    X_BNT_A,
    provider
  )

  const { aum, priceEth, priceUsd } = await getXBntPrices(
    xbntContract,
    kyberProxyContract
  )

  console.log('xBNTa aum:', aum)
  console.log('xBNTa priceEth:', priceEth)
  console.log('xBNTa priceUsd:', priceUsd)
  t.true(aum > 0)
  t.true(priceEth > 0)
  t.true(priceUsd > 0)
})
