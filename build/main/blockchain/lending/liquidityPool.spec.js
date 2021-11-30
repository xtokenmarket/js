"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const constants_spec_1 = require("../../constants.spec");
const liquidityPool_1 = require("./liquidityPool");
ava_1.default('Get borrow rate per block', async (t) => {
    const borrowRatePerBlock = await liquidityPool_1.getBorrowRatePerBlock(constants_spec_1.provider);
    console.log('[Lending] Borrow rate per block:', borrowRatePerBlock);
    t.true(Number(borrowRatePerBlock) > 0);
});
ava_1.default('Get base LPT value', async (t) => {
    const lptBaseValue = await liquidityPool_1.getLPTBaseValue(constants_spec_1.provider);
    console.log('[Lending] LPT Base Value:', lptBaseValue);
    t.true(Number(lptBaseValue) === 10);
});
ava_1.default('Get LPT value', async (t) => {
    const lptValue = await liquidityPool_1.getLPTValue(constants_spec_1.provider);
    console.log('[Lending] LPT Value:', lptValue);
    t.true(Number(lptValue) === 10);
});
ava_1.default('Get optimal utilization rate', async (t) => {
    const optimalUtilizationRate = await liquidityPool_1.getOptimalUtilizationRate(constants_spec_1.provider);
    console.log('[Lending] Utilization rate:', optimalUtilizationRate);
    t.true(Number(optimalUtilizationRate) === 80);
});
ava_1.default('Get updated borrow by test address', async (t) => {
    const updatedBorrowBy = await liquidityPool_1.getUpdatedBorrowBy(constants_spec_1.testAddress, constants_spec_1.provider);
    console.log('[Lending] Updated borrow by test address:', updatedBorrowBy);
    t.true(Number(updatedBorrowBy) === 0);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlxdWlkaXR5UG9vbC5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4vbGVuZGluZy9saXF1aWRpdHlQb29sLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw4Q0FBc0I7QUFFdEIseURBQTREO0FBRTVELG1EQU13QjtBQUV4QixhQUFJLENBQUMsMkJBQTJCLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQzVDLE1BQU0sa0JBQWtCLEdBQUcsTUFBTSxxQ0FBcUIsQ0FBQyx5QkFBUSxDQUFDLENBQUE7SUFDaEUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQ0FBa0MsRUFBRSxrQkFBa0IsQ0FBQyxDQUFBO0lBQ25FLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7QUFDeEMsQ0FBQyxDQUFDLENBQUE7QUFFRixhQUFJLENBQUMsb0JBQW9CLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQ3JDLE1BQU0sWUFBWSxHQUFHLE1BQU0sK0JBQWUsQ0FBQyx5QkFBUSxDQUFDLENBQUE7SUFDcEQsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsRUFBRSxZQUFZLENBQUMsQ0FBQTtJQUN0RCxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQTtBQUNyQyxDQUFDLENBQUMsQ0FBQTtBQUVGLGFBQUksQ0FBQyxlQUFlLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQ2hDLE1BQU0sUUFBUSxHQUFHLE1BQU0sMkJBQVcsQ0FBQyx5QkFBUSxDQUFDLENBQUE7SUFDNUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsRUFBRSxRQUFRLENBQUMsQ0FBQTtJQUM3QyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQTtBQUNqQyxDQUFDLENBQUMsQ0FBQTtBQUVGLGFBQUksQ0FBQyw4QkFBOEIsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDL0MsTUFBTSxzQkFBc0IsR0FBRyxNQUFNLHlDQUF5QixDQUFDLHlCQUFRLENBQUMsQ0FBQTtJQUN4RSxPQUFPLENBQUMsR0FBRyxDQUFDLDZCQUE2QixFQUFFLHNCQUFzQixDQUFDLENBQUE7SUFDbEUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsc0JBQXNCLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQTtBQUMvQyxDQUFDLENBQUMsQ0FBQTtBQUVGLGFBQUksQ0FBQyxvQ0FBb0MsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDckQsTUFBTSxlQUFlLEdBQUcsTUFBTSxrQ0FBa0IsQ0FBQyw0QkFBVyxFQUFFLHlCQUFRLENBQUMsQ0FBQTtJQUN2RSxPQUFPLENBQUMsR0FBRyxDQUFDLDJDQUEyQyxFQUFFLGVBQWUsQ0FBQyxDQUFBO0lBQ3pFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFBO0FBQ3ZDLENBQUMsQ0FBQyxDQUFBIn0=