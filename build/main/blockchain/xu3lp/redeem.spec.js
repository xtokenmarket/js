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
  'Get maximum redeemable xU3LPa when burning to DAI',
  async (t) => {
    const maxRedeemable = await redeem_1.getMaximumRedeemableXU3LP(
      abis_1.X_U3LP_A,
      0,
      constants_spec_1.provider
    )
    console.log('Maximum redeemable xU3LPa when burning to DAI:', maxRedeemable)
    t.true(Number(maxRedeemable) > 0)
  }
)
ava_1.default(
  'Get maximum redeemable xU3LPa when burning to USDC',
  async (t) => {
    const maxRedeemable = await redeem_1.getMaximumRedeemableXU3LP(
      abis_1.X_U3LP_A,
      1,
      constants_spec_1.provider
    )
    console.log(
      'Maximum redeemable xU3LPa when burning to USDC:',
      maxRedeemable
    )
    t.true(Number(maxRedeemable) > 0)
  }
)
ava_1.default(
  'Get maximum redeemable xU3LPb when burning to USDC',
  async (t) => {
    const maxRedeemable = await redeem_1.getMaximumRedeemableXU3LP(
      abis_1.X_U3LP_B,
      0,
      constants_spec_1.provider
    )
    console.log(
      'Maximum redeemable xU3LPb when burning to USDC:',
      maxRedeemable
    )
    t.true(Number(maxRedeemable) > 0)
  }
)
ava_1.default(
  'Get maximum redeemable xU3LPb when burning to USDT',
  async (t) => {
    const maxRedeemable = await redeem_1.getMaximumRedeemableXU3LP(
      abis_1.X_U3LP_B,
      1,
      constants_spec_1.provider
    )
    console.log(
      'Maximum redeemable xU3LPb when burning to USDT:',
      maxRedeemable
    )
    t.true(Number(maxRedeemable) > 0)
  }
)
ava_1.default(
  'Get maximum redeemable xU3LPc when burning to sUSD',
  async (t) => {
    const maxRedeemable = await redeem_1.getMaximumRedeemableXU3LP(
      abis_1.X_U3LP_C,
      0,
      constants_spec_1.provider
    )
    console.log(
      'Maximum redeemable xU3LPc when burning to sUSD:',
      maxRedeemable
    )
    t.true(Number(maxRedeemable) > 0)
  }
)
ava_1.default(
  'Get maximum redeemable xU3LPc when burning to USDC',
  async (t) => {
    const maxRedeemable = await redeem_1.getMaximumRedeemableXU3LP(
      abis_1.X_U3LP_C,
      1,
      constants_spec_1.provider
    )
    console.log(
      'Maximum redeemable xU3LPc when burning to USDC:',
      maxRedeemable
    )
    t.true(Number(maxRedeemable) > 0)
  }
)
ava_1.default(
  'Get maximum redeemable xU3LPd when burning to sETH',
  async (t) => {
    const maxRedeemable = await redeem_1.getMaximumRedeemableXU3LP(
      abis_1.X_U3LP_D,
      0,
      constants_spec_1.provider
    )
    console.log(
      'Maximum redeemable xU3LPd when burning to sETH:',
      maxRedeemable
    )
    t.true(Number(maxRedeemable) > 0)
  }
)
ava_1.default(
  'Get maximum redeemable xU3LPd when burning to WETH',
  async (t) => {
    const maxRedeemable = await redeem_1.getMaximumRedeemableXU3LP(
      abis_1.X_U3LP_D,
      1,
      constants_spec_1.provider
    )
    console.log(
      'Maximum redeemable xU3LPd when burning to WETH:',
      maxRedeemable
    )
    t.true(Number(maxRedeemable) > 0)
  }
)
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkZWVtLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi94dTNscC9yZWRlZW0uc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHVDQUFxRTtBQUNyRSw4Q0FBc0I7QUFFdEIseURBQStDO0FBRS9DLHFDQUFvRDtBQUVwRCxhQUFJLENBQUMsbURBQW1ELEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQ3BFLE1BQU0sYUFBYSxHQUFHLE1BQU0sa0NBQXlCLENBQUMsZUFBUSxFQUFFLENBQUMsRUFBRSx5QkFBUSxDQUFDLENBQUE7SUFDNUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnREFBZ0QsRUFBRSxhQUFhLENBQUMsQ0FBQTtJQUM1RSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUNuQyxDQUFDLENBQUMsQ0FBQTtBQUVGLGFBQUksQ0FBQyxvREFBb0QsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDckUsTUFBTSxhQUFhLEdBQUcsTUFBTSxrQ0FBeUIsQ0FBQyxlQUFRLEVBQUUsQ0FBQyxFQUFFLHlCQUFRLENBQUMsQ0FBQTtJQUM1RSxPQUFPLENBQUMsR0FBRyxDQUFDLGlEQUFpRCxFQUFFLGFBQWEsQ0FBQyxDQUFBO0lBQzdFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQ25DLENBQUMsQ0FBQyxDQUFBO0FBRUYsYUFBSSxDQUFDLG9EQUFvRCxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUNyRSxNQUFNLGFBQWEsR0FBRyxNQUFNLGtDQUF5QixDQUFDLGVBQVEsRUFBRSxDQUFDLEVBQUUseUJBQVEsQ0FBQyxDQUFBO0lBQzVFLE9BQU8sQ0FBQyxHQUFHLENBQUMsaURBQWlELEVBQUUsYUFBYSxDQUFDLENBQUE7SUFDN0UsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7QUFDbkMsQ0FBQyxDQUFDLENBQUE7QUFFRixhQUFJLENBQUMsb0RBQW9ELEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQ3JFLE1BQU0sYUFBYSxHQUFHLE1BQU0sa0NBQXlCLENBQUMsZUFBUSxFQUFFLENBQUMsRUFBRSx5QkFBUSxDQUFDLENBQUE7SUFDNUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpREFBaUQsRUFBRSxhQUFhLENBQUMsQ0FBQTtJQUM3RSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUNuQyxDQUFDLENBQUMsQ0FBQTtBQUVGLGFBQUksQ0FBQyxvREFBb0QsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDckUsTUFBTSxhQUFhLEdBQUcsTUFBTSxrQ0FBeUIsQ0FBQyxlQUFRLEVBQUUsQ0FBQyxFQUFFLHlCQUFRLENBQUMsQ0FBQTtJQUM1RSxPQUFPLENBQUMsR0FBRyxDQUFDLGlEQUFpRCxFQUFFLGFBQWEsQ0FBQyxDQUFBO0lBQzdFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQ25DLENBQUMsQ0FBQyxDQUFBO0FBRUYsYUFBSSxDQUFDLG9EQUFvRCxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUNyRSxNQUFNLGFBQWEsR0FBRyxNQUFNLGtDQUF5QixDQUFDLGVBQVEsRUFBRSxDQUFDLEVBQUUseUJBQVEsQ0FBQyxDQUFBO0lBQzVFLE9BQU8sQ0FBQyxHQUFHLENBQUMsaURBQWlELEVBQUUsYUFBYSxDQUFDLENBQUE7SUFDN0UsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7QUFDbkMsQ0FBQyxDQUFDLENBQUE7QUFFRixhQUFJLENBQUMsb0RBQW9ELEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQ3JFLE1BQU0sYUFBYSxHQUFHLE1BQU0sa0NBQXlCLENBQUMsZUFBUSxFQUFFLENBQUMsRUFBRSx5QkFBUSxDQUFDLENBQUE7SUFDNUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpREFBaUQsRUFBRSxhQUFhLENBQUMsQ0FBQTtJQUM3RSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUNuQyxDQUFDLENBQUMsQ0FBQTtBQUVGLGFBQUksQ0FBQyxvREFBb0QsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDckUsTUFBTSxhQUFhLEdBQUcsTUFBTSxrQ0FBeUIsQ0FBQyxlQUFRLEVBQUUsQ0FBQyxFQUFFLHlCQUFRLENBQUMsQ0FBQTtJQUM1RSxPQUFPLENBQUMsR0FBRyxDQUFDLGlEQUFpRCxFQUFFLGFBQWEsQ0FBQyxDQUFBO0lBQzdFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQ25DLENBQUMsQ0FBQyxDQUFBIn0=
