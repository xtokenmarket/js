"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abis_1 = require("@xtoken/abis");
const ava_1 = __importDefault(require("ava"));
const constants_spec_1 = require("../../constants.spec");
const burn_1 = require("./burn");
ava_1.default(`Calculate expected quantity of AAVE & xAAVEa on burn of ${abis_1.AAVE_X_AAVE_A_CLR}`, async (t) => {
    const estimateQty = await burn_1.getExpectedQuantityOnBurnXAssetCLR(abis_1.AAVE_X_AAVE_A_CLR, '1000', constants_spec_1.provider);
    console.log(`Expected qty of AAVE & xAAVEa for 1000 ${abis_1.AAVE_X_AAVE_A_CLR}:`, estimateQty[0], estimateQty[1]);
    t.true(Number(estimateQty[0]) > 0 && Number(estimateQty[1]) > 0);
});
ava_1.default(`Calculate expected quantity of XTK & ETH on burn of ${abis_1.XTK_ETH_CLR}`, async (t) => {
    const estimateQty = await burn_1.getExpectedQuantityOnBurnXAssetCLR(abis_1.XTK_ETH_CLR, '1000', constants_spec_1.provider);
    console.log(`Expected qty of XTK & ETH for 1000 ${abis_1.XTK_ETH_CLR}:`, estimateQty[0], estimateQty[1]);
    t.true(Number(estimateQty[0]) > 0 && Number(estimateQty[1]) > 0);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVybi5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4vY2xyL2J1cm4uc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHVDQUE2RDtBQUM3RCw4Q0FBc0I7QUFFdEIseURBQStDO0FBRS9DLGlDQUEyRDtBQUUzRCxhQUFJLENBQUMsMkRBQTJELHdCQUFpQixFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQy9GLE1BQU0sV0FBVyxHQUFHLE1BQU0seUNBQWtDLENBQzFELHdCQUFpQixFQUNqQixNQUFNLEVBQ04seUJBQVEsQ0FDVCxDQUFBO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FDVCwwQ0FBMEMsd0JBQWlCLEdBQUcsRUFDOUQsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUNkLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FDZixDQUFBO0lBQ0QsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUNsRSxDQUFDLENBQUMsQ0FBQTtBQUVGLGFBQUksQ0FBQyx1REFBdUQsa0JBQVcsRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUNyRixNQUFNLFdBQVcsR0FBRyxNQUFNLHlDQUFrQyxDQUMxRCxrQkFBVyxFQUNYLE1BQU0sRUFDTix5QkFBUSxDQUNULENBQUE7SUFDRCxPQUFPLENBQUMsR0FBRyxDQUNULHNDQUFzQyxrQkFBVyxHQUFHLEVBQ3BELFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFDZCxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQ2YsQ0FBQTtJQUNELENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7QUFDbEUsQ0FBQyxDQUFDLENBQUEifQ==