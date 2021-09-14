'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const abis_1 = require('@xtoken/abis')
const ava_1 = __importDefault(require('ava'))
const constants_spec_1 = require('../../constants.spec')
const helper_1 = require('./helper')
const prices_1 = require('./prices')
ava_1.default(`Get ${abis_1.AAVE_X_AAVE_A_CLR} prices`, async (t) => {
  const {
    kyberProxyContract,
    xAssetCLRContract,
  } = await helper_1.getXAssetCLRContracts(
    abis_1.AAVE_X_AAVE_A_CLR,
    constants_spec_1.provider
  )
  const { aum, priceEth, priceUsd } = await prices_1.getXAssetCLRPrices(
    xAssetCLRContract,
    kyberProxyContract
  )
  console.log(`${abis_1.AAVE_X_AAVE_A_CLR} aum:`, aum)
  console.log(`${abis_1.AAVE_X_AAVE_A_CLR} priceEth:`, priceEth)
  console.log(`${abis_1.AAVE_X_AAVE_A_CLR} priceUsd:`, priceUsd)
  t.true(aum > 0)
  t.true(priceEth > 0)
  t.true(priceUsd > 0)
})
ava_1.default(`Get ${abis_1.XTK_ETH_CLR} prices`, async (t) => {
  const {
    kyberProxyContract,
    xAssetCLRContract,
  } = await helper_1.getXAssetCLRContracts(
    abis_1.XTK_ETH_CLR,
    constants_spec_1.provider
  )
  const { aum, priceEth, priceUsd } = await prices_1.getXAssetCLRPrices(
    xAssetCLRContract,
    kyberProxyContract
  )
  console.log(`${abis_1.XTK_ETH_CLR} aum:`, aum)
  console.log(`${abis_1.XTK_ETH_CLR} priceEth:`, priceEth)
  console.log(`${abis_1.XTK_ETH_CLR} priceUsd:`, priceUsd)
  t.true(aum > 0)
  t.true(priceEth > 0)
  t.true(priceUsd > 0)
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpY2VzLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi9jbHIvcHJpY2VzLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSx1Q0FBNkQ7QUFDN0QsOENBQXNCO0FBRXRCLHlEQUErQztBQUUvQyxxQ0FBZ0Q7QUFDaEQscUNBQTZDO0FBRTdDLGFBQUksQ0FBQyxPQUFPLHdCQUFpQixTQUFTLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQ2xELE1BQU0sRUFBRSxrQkFBa0IsRUFBRSxpQkFBaUIsRUFBRSxHQUFHLE1BQU0sOEJBQXFCLENBQzNFLHdCQUFpQixFQUNqQix5QkFBUSxDQUNULENBQUE7SUFFRCxNQUFNLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsR0FBRyxNQUFNLDJCQUFrQixDQUMxRCxpQkFBaUIsRUFDakIsa0JBQWtCLENBQ25CLENBQUE7SUFFRCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsd0JBQWlCLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQTtJQUM3QyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsd0JBQWlCLFlBQVksRUFBRSxRQUFRLENBQUMsQ0FBQTtJQUN2RCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsd0JBQWlCLFlBQVksRUFBRSxRQUFRLENBQUMsQ0FBQTtJQUN2RCxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQTtJQUNmLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFBO0lBQ3BCLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQ3RCLENBQUMsQ0FBQyxDQUFBO0FBRUYsYUFBSSxDQUFDLE9BQU8sa0JBQVcsU0FBUyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUM1QyxNQUFNLEVBQUUsa0JBQWtCLEVBQUUsaUJBQWlCLEVBQUUsR0FBRyxNQUFNLDhCQUFxQixDQUMzRSxrQkFBVyxFQUNYLHlCQUFRLENBQ1QsQ0FBQTtJQUVELE1BQU0sRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxHQUFHLE1BQU0sMkJBQWtCLENBQzFELGlCQUFpQixFQUNqQixrQkFBa0IsQ0FDbkIsQ0FBQTtJQUVELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxrQkFBVyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUE7SUFDdkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLGtCQUFXLFlBQVksRUFBRSxRQUFRLENBQUMsQ0FBQTtJQUNqRCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsa0JBQVcsWUFBWSxFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBQ2pELENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFBO0lBQ2YsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUE7SUFDcEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUE7QUFDdEIsQ0FBQyxDQUFDLENBQUEifQ==
