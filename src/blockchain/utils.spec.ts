import test from 'ava'

import { estimateGas } from './utils'

test('Estimate gas', async (t) => {
  const gas = await estimateGas()
  console.log('Estimated gas:', gas)
  t.is(typeof gas, 'string')
})
