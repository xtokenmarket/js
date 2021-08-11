import test from 'ava'

import { provider } from '../../constants.spec'

import { getXtkStakeHistory } from './history'

const TEST_ACCOUNT = '0x9A0BF2A61Bba95117Ad2EF55830990F43eD3ea1B'

test('Gets the correct staking history', async (t) => {
  const stakeHistory = await getXtkStakeHistory(provider, TEST_ACCOUNT)
  console.log('stakeHistory:', stakeHistory)
  // t.true(Number(expectedQty) > 0)
  t.true(stakeHistory[0] === null)
})
