import { X_BTC_3X, X_ETH_3X } from '@xtoken/abis';
import test from 'ava';
import { arbitrumProvider } from '../../constants.spec';
import { getExpectedQuantityOnBurnXAssetLev } from './burn';
test('Calculate WBTC expected quantity on burn of xBTC3x', async (t) => {
    const expectedQty = await getExpectedQuantityOnBurnXAssetLev(X_BTC_3X, false, '1000', arbitrumProvider);
    console.log('Expected WBTC qty for 1000 xBTC3x: ', expectedQty);
    t.true(Number(expectedQty) > 0);
});
test('Calculate ETH expected quantity on burn of xBTC3x', async (t) => {
    const expectedQty = await getExpectedQuantityOnBurnXAssetLev(X_BTC_3X, true, '1000', arbitrumProvider);
    console.log('Expected ETH qty for 1000 xBTC3x: ', expectedQty);
    t.true(Number(expectedQty) > 0);
});
test('Calculate WETH expected quantity on burn of xETH3x', async (t) => {
    const expectedQty = await getExpectedQuantityOnBurnXAssetLev(X_ETH_3X, false, '1000', arbitrumProvider);
    console.log('Expected WETH qty for 1000 xETH3x: ', expectedQty);
    t.true(Number(expectedQty) > 0);
});
test('Calculate ETH expected quantity on burn of xETH3x', async (t) => {
    const expectedQty = await getExpectedQuantityOnBurnXAssetLev(X_ETH_3X, true, '1000', arbitrumProvider);
    console.log('Expected ETH qty for 1000 xETH3x: ', expectedQty);
    t.true(Number(expectedQty) > 0);
});
/*test('Calculate LINK expected quantity on burn of xLINK3x', async (t) => {
  const expectedQty = await getExpectedQuantityOnBurnXAssetLev(
    X_LINK_3X,
    false,
    '1000',
    arbitrumProvider
  )
  console.log('Expected LINK qty for 1000 xLINK3x: ', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate ETH expected quantity on burn of xLINK3x', async (t) => {
  const expectedQty = await getExpectedQuantityOnBurnXAssetLev(
    X_LINK_3X,
    true,
    '1000',
    arbitrumProvider
  )
  console.log('Expected ETH qty for 1000 xLINK3x: ', expectedQty)
  t.true(Number(expectedQty) > 0)
})*/
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVybi5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4vbGV2L2J1cm4uc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLGNBQWMsQ0FBQTtBQUNqRCxPQUFPLElBQUksTUFBTSxLQUFLLENBQUE7QUFFdEIsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUE7QUFFdkQsT0FBTyxFQUFFLGtDQUFrQyxFQUFFLE1BQU0sUUFBUSxDQUFBO0FBRTNELElBQUksQ0FBQyxvREFBb0QsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDckUsTUFBTSxXQUFXLEdBQUcsTUFBTSxrQ0FBa0MsQ0FDMUQsUUFBUSxFQUNSLEtBQUssRUFDTCxNQUFNLEVBQ04sZ0JBQWdCLENBQ2pCLENBQUE7SUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLHFDQUFxQyxFQUFFLFdBQVcsQ0FBQyxDQUFBO0lBQy9ELENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQ2pDLENBQUMsQ0FBQyxDQUFBO0FBRUYsSUFBSSxDQUFDLG1EQUFtRCxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUNwRSxNQUFNLFdBQVcsR0FBRyxNQUFNLGtDQUFrQyxDQUMxRCxRQUFRLEVBQ1IsSUFBSSxFQUNKLE1BQU0sRUFDTixnQkFBZ0IsQ0FDakIsQ0FBQTtJQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsb0NBQW9DLEVBQUUsV0FBVyxDQUFDLENBQUE7SUFDOUQsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7QUFDakMsQ0FBQyxDQUFDLENBQUE7QUFFRixJQUFJLENBQUMsb0RBQW9ELEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQ3JFLE1BQU0sV0FBVyxHQUFHLE1BQU0sa0NBQWtDLENBQzFELFFBQVEsRUFDUixLQUFLLEVBQ0wsTUFBTSxFQUNOLGdCQUFnQixDQUNqQixDQUFBO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQ0FBcUMsRUFBRSxXQUFXLENBQUMsQ0FBQTtJQUMvRCxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUNqQyxDQUFDLENBQUMsQ0FBQTtBQUVGLElBQUksQ0FBQyxtREFBbUQsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDcEUsTUFBTSxXQUFXLEdBQUcsTUFBTSxrQ0FBa0MsQ0FDMUQsUUFBUSxFQUNSLElBQUksRUFDSixNQUFNLEVBQ04sZ0JBQWdCLENBQ2pCLENBQUE7SUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLG9DQUFvQyxFQUFFLFdBQVcsQ0FBQyxDQUFBO0lBQzlELENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQ2pDLENBQUMsQ0FBQyxDQUFBO0FBRUY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBb0JJIn0=