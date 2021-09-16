import test from 'ava'

import { oneAddress, provider } from '../../constants.spec'

import {
  getAllMarkets,
  getBorrowingCapacity,
  getHealthRatio,
} from './comptroller'

test('Check borrowing capacity for unowned address', async (t) => {
  const borrowingCapacity = await getBorrowingCapacity(oneAddress, provider)
  console.log(
    '[Lending] Borrowing capacity for unowned address:',
    borrowingCapacity
  )
  t.true(Number(borrowingCapacity) === 0)
})

test('Check health ratio for unowned address', async (t) => {
  const healthRatio = await getHealthRatio(oneAddress, provider)
  console.log('[Lending] Health ratio for unowned address:', healthRatio)
  t.true(Number(healthRatio) === 1)
})

test('Check all markets', async (t) => {
  const markets = await getAllMarkets(provider)
  console.log('[Lending] All markets for Comptroller:', markets)
  const expectedMarkets = [
    '0x652cC6Ed5b308A8D92f85D4707d84785D66F437D',
    '0x5191F60315DA4E1F8e4dF3825801576B71Ac22db',
    '0x1C6b58C03880F952c91c3628AEc63a48A8422b70',
    '0x56F9261EcA26d055A2ca5aa5a6D25A8648C96801',
    '0xf0cB06e260AeE7b9d75F2950E1dc83e94e89fCbD',
    '0xbC0D79a2697271f793d082aBED8de5E248c5228B',
  ]
  t.deepEqual(markets, expectedMarkets)
})
