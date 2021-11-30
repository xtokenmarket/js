"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abis_1 = require("@xtoken/abis");
const ava_1 = __importDefault(require("ava"));
const constants_spec_1 = require("../../constants.spec");
const burn_1 = require("./burn");
ava_1.default('Calculate WBTC expected quantity on burn of xBTC3x', async (t) => {
    const expectedQty = await burn_1.getExpectedQuantityOnBurnXAssetLev(abis_1.X_BTC_3X, false, '1000', constants_spec_1.arbitrumProvider);
    console.log('Expected WBTC qty for 1000 xBTC3x: ', expectedQty);
    t.true(Number(expectedQty) > 0);
});
ava_1.default('Calculate ETH expected quantity on burn of xBTC3x', async (t) => {
    const expectedQty = await burn_1.getExpectedQuantityOnBurnXAssetLev(abis_1.X_BTC_3X, true, '1000', constants_spec_1.arbitrumProvider);
    console.log('Expected ETH qty for 1000 xBTC3x: ', expectedQty);
    t.true(Number(expectedQty) > 0);
});
ava_1.default('Calculate WETH expected quantity on burn of xETH3x', async (t) => {
    const expectedQty = await burn_1.getExpectedQuantityOnBurnXAssetLev(abis_1.X_ETH_3X, false, '1000', constants_spec_1.arbitrumProvider);
    console.log('Expected WETH qty for 1000 xETH3x: ', expectedQty);
    t.true(Number(expectedQty) > 0);
});
ava_1.default('Calculate ETH expected quantity on burn of xETH3x', async (t) => {
    const expectedQty = await burn_1.getExpectedQuantityOnBurnXAssetLev(abis_1.X_ETH_3X, true, '1000', constants_spec_1.arbitrumProvider);
    console.log('Expected ETH qty for 1000 xETH3x: ', expectedQty);
    t.true(Number(expectedQty) > 0);
});
/*test('Calculate LINK expected quantity on burn of xLINK3x', async (t) => {
  const expectedQty = await getExpectedQuantityOnBurnXAssetLev(
    X_LINK_3X,
    false,
    '1000',
    arbitrumProvider
  )
  console.log('Expected LINK qty for 1000 xLINK3x: ', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate ETH expected quantity on burn of xLINK3x', async (t) => {
  const expectedQty = await getExpectedQuantityOnBurnXAssetLev(
    X_LINK_3X,
    true,
    '1000',
    arbitrumProvider
  )
  console.log('Expected ETH qty for 1000 xLINK3x: ', expectedQty)
  t.true(Number(expectedQty) > 0)
})*/
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVybi5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4vbGV2L2J1cm4uc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHVDQUFpRDtBQUNqRCw4Q0FBc0I7QUFFdEIseURBQXVEO0FBRXZELGlDQUEyRDtBQUUzRCxhQUFJLENBQUMsb0RBQW9ELEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQ3JFLE1BQU0sV0FBVyxHQUFHLE1BQU0seUNBQWtDLENBQzFELGVBQVEsRUFDUixLQUFLLEVBQ0wsTUFBTSxFQUNOLGlDQUFnQixDQUNqQixDQUFBO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQ0FBcUMsRUFBRSxXQUFXLENBQUMsQ0FBQTtJQUMvRCxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUNqQyxDQUFDLENBQUMsQ0FBQTtBQUVGLGFBQUksQ0FBQyxtREFBbUQsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDcEUsTUFBTSxXQUFXLEdBQUcsTUFBTSx5Q0FBa0MsQ0FDMUQsZUFBUSxFQUNSLElBQUksRUFDSixNQUFNLEVBQ04saUNBQWdCLENBQ2pCLENBQUE7SUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLG9DQUFvQyxFQUFFLFdBQVcsQ0FBQyxDQUFBO0lBQzlELENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQ2pDLENBQUMsQ0FBQyxDQUFBO0FBRUYsYUFBSSxDQUFDLG9EQUFvRCxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUNyRSxNQUFNLFdBQVcsR0FBRyxNQUFNLHlDQUFrQyxDQUMxRCxlQUFRLEVBQ1IsS0FBSyxFQUNMLE1BQU0sRUFDTixpQ0FBZ0IsQ0FDakIsQ0FBQTtJQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMscUNBQXFDLEVBQUUsV0FBVyxDQUFDLENBQUE7SUFDL0QsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7QUFDakMsQ0FBQyxDQUFDLENBQUE7QUFFRixhQUFJLENBQUMsbURBQW1ELEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQ3BFLE1BQU0sV0FBVyxHQUFHLE1BQU0seUNBQWtDLENBQzFELGVBQVEsRUFDUixJQUFJLEVBQ0osTUFBTSxFQUNOLGlDQUFnQixDQUNqQixDQUFBO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQ0FBb0MsRUFBRSxXQUFXLENBQUMsQ0FBQTtJQUM5RCxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUNqQyxDQUFDLENBQUMsQ0FBQTtBQUVGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQW9CSSJ9