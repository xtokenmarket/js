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
      abis_1.X_AAVE_A,
      '1',
      abis_1.BUY,
      undefined,
      constants_spec_1.provider
    )
    console.log('[UniswapV3] Expected xAAVEa qty for 1 AAVE:', expectedQty)
    t.true(Number(expectedQty) > 0)
  }
)
ava_1.default(
  'Calculate expected quantity on burn of xAAVEa on UniswapV3',
  async (t) => {
    const expectedQty = await uniswapV3_1.getUniswapV3EstimatedQty(
      abis_1.X_AAVE_A,
      abis_1.X_AAVE_A,
      '100',
      abis_1.SELL,
      undefined,
      constants_spec_1.provider
    )
    console.log('[UniswapV3] Expected AAVE qty for 100 xAAVEa:', expectedQty)
    t.true(Number(expectedQty) > 0)
  }
)
ava_1.default('Get ETH price in USDC on UniswapV3', async (t) => {
  const expectedQtyMainnet = await uniswapV3_1.getEthUsdcPriceUniswapV3(
    constants_spec_1.provider
  )
  console.log('[Mainnet/UniswapV3] 1 ETH price in USDC:', expectedQtyMainnet)
  t.true(Number(expectedQtyMainnet) > 0)
  const expectedQtyArbitrum = await uniswapV3_1.getEthUsdcPriceUniswapV3(
    constants_spec_1.arbitrumProvider
  )
  console.log('[Arbitrum/UniswapV3] 1 ETH price in USDC:', expectedQtyArbitrum)
  t.true(Number(expectedQtyArbitrum) > 0)
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pc3dhcFYzLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi9leGNoYW5nZXMvdW5pc3dhcFYzLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSx1Q0FBa0Q7QUFDbEQsOENBQXNCO0FBRXRCLHlEQUFpRTtBQUVqRSwyQ0FBZ0Y7QUFFaEYsYUFBSSxDQUFDLDREQUE0RCxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUM3RSxNQUFNLFdBQVcsR0FBRyxNQUFNLG9DQUF3QixDQUNoRCxlQUFRLEVBQ1IsZUFBUSxFQUNSLEdBQUcsRUFDSCxVQUFHLEVBQ0gsU0FBUyxFQUNULHlCQUFRLENBQ1QsQ0FBQTtJQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsNkNBQTZDLEVBQUUsV0FBVyxDQUFDLENBQUE7SUFDdkUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7QUFDakMsQ0FBQyxDQUFDLENBQUE7QUFFRixhQUFJLENBQUMsNERBQTRELEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQzdFLE1BQU0sV0FBVyxHQUFHLE1BQU0sb0NBQXdCLENBQ2hELGVBQVEsRUFDUixlQUFRLEVBQ1IsS0FBSyxFQUNMLFdBQUksRUFDSixTQUFTLEVBQ1QseUJBQVEsQ0FDVCxDQUFBO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQywrQ0FBK0MsRUFBRSxXQUFXLENBQUMsQ0FBQTtJQUN6RSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUNqQyxDQUFDLENBQUMsQ0FBQTtBQUVGLGFBQUksQ0FBQyxvQ0FBb0MsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDckQsTUFBTSxrQkFBa0IsR0FBRyxNQUFNLG9DQUF3QixDQUFDLHlCQUFRLENBQUMsQ0FBQTtJQUNuRSxPQUFPLENBQUMsR0FBRyxDQUFDLDBDQUEwQyxFQUFFLGtCQUFrQixDQUFDLENBQUE7SUFDM0UsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtJQUV0QyxNQUFNLG1CQUFtQixHQUFHLE1BQU0sb0NBQXdCLENBQUMsaUNBQWdCLENBQUMsQ0FBQTtJQUM1RSxPQUFPLENBQUMsR0FBRyxDQUFDLDJDQUEyQyxFQUFFLG1CQUFtQixDQUFDLENBQUE7SUFDN0UsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUN6QyxDQUFDLENBQUMsQ0FBQSJ9
