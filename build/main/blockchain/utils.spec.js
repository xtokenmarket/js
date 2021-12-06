"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abis_1 = require("@xtoken/abis");
const ava_1 = __importDefault(require("ava"));
const ethers_1 = require("ethers");
const utils_1 = require("ethers/lib/utils");
const constants_spec_1 = require("../constants.spec");
const utils_2 = require("./utils");
const helper_1 = require("./xaave/helper");
ava_1.default('Get BalancerPool address for xAAVEa', (t) => {
    const balancerPoolAddress = utils_2.getBalancerPoolAddress(abis_1.X_AAVE_A, 1);
    t.is(balancerPoolAddress, abis_1.ADDRESSES[abis_1.X_AAVE_A_BALANCER_POOL][1]);
});
ava_1.default('Get BalancerPool address for xKNCa', (t) => {
    const balancerPoolAddress = utils_2.getBalancerPoolAddress(abis_1.X_KNC_A, 1);
    t.is(balancerPoolAddress, null);
});
ava_1.default('Expected rate for xAAVEa', async (t) => {
    const { kyberProxyContract, tokenContract } = await helper_1.getXAaveContracts(abis_1.X_AAVE_A, constants_spec_1.provider);
    const expectedRate = utils_1.formatEther(await utils_2.getExpectedRate(kyberProxyContract, tokenContract.address, abis_1.ADDRESSES[abis_1.ETH], ethers_1.BigNumber.from('1000')));
    console.log('Expected rate for xAAVEa:', expectedRate);
    t.true(Number(expectedRate) > 0);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ibG9ja2NoYWluL3V0aWxzLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSx1Q0FNcUI7QUFDckIsOENBQXNCO0FBQ3RCLG1DQUFrQztBQUNsQyw0Q0FBOEM7QUFFOUMsc0RBQTRDO0FBRTVDLG1DQUFpRTtBQUNqRSwyQ0FBa0Q7QUFFbEQsYUFBSSxDQUFDLHFDQUFxQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7SUFDaEQsTUFBTSxtQkFBbUIsR0FBRyw4QkFBc0IsQ0FBQyxlQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUE7SUFDL0QsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxnQkFBUyxDQUFDLDZCQUFzQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUNqRSxDQUFDLENBQUMsQ0FBQTtBQUVGLGFBQUksQ0FBQyxvQ0FBb0MsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO0lBQy9DLE1BQU0sbUJBQW1CLEdBQUcsOEJBQXNCLENBQUMsY0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFBO0lBQzlELENBQUMsQ0FBQyxFQUFFLENBQUMsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLENBQUE7QUFDakMsQ0FBQyxDQUFDLENBQUE7QUFFRixhQUFJLENBQUMsMEJBQTBCLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQzNDLE1BQU0sRUFBRSxrQkFBa0IsRUFBRSxhQUFhLEVBQUUsR0FBRyxNQUFNLDBCQUFpQixDQUNuRSxlQUFRLEVBQ1IseUJBQVEsQ0FDVCxDQUFBO0lBQ0QsTUFBTSxZQUFZLEdBQUcsbUJBQVcsQ0FDOUIsTUFBTSx1QkFBZSxDQUNuQixrQkFBa0IsRUFDbEIsYUFBYSxDQUFDLE9BQU8sRUFDckIsZ0JBQVMsQ0FBQyxVQUFHLENBQVcsRUFDeEIsa0JBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQ3ZCLENBQ0YsQ0FBQTtJQUVELE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLEVBQUUsWUFBWSxDQUFDLENBQUE7SUFDdEQsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7QUFDbEMsQ0FBQyxDQUFDLENBQUEifQ==