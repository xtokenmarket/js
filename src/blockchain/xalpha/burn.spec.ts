import { X_ALPHA_A } from '@xtoken/abis'
import test from 'ava'

import { provider } from '../../constants.spec'
// import { ropstenProvider } from '../../constants.spec'

import { getExpectedQuantityOnBurnXAlpha } from './burn'

// TODO: change provider to mainnet when contracts deployed
test('Calculate ALPHA expected quantity on burn of xALPHAa', async (t) => {
  const expectedQty = await getExpectedQuantityOnBurnXAlpha(
    X_ALPHA_A,
    false,
    '1000',
    provider
  )
  console.log('Expected ALPHA qty for 1000 xALPHAa: ', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate ETH expected quantity on burn of xALPHAa', async (t) => {
  const expectedQty = await getExpectedQuantityOnBurnXAlpha(
    X_ALPHA_A,
    true,
    '1000',
    provider
  )
  console.log('Expected ETH qty for 1000 xALPHAa: ', expectedQty)
  t.true(Number(expectedQty) > 0)
})
