import { BUY, ETH, SELL, X_SNX_A } from '@xtoken/abis'
import test from 'ava'
import { provider, testAddress } from '../../constants.spec'
import {
  getBalancerV2EstimatedQuantity,
  getBalancerV2PortfolioItem,
} from './balancerV2'
test('Calculate expected quantity on burn of xSNXa on Balancer V2', async (t) => {
  const expectedQty = await getBalancerV2EstimatedQuantity(
    ETH,
    X_SNX_A,
    '10',
    SELL,
    provider
  )
  console.log('[BalancerV2] Expected ETH qty for 10 xSNXa:', expectedQty)
  t.true(Number(expectedQty) > 0)
})
test('Calculate expected quantity on mint of xSNXa on Balancer V2', async (t) => {
  const expectedQty = await getBalancerV2EstimatedQuantity(
    ETH,
    X_SNX_A,
    '0.005',
    BUY,
    provider
  )
  console.log('[BalancerV2] Expected xSNXa qty for 0.005 ETH:', expectedQty)
  t.true(Number(expectedQty) > 0)
})
test('Get Balancer V2 Portfolio of xSNXa', async (t) => {
  const portfolio = await getBalancerV2PortfolioItem(
    X_SNX_A,
    testAddress,
    provider
  )
  console.log('[BalancerV2] Portfolio value of xSNXa:', portfolio?.value)
  t.true(Number(portfolio?.value) > 0)
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFsYW5jZXJWMi5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4vZXhjaGFuZ2VzL2JhbGFuY2VyVjIuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sY0FBYyxDQUFBO0FBQ3RELE9BQU8sSUFBSSxNQUFNLEtBQUssQ0FBQTtBQUV0QixPQUFPLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxNQUFNLHNCQUFzQixDQUFBO0FBRTVELE9BQU8sRUFDTCw4QkFBOEIsRUFDOUIsMEJBQTBCLEdBQzNCLE1BQU0sY0FBYyxDQUFBO0FBRXJCLElBQUksQ0FBQyw2REFBNkQsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDOUUsTUFBTSxXQUFXLEdBQUcsTUFBTSw4QkFBOEIsQ0FDdEQsR0FBRyxFQUNILE9BQU8sRUFDUCxJQUFJLEVBQ0osSUFBSSxFQUNKLFFBQVEsQ0FDVCxDQUFBO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyw2Q0FBNkMsRUFBRSxXQUFXLENBQUMsQ0FBQTtJQUN2RSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUNqQyxDQUFDLENBQUMsQ0FBQTtBQUVGLElBQUksQ0FBQyw2REFBNkQsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDOUUsTUFBTSxXQUFXLEdBQUcsTUFBTSw4QkFBOEIsQ0FDdEQsR0FBRyxFQUNILE9BQU8sRUFDUCxPQUFPLEVBQ1AsR0FBRyxFQUNILFFBQVEsQ0FDVCxDQUFBO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnREFBZ0QsRUFBRSxXQUFXLENBQUMsQ0FBQTtJQUMxRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUNqQyxDQUFDLENBQUMsQ0FBQTtBQUVGLElBQUksQ0FBQyxvQ0FBb0MsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDckQsTUFBTSxTQUFTLEdBQUcsTUFBTSwwQkFBMEIsQ0FDaEQsT0FBTyxFQUNQLFdBQVcsRUFDWCxRQUFRLENBQ1QsQ0FBQTtJQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsd0NBQXdDLEVBQUUsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFBO0lBQ3ZFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUN0QyxDQUFDLENBQUMsQ0FBQSJ9
