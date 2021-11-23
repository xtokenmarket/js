import test from 'ava'

import { provider } from '../../constants.spec'

import { getXSnxContracts } from './helper'
import { getXSnxPrices } from './prices'

test('Get xSNXa prices', async (t) => {
  const { xsnxContract } = await getXSnxContracts(provider)

  const { aum, priceEth, priceUsd } = await getXSnxPrices(xsnxContract)

  console.log('xSNXa aum:', aum)
  console.log('xSNXa priceEth:', priceEth)
  console.log('xSNXa priceUsd:', priceUsd)
  t.true(aum > 0)
  t.true(priceEth > 0)
  t.true(priceUsd > 0)
})
