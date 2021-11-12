import { X_KNC_A, X_KNC_B } from '@xtoken/abis'
import test from 'ava'

import { provider } from '../../constants.spec'

import { getXKncContracts } from './helper'
import { getXKncPrices } from './prices'

test('Get xKNCa prices', async (t) => {
  const { xkncContract } = await getXKncContracts(X_KNC_A, provider)

  const { aum, priceEth, priceUsd } = await getXKncPrices(xkncContract)

  console.log('xKNCa aum:', aum)
  console.log('xKNCa priceEth:', priceEth)
  console.log('xKNCa priceUsd:', priceUsd)
  t.true(aum > 0)
  t.true(priceEth > 0)
  t.true(priceUsd > 0)
})

test('Get xKNCb prices', async (t) => {
  const { xkncContract } = await getXKncContracts(X_KNC_B, provider)

  const { aum, priceEth, priceUsd } = await getXKncPrices(xkncContract)

  console.log('xKNCb aum:', aum)
  console.log('xKNCb priceEth:', priceEth)
  console.log('xKNCb priceUsd:', priceUsd)
  t.true(aum > 0)
  t.true(priceEth > 0)
  t.true(priceUsd > 0)
})
