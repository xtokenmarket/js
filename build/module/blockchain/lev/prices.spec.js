import { X_BTC_3X, X_ETH_3X } from '@xtoken/abis';
import test from 'ava';
import { arbitrumProvider } from '../../constants.spec';
import { getXAssetLevContracts } from './helper';
import { getXAssetLevPrices } from './prices';
test('Get xBTC3x prices', async (t) => {
    const { xassetlevContract } = await getXAssetLevContracts(X_BTC_3X, arbitrumProvider);
    const { aum, priceEth, priceUsd } = await getXAssetLevPrices(xassetlevContract);
    console.log('xBTC3x aum: ', aum);
    console.log('xBTC3x priceEth: ', priceEth);
    console.log('xBTC3x priceUsd: ', priceUsd);
    t.true(aum > 0);
    t.true(priceEth > 0);
    t.true(priceUsd > 0);
});
test('Get xETH3x prices', async (t) => {
    const { xassetlevContract } = await getXAssetLevContracts(X_ETH_3X, arbitrumProvider);
    const { aum, priceEth, priceUsd } = await getXAssetLevPrices(xassetlevContract);
    console.log('xETH3x aum: ', aum);
    console.log('xETH3x priceEth: ', priceEth);
    console.log('xETH3x priceUsd: ', priceUsd);
    t.true(aum > 0);
    t.true(priceEth > 0);
    t.true(priceUsd > 0);
});
/*test('Get xLINK3x prices', async (t) => {
  const { xassetlevContract } = await getXAssetLevContracts(
    X_LINK_3X,
    arbitrumProvider
  )

  const { aum, priceEth, priceUsd } = await getXAssetLevPrices(
    xassetlevContract
  )

  console.log('xLINK3x aum: ', aum)
  console.log('xLINK3x priceEth: ', priceEth)
  console.log('xLINK3x priceUsd: ', priceUsd)

  t.true(aum > 0)
  t.true(priceEth > 0)
  t.true(priceUsd > 0)
})*/
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpY2VzLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi9sZXYvcHJpY2VzLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxjQUFjLENBQUE7QUFDakQsT0FBTyxJQUFJLE1BQU0sS0FBSyxDQUFBO0FBRXRCLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFBO0FBRXZELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUNoRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxVQUFVLENBQUE7QUFFN0MsSUFBSSxDQUFDLG1CQUFtQixFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUNwQyxNQUFNLEVBQUUsaUJBQWlCLEVBQUUsR0FBRyxNQUFNLHFCQUFxQixDQUN2RCxRQUFRLEVBQ1IsZ0JBQWdCLENBQ2pCLENBQUE7SUFFRCxNQUFNLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsR0FBRyxNQUFNLGtCQUFrQixDQUMxRCxpQkFBaUIsQ0FDbEIsQ0FBQTtJQUVELE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLEdBQUcsQ0FBQyxDQUFBO0lBQ2hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFDMUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSxRQUFRLENBQUMsQ0FBQTtJQUUxQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQTtJQUNmLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFBO0lBQ3BCLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQ3RCLENBQUMsQ0FBQyxDQUFBO0FBRUYsSUFBSSxDQUFDLG1CQUFtQixFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUNwQyxNQUFNLEVBQUUsaUJBQWlCLEVBQUUsR0FBRyxNQUFNLHFCQUFxQixDQUN2RCxRQUFRLEVBQ1IsZ0JBQWdCLENBQ2pCLENBQUE7SUFFRCxNQUFNLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsR0FBRyxNQUFNLGtCQUFrQixDQUMxRCxpQkFBaUIsQ0FDbEIsQ0FBQTtJQUVELE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLEdBQUcsQ0FBQyxDQUFBO0lBQ2hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFDMUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSxRQUFRLENBQUMsQ0FBQTtJQUUxQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQTtJQUNmLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFBO0lBQ3BCLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQ3RCLENBQUMsQ0FBQyxDQUFBO0FBRUY7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBaUJJIn0=