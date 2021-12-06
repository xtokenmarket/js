"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abis_1 = require("@xtoken/abis");
const ava_1 = __importDefault(require("ava"));
const constants_spec_1 = require("../../constants.spec");
const redeem_1 = require("./redeem");
ava_1.default('Get maximum redeemable xBTC3x', async (t) => {
    const maxRedeemable = await redeem_1.getMaximumRedeemableXAssetLev(abis_1.X_BTC_3X, constants_spec_1.arbitrumProvider);
    console.log('Maximum redeemable xBTC3x: ', maxRedeemable);
    t.true(Number(maxRedeemable) > 0);
});
ava_1.default('Get maximum redeemable xETH3x', async (t) => {
    const maxRedeemable = await redeem_1.getMaximumRedeemableXAssetLev(abis_1.X_ETH_3X, constants_spec_1.arbitrumProvider);
    console.log('Maximum redeemable xETH3x: ', maxRedeemable);
    t.true(Number(maxRedeemable) > 0);
});
/*test('Get maximum redeemable xLINK3x', async (t) => {
  const maxRedeemable = await getMaximumRedeemableXAssetLev(
    X_LINK_3X,
    arbitrumProvider
  )
  console.log('Maximum redeemable xLINK3x: ', maxRedeemable)
  t.true(Number(maxRedeemable) > 0)
})*/
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkZWVtLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi9sZXYvcmVkZWVtLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSx1Q0FBaUQ7QUFDakQsOENBQXNCO0FBRXRCLHlEQUF1RDtBQUV2RCxxQ0FBd0Q7QUFFeEQsYUFBSSxDQUFDLCtCQUErQixFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUNoRCxNQUFNLGFBQWEsR0FBRyxNQUFNLHNDQUE2QixDQUN2RCxlQUFRLEVBQ1IsaUNBQWdCLENBQ2pCLENBQUE7SUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLDZCQUE2QixFQUFFLGFBQWEsQ0FBQyxDQUFBO0lBQ3pELENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQ25DLENBQUMsQ0FBQyxDQUFBO0FBRUYsYUFBSSxDQUFDLCtCQUErQixFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUNoRCxNQUFNLGFBQWEsR0FBRyxNQUFNLHNDQUE2QixDQUN2RCxlQUFRLEVBQ1IsaUNBQWdCLENBQ2pCLENBQUE7SUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLDZCQUE2QixFQUFFLGFBQWEsQ0FBQyxDQUFBO0lBQ3pELENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQ25DLENBQUMsQ0FBQyxDQUFBO0FBRUY7Ozs7Ozs7SUFPSSJ9