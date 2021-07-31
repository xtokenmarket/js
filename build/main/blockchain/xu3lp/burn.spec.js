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
const burn_1 = require('./burn')
ava_1.default(
  'Calculate expected quantity of DAI on burn of xU3LPa',
  async (t) => {
    const expectedQty = await burn_1.getExpectedQuantityOnBurnXU3LP(
      abis_1.X_U3LP_A,
      0,
      '1000',
      constants_spec_1.provider
    )
    console.log('Expected qty of DAI for 1000 xU3LPa:', expectedQty)
    t.true(Number(expectedQty) > 0)
  }
)
ava_1.default(
  'Calculate expected quantity of USDC on burn of xU3LPa',
  async (t) => {
    const expectedQty = await burn_1.getExpectedQuantityOnBurnXU3LP(
      abis_1.X_U3LP_A,
      1,
      '1000',
      constants_spec_1.provider
    )
    console.log('Expected qty of USDC for 1000 xU3LPa:', expectedQty)
    t.true(Number(expectedQty) > 0)
  }
)
ava_1.default(
  'Calculate expected quantity of USDC on burn of xU3LPb',
  async (t) => {
    const expectedQty = await burn_1.getExpectedQuantityOnBurnXU3LP(
      abis_1.X_U3LP_B,
      0,
      '1000',
      constants_spec_1.provider
    )
    console.log('Expected qty of USDC for 1000 xU3LPb:', expectedQty)
    t.true(Number(expectedQty) > 0)
  }
)
ava_1.default(
  'Calculate expected quantity of USDT on burn of xU3LPb',
  async (t) => {
    const expectedQty = await burn_1.getExpectedQuantityOnBurnXU3LP(
      abis_1.X_U3LP_B,
      1,
      '1000',
      constants_spec_1.provider
    )
    console.log('Expected qty of USDT for 1000 xU3LPb:', expectedQty)
    t.true(Number(expectedQty) > 0)
  }
)
ava_1.default(
  'Calculate expected quantity of sUSD on burn of xU3LPc',
  async (t) => {
    const expectedQty = await burn_1.getExpectedQuantityOnBurnXU3LP(
      abis_1.X_U3LP_C,
      0,
      '1000',
      constants_spec_1.provider
    )
    console.log('Expected qty of sUSD for 1000 xU3LPc:', expectedQty)
    t.true(Number(expectedQty) > 0)
  }
)
ava_1.default(
  'Calculate expected quantity of USDC on burn of xU3LPc',
  async (t) => {
    const expectedQty = await burn_1.getExpectedQuantityOnBurnXU3LP(
      abis_1.X_U3LP_C,
      1,
      '1000',
      constants_spec_1.provider
    )
    console.log('Expected qty of USDC for 1000 xU3LPc:', expectedQty)
    t.true(Number(expectedQty) > 0)
  }
)
ava_1.default(
  'Calculate expected quantity of sETH on burn of xU3LPd',
  async (t) => {
    const expectedQty = await burn_1.getExpectedQuantityOnBurnXU3LP(
      abis_1.X_U3LP_D,
      0,
      '1000',
      constants_spec_1.provider
    )
    console.log('Expected qty of sETH for 1000 xU3LPd:', expectedQty)
    t.true(Number(expectedQty) > 0)
  }
)
ava_1.default(
  'Calculate expected quantity of WETH on burn of xU3LPd',
  async (t) => {
    const expectedQty = await burn_1.getExpectedQuantityOnBurnXU3LP(
      abis_1.X_U3LP_D,
      1,
      '1000',
      constants_spec_1.provider
    )
    console.log('Expected qty of WETH for 1000 xU3LPd:', expectedQty)
    t.true(Number(expectedQty) > 0)
  }
)
ava_1.default(
  'Calculate expected quantity of WBTC on burn of xU3LPe',
  async (t) => {
    const expectedQty = await burn_1.getExpectedQuantityOnBurnXU3LP(
      abis_1.X_U3LP_E,
      0,
      '1000',
      constants_spec_1.provider
    )
    console.log('Expected qty of WBTC for 1000 xU3LPe:', expectedQty)
    t.true(Number(expectedQty) > 0)
  }
)
ava_1.default(
  'Calculate expected quantity of renBTC on burn of xU3LPe',
  async (t) => {
    const expectedQty = await burn_1.getExpectedQuantityOnBurnXU3LP(
      abis_1.X_U3LP_E,
      1,
      '1000',
      constants_spec_1.provider
    )
    console.log('Expected qty of renBTC for 1000 xU3LPe:', expectedQty)
    t.true(Number(expectedQty) > 0)
  }
)
ava_1.default(
  'Calculate expected quantity of UST on burn of xU3LPf',
  async (t) => {
    const expectedQty = await burn_1.getExpectedQuantityOnBurnXU3LP(
      abis_1.X_U3LP_F,
      0,
      '1000',
      constants_spec_1.provider
    )
    console.log('Expected qty of UST for 1000 xU3LPf:', expectedQty)
    t.true(Number(expectedQty) > 0)
  }
)
ava_1.default(
  'Calculate expected quantity of USDT on burn of xU3LPf',
  async (t) => {
    const expectedQty = await burn_1.getExpectedQuantityOnBurnXU3LP(
      abis_1.X_U3LP_F,
      1,
      '1000',
      constants_spec_1.provider
    )
    console.log('Expected qty of USDT for 1000 xU3LPf:', expectedQty)
    t.true(Number(expectedQty) > 0)
  }
)
ava_1.default(
  'Calculate expected quantity of FRAX on burn of xU3LPg',
  async (t) => {
    const expectedQty = await burn_1.getExpectedQuantityOnBurnXU3LP(
      abis_1.X_U3LP_G,
      0,
      '1000',
      constants_spec_1.provider
    )
    console.log('Expected qty of FRAX for 1000 xU3LPg:', expectedQty)
    t.true(Number(expectedQty) > 0)
  }
)
ava_1.default(
  'Calculate expected quantity of USDC on burn of xU3LPg',
  async (t) => {
    const expectedQty = await burn_1.getExpectedQuantityOnBurnXU3LP(
      abis_1.X_U3LP_G,
      1,
      '1000',
      constants_spec_1.provider
    )
    console.log('Expected qty of USDC for 1000 xU3LPg:', expectedQty)
    t.true(Number(expectedQty) > 0)
  }
)
ava_1.default(
  'Calculate expected quantity of BUSD on burn of xU3LPh',
  async (t) => {
    const expectedQty = await burn_1.getExpectedQuantityOnBurnXU3LP(
      abis_1.X_U3LP_H,
      0,
      '1000',
      constants_spec_1.provider
    )
    console.log('Expected qty of BUSD for 1000 xU3LPh:', expectedQty)
    t.true(Number(expectedQty) > 0)
  }
)
ava_1.default(
  'Calculate expected quantity of USDT on burn of xU3LPh',
  async (t) => {
    const expectedQty = await burn_1.getExpectedQuantityOnBurnXU3LP(
      abis_1.X_U3LP_H,
      1,
      '1000',
      constants_spec_1.provider
    )
    console.log('Expected qty of USDT for 1000 xU3LPh:', expectedQty)
    t.true(Number(expectedQty) > 0)
  }
)
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVybi5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veHUzbHAvYnVybi5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsdUNBU3FCO0FBQ3JCLDhDQUFzQjtBQUV0Qix5REFBK0M7QUFFL0MsaUNBQXVEO0FBRXZELGFBQUksQ0FBQyxzREFBc0QsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDdkUsTUFBTSxXQUFXLEdBQUcsTUFBTSxxQ0FBOEIsQ0FDdEQsZUFBUSxFQUNSLENBQUMsRUFDRCxNQUFNLEVBQ04seUJBQVEsQ0FDVCxDQUFBO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQ0FBc0MsRUFBRSxXQUFXLENBQUMsQ0FBQTtJQUNoRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUNqQyxDQUFDLENBQUMsQ0FBQTtBQUVGLGFBQUksQ0FBQyx1REFBdUQsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDeEUsTUFBTSxXQUFXLEdBQUcsTUFBTSxxQ0FBOEIsQ0FDdEQsZUFBUSxFQUNSLENBQUMsRUFDRCxNQUFNLEVBQ04seUJBQVEsQ0FDVCxDQUFBO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1Q0FBdUMsRUFBRSxXQUFXLENBQUMsQ0FBQTtJQUNqRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUNqQyxDQUFDLENBQUMsQ0FBQTtBQUVGLGFBQUksQ0FBQyx1REFBdUQsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDeEUsTUFBTSxXQUFXLEdBQUcsTUFBTSxxQ0FBOEIsQ0FDdEQsZUFBUSxFQUNSLENBQUMsRUFDRCxNQUFNLEVBQ04seUJBQVEsQ0FDVCxDQUFBO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1Q0FBdUMsRUFBRSxXQUFXLENBQUMsQ0FBQTtJQUNqRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUNqQyxDQUFDLENBQUMsQ0FBQTtBQUVGLGFBQUksQ0FBQyx1REFBdUQsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDeEUsTUFBTSxXQUFXLEdBQUcsTUFBTSxxQ0FBOEIsQ0FDdEQsZUFBUSxFQUNSLENBQUMsRUFDRCxNQUFNLEVBQ04seUJBQVEsQ0FDVCxDQUFBO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1Q0FBdUMsRUFBRSxXQUFXLENBQUMsQ0FBQTtJQUNqRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUNqQyxDQUFDLENBQUMsQ0FBQTtBQUVGLGFBQUksQ0FBQyx1REFBdUQsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDeEUsTUFBTSxXQUFXLEdBQUcsTUFBTSxxQ0FBOEIsQ0FDdEQsZUFBUSxFQUNSLENBQUMsRUFDRCxNQUFNLEVBQ04seUJBQVEsQ0FDVCxDQUFBO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1Q0FBdUMsRUFBRSxXQUFXLENBQUMsQ0FBQTtJQUNqRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUNqQyxDQUFDLENBQUMsQ0FBQTtBQUVGLGFBQUksQ0FBQyx1REFBdUQsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDeEUsTUFBTSxXQUFXLEdBQUcsTUFBTSxxQ0FBOEIsQ0FDdEQsZUFBUSxFQUNSLENBQUMsRUFDRCxNQUFNLEVBQ04seUJBQVEsQ0FDVCxDQUFBO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1Q0FBdUMsRUFBRSxXQUFXLENBQUMsQ0FBQTtJQUNqRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUNqQyxDQUFDLENBQUMsQ0FBQTtBQUVGLGFBQUksQ0FBQyx1REFBdUQsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDeEUsTUFBTSxXQUFXLEdBQUcsTUFBTSxxQ0FBOEIsQ0FDdEQsZUFBUSxFQUNSLENBQUMsRUFDRCxNQUFNLEVBQ04seUJBQVEsQ0FDVCxDQUFBO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1Q0FBdUMsRUFBRSxXQUFXLENBQUMsQ0FBQTtJQUNqRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUNqQyxDQUFDLENBQUMsQ0FBQTtBQUVGLGFBQUksQ0FBQyx1REFBdUQsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDeEUsTUFBTSxXQUFXLEdBQUcsTUFBTSxxQ0FBOEIsQ0FDdEQsZUFBUSxFQUNSLENBQUMsRUFDRCxNQUFNLEVBQ04seUJBQVEsQ0FDVCxDQUFBO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1Q0FBdUMsRUFBRSxXQUFXLENBQUMsQ0FBQTtJQUNqRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUNqQyxDQUFDLENBQUMsQ0FBQTtBQUVGLGFBQUksQ0FBQyx1REFBdUQsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDeEUsTUFBTSxXQUFXLEdBQUcsTUFBTSxxQ0FBOEIsQ0FDdEQsZUFBUSxFQUNSLENBQUMsRUFDRCxNQUFNLEVBQ04seUJBQVEsQ0FDVCxDQUFBO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1Q0FBdUMsRUFBRSxXQUFXLENBQUMsQ0FBQTtJQUNqRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUNqQyxDQUFDLENBQUMsQ0FBQTtBQUVGLGFBQUksQ0FBQyx5REFBeUQsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDMUUsTUFBTSxXQUFXLEdBQUcsTUFBTSxxQ0FBOEIsQ0FDdEQsZUFBUSxFQUNSLENBQUMsRUFDRCxNQUFNLEVBQ04seUJBQVEsQ0FDVCxDQUFBO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5Q0FBeUMsRUFBRSxXQUFXLENBQUMsQ0FBQTtJQUNuRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUNqQyxDQUFDLENBQUMsQ0FBQTtBQUVGLGFBQUksQ0FBQyxzREFBc0QsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDdkUsTUFBTSxXQUFXLEdBQUcsTUFBTSxxQ0FBOEIsQ0FDdEQsZUFBUSxFQUNSLENBQUMsRUFDRCxNQUFNLEVBQ04seUJBQVEsQ0FDVCxDQUFBO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQ0FBc0MsRUFBRSxXQUFXLENBQUMsQ0FBQTtJQUNoRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUNqQyxDQUFDLENBQUMsQ0FBQTtBQUVGLGFBQUksQ0FBQyx1REFBdUQsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDeEUsTUFBTSxXQUFXLEdBQUcsTUFBTSxxQ0FBOEIsQ0FDdEQsZUFBUSxFQUNSLENBQUMsRUFDRCxNQUFNLEVBQ04seUJBQVEsQ0FDVCxDQUFBO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1Q0FBdUMsRUFBRSxXQUFXLENBQUMsQ0FBQTtJQUNqRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUNqQyxDQUFDLENBQUMsQ0FBQTtBQUVGLGFBQUksQ0FBQyx1REFBdUQsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDeEUsTUFBTSxXQUFXLEdBQUcsTUFBTSxxQ0FBOEIsQ0FDdEQsZUFBUSxFQUNSLENBQUMsRUFDRCxNQUFNLEVBQ04seUJBQVEsQ0FDVCxDQUFBO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1Q0FBdUMsRUFBRSxXQUFXLENBQUMsQ0FBQTtJQUNqRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUNqQyxDQUFDLENBQUMsQ0FBQTtBQUVGLGFBQUksQ0FBQyx1REFBdUQsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDeEUsTUFBTSxXQUFXLEdBQUcsTUFBTSxxQ0FBOEIsQ0FDdEQsZUFBUSxFQUNSLENBQUMsRUFDRCxNQUFNLEVBQ04seUJBQVEsQ0FDVCxDQUFBO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1Q0FBdUMsRUFBRSxXQUFXLENBQUMsQ0FBQTtJQUNqRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUNqQyxDQUFDLENBQUMsQ0FBQTtBQUVGLGFBQUksQ0FBQyx1REFBdUQsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDeEUsTUFBTSxXQUFXLEdBQUcsTUFBTSxxQ0FBOEIsQ0FDdEQsZUFBUSxFQUNSLENBQUMsRUFDRCxNQUFNLEVBQ04seUJBQVEsQ0FDVCxDQUFBO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1Q0FBdUMsRUFBRSxXQUFXLENBQUMsQ0FBQTtJQUNqRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUNqQyxDQUFDLENBQUMsQ0FBQTtBQUVGLGFBQUksQ0FBQyx1REFBdUQsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDeEUsTUFBTSxXQUFXLEdBQUcsTUFBTSxxQ0FBOEIsQ0FDdEQsZUFBUSxFQUNSLENBQUMsRUFDRCxNQUFNLEVBQ04seUJBQVEsQ0FDVCxDQUFBO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1Q0FBdUMsRUFBRSxXQUFXLENBQUMsQ0FBQTtJQUNqRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUNqQyxDQUFDLENBQUMsQ0FBQSJ9