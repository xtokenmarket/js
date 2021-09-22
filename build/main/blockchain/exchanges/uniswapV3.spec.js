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
const uniswapV3_1 = require('./uniswapV3')
ava_1.default(
  'Calculate expected quantity on mint of xAAVEa on UniswapV3',
  async (t) => {
    const expectedQty = await uniswapV3_1.getUniswapV3EstimatedQty(
      abis_1.X_AAVE_A,
      '0.00001',
      abis_1.BUY,
      constants_spec_1.provider
    )
    console.log(
      '[UniswapV3] Expected xAAVEa qty for 0.00001 AAVE:',
      expectedQty
    )
    t.true(Number(expectedQty) > 0)
  }
)
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pc3dhcFYzLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi9leGNoYW5nZXMvdW5pc3dhcFYzLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSx1Q0FBNEM7QUFDNUMsOENBQXNCO0FBRXRCLHlEQUErQztBQUUvQywyQ0FBc0Q7QUFFdEQsYUFBSSxDQUFDLDREQUE0RCxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUM3RSxNQUFNLFdBQVcsR0FBRyxNQUFNLG9DQUF3QixDQUNoRCxlQUFRLEVBQ1IsU0FBUyxFQUNULFVBQUcsRUFDSCx5QkFBUSxDQUNULENBQUE7SUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLG1EQUFtRCxFQUFFLFdBQVcsQ0FBQyxDQUFBO0lBQzdFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQ2pDLENBQUMsQ0FBQyxDQUFBIn0=
