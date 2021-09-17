import { X_ALPHA_A } from '@xtoken/abis'
import test from 'ava'

import { provider } from '../../constants.spec'

import { getXAlphaContracts } from './helper'
import { getXAlphaPrices } from './prices'

test('Get xALPHAa prices', async (t) => {
  const { kyberProxyContract, xalphaContract } = await getXAlphaContracts(
    X_ALPHA_A,
    provider
  )

  const { aum, priceEth, priceUsd } = await getXAlphaPrices(
    xalphaContract,
    kyberProxyContract
  )

  console.log('xALPHAa aum: ', aum)
  console.log('xALPHAa priceEth: ', priceEth)
  console.log('xALPHAa priceUsd: ', priceUsd)

  t.true(aum > 0)
  t.true(priceEth > 0)
  t.true(priceUsd > 0)
})
