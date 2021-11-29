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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcHRyb2xsZXIuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9ibG9ja2NoYWluL2xlbmRpbmcvY29tcHRyb2xsZXIuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLElBQUksTUFBTSxLQUFLLENBQUE7QUFFdEIsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQTtBQUUzRCxPQUFPLEVBQ0wsYUFBYSxFQUNiLG9CQUFvQixFQUNwQixjQUFjLEdBQ2YsTUFBTSxlQUFlLENBQUE7QUFFdEIsSUFBSSxDQUFDLDhDQUE4QyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUMvRCxNQUFNLGlCQUFpQixHQUFHLE1BQU0sb0JBQW9CLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBQzFFLE9BQU8sQ0FBQyxHQUFHLENBQ1QsbURBQW1ELEVBQ25ELGlCQUFpQixDQUNsQixDQUFBO0lBQ0QsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQTtBQUN6QyxDQUFDLENBQUMsQ0FBQTtBQUVGLElBQUksQ0FBQyx3Q0FBd0MsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDekQsTUFBTSxXQUFXLEdBQUcsTUFBTSxjQUFjLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBQzlELE9BQU8sQ0FBQyxHQUFHLENBQUMsNkNBQTZDLEVBQUUsV0FBVyxDQUFDLENBQUE7SUFDdkUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7QUFDbkMsQ0FBQyxDQUFDLENBQUE7QUFFRixJQUFJLENBQUMsbUJBQW1CLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQ3BDLE1BQU0sT0FBTyxHQUFHLE1BQU0sYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQzdDLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0NBQXdDLEVBQUUsT0FBTyxDQUFDLENBQUE7SUFDOUQsTUFBTSxlQUFlLEdBQUc7UUFDdEIsNENBQTRDO1FBQzVDLDRDQUE0QztRQUM1Qyw0Q0FBNEM7UUFDNUMsNENBQTRDO1FBQzVDLDRDQUE0QztRQUM1Qyw0Q0FBNEM7S0FDN0MsQ0FBQTtJQUNELENBQUMsQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLGVBQWUsQ0FBQyxDQUFBO0FBQ3ZDLENBQUMsQ0FBQyxDQUFBIn0=
