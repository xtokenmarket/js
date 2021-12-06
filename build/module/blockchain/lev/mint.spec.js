import { X_BTC_3X, X_ETH_3X } from '@xtoken/abis';
import test from 'ava';
import { arbitrumProvider } from '../../constants.spec';
import { getExpectedQuantityOnMintXAssetLev } from './mint';
test('Calculate xBTC3x expected quantity on mint with WBTC', async (t) => {
    const expectedQty = await getExpectedQuantityOnMintXAssetLev(X_BTC_3X, false, '1', arbitrumProvider);
    console.log('Expected xBTC3x qty for 1 WBTC: ', expectedQty);
    t.true(Number(expectedQty) > 0);
});
test('Calculate xBTC3x expected quantity on mint with ETH', async (t) => {
    const expectedQty = await getExpectedQuantityOnMintXAssetLev(X_BTC_3X, true, '1', arbitrumProvider);
    console.log('Expected xBTC3x qty for 1 ETH: ', expectedQty);
    t.true(Number(expectedQty) > 0);
});
test('Calculate xETH3x expected quantity on mint with WETH', async (t) => {
    const expectedQty = await getExpectedQuantityOnMintXAssetLev(X_ETH_3X, false, '1', arbitrumProvider);
    console.log('Expected xETH3x qty for 1 WETH: ', expectedQty);
    t.true(Number(expectedQty) > 0);
});
test('Calculate xETH3x expected quantity on mint with ETH', async (t) => {
    const expectedQty = await getExpectedQuantityOnMintXAssetLev(X_ETH_3X, true, '1', arbitrumProvider);
    console.log('Expected xETH3x qty for 1 ETH: ', expectedQty);
    t.true(Number(expectedQty) > 0);
});
/*test('Calculate xLINK3x expected quantity on mint with LINK', async (t) => {
  const expectedQty = await getExpectedQuantityOnMintXAssetLev(
    X_LINK_3X,
    false,
    '1',
    arbitrumProvider
  )
  console.log('Expected xLINK3x qty for 1 LINK: ', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate xLINK3x expected quantity on mint with ETH', async (t) => {
  const expectedQty = await getExpectedQuantityOnMintXAssetLev(
    X_LINK_3X,
    true,
    '1',
    arbitrumProvider
  )
  console.log('Expected xLINK3x qty for 1 ETH: ', expectedQty)
  t.true(Number(expectedQty) > 0)
})*/
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWludC5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4vbGV2L21pbnQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLGNBQWMsQ0FBQTtBQUNqRCxPQUFPLElBQUksTUFBTSxLQUFLLENBQUE7QUFFdEIsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUE7QUFFdkQsT0FBTyxFQUFFLGtDQUFrQyxFQUFFLE1BQU0sUUFBUSxDQUFBO0FBRTNELElBQUksQ0FBQyxzREFBc0QsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDdkUsTUFBTSxXQUFXLEdBQUcsTUFBTSxrQ0FBa0MsQ0FDMUQsUUFBUSxFQUNSLEtBQUssRUFDTCxHQUFHLEVBQ0gsZ0JBQWdCLENBQ2pCLENBQUE7SUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLGtDQUFrQyxFQUFFLFdBQVcsQ0FBQyxDQUFBO0lBQzVELENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQ2pDLENBQUMsQ0FBQyxDQUFBO0FBRUYsSUFBSSxDQUFDLHFEQUFxRCxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUN0RSxNQUFNLFdBQVcsR0FBRyxNQUFNLGtDQUFrQyxDQUMxRCxRQUFRLEVBQ1IsSUFBSSxFQUNKLEdBQUcsRUFDSCxnQkFBZ0IsQ0FDakIsQ0FBQTtJQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsaUNBQWlDLEVBQUUsV0FBVyxDQUFDLENBQUE7SUFDM0QsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7QUFDakMsQ0FBQyxDQUFDLENBQUE7QUFFRixJQUFJLENBQUMsc0RBQXNELEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQ3ZFLE1BQU0sV0FBVyxHQUFHLE1BQU0sa0NBQWtDLENBQzFELFFBQVEsRUFDUixLQUFLLEVBQ0wsR0FBRyxFQUNILGdCQUFnQixDQUNqQixDQUFBO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQ0FBa0MsRUFBRSxXQUFXLENBQUMsQ0FBQTtJQUM1RCxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUNqQyxDQUFDLENBQUMsQ0FBQTtBQUVGLElBQUksQ0FBQyxxREFBcUQsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDdEUsTUFBTSxXQUFXLEdBQUcsTUFBTSxrQ0FBa0MsQ0FDMUQsUUFBUSxFQUNSLElBQUksRUFDSixHQUFHLEVBQ0gsZ0JBQWdCLENBQ2pCLENBQUE7SUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLGlDQUFpQyxFQUFFLFdBQVcsQ0FBQyxDQUFBO0lBQzNELENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQ2pDLENBQUMsQ0FBQyxDQUFBO0FBRUY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBb0JJIn0=