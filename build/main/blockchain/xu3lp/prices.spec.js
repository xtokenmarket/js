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
ava_1.default('Get xU3LPa prices', async (t) => {
  const {
    kyberProxyContract,
    xu3lpContract,
  } = await helper_1.getXU3LPContracts(
    abis_1.X_U3LP_A,
    constants_spec_1.provider
  )
  const { aum, priceEth, priceUsd } = await prices_1.getXU3LPPrices(
    xu3lpContract,
    kyberProxyContract
  )
  console.log('xU3LPa aum:', aum)
  console.log('xU3LPa priceEth:', priceEth)
  console.log('xU3LPa priceUsd:', priceUsd)
  t.true(aum > 0)
  t.true(priceEth > 0)
  t.true(priceUsd > 0)
})
ava_1.default('Get xU3LPb prices', async (t) => {
  const {
    kyberProxyContract,
    xu3lpContract,
  } = await helper_1.getXU3LPContracts(
    abis_1.X_U3LP_B,
    constants_spec_1.provider
  )
  const { aum, priceEth, priceUsd } = await prices_1.getXU3LPPrices(
    xu3lpContract,
    kyberProxyContract
  )
  console.log('xU3LPb aum:', aum)
  console.log('xU3LPb priceEth:', priceEth)
  console.log('xU3LPb priceUsd:', priceUsd)
  t.true(aum > 0)
  t.true(priceEth > 0)
  t.true(priceUsd > 0)
})
ava_1.default('Get xU3LPc prices', async (t) => {
  const {
    kyberProxyContract,
    xu3lpContract,
  } = await helper_1.getXU3LPContracts(
    abis_1.X_U3LP_C,
    constants_spec_1.provider
  )
  const { aum, priceEth, priceUsd } = await prices_1.getXU3LPPrices(
    xu3lpContract,
    kyberProxyContract
  )
  console.log('xU3LPc aum:', aum)
  console.log('xU3LPc priceEth:', priceEth)
  console.log('xU3LPc priceUsd:', priceUsd)
  t.true(aum > 0)
  t.true(priceEth > 0)
  t.true(priceUsd > 0)
})
/*test('Get xU3LPd prices', async (t) => {
  const { kyberProxyContract, xu3lpContract } = await getXU3LPContracts(
    X_U3LP_D,
    provider
  )

  const { aum, priceEth, priceUsd } = await getXU3LPPrices(
    xu3lpContract,
    kyberProxyContract
  )

  console.log('xU3LPd aum:', aum)
  console.log('xU3LPd priceEth:', priceEth)
  console.log('xU3LPd priceUsd:', priceUsd)
  t.true(aum > 0)
  t.true(priceEth > 0)
  t.true(priceUsd > 0)
})*/
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpY2VzLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi94dTNscC9wcmljZXMuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHVDQUEyRDtBQUMzRCw4Q0FBc0I7QUFFdEIseURBQStDO0FBRS9DLHFDQUE0QztBQUM1QyxxQ0FBeUM7QUFFekMsYUFBSSxDQUFDLG1CQUFtQixFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUNwQyxNQUFNLEVBQUUsa0JBQWtCLEVBQUUsYUFBYSxFQUFFLEdBQUcsTUFBTSwwQkFBaUIsQ0FDbkUsZUFBUSxFQUNSLHlCQUFRLENBQ1QsQ0FBQTtJQUVELE1BQU0sRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxHQUFHLE1BQU0sdUJBQWMsQ0FDdEQsYUFBYSxFQUNiLGtCQUFrQixDQUNuQixDQUFBO0lBRUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsR0FBRyxDQUFDLENBQUE7SUFDL0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxRQUFRLENBQUMsQ0FBQTtJQUN6QyxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBQ3pDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFBO0lBQ2YsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUE7SUFDcEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUE7QUFDdEIsQ0FBQyxDQUFDLENBQUE7QUFFRixhQUFJLENBQUMsbUJBQW1CLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQ3BDLE1BQU0sRUFBRSxrQkFBa0IsRUFBRSxhQUFhLEVBQUUsR0FBRyxNQUFNLDBCQUFpQixDQUNuRSxlQUFRLEVBQ1IseUJBQVEsQ0FDVCxDQUFBO0lBRUQsTUFBTSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEdBQUcsTUFBTSx1QkFBYyxDQUN0RCxhQUFhLEVBQ2Isa0JBQWtCLENBQ25CLENBQUE7SUFFRCxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxHQUFHLENBQUMsQ0FBQTtJQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBQ3pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFDekMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUE7SUFDZixDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQTtJQUNwQixDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUN0QixDQUFDLENBQUMsQ0FBQTtBQUVGLGFBQUksQ0FBQyxtQkFBbUIsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDcEMsTUFBTSxFQUFFLGtCQUFrQixFQUFFLGFBQWEsRUFBRSxHQUFHLE1BQU0sMEJBQWlCLENBQ25FLGVBQVEsRUFDUix5QkFBUSxDQUNULENBQUE7SUFFRCxNQUFNLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsR0FBRyxNQUFNLHVCQUFjLENBQ3RELGFBQWEsRUFDYixrQkFBa0IsQ0FDbkIsQ0FBQTtJQUVELE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLEdBQUcsQ0FBQyxDQUFBO0lBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFDekMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxRQUFRLENBQUMsQ0FBQTtJQUN6QyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQTtJQUNmLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFBO0lBQ3BCLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQ3RCLENBQUMsQ0FBQyxDQUFBO0FBRUY7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBaUJJIn0=
