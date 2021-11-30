"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abis_1 = require("@xtoken/abis");
const ava_1 = __importDefault(require("ava"));
const constants_spec_1 = require("../../constants.spec");
const burn_1 = require("./burn");
ava_1.default('Calculate ALPHA expected quantity on burn of xALPHAa', async (t) => {
    const expectedQty = await burn_1.getExpectedQuantityOnBurnXAlpha(abis_1.X_ALPHA_A, false, '10', constants_spec_1.provider);
    console.log('Expected ALPHA qty for 10 xALPHAa: ', expectedQty);
    t.true(Number(expectedQty) > 0);
});
ava_1.default('Calculate ETH expected quantity on burn of xALPHAa', async (t) => {
    const expectedQty = await burn_1.getExpectedQuantityOnBurnXAlpha(abis_1.X_ALPHA_A, true, '10', constants_spec_1.provider);
    console.log('Expected ETH qty for 10 xALPHAa: ', expectedQty);
    t.true(Number(expectedQty) > 0);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVybi5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veGFscGhhL2J1cm4uc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHVDQUF3QztBQUN4Qyw4Q0FBc0I7QUFFdEIseURBQStDO0FBRS9DLGlDQUF3RDtBQUV4RCxhQUFJLENBQUMsc0RBQXNELEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQ3ZFLE1BQU0sV0FBVyxHQUFHLE1BQU0sc0NBQStCLENBQ3ZELGdCQUFTLEVBQ1QsS0FBSyxFQUNMLElBQUksRUFDSix5QkFBUSxDQUNULENBQUE7SUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLHFDQUFxQyxFQUFFLFdBQVcsQ0FBQyxDQUFBO0lBQy9ELENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQ2pDLENBQUMsQ0FBQyxDQUFBO0FBRUYsYUFBSSxDQUFDLG9EQUFvRCxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUNyRSxNQUFNLFdBQVcsR0FBRyxNQUFNLHNDQUErQixDQUN2RCxnQkFBUyxFQUNULElBQUksRUFDSixJQUFJLEVBQ0oseUJBQVEsQ0FDVCxDQUFBO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQ0FBbUMsRUFBRSxXQUFXLENBQUMsQ0FBQTtJQUM3RCxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUNqQyxDQUFDLENBQUMsQ0FBQSJ9