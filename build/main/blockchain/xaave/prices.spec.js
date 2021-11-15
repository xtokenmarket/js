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
ava_1.default('Get xAAVEa prices', async (t) => {
  const { xaaveContract } = await helper_1.getXAaveContracts(
    abis_1.X_AAVE_A,
    constants_spec_1.provider
  )
  const { aum, priceEth, priceUsd } = await prices_1.getXAavePrices(
    xaaveContract
  )
  console.log('xAAVEa aum:', aum)
  console.log('xAAVEa priceEth:', priceEth)
  console.log('xAAVEa priceUsd:', priceUsd)
  t.true(aum > 0)
  t.true(priceEth > 0)
  t.true(priceUsd > 0)
})
ava_1.default('Get xAAVEb prices', async (t) => {
  const { xaaveContract } = await helper_1.getXAaveContracts(
    abis_1.X_AAVE_B,
    constants_spec_1.provider
  )
  const { aum, priceEth, priceUsd } = await prices_1.getXAavePrices(
    xaaveContract
  )
  console.log('xAAVEb aum:', aum)
  console.log('xAAVEb priceEth:', priceEth)
  console.log('xAAVEb priceUsd:', priceUsd)
  t.true(aum > 0)
  t.true(priceEth > 0)
  t.true(priceUsd > 0)
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpY2VzLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi94YWF2ZS9wcmljZXMuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHVDQUFpRDtBQUNqRCw4Q0FBc0I7QUFFdEIseURBQStDO0FBRS9DLHFDQUE0QztBQUM1QyxxQ0FBeUM7QUFFekMsYUFBSSxDQUFDLG1CQUFtQixFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUNwQyxNQUFNLEVBQUUsYUFBYSxFQUFFLEdBQUcsTUFBTSwwQkFBaUIsQ0FBQyxlQUFRLEVBQUUseUJBQVEsQ0FBQyxDQUFBO0lBRXJFLE1BQU0sRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxHQUFHLE1BQU0sdUJBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQTtJQUV2RSxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxHQUFHLENBQUMsQ0FBQTtJQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBQ3pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFDekMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUE7SUFDZixDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQTtJQUNwQixDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUN0QixDQUFDLENBQUMsQ0FBQTtBQUVGLGFBQUksQ0FBQyxtQkFBbUIsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDcEMsTUFBTSxFQUFFLGFBQWEsRUFBRSxHQUFHLE1BQU0sMEJBQWlCLENBQUMsZUFBUSxFQUFFLHlCQUFRLENBQUMsQ0FBQTtJQUVyRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsR0FBRyxNQUFNLHVCQUFjLENBQUMsYUFBYSxDQUFDLENBQUE7SUFFdkUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsR0FBRyxDQUFDLENBQUE7SUFDL0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxRQUFRLENBQUMsQ0FBQTtJQUN6QyxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBQ3pDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFBO0lBQ2YsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUE7SUFDcEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUE7QUFDdEIsQ0FBQyxDQUFDLENBQUEifQ==
