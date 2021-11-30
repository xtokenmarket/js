// import { BUY, ETH, SELL, X_BNT_A } from '@xtoken/abis'
import test from 'ava';
import { isAddress } from 'ethers/lib/utils';
import { provider } from '../../constants.spec';
import { 
// getBancorEstimatedQuantity,
getBancorNetworkAddress, 
// getBancorPortfolioItem,
getBntEthPrice, } from './bancor';
test('Get Bancor Network address', async (t) => {
    const bancorNetworkAddress = await getBancorNetworkAddress(provider);
    console.log('[Bancor] Bancor Network address:', bancorNetworkAddress);
    t.true(isAddress(bancorNetworkAddress));
});
test('Get BNT ETH price', async (t) => {
    const minReturn = await getBntEthPrice(provider);
    console.log('[Bancor] minReturn:', minReturn);
    t.true(Number(minReturn) > 0);
});
/*test('Calculate expected quantity on burn of xBNTa with ETH on Bancor', async (t) => {
  const expectedQty = await getBancorEstimatedQuantity(
    ETH,
    X_BNT_A,
    '1000',
    SELL,
    provider
  )
  console.log('[Bancor] Expected ETH qty for 1000 xBNTa:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate expected quantity on burn of xBNTa with BNT on Bancor', async (t) => {
  const expectedQty = await getBancorEstimatedQuantity(
    X_BNT_A,
    X_BNT_A,
    '1000',
    SELL,
    provider
  )
  console.log('[Bancor] Expected BNT qty for 1000 xBNTa:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate expected quantity on mint of xBNTa on Bancor', async (t) => {
  const expectedQty = await getBancorEstimatedQuantity(
    ETH,
    X_BNT_A,
    '1',
    BUY,
    provider
  )
  console.log('[Bancor] Expected xBNTa qty for 1 ETH:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate expected quantity on mint of xBNTa with BNT on Bancor', async (t) => {
  const expectedQty = await getBancorEstimatedQuantity(
    X_BNT_A,
    X_BNT_A,
    '100',
    BUY,
    provider
  )
  console.log('[Bancor] Expected xBNTa qty for 100 BNT:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Get Bancor Portfolio of xBNTa', async (t) => {
  const portfolio = await getBancorPortfolioItem(X_BNT_A, testAddress, provider)
  console.log('[Bancor] Portfolio value of xBNTa:', portfolio?.value)
  t.true(Number(portfolio?.value) > 0)
})*/
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFuY29yLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi9leGNoYW5nZXMvYmFuY29yLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEseURBQXlEO0FBQ3pELE9BQU8sSUFBSSxNQUFNLEtBQUssQ0FBQTtBQUN0QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sa0JBQWtCLENBQUE7QUFFNUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHNCQUFzQixDQUFBO0FBRS9DLE9BQU87QUFDTCw4QkFBOEI7QUFDOUIsdUJBQXVCO0FBQ3ZCLDBCQUEwQjtBQUMxQixjQUFjLEdBQ2YsTUFBTSxVQUFVLENBQUE7QUFFakIsSUFBSSxDQUFDLDRCQUE0QixFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUM3QyxNQUFNLG9CQUFvQixHQUFHLE1BQU0sdUJBQXVCLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDcEUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQ0FBa0MsRUFBRSxvQkFBb0IsQ0FBQyxDQUFBO0lBQ3JFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQTtBQUN6QyxDQUFDLENBQUMsQ0FBQTtBQUVGLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDcEMsTUFBTSxTQUFTLEdBQUcsTUFBTSxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDaEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsRUFBRSxTQUFTLENBQUMsQ0FBQTtJQUM3QyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUMvQixDQUFDLENBQUMsQ0FBQTtBQUVGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBb0RJIn0=