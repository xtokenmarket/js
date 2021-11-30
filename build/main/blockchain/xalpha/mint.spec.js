"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abis_1 = require("@xtoken/abis");
const ava_1 = __importDefault(require("ava"));
const constants_spec_1 = require("../../constants.spec");
const mint_1 = require("./mint");
ava_1.default('Calculate xALPHAa expected quantity on mint with ALPHA', async (t) => {
    const expectedQty = await mint_1.getExpectedQuantityOnMintXAlpha(abis_1.X_ALPHA_A, false, '1', constants_spec_1.provider);
    console.log('Expected xALPHAa qty for 1 ALPHA: ', expectedQty);
    t.true(Number(expectedQty) > 0);
});
ava_1.default('Calculate xALPHAa expected quantity on mint with ETH', async (t) => {
    const expectedQty = await mint_1.getExpectedQuantityOnMintXAlpha(abis_1.X_ALPHA_A, true, '0.001', constants_spec_1.provider);
    console.log('Expected xALPHAa qty for 0.001 ETH: ', expectedQty);
    t.true(Number(expectedQty) > 0);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWludC5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veGFscGhhL21pbnQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHVDQUF3QztBQUN4Qyw4Q0FBc0I7QUFFdEIseURBQStDO0FBRS9DLGlDQUF3RDtBQUV4RCxhQUFJLENBQUMsd0RBQXdELEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQ3pFLE1BQU0sV0FBVyxHQUFHLE1BQU0sc0NBQStCLENBQ3ZELGdCQUFTLEVBQ1QsS0FBSyxFQUNMLEdBQUcsRUFDSCx5QkFBUSxDQUNULENBQUE7SUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLG9DQUFvQyxFQUFFLFdBQVcsQ0FBQyxDQUFBO0lBQzlELENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQ2pDLENBQUMsQ0FBQyxDQUFBO0FBRUYsYUFBSSxDQUFDLHNEQUFzRCxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUN2RSxNQUFNLFdBQVcsR0FBRyxNQUFNLHNDQUErQixDQUN2RCxnQkFBUyxFQUNULElBQUksRUFDSixPQUFPLEVBQ1AseUJBQVEsQ0FDVCxDQUFBO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQ0FBc0MsRUFBRSxXQUFXLENBQUMsQ0FBQTtJQUNoRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUNqQyxDQUFDLENBQUMsQ0FBQSJ9