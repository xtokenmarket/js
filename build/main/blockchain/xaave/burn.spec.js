"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abis_1 = require("@xtoken/abis");
const ava_1 = __importDefault(require("ava"));
const constants_spec_1 = require("../../constants.spec");
const burn_1 = require("./burn");
ava_1.default('Calculate AAVE expected quantity on burn of xAAVEa', async (t) => {
    const expectedQty = await burn_1.getExpectedQuantityOnBurnXAave(abis_1.X_AAVE_A, false, '1000', constants_spec_1.provider);
    console.log('Expected AAVE qty for 1000 xAAVEa:', expectedQty);
    t.true(Number(expectedQty) > 0);
});
ava_1.default('Calculate ETH expected quantity on burn of xAAVEa', async (t) => {
    const expectedQty = await burn_1.getExpectedQuantityOnBurnXAave(abis_1.X_AAVE_A, true, '1000', constants_spec_1.provider);
    console.log('Expected ETH qty for 1000 xAAVEa:', expectedQty);
    t.true(Number(expectedQty) > 0);
});
ava_1.default('Calculate AAVE expected quantity on burn of xAAVEb', async (t) => {
    const expectedQty = await burn_1.getExpectedQuantityOnBurnXAave(abis_1.X_AAVE_B, false, '1000', constants_spec_1.provider);
    console.log('Expected AAVE qty for 1000 xAAVEb:', expectedQty);
    t.true(Number(expectedQty) > 0);
});
ava_1.default('Calculate ETH expected quantity on burn of xAAVEb', async (t) => {
    const expectedQty = await burn_1.getExpectedQuantityOnBurnXAave(abis_1.X_AAVE_B, true, '1000', constants_spec_1.provider);
    console.log('Expected ETH qty for 1000 xAAVEb:', expectedQty);
    t.true(Number(expectedQty) > 0);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVybi5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veGFhdmUvYnVybi5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsdUNBQWlEO0FBQ2pELDhDQUFzQjtBQUV0Qix5REFBK0M7QUFFL0MsaUNBQXVEO0FBRXZELGFBQUksQ0FBQyxvREFBb0QsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDckUsTUFBTSxXQUFXLEdBQUcsTUFBTSxxQ0FBOEIsQ0FDdEQsZUFBUSxFQUNSLEtBQUssRUFDTCxNQUFNLEVBQ04seUJBQVEsQ0FDVCxDQUFBO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQ0FBb0MsRUFBRSxXQUFXLENBQUMsQ0FBQTtJQUM5RCxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUNqQyxDQUFDLENBQUMsQ0FBQTtBQUVGLGFBQUksQ0FBQyxtREFBbUQsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDcEUsTUFBTSxXQUFXLEdBQUcsTUFBTSxxQ0FBOEIsQ0FDdEQsZUFBUSxFQUNSLElBQUksRUFDSixNQUFNLEVBQ04seUJBQVEsQ0FDVCxDQUFBO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQ0FBbUMsRUFBRSxXQUFXLENBQUMsQ0FBQTtJQUM3RCxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUNqQyxDQUFDLENBQUMsQ0FBQTtBQUVGLGFBQUksQ0FBQyxvREFBb0QsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDckUsTUFBTSxXQUFXLEdBQUcsTUFBTSxxQ0FBOEIsQ0FDdEQsZUFBUSxFQUNSLEtBQUssRUFDTCxNQUFNLEVBQ04seUJBQVEsQ0FDVCxDQUFBO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQ0FBb0MsRUFBRSxXQUFXLENBQUMsQ0FBQTtJQUM5RCxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUNqQyxDQUFDLENBQUMsQ0FBQTtBQUVGLGFBQUksQ0FBQyxtREFBbUQsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDcEUsTUFBTSxXQUFXLEdBQUcsTUFBTSxxQ0FBOEIsQ0FDdEQsZUFBUSxFQUNSLElBQUksRUFDSixNQUFNLEVBQ04seUJBQVEsQ0FDVCxDQUFBO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQ0FBbUMsRUFBRSxXQUFXLENBQUMsQ0FBQTtJQUM3RCxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUNqQyxDQUFDLENBQUMsQ0FBQSJ9