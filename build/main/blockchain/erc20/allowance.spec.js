"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abis_1 = require("@xtoken/abis");
const ava_1 = __importDefault(require("ava"));
const constants_spec_1 = require("../../constants.spec");
const allowance_1 = require("./allowance");
ava_1.default('Get AAVE token allowance of xAAVEa for test address', async (t) => {
    const tokenAllowance = await allowance_1.getTokenAllowance(abis_1.AAVE, constants_spec_1.testAddress, abis_1.ADDRESSES[abis_1.X_AAVE_A][1], constants_spec_1.provider);
    console.log('AAVE Token allowance of xAAVEa for test address:', tokenAllowance);
    t.true(Number(tokenAllowance) > 0);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxsb3dhbmNlLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi9lcmMyMC9hbGxvd2FuY2Uuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHVDQUF3RDtBQUN4RCw4Q0FBc0I7QUFFdEIseURBQTREO0FBRTVELDJDQUErQztBQUUvQyxhQUFJLENBQUMscURBQXFELEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQ3RFLE1BQU0sY0FBYyxHQUFHLE1BQU0sNkJBQWlCLENBQzVDLFdBQUksRUFDSiw0QkFBVyxFQUNYLGdCQUFTLENBQUMsZUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ3RCLHlCQUFRLENBQ1QsQ0FBQTtJQUNELE9BQU8sQ0FBQyxHQUFHLENBQ1Qsa0RBQWtELEVBQ2xELGNBQWMsQ0FDZixDQUFBO0lBQ0QsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7QUFDcEMsQ0FBQyxDQUFDLENBQUEifQ==