import { X_BTC_3X, X_ETH_3X } from '@xtoken/abis';
import test from 'ava';
import { arbitrumProvider, testAddress } from '../../constants.spec';
import { getPortfolioItemXAssetLev } from './portfolio';
test('Get xBTC3x portfolio balance', async (t) => {
    const portfolioItem = await getPortfolioItemXAssetLev(X_BTC_3X, testAddress, arbitrumProvider);
    console.log('Portfolio balance xBTC3x: ', portfolioItem.quantity);
    t.true(Number(portfolioItem.quantity) > 0);
});
test('Get xETH3x portfolio balance', async (t) => {
    const portfolioItem = await getPortfolioItemXAssetLev(X_ETH_3X, testAddress, arbitrumProvider);
    console.log('Portfolio balance xETH3x: ', portfolioItem.quantity);
    t.true(Number(portfolioItem.quantity) > 0);
});
/*test('Get xLINK3x portfolio balance', async (t) => {
  const portfolioItem = await getPortfolioItemXAssetLev(
    X_LINK_3X,
    testAddress,
    arbitrumProvider
  )
  console.log('Portfolio balance xLINK3x: ', portfolioItem.quantity)
  t.true(Number(portfolioItem.quantity) > 0)
})*/
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9ydGZvbGlvLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi9sZXYvcG9ydGZvbGlvLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxjQUFjLENBQUE7QUFDakQsT0FBTyxJQUFJLE1BQU0sS0FBSyxDQUFBO0FBRXRCLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxXQUFXLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQTtBQUVwRSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxhQUFhLENBQUE7QUFFdkQsSUFBSSxDQUFDLDhCQUE4QixFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUMvQyxNQUFNLGFBQWEsR0FBRyxNQUFNLHlCQUF5QixDQUNuRCxRQUFRLEVBQ1IsV0FBVyxFQUNYLGdCQUFnQixDQUNqQixDQUFBO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsRUFBRSxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDakUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQzVDLENBQUMsQ0FBQyxDQUFBO0FBRUYsSUFBSSxDQUFDLDhCQUE4QixFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUMvQyxNQUFNLGFBQWEsR0FBRyxNQUFNLHlCQUF5QixDQUNuRCxRQUFRLEVBQ1IsV0FBVyxFQUNYLGdCQUFnQixDQUNqQixDQUFBO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsRUFBRSxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDakUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQzVDLENBQUMsQ0FBQyxDQUFBO0FBRUY7Ozs7Ozs7O0lBUUkifQ==