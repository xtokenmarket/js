import { /*BUY, ETH, SELL,*/ X_KNC_A, X_KNC_B } from '@xtoken/abis';
import test from 'ava';
import { provider, testAddress } from '../../constants.spec';
import { getBtcUsdcPrice, getEthUsdcPrice, 
// getUniswapEstimatedQuantity,
getUniswapPortfolioItem, } from './uniswap';
test('Get BTC<>USDC rate', async (t) => {
    const btcUsdcRate = await getBtcUsdcPrice(provider);
    console.log('[Uniswap] BTC<>USDC rate:', btcUsdcRate);
    t.true(Number(btcUsdcRate) > 0);
});
test('Get ETH<>USDC rate', async (t) => {
    const ethUsdcRate = await getEthUsdcPrice(provider);
    console.log('[Uniswap] ETH<>USDC rate:', ethUsdcRate);
    t.true(Number(ethUsdcRate) > 0);
});
/*test('Calculate expected quantity on burn of xKNCa on Uniswap', async (t) => {
  const expectedQty = await getUniswapEstimatedQuantity(
    ETH,
    X_KNC_A,
    '1000',
    SELL,
    provider
  )
  console.log('[Uniswap] Expected ETH qty for 1000 xKNCa:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate expected quantity on burn of xKNCa with KNC on Uniswap', async (t) => {
  const expectedQty = await getUniswapEstimatedQuantity(
    X_KNC_A,
    X_KNC_A,
    '1000',
    SELL,
    provider
  )
  console.log('[Uniswap] Expected KNC qty for 1000 xKNCa:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate expected quantity on mint of xKNCa on Uniswap', async (t) => {
  const expectedQty = await getUniswapEstimatedQuantity(
    ETH,
    X_KNC_A,
    '1',
    BUY,
    provider
  )
  console.log('[Uniswap] Expected xKNCa qty for 1 ETH:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate expected quantity on mint of xKNCa with KNC on Uniswap', async (t) => {
  const expectedQty = await getUniswapEstimatedQuantity(
    X_KNC_A,
    X_KNC_A,
    '100',
    BUY,
    provider
  )
  console.log('[Uniswap] Expected xKNCa qty for 100 KNC:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate expected quantity on mint of xKNCb on Uniswap', async (t) => {
  const expectedQty = await getUniswapEstimatedQuantity(
    ETH,
    X_KNC_B,
    '1',
    BUY,
    provider
  )
  console.log('[Uniswap] Expected xKNCb qty for 1 ETH:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate expected quantity on mint of xKNCb with KNC on Uniswap', async (t) => {
  const expectedQty = await getUniswapEstimatedQuantity(
    X_KNC_B,
    X_KNC_B,
    '100',
    BUY,
    provider
  )
  console.log('[Uniswap] Expected xKNCb qty for 100 KNC:', expectedQty)
  t.true(Number(expectedQty) > 0)
})*/
test('Get Uniswap Portfolio of xKNCa', async (t) => {
    const portfolio = await getUniswapPortfolioItem(X_KNC_A, testAddress, provider);
    console.log('[Uniswap] Portfolio value of xKNCa:', portfolio?.value);
    t.true(Number(portfolio?.value) > 0);
});
test('Get Uniswap Portfolio of xKNCb', async (t) => {
    const portfolio = await getUniswapPortfolioItem(X_KNC_B, testAddress, provider);
    console.log('[Uniswap] Portfolio value of xKNCb:', portfolio?.value);
    t.true(Number(portfolio?.value) > 0);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pc3dhcC5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4vZXhjaGFuZ2VzL3VuaXN3YXAuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsbUJBQW1CLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQTtBQUNuRSxPQUFPLElBQUksTUFBTSxLQUFLLENBQUE7QUFFdEIsT0FBTyxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQTtBQUU1RCxPQUFPLEVBQ0wsZUFBZSxFQUNmLGVBQWU7QUFDZiwrQkFBK0I7QUFDL0IsdUJBQXVCLEdBQ3hCLE1BQU0sV0FBVyxDQUFBO0FBRWxCLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDckMsTUFBTSxXQUFXLEdBQUcsTUFBTSxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDbkQsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsRUFBRSxXQUFXLENBQUMsQ0FBQTtJQUNyRCxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUNqQyxDQUFDLENBQUMsQ0FBQTtBQUVGLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDckMsTUFBTSxXQUFXLEdBQUcsTUFBTSxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDbkQsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsRUFBRSxXQUFXLENBQUMsQ0FBQTtJQUNyRCxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUNqQyxDQUFDLENBQUMsQ0FBQTtBQUVGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBc0VJO0FBRUosSUFBSSxDQUFDLGdDQUFnQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUNqRCxNQUFNLFNBQVMsR0FBRyxNQUFNLHVCQUF1QixDQUM3QyxPQUFPLEVBQ1AsV0FBVyxFQUNYLFFBQVEsQ0FDVCxDQUFBO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQ0FBcUMsRUFBRSxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUE7SUFDcEUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQ3RDLENBQUMsQ0FBQyxDQUFBO0FBRUYsSUFBSSxDQUFDLGdDQUFnQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUNqRCxNQUFNLFNBQVMsR0FBRyxNQUFNLHVCQUF1QixDQUM3QyxPQUFPLEVBQ1AsV0FBVyxFQUNYLFFBQVEsQ0FDVCxDQUFBO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQ0FBcUMsRUFBRSxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUE7SUFDcEUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQ3RDLENBQUMsQ0FBQyxDQUFBIn0=