import { BUY, ETH, SELL, X_AAVE_A, X_AAVE_B } from '@xtoken/abis'
import test from 'ava'
import { provider, testAddress } from '../../constants.spec'
import {
  getBalancerEstimatedQuantity,
  getBalancerPortfolioItem,
} from './balancer'
/*test('Calculate expected quantity on burn of xAAVEa on Balancer', async (t) => {
  const expectedQty = await getBalancerEstimatedQuantity(
    X_AAVE_A,
    X_AAVE_A,
    '1000',
    SELL,
    provider
  )
  console.log('[Balancer] Expected AAVE qty for 1000 xAAVEa:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate expected quantity on mint of xAAVEa on Balancer', async (t) => {
  const expectedQty = await getBalancerEstimatedQuantity(
    ETH,
    X_AAVE_A,
    '1',
    BUY,
    provider
  )
  console.log('[Balancer] Expected xAAVEa qty for 1 ETH:', expectedQty)
  t.true(Number(expectedQty) > 0)
})*/
test('Calculate expected quantity on burn of xAAVEb on Balancer', async (t) => {
  const expectedQty = await getBalancerEstimatedQuantity(
    X_AAVE_B,
    X_AAVE_B,
    '1000',
    SELL,
    provider
  )
  console.log('[Balancer] Expected AAVE qty for 1000 xAAVEb:', expectedQty)
  t.true(Number(expectedQty) > 0)
})
test('Calculate expected quantity on mint of xAAVEb on Balancer', async (t) => {
  const expectedQty = await getBalancerEstimatedQuantity(
    ETH,
    X_AAVE_B,
    '1',
    BUY,
    provider
  )
  console.log('[Balancer] Expected xAAVEb qty for 1 ETH:', expectedQty)
  t.true(Number(expectedQty) > 0)
})
/*test('Calculate expected quantity on burn of xSNXa on Balancer', async (t) => {
  const expectedQty = await getBalancerEstimatedQuantity(
    X_SNX_A,
    X_SNX_A,
    '1000',
    SELL,
    provider
  )
  console.log('[Balancer] Expected SNX qty for 1000 xSNXa:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate expected quantity on mint of xSNXa on Balancer', async (t) => {
  const expectedQty = await getBalancerEstimatedQuantity(
    ETH,
    X_SNX_A,
    '1',
    BUY,
    provider
  )
  console.log('[Balancer] Expected xSNXa qty for 1 ETH:', expectedQty)
  t.true(Number(expectedQty) > 0)
})*/
test('Get Balancer Portfolio of xAAVEa', async (t) => {
  const portfolio = await getBalancerPortfolioItem(
    X_AAVE_A,
    testAddress,
    provider
  )
  console.log('[Balancer] Portfolio value of xAAVEa:', portfolio?.value)
  t.true(Number(portfolio?.value) > 0)
})
test('Get Balancer Portfolio of xAAVEb', async (t) => {
  const portfolio = await getBalancerPortfolioItem(
    X_AAVE_B,
    testAddress,
    provider
  )
  console.log('[Balancer] Portfolio value of xAAVEb:', portfolio?.value)
  t.true(Number(portfolio?.value) > 0)
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFsYW5jZXIuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9ibG9ja2NoYWluL2V4Y2hhbmdlcy9iYWxhbmNlci5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sY0FBYyxDQUFBO0FBQ2pFLE9BQU8sSUFBSSxNQUFNLEtBQUssQ0FBQTtBQUV0QixPQUFPLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxNQUFNLHNCQUFzQixDQUFBO0FBRTVELE9BQU8sRUFDTCw0QkFBNEIsRUFDNUIsd0JBQXdCLEdBQ3pCLE1BQU0sWUFBWSxDQUFBO0FBRW5COzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBc0JJO0FBRUosSUFBSSxDQUFDLDJEQUEyRCxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUM1RSxNQUFNLFdBQVcsR0FBRyxNQUFNLDRCQUE0QixDQUNwRCxRQUFRLEVBQ1IsUUFBUSxFQUNSLE1BQU0sRUFDTixJQUFJLEVBQ0osUUFBUSxDQUNULENBQUE7SUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLCtDQUErQyxFQUFFLFdBQVcsQ0FBQyxDQUFBO0lBQ3pFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQ2pDLENBQUMsQ0FBQyxDQUFBO0FBRUYsSUFBSSxDQUFDLDJEQUEyRCxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUM1RSxNQUFNLFdBQVcsR0FBRyxNQUFNLDRCQUE0QixDQUNwRCxHQUFHLEVBQ0gsUUFBUSxFQUNSLEdBQUcsRUFDSCxHQUFHLEVBQ0gsUUFBUSxDQUNULENBQUE7SUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLDJDQUEyQyxFQUFFLFdBQVcsQ0FBQyxDQUFBO0lBQ3JFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQ2pDLENBQUMsQ0FBQyxDQUFBO0FBRUY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFzQkk7QUFFSixJQUFJLENBQUMsa0NBQWtDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQ25ELE1BQU0sU0FBUyxHQUFHLE1BQU0sd0JBQXdCLENBQzlDLFFBQVEsRUFDUixXQUFXLEVBQ1gsUUFBUSxDQUNULENBQUE7SUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLHVDQUF1QyxFQUFFLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQTtJQUN0RSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7QUFDdEMsQ0FBQyxDQUFDLENBQUE7QUFFRixJQUFJLENBQUMsa0NBQWtDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQ25ELE1BQU0sU0FBUyxHQUFHLE1BQU0sd0JBQXdCLENBQzlDLFFBQVEsRUFDUixXQUFXLEVBQ1gsUUFBUSxDQUNULENBQUE7SUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLHVDQUF1QyxFQUFFLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQTtJQUN0RSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7QUFDdEMsQ0FBQyxDQUFDLENBQUEifQ==
