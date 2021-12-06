import { X_BTC_3X, X_ETH_3X } from '@xtoken/abis';
import test from 'ava';
import { arbitrumProvider } from '../../constants.spec';
import { getMaximumRedeemableXAssetLev } from './redeem';
test('Get maximum redeemable xBTC3x', async (t) => {
    const maxRedeemable = await getMaximumRedeemableXAssetLev(X_BTC_3X, arbitrumProvider);
    console.log('Maximum redeemable xBTC3x: ', maxRedeemable);
    t.true(Number(maxRedeemable) > 0);
});
test('Get maximum redeemable xETH3x', async (t) => {
    const maxRedeemable = await getMaximumRedeemableXAssetLev(X_ETH_3X, arbitrumProvider);
    console.log('Maximum redeemable xETH3x: ', maxRedeemable);
    t.true(Number(maxRedeemable) > 0);
});
/*test('Get maximum redeemable xLINK3x', async (t) => {
  const maxRedeemable = await getMaximumRedeemableXAssetLev(
    X_LINK_3X,
    arbitrumProvider
  )
  console.log('Maximum redeemable xLINK3x: ', maxRedeemable)
  t.true(Number(maxRedeemable) > 0)
})*/
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkZWVtLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi9sZXYvcmVkZWVtLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxjQUFjLENBQUE7QUFDakQsT0FBTyxJQUFJLE1BQU0sS0FBSyxDQUFBO0FBRXRCLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFBO0FBRXZELE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUV4RCxJQUFJLENBQUMsK0JBQStCLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQ2hELE1BQU0sYUFBYSxHQUFHLE1BQU0sNkJBQTZCLENBQ3ZELFFBQVEsRUFDUixnQkFBZ0IsQ0FDakIsQ0FBQTtJQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsNkJBQTZCLEVBQUUsYUFBYSxDQUFDLENBQUE7SUFDekQsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7QUFDbkMsQ0FBQyxDQUFDLENBQUE7QUFFRixJQUFJLENBQUMsK0JBQStCLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQ2hELE1BQU0sYUFBYSxHQUFHLE1BQU0sNkJBQTZCLENBQ3ZELFFBQVEsRUFDUixnQkFBZ0IsQ0FDakIsQ0FBQTtJQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsNkJBQTZCLEVBQUUsYUFBYSxDQUFDLENBQUE7SUFDekQsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7QUFDbkMsQ0FBQyxDQUFDLENBQUE7QUFFRjs7Ozs7OztJQU9JIn0=