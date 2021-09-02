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
const price_1 = require('./price')
ava_1.default('Get xAAVEa lending price', async (t) => {
  const price = await price_1.getLendingPrice(
    abis_1.LENDING_X_AAVE_A_PRICE,
    constants_spec_1.provider
  )
  console.log('[Lending] xAAVEa lending price:', price)
  t.true(Number(price) >= 0)
})
ava_1.default('Get xAAVEb lending price', async (t) => {
  const price = await price_1.getLendingPrice(
    abis_1.LENDING_X_AAVE_B_PRICE,
    constants_spec_1.provider
  )
  console.log('[Lending] xAAVEb lending price:', price)
  t.true(Number(price) >= 0)
})
ava_1.default('Get xINCHa lending price', async (t) => {
  const price = await price_1.getLendingPrice(
    abis_1.LENDING_X_INCH_A_PRICE,
    constants_spec_1.provider
  )
  console.log('[Lending] xINCHa lending price:', price)
  t.true(Number(price) >= 0)
})
ava_1.default('Get xINCHb lending price', async (t) => {
  const price = await price_1.getLendingPrice(
    abis_1.LENDING_X_INCH_B_PRICE,
    constants_spec_1.provider
  )
  console.log('[Lending] xINCHb lending price:', price)
  t.true(Number(price) >= 0)
})
ava_1.default('Get xKNCa lending price', async (t) => {
  const price = await price_1.getLendingPrice(
    abis_1.LENDING_X_KNC_A_PRICE,
    constants_spec_1.provider
  )
  console.log('[Lending] xKNCa lending price:', price)
  t.true(Number(price) >= 0)
})
ava_1.default('Get xKNCb lending price', async (t) => {
  const price = await price_1.getLendingPrice(
    abis_1.LENDING_X_KNC_B_PRICE,
    constants_spec_1.provider
  )
  console.log('[Lending] xKNCb lending price:', price)
  t.true(Number(price) >= 0)
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpY2Uuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9ibG9ja2NoYWluL2xlbmRpbmcvcHJpY2Uuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHVDQU9xQjtBQUNyQiw4Q0FBc0I7QUFFdEIseURBQStDO0FBRS9DLG1DQUF5QztBQUV6QyxhQUFJLENBQUMsMEJBQTBCLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQzNDLE1BQU0sS0FBSyxHQUFHLE1BQU0sdUJBQWUsQ0FBQyw2QkFBc0IsRUFBRSx5QkFBUSxDQUFDLENBQUE7SUFDckUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQ0FBaUMsRUFBRSxLQUFLLENBQUMsQ0FBQTtJQUNyRCxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtBQUM1QixDQUFDLENBQUMsQ0FBQTtBQUVGLGFBQUksQ0FBQywwQkFBMEIsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDM0MsTUFBTSxLQUFLLEdBQUcsTUFBTSx1QkFBZSxDQUFDLDZCQUFzQixFQUFFLHlCQUFRLENBQUMsQ0FBQTtJQUNyRSxPQUFPLENBQUMsR0FBRyxDQUFDLGlDQUFpQyxFQUFFLEtBQUssQ0FBQyxDQUFBO0lBQ3JELENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO0FBQzVCLENBQUMsQ0FBQyxDQUFBO0FBRUYsYUFBSSxDQUFDLDBCQUEwQixFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUMzQyxNQUFNLEtBQUssR0FBRyxNQUFNLHVCQUFlLENBQUMsNkJBQXNCLEVBQUUseUJBQVEsQ0FBQyxDQUFBO0lBQ3JFLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUNBQWlDLEVBQUUsS0FBSyxDQUFDLENBQUE7SUFDckQsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7QUFDNUIsQ0FBQyxDQUFDLENBQUE7QUFFRixhQUFJLENBQUMsMEJBQTBCLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQzNDLE1BQU0sS0FBSyxHQUFHLE1BQU0sdUJBQWUsQ0FBQyw2QkFBc0IsRUFBRSx5QkFBUSxDQUFDLENBQUE7SUFDckUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQ0FBaUMsRUFBRSxLQUFLLENBQUMsQ0FBQTtJQUNyRCxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtBQUM1QixDQUFDLENBQUMsQ0FBQTtBQUVGLGFBQUksQ0FBQyx5QkFBeUIsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDMUMsTUFBTSxLQUFLLEdBQUcsTUFBTSx1QkFBZSxDQUFDLDRCQUFxQixFQUFFLHlCQUFRLENBQUMsQ0FBQTtJQUNwRSxPQUFPLENBQUMsR0FBRyxDQUFDLGdDQUFnQyxFQUFFLEtBQUssQ0FBQyxDQUFBO0lBQ3BELENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO0FBQzVCLENBQUMsQ0FBQyxDQUFBO0FBRUYsYUFBSSxDQUFDLHlCQUF5QixFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUMxQyxNQUFNLEtBQUssR0FBRyxNQUFNLHVCQUFlLENBQUMsNEJBQXFCLEVBQUUseUJBQVEsQ0FBQyxDQUFBO0lBQ3BFLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0NBQWdDLEVBQUUsS0FBSyxDQUFDLENBQUE7SUFDcEQsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7QUFDNUIsQ0FBQyxDQUFDLENBQUEifQ==
