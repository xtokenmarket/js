"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abis_1 = require("@xtoken/abis");
const ava_1 = __importDefault(require("ava"));
const constants_spec_1 = require("../../constants.spec");
const supply_1 = require("./supply");
ava_1.default('Get token supply of xAAVEa', async (t) => {
    const tokenSupply = await supply_1.getTokenSupply(abis_1.X_AAVE_A, constants_spec_1.provider);
    console.log('Token supply of xAAVEa:', tokenSupply);
    t.true(Number(tokenSupply) > 0);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VwcGx5LnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi9lcmMyMC9zdXBwbHkuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHVDQUF1QztBQUN2Qyw4Q0FBc0I7QUFFdEIseURBQStDO0FBRS9DLHFDQUF5QztBQUV6QyxhQUFJLENBQUMsNEJBQTRCLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQzdDLE1BQU0sV0FBVyxHQUFHLE1BQU0sdUJBQWMsQ0FBQyxlQUFRLEVBQUUseUJBQVEsQ0FBQyxDQUFBO0lBQzVELE9BQU8sQ0FBQyxHQUFHLENBQUMseUJBQXlCLEVBQUUsV0FBVyxDQUFDLENBQUE7SUFDbkQsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7QUFDakMsQ0FBQyxDQUFDLENBQUEifQ==