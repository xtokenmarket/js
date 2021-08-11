import test from 'ava'

import { provider, testAddress } from '../../constants.spec'

import { getXtkStakeHistory, getXtkUnstakeHistory } from './history'

test('Gets the correct staking history', async (t) => {
  const stakeHistory = await getXtkStakeHistory(provider, testAddress)
  const expectedFirstEntry = {
    time: 1627025156,
    label: 'Stake',
    value: '10.00',
    txHash:
      '0x6f15911e46bb86df684efe840691212d3cb6ce078eb94db7710d74bf14a7b681',
  }
  const firstEntry = stakeHistory[0]
  t.deepEqual(firstEntry, expectedFirstEntry)
})

test('Gets the correct unstaking history', async (t) => {
  const unstakeHistory = await getXtkUnstakeHistory(provider, testAddress)
  console.log('history:', unstakeHistory)
  const expectedFirstEntry = {
    time: 1627092463,
    label: 'Unstake',
    value: '0.25',
    txHash:
      '0x9f8dc60c58cd3d37f2e8db3acadb3a0f559633dddb280d2a10e077658f301e90',
  }
  const firstEntry = unstakeHistory[0]
  t.deepEqual(firstEntry, expectedFirstEntry)
})
