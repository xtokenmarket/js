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
const redeem_1 = require('./redeem')
ava_1.default(
  `Get maximum redeemable ${abis_1.AAVE_X_AAVE_A_CLR} when burning`,
  async (t) => {
    const maxRedeemable = await redeem_1.getMaximumRedeemableXAssetCLR(
      abis_1.AAVE_X_AAVE_A_CLR,
      constants_spec_1.provider
    )
    console.log(
      `Maximum redeemable ${abis_1.AAVE_X_AAVE_A_CLR} when burning:`,
      maxRedeemable
    )
    t.true(Number(maxRedeemable) > 0)
  }
)
ava_1.default(
  `Get maximum redeemable ${abis_1.XTK_ETH_CLR} when burning`,
  async (t) => {
    const maxRedeemable = await redeem_1.getMaximumRedeemableXAssetCLR(
      abis_1.XTK_ETH_CLR,
      constants_spec_1.provider
    )
    console.log(
      `Maximum redeemable ${abis_1.XTK_ETH_CLR} when burning:`,
      maxRedeemable
    )
    t.true(Number(maxRedeemable) > 0)
  }
)
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkZWVtLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi9jbHIvcmVkZWVtLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSx1Q0FBNkQ7QUFDN0QsOENBQXNCO0FBRXRCLHlEQUErQztBQUUvQyxxQ0FBd0Q7QUFFeEQsYUFBSSxDQUFDLDBCQUEwQix3QkFBaUIsZUFBZSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUMzRSxNQUFNLGFBQWEsR0FBRyxNQUFNLHNDQUE2QixDQUN2RCx3QkFBaUIsRUFDakIseUJBQVEsQ0FDVCxDQUFBO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FDVCxzQkFBc0Isd0JBQWlCLGdCQUFnQixFQUN2RCxhQUFhLENBQ2QsQ0FBQTtJQUNELENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQ25DLENBQUMsQ0FBQyxDQUFBO0FBRUYsYUFBSSxDQUFDLDBCQUEwQixrQkFBVyxlQUFlLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQ3JFLE1BQU0sYUFBYSxHQUFHLE1BQU0sc0NBQTZCLENBQ3ZELGtCQUFXLEVBQ1gseUJBQVEsQ0FDVCxDQUFBO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0Isa0JBQVcsZ0JBQWdCLEVBQUUsYUFBYSxDQUFDLENBQUE7SUFDN0UsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7QUFDbkMsQ0FBQyxDQUFDLENBQUEifQ==
