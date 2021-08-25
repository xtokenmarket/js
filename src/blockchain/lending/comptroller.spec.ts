import test from 'ava'
import { BigNumber } from 'ethers'

import { provider } from '../../constants.spec'

import {
  getAllMarkets,
  getBorrowingCapacity,
  getHealthRatio,
} from './comptroller'

const oneAddress = '0x0000000000000000000000000000000000000001'

test('Check Borrowing Capacity for address', async (t) => {
  const borrowingCapacity = await getBorrowingCapacity(oneAddress, provider)
  console.log(
    '[Lending] Borrowing capacity for unowned address:',
    borrowingCapacity.toString()
  )
  t.true(Number(borrowingCapacity) == 0)
})

test('Check Health Ratio for address', async (t) => {
  const healthRatio = await getHealthRatio(oneAddress, provider)
  console.log(
    '[Lending] Health Ratio for unowned address:',
    healthRatio.toString()
  )
  const res = healthRatio.eq(BigNumber.from('1000000000000000000'))
  t.true(res)
})

test('Check All Markets', async (t) => {
  const markets = await getAllMarkets(provider)
  console.log('[Lending] All markets for Comptroller:', markets)
  const expectedMarkets = [
    '0x652cC6Ed5b308A8D92f85D4707d84785D66F437D',
    '0x5191F60315DA4E1F8e4dF3825801576B71Ac22db',
    '0x1C6b58C03880F952c91c3628AEc63a48A8422b70',
    '0x56F9261EcA26d055A2ca5aa5a6D25A8648C96801',
    '0xbC0D79a2697271f793d082aBED8de5E248c5228B',
    '0xf0cB06e260AeE7b9d75F2950E1dc83e94e89fCbD',
    '0xbC0D79a2697271f793d082aBED8de5E248c5228B',
  ]
  t.true(arraysEqual(markets, expectedMarkets))
})

function arraysEqual(a: ReadonlyArray<string>, b: ReadonlyArray<string>) {
  if (a === b) return true
  if (a == null || b == null) return false
  if (a.length !== b.length) return false
  // eslint-disable-next-line functional/no-loop-statement, no-var
  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false
  }
  return true
}
