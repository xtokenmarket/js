import { AAVE_X_AAVE_A_CLR, X_ALPHA_A_ALPHA_CLR, XTK_ETH_CLR, } from '@xtoken/abis';
import test from 'ava';
import { provider } from '../../constants.spec';
import { getXAssetCLRContracts } from './helper';
import { getXAssetCLRPrices } from './prices';
test(`Get ${AAVE_X_AAVE_A_CLR} prices`, async (t) => {
    const { xAssetCLRContract } = await getXAssetCLRContracts(AAVE_X_AAVE_A_CLR, provider);
    const { aum, priceEth, priceUsd } = await getXAssetCLRPrices(xAssetCLRContract);
    console.log(`${AAVE_X_AAVE_A_CLR} aum:`, aum);
    console.log(`${AAVE_X_AAVE_A_CLR} priceEth:`, priceEth);
    console.log(`${AAVE_X_AAVE_A_CLR} priceUsd:`, priceUsd);
    t.true(aum > 0);
    t.true(priceEth > 0);
    t.true(priceUsd > 0);
});
test(`Get ${X_ALPHA_A_ALPHA_CLR} prices`, async (t) => {
    const { xAssetCLRContract } = await getXAssetCLRContracts(X_ALPHA_A_ALPHA_CLR, provider);
    const { aum, priceEth, priceUsd } = await getXAssetCLRPrices(xAssetCLRContract);
    console.log(`${X_ALPHA_A_ALPHA_CLR} aum:`, aum);
    console.log(`${X_ALPHA_A_ALPHA_CLR} priceEth:`, priceEth);
    console.log(`${X_ALPHA_A_ALPHA_CLR} priceUsd:`, priceUsd);
    t.true(aum > 0);
    t.true(priceEth > 0);
    t.true(priceUsd > 0);
});
test(`Get ${XTK_ETH_CLR} prices`, async (t) => {
    const { xAssetCLRContract } = await getXAssetCLRContracts(XTK_ETH_CLR, provider);
    const { aum, priceEth, priceUsd } = await getXAssetCLRPrices(xAssetCLRContract);
    console.log(`${XTK_ETH_CLR} aum:`, aum);
    console.log(`${XTK_ETH_CLR} priceEth:`, priceEth);
    console.log(`${XTK_ETH_CLR} priceUsd:`, priceUsd);
    t.true(aum > 0);
    t.true(priceEth > 0);
    t.true(priceUsd > 0);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpY2VzLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi9jbHIvcHJpY2VzLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLGlCQUFpQixFQUNqQixtQkFBbUIsRUFDbkIsV0FBVyxHQUNaLE1BQU0sY0FBYyxDQUFBO0FBQ3JCLE9BQU8sSUFBSSxNQUFNLEtBQUssQ0FBQTtBQUV0QixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sc0JBQXNCLENBQUE7QUFFL0MsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sVUFBVSxDQUFBO0FBQ2hELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUU3QyxJQUFJLENBQUMsT0FBTyxpQkFBaUIsU0FBUyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUNsRCxNQUFNLEVBQUUsaUJBQWlCLEVBQUUsR0FBRyxNQUFNLHFCQUFxQixDQUN2RCxpQkFBaUIsRUFDakIsUUFBUSxDQUNULENBQUE7SUFFRCxNQUFNLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsR0FBRyxNQUFNLGtCQUFrQixDQUMxRCxpQkFBaUIsQ0FDbEIsQ0FBQTtJQUVELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxpQkFBaUIsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFBO0lBQzdDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxpQkFBaUIsWUFBWSxFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBQ3ZELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxpQkFBaUIsWUFBWSxFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBQ3ZELENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFBO0lBQ2YsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUE7SUFDcEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUE7QUFDdEIsQ0FBQyxDQUFDLENBQUE7QUFFRixJQUFJLENBQUMsT0FBTyxtQkFBbUIsU0FBUyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUNwRCxNQUFNLEVBQUUsaUJBQWlCLEVBQUUsR0FBRyxNQUFNLHFCQUFxQixDQUN2RCxtQkFBbUIsRUFDbkIsUUFBUSxDQUNULENBQUE7SUFFRCxNQUFNLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsR0FBRyxNQUFNLGtCQUFrQixDQUMxRCxpQkFBaUIsQ0FDbEIsQ0FBQTtJQUVELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxtQkFBbUIsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFBO0lBQy9DLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxtQkFBbUIsWUFBWSxFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBQ3pELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxtQkFBbUIsWUFBWSxFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBQ3pELENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFBO0lBQ2YsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUE7SUFDcEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUE7QUFDdEIsQ0FBQyxDQUFDLENBQUE7QUFFRixJQUFJLENBQUMsT0FBTyxXQUFXLFNBQVMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDNUMsTUFBTSxFQUFFLGlCQUFpQixFQUFFLEdBQUcsTUFBTSxxQkFBcUIsQ0FDdkQsV0FBVyxFQUNYLFFBQVEsQ0FDVCxDQUFBO0lBRUQsTUFBTSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEdBQUcsTUFBTSxrQkFBa0IsQ0FDMUQsaUJBQWlCLENBQ2xCLENBQUE7SUFFRCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsV0FBVyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUE7SUFDdkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLFdBQVcsWUFBWSxFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBQ2pELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxXQUFXLFlBQVksRUFBRSxRQUFRLENBQUMsQ0FBQTtJQUNqRCxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQTtJQUNmLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFBO0lBQ3BCLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQ3RCLENBQUMsQ0FBQyxDQUFBIn0=