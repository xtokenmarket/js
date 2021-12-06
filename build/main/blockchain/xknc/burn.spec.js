"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abis_1 = require("@xtoken/abis");
const ava_1 = __importDefault(require("ava"));
const constants_spec_1 = require("../../constants.spec");
const burn_1 = require("./burn");
/*test('Calculate ETH expected quantity on burn of xKNCa', async (t) => {
  const expectedQty = await getExpectedQuantityOnBurnXKnc(
    X_KNC_A,
    true,
    '1',
    provider
  )
  console.log('Expected ETH qty for 1 xKNCa:', expectedQty)
  t.true(Number(expectedQty) > 0)
})*/
ava_1.default('Calculate KNC expected quantity on burn of xKNCa', async (t) => {
    const expectedQty = await burn_1.getExpectedQuantityOnBurnXKnc(abis_1.X_KNC_A, false, '1', constants_spec_1.provider);
    console.log('Expected KNC qty for 1 xKNCa:', expectedQty);
    t.true(Number(expectedQty) > 0);
});
/*test('Calculate ETH expected quantity on burn of xKNCb', async (t) => {
  const expectedQty = await getExpectedQuantityOnBurnXKnc(
    X_KNC_B,
    true,
    '1',
    provider
  )
  console.log('Expected ETH qty for 1 xKNCb:', expectedQty)
  t.true(Number(expectedQty) > 0)
})*/
ava_1.default('Calculate KNC expected quantity on burn of xKNCb', async (t) => {
    const expectedQty = await burn_1.getExpectedQuantityOnBurnXKnc(abis_1.X_KNC_B, false, '1', constants_spec_1.provider);
    console.log('Expected KNC qty for 1 xKNCb:', expectedQty);
    t.true(Number(expectedQty) > 0);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVybi5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veGtuYy9idXJuLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSx1Q0FBK0M7QUFDL0MsOENBQXNCO0FBRXRCLHlEQUErQztBQUUvQyxpQ0FBc0Q7QUFFdEQ7Ozs7Ozs7OztJQVNJO0FBRUosYUFBSSxDQUFDLGtEQUFrRCxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUNuRSxNQUFNLFdBQVcsR0FBRyxNQUFNLG9DQUE2QixDQUNyRCxjQUFPLEVBQ1AsS0FBSyxFQUNMLEdBQUcsRUFDSCx5QkFBUSxDQUNULENBQUE7SUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLCtCQUErQixFQUFFLFdBQVcsQ0FBQyxDQUFBO0lBQ3pELENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQ2pDLENBQUMsQ0FBQyxDQUFBO0FBRUY7Ozs7Ozs7OztJQVNJO0FBRUosYUFBSSxDQUFDLGtEQUFrRCxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUNuRSxNQUFNLFdBQVcsR0FBRyxNQUFNLG9DQUE2QixDQUNyRCxjQUFPLEVBQ1AsS0FBSyxFQUNMLEdBQUcsRUFDSCx5QkFBUSxDQUNULENBQUE7SUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLCtCQUErQixFQUFFLFdBQVcsQ0FBQyxDQUFBO0lBQ3pELENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQ2pDLENBQUMsQ0FBQyxDQUFBIn0=