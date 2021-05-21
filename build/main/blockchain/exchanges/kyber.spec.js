"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abis_1 = require("@xtoken/abis");
const ava_1 = __importDefault(require("ava"));
const constants_spec_1 = require("../../constants.spec");
const kyber_1 = require("./kyber");
ava_1.default('Calculate expected quantity on burn of xKNCa on Kyber', async (t) => {
    const expectedQty = await kyber_1.getKyberEstimatedQuantity(abis_1.ETH, abis_1.X_KNC_A, '1000', abis_1.SELL, constants_spec_1.provider);
    console.log('[Kyber] Expected ETH qty for 1000 xKNCa:', expectedQty);
    t.true(Number(expectedQty) > 0);
});
ava_1.default('Calculate expected quantity on burn of xKNCa with KNC on Kyber', async (t) => {
    const expectedQty = await kyber_1.getKyberEstimatedQuantity(abis_1.X_KNC_A, abis_1.X_KNC_A, '1000', abis_1.SELL, constants_spec_1.provider);
    console.log('[Kyber] Expected KNC qty for 1000 xKNCa:', expectedQty);
    t.true(Number(expectedQty) > 0);
});
ava_1.default('Calculate expected quantity on mint of xKNCa on Kyber', async (t) => {
    const expectedQty = await kyber_1.getKyberEstimatedQuantity(abis_1.ETH, abis_1.X_KNC_A, '1', abis_1.BUY, constants_spec_1.provider);
    console.log('[Kyber] Expected xKNCa qty for 1 ETH:', expectedQty);
    t.true(Number(expectedQty) > 0);
});
ava_1.default('Calculate expected quantity on mint of xKNCa with KNC on Kyber', async (t) => {
    const expectedQty = await kyber_1.getKyberEstimatedQuantity(abis_1.X_KNC_A, abis_1.X_KNC_A, '100', abis_1.BUY, constants_spec_1.provider);
    console.log('[Kyber] Expected xKNCa qty for 100 KNC:', expectedQty);
    t.true(Number(expectedQty) > 0);
});
ava_1.default('Get Kyber Portfolio of xKNCa', async (t) => {
    const portfolio = await kyber_1.getKyberPortfolioItem(abis_1.X_KNC_A, constants_spec_1.testAddress, constants_spec_1.provider);
    console.log('[Kyber] Portfolio value of xKNCa:', portfolio === null || portfolio === void 0 ? void 0 : portfolio.value);
    t.true(Number(portfolio === null || portfolio === void 0 ? void 0 : portfolio.value) > 0);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia3liZXIuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9ibG9ja2NoYWluL2V4Y2hhbmdlcy9reWJlci5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsdUNBQXNEO0FBQ3RELDhDQUFzQjtBQUV0Qix5REFBNEQ7QUFFNUQsbUNBQTBFO0FBRTFFLGFBQUksQ0FBQyx1REFBdUQsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDeEUsTUFBTSxXQUFXLEdBQUcsTUFBTSxpQ0FBeUIsQ0FDakQsVUFBRyxFQUNILGNBQU8sRUFDUCxNQUFNLEVBQ04sV0FBSSxFQUNKLHlCQUFRLENBQ1QsQ0FBQTtJQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsMENBQTBDLEVBQUUsV0FBVyxDQUFDLENBQUE7SUFDcEUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7QUFDakMsQ0FBQyxDQUFDLENBQUE7QUFFRixhQUFJLENBQUMsZ0VBQWdFLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQ2pGLE1BQU0sV0FBVyxHQUFHLE1BQU0saUNBQXlCLENBQ2pELGNBQU8sRUFDUCxjQUFPLEVBQ1AsTUFBTSxFQUNOLFdBQUksRUFDSix5QkFBUSxDQUNULENBQUE7SUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLDBDQUEwQyxFQUFFLFdBQVcsQ0FBQyxDQUFBO0lBQ3BFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQ2pDLENBQUMsQ0FBQyxDQUFBO0FBRUYsYUFBSSxDQUFDLHVEQUF1RCxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUN4RSxNQUFNLFdBQVcsR0FBRyxNQUFNLGlDQUF5QixDQUNqRCxVQUFHLEVBQ0gsY0FBTyxFQUNQLEdBQUcsRUFDSCxVQUFHLEVBQ0gseUJBQVEsQ0FDVCxDQUFBO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1Q0FBdUMsRUFBRSxXQUFXLENBQUMsQ0FBQTtJQUNqRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUNqQyxDQUFDLENBQUMsQ0FBQTtBQUVGLGFBQUksQ0FBQyxnRUFBZ0UsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDakYsTUFBTSxXQUFXLEdBQUcsTUFBTSxpQ0FBeUIsQ0FDakQsY0FBTyxFQUNQLGNBQU8sRUFDUCxLQUFLLEVBQ0wsVUFBRyxFQUNILHlCQUFRLENBQ1QsQ0FBQTtJQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMseUNBQXlDLEVBQUUsV0FBVyxDQUFDLENBQUE7SUFDbkUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7QUFDakMsQ0FBQyxDQUFDLENBQUE7QUFFRixhQUFJLENBQUMsOEJBQThCLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQy9DLE1BQU0sU0FBUyxHQUFHLE1BQU0sNkJBQXFCLENBQUMsY0FBTyxFQUFFLDRCQUFXLEVBQUUseUJBQVEsQ0FBQyxDQUFBO0lBQzdFLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUNBQW1DLEVBQUUsU0FBUyxhQUFULFNBQVMsdUJBQVQsU0FBUyxDQUFFLEtBQUssQ0FBQyxDQUFBO0lBQ2xFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsYUFBVCxTQUFTLHVCQUFULFNBQVMsQ0FBRSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUN0QyxDQUFDLENBQUMsQ0FBQSJ9