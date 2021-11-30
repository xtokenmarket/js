"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abis_1 = require("@xtoken/abis");
const ava_1 = __importDefault(require("ava"));
const constants_spec_1 = require("../../constants.spec");
const balancerV2_1 = require("./balancerV2");
ava_1.default('Calculate expected quantity on burn of xSNXa on Balancer V2', async (t) => {
    const expectedQty = await balancerV2_1.getBalancerV2EstimatedQuantity(abis_1.ETH, abis_1.X_SNX_A, '10', abis_1.SELL, constants_spec_1.provider);
    console.log('[BalancerV2] Expected ETH qty for 10 xSNXa:', expectedQty);
    t.true(Number(expectedQty) > 0);
});
ava_1.default('Calculate expected quantity on mint of xSNXa on Balancer V2', async (t) => {
    const expectedQty = await balancerV2_1.getBalancerV2EstimatedQuantity(abis_1.ETH, abis_1.X_SNX_A, '0.005', abis_1.BUY, constants_spec_1.provider);
    console.log('[BalancerV2] Expected xSNXa qty for 0.005 ETH:', expectedQty);
    t.true(Number(expectedQty) > 0);
});
ava_1.default('Calculate expected quantity of SNX on burn of xSNXa on Balancer V2', async (t) => {
    const expectedQty = await balancerV2_1.getBalancerV2EstimatedQuantity(abis_1.X_SNX_A, abis_1.X_SNX_A, '100', abis_1.SELL, constants_spec_1.provider);
    console.log('[BalancerV2] Expected SNX qty for 100 xSNXa:', expectedQty);
    t.true(Number(expectedQty) > 0);
});
ava_1.default('Calculate expected quantity of xSNXa on mint of SNX on Balancer V2', async (t) => {
    const expectedQty = await balancerV2_1.getBalancerV2EstimatedQuantity(abis_1.X_SNX_A, abis_1.X_SNX_A, '10', abis_1.BUY, constants_spec_1.provider);
    console.log('[BalancerV2] Expected xSNXa qty for 10 SNX:', expectedQty);
    t.true(Number(expectedQty) > 0);
});
ava_1.default('Get Balancer V2 Portfolio of xSNXa', async (t) => {
    const portfolio = await balancerV2_1.getBalancerV2PortfolioItem(abis_1.X_SNX_A, constants_spec_1.testAddress, constants_spec_1.provider);
    console.log('[BalancerV2] Portfolio value of xSNXa:', portfolio === null || portfolio === void 0 ? void 0 : portfolio.value);
    t.true(Number(portfolio === null || portfolio === void 0 ? void 0 : portfolio.value) > 0);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFsYW5jZXJWMi5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4vZXhjaGFuZ2VzL2JhbGFuY2VyVjIuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHVDQUFzRDtBQUN0RCw4Q0FBc0I7QUFFdEIseURBQTREO0FBRTVELDZDQUdxQjtBQUVyQixhQUFJLENBQUMsNkRBQTZELEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQzlFLE1BQU0sV0FBVyxHQUFHLE1BQU0sMkNBQThCLENBQ3RELFVBQUcsRUFDSCxjQUFPLEVBQ1AsSUFBSSxFQUNKLFdBQUksRUFDSix5QkFBUSxDQUNULENBQUE7SUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLDZDQUE2QyxFQUFFLFdBQVcsQ0FBQyxDQUFBO0lBQ3ZFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQ2pDLENBQUMsQ0FBQyxDQUFBO0FBRUYsYUFBSSxDQUFDLDZEQUE2RCxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUM5RSxNQUFNLFdBQVcsR0FBRyxNQUFNLDJDQUE4QixDQUN0RCxVQUFHLEVBQ0gsY0FBTyxFQUNQLE9BQU8sRUFDUCxVQUFHLEVBQ0gseUJBQVEsQ0FDVCxDQUFBO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnREFBZ0QsRUFBRSxXQUFXLENBQUMsQ0FBQTtJQUMxRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUNqQyxDQUFDLENBQUMsQ0FBQTtBQUVGLGFBQUksQ0FBQyxvRUFBb0UsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDckYsTUFBTSxXQUFXLEdBQUcsTUFBTSwyQ0FBOEIsQ0FDdEQsY0FBTyxFQUNQLGNBQU8sRUFDUCxLQUFLLEVBQ0wsV0FBSSxFQUNKLHlCQUFRLENBQ1QsQ0FBQTtJQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsOENBQThDLEVBQUUsV0FBVyxDQUFDLENBQUE7SUFDeEUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7QUFDakMsQ0FBQyxDQUFDLENBQUE7QUFFRixhQUFJLENBQUMsb0VBQW9FLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQ3JGLE1BQU0sV0FBVyxHQUFHLE1BQU0sMkNBQThCLENBQ3RELGNBQU8sRUFDUCxjQUFPLEVBQ1AsSUFBSSxFQUNKLFVBQUcsRUFDSCx5QkFBUSxDQUNULENBQUE7SUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLDZDQUE2QyxFQUFFLFdBQVcsQ0FBQyxDQUFBO0lBQ3ZFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQ2pDLENBQUMsQ0FBQyxDQUFBO0FBRUYsYUFBSSxDQUFDLG9DQUFvQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUNyRCxNQUFNLFNBQVMsR0FBRyxNQUFNLHVDQUEwQixDQUNoRCxjQUFPLEVBQ1AsNEJBQVcsRUFDWCx5QkFBUSxDQUNULENBQUE7SUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLHdDQUF3QyxFQUFFLFNBQVMsYUFBVCxTQUFTLHVCQUFULFNBQVMsQ0FBRSxLQUFLLENBQUMsQ0FBQTtJQUN2RSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLGFBQVQsU0FBUyx1QkFBVCxTQUFTLENBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7QUFDdEMsQ0FBQyxDQUFDLENBQUEifQ==