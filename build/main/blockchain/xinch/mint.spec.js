"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abis_1 = require("@xtoken/abis");
const ava_1 = __importDefault(require("ava"));
const constants_spec_1 = require("../../constants.spec");
const mint_1 = require("./mint");
ava_1.default('Calculate xINCHa expected quantity on mint with ETH', async (t) => {
    const expectedQty = await mint_1.getExpectedQuantityOnMintXInch(abis_1.X_INCH_A, true, '1', constants_spec_1.provider);
    console.log('Expected xINCHa qty for 1 ETH:', expectedQty);
    t.true(Number(expectedQty) > 0);
});
ava_1.default('Calculate xINCHa expected quantity on mint with INCH', async (t) => {
    const expectedQty = await mint_1.getExpectedQuantityOnMintXInch(abis_1.X_INCH_A, false, '1', constants_spec_1.provider);
    console.log('Expected xINCHa qty for 1 INCH:', expectedQty);
    t.true(Number(expectedQty) > 0);
});
ava_1.default('Calculate xINCHb expected quantity on mint with ETH', async (t) => {
    const expectedQty = await mint_1.getExpectedQuantityOnMintXInch(abis_1.X_INCH_B, true, '1', constants_spec_1.provider);
    console.log('Expected xINCHb qty for 1 ETH:', expectedQty);
    t.true(Number(expectedQty) > 0);
});
ava_1.default('Calculate xINCHb expected quantity on mint with INCH', async (t) => {
    const expectedQty = await mint_1.getExpectedQuantityOnMintXInch(abis_1.X_INCH_B, false, '1', constants_spec_1.provider);
    console.log('Expected xINCHb qty for 1 INCH:', expectedQty);
    t.true(Number(expectedQty) > 0);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWludC5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veGluY2gvbWludC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsdUNBQWlEO0FBQ2pELDhDQUFzQjtBQUV0Qix5REFBK0M7QUFFL0MsaUNBQXVEO0FBRXZELGFBQUksQ0FBQyxxREFBcUQsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDdEUsTUFBTSxXQUFXLEdBQUcsTUFBTSxxQ0FBOEIsQ0FDdEQsZUFBUSxFQUNSLElBQUksRUFDSixHQUFHLEVBQ0gseUJBQVEsQ0FDVCxDQUFBO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQ0FBZ0MsRUFBRSxXQUFXLENBQUMsQ0FBQTtJQUMxRCxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUNqQyxDQUFDLENBQUMsQ0FBQTtBQUVGLGFBQUksQ0FBQyxzREFBc0QsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDdkUsTUFBTSxXQUFXLEdBQUcsTUFBTSxxQ0FBOEIsQ0FDdEQsZUFBUSxFQUNSLEtBQUssRUFDTCxHQUFHLEVBQ0gseUJBQVEsQ0FDVCxDQUFBO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQ0FBaUMsRUFBRSxXQUFXLENBQUMsQ0FBQTtJQUMzRCxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUNqQyxDQUFDLENBQUMsQ0FBQTtBQUVGLGFBQUksQ0FBQyxxREFBcUQsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDdEUsTUFBTSxXQUFXLEdBQUcsTUFBTSxxQ0FBOEIsQ0FDdEQsZUFBUSxFQUNSLElBQUksRUFDSixHQUFHLEVBQ0gseUJBQVEsQ0FDVCxDQUFBO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQ0FBZ0MsRUFBRSxXQUFXLENBQUMsQ0FBQTtJQUMxRCxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUNqQyxDQUFDLENBQUMsQ0FBQTtBQUVGLGFBQUksQ0FBQyxzREFBc0QsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDdkUsTUFBTSxXQUFXLEdBQUcsTUFBTSxxQ0FBOEIsQ0FDdEQsZUFBUSxFQUNSLEtBQUssRUFDTCxHQUFHLEVBQ0gseUJBQVEsQ0FDVCxDQUFBO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQ0FBaUMsRUFBRSxXQUFXLENBQUMsQ0FBQTtJQUMzRCxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUNqQyxDQUFDLENBQUMsQ0FBQSJ9