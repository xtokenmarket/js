"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abis_1 = require("@xtoken/abis");
const ava_1 = __importDefault(require("ava"));
const constants_spec_1 = require("../../constants.spec");
const burn_1 = require("./burn");
ava_1.default('Calculate BNT expected quantity on burn of xBNTa', async (t) => {
    const expectedQty = await burn_1.getExpectedQuantityOnBurnXBnt(abis_1.X_BNT_A, false, '1000', constants_spec_1.provider);
    console.log('Expected BNT qty for 1000 xBNTa:', expectedQty);
    t.true(Number(expectedQty) > 0);
});
ava_1.default('Calculate ETH expected quantity on burn of xBNTa', async (t) => {
    const expectedQty = await burn_1.getExpectedQuantityOnBurnXBnt(abis_1.X_BNT_A, true, '1000', constants_spec_1.provider);
    console.log('Expected ETH qty for 1000 xBNTa:', expectedQty);
    t.true(Number(expectedQty) > 0);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVybi5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veGJudC9idXJuLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSx1Q0FBc0M7QUFDdEMsOENBQXNCO0FBRXRCLHlEQUErQztBQUUvQyxpQ0FBc0Q7QUFFdEQsYUFBSSxDQUFDLGtEQUFrRCxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUNuRSxNQUFNLFdBQVcsR0FBRyxNQUFNLG9DQUE2QixDQUNyRCxjQUFPLEVBQ1AsS0FBSyxFQUNMLE1BQU0sRUFDTix5QkFBUSxDQUNULENBQUE7SUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLGtDQUFrQyxFQUFFLFdBQVcsQ0FBQyxDQUFBO0lBQzVELENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQ2pDLENBQUMsQ0FBQyxDQUFBO0FBRUYsYUFBSSxDQUFDLGtEQUFrRCxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUNuRSxNQUFNLFdBQVcsR0FBRyxNQUFNLG9DQUE2QixDQUNyRCxjQUFPLEVBQ1AsSUFBSSxFQUNKLE1BQU0sRUFDTix5QkFBUSxDQUNULENBQUE7SUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLGtDQUFrQyxFQUFFLFdBQVcsQ0FBQyxDQUFBO0lBQzVELENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQ2pDLENBQUMsQ0FBQyxDQUFBIn0=