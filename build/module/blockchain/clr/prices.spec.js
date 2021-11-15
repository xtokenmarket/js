import {
  AAVE_X_AAVE_A_CLR,
  X_ALPHA_A_ALPHA_CLR,
  XTK_ETH_CLR,
} from '@xtoken/abis'
import test from 'ava'
import { provider } from '../../constants.spec'
import { getXAssetCLRContracts } from './helper'
import { getXAssetCLRPrices } from './prices'
test(`Get ${AAVE_X_AAVE_A_CLR} prices`, async (t) => {
  const { kyberProxyContract, xAssetCLRContract } = await getXAssetCLRContracts(
    AAVE_X_AAVE_A_CLR,
    provider
  )
  const { aum, priceEth, priceUsd } = await getXAssetCLRPrices(
    xAssetCLRContract,
    kyberProxyContract
  )
  console.log(`${AAVE_X_AAVE_A_CLR} aum:`, aum)
  console.log(`${AAVE_X_AAVE_A_CLR} priceEth:`, priceEth)
  console.log(`${AAVE_X_AAVE_A_CLR} priceUsd:`, priceUsd)
  t.true(aum > 0)
  t.true(priceEth > 0)
  t.true(priceUsd > 0)
})
test(`Get ${X_ALPHA_A_ALPHA_CLR} prices`, async (t) => {
  const { kyberProxyContract, xAssetCLRContract } = await getXAssetCLRContracts(
    X_ALPHA_A_ALPHA_CLR,
    provider
  )
  const { aum, priceEth, priceUsd } = await getXAssetCLRPrices(
    xAssetCLRContract,
    kyberProxyContract
  )
  console.log(`${X_ALPHA_A_ALPHA_CLR} aum:`, aum)
  console.log(`${X_ALPHA_A_ALPHA_CLR} priceEth:`, priceEth)
  console.log(`${X_ALPHA_A_ALPHA_CLR} priceUsd:`, priceUsd)
  t.true(aum > 0)
  t.true(priceEth > 0)
  t.true(priceUsd > 0)
})
test(`Get ${XTK_ETH_CLR} prices`, async (t) => {
  const { kyberProxyContract, xAssetCLRContract } = await getXAssetCLRContracts(
    XTK_ETH_CLR,
    provider
  )
  const { aum, priceEth, priceUsd } = await getXAssetCLRPrices(
    xAssetCLRContract,
    kyberProxyContract
  )
  console.log(`${XTK_ETH_CLR} aum:`, aum)
  console.log(`${XTK_ETH_CLR} priceEth:`, priceEth)
  console.log(`${XTK_ETH_CLR} priceUsd:`, priceUsd)
  t.true(aum > 0)
  t.true(priceEth > 0)
  t.true(priceUsd > 0)
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpY2VzLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi9jbHIvcHJpY2VzLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLGlCQUFpQixFQUNqQixtQkFBbUIsRUFDbkIsV0FBVyxHQUNaLE1BQU0sY0FBYyxDQUFBO0FBQ3JCLE9BQU8sSUFBSSxNQUFNLEtBQUssQ0FBQTtBQUV0QixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sc0JBQXNCLENBQUE7QUFFL0MsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sVUFBVSxDQUFBO0FBQ2hELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUU3QyxJQUFJLENBQUMsT0FBTyxpQkFBaUIsU0FBUyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUNsRCxNQUFNLEVBQUUsa0JBQWtCLEVBQUUsaUJBQWlCLEVBQUUsR0FBRyxNQUFNLHFCQUFxQixDQUMzRSxpQkFBaUIsRUFDakIsUUFBUSxDQUNULENBQUE7SUFFRCxNQUFNLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsR0FBRyxNQUFNLGtCQUFrQixDQUMxRCxpQkFBaUIsRUFDakIsa0JBQWtCLENBQ25CLENBQUE7SUFFRCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsaUJBQWlCLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQTtJQUM3QyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsaUJBQWlCLFlBQVksRUFBRSxRQUFRLENBQUMsQ0FBQTtJQUN2RCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsaUJBQWlCLFlBQVksRUFBRSxRQUFRLENBQUMsQ0FBQTtJQUN2RCxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQTtJQUNmLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFBO0lBQ3BCLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQ3RCLENBQUMsQ0FBQyxDQUFBO0FBRUYsSUFBSSxDQUFDLE9BQU8sbUJBQW1CLFNBQVMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDcEQsTUFBTSxFQUFFLGtCQUFrQixFQUFFLGlCQUFpQixFQUFFLEdBQUcsTUFBTSxxQkFBcUIsQ0FDM0UsbUJBQW1CLEVBQ25CLFFBQVEsQ0FDVCxDQUFBO0lBRUQsTUFBTSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEdBQUcsTUFBTSxrQkFBa0IsQ0FDMUQsaUJBQWlCLEVBQ2pCLGtCQUFrQixDQUNuQixDQUFBO0lBRUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLG1CQUFtQixPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUE7SUFDL0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLG1CQUFtQixZQUFZLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFDekQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLG1CQUFtQixZQUFZLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFDekQsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUE7SUFDZixDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQTtJQUNwQixDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUN0QixDQUFDLENBQUMsQ0FBQTtBQUVGLElBQUksQ0FBQyxPQUFPLFdBQVcsU0FBUyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUM1QyxNQUFNLEVBQUUsa0JBQWtCLEVBQUUsaUJBQWlCLEVBQUUsR0FBRyxNQUFNLHFCQUFxQixDQUMzRSxXQUFXLEVBQ1gsUUFBUSxDQUNULENBQUE7SUFFRCxNQUFNLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsR0FBRyxNQUFNLGtCQUFrQixDQUMxRCxpQkFBaUIsRUFDakIsa0JBQWtCLENBQ25CLENBQUE7SUFFRCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsV0FBVyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUE7SUFDdkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLFdBQVcsWUFBWSxFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBQ2pELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxXQUFXLFlBQVksRUFBRSxRQUFRLENBQUMsQ0FBQTtJQUNqRCxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQTtJQUNmLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFBO0lBQ3BCLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQ3RCLENBQUMsQ0FBQyxDQUFBIn0=