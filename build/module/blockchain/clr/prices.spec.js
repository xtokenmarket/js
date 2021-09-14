import { AAVE_X_AAVE_A_CLR, XTK_ETH_CLR } from '@xtoken/abis'
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpY2VzLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi9jbHIvcHJpY2VzLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFdBQVcsRUFBRSxNQUFNLGNBQWMsQ0FBQTtBQUM3RCxPQUFPLElBQUksTUFBTSxLQUFLLENBQUE7QUFFdEIsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHNCQUFzQixDQUFBO0FBRS9DLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUNoRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxVQUFVLENBQUE7QUFFN0MsSUFBSSxDQUFDLE9BQU8saUJBQWlCLFNBQVMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDbEQsTUFBTSxFQUFFLGtCQUFrQixFQUFFLGlCQUFpQixFQUFFLEdBQUcsTUFBTSxxQkFBcUIsQ0FDM0UsaUJBQWlCLEVBQ2pCLFFBQVEsQ0FDVCxDQUFBO0lBRUQsTUFBTSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEdBQUcsTUFBTSxrQkFBa0IsQ0FDMUQsaUJBQWlCLEVBQ2pCLGtCQUFrQixDQUNuQixDQUFBO0lBRUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLGlCQUFpQixPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUE7SUFDN0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLGlCQUFpQixZQUFZLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFDdkQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLGlCQUFpQixZQUFZLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFDdkQsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUE7SUFDZixDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQTtJQUNwQixDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUN0QixDQUFDLENBQUMsQ0FBQTtBQUVGLElBQUksQ0FBQyxPQUFPLFdBQVcsU0FBUyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUM1QyxNQUFNLEVBQUUsa0JBQWtCLEVBQUUsaUJBQWlCLEVBQUUsR0FBRyxNQUFNLHFCQUFxQixDQUMzRSxXQUFXLEVBQ1gsUUFBUSxDQUNULENBQUE7SUFFRCxNQUFNLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsR0FBRyxNQUFNLGtCQUFrQixDQUMxRCxpQkFBaUIsRUFDakIsa0JBQWtCLENBQ25CLENBQUE7SUFFRCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsV0FBVyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUE7SUFDdkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLFdBQVcsWUFBWSxFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBQ2pELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxXQUFXLFlBQVksRUFBRSxRQUFRLENBQUMsQ0FBQTtJQUNqRCxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQTtJQUNmLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFBO0lBQ3BCLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQ3RCLENBQUMsQ0FBQyxDQUFBIn0=
