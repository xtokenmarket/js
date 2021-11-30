"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abis_1 = require("@xtoken/abis");
const ava_1 = __importDefault(require("ava"));
const constants_spec_1 = require("../../constants.spec");
const redeem_1 = require("./redeem");
ava_1.default('Get maximum redeemable xALPHAa', async (t) => {
    const maxRedeemable = await redeem_1.getMaximumRedeemableXAlpha(abis_1.X_ALPHA_A, constants_spec_1.provider);
    console.log('Maximum redeemable xALPHAa: ', maxRedeemable);
    t.true(Number(maxRedeemable) > 0);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkZWVtLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi94YWxwaGEvcmVkZWVtLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSx1Q0FBd0M7QUFDeEMsOENBQXNCO0FBRXRCLHlEQUErQztBQUUvQyxxQ0FBcUQ7QUFFckQsYUFBSSxDQUFDLGdDQUFnQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUNqRCxNQUFNLGFBQWEsR0FBRyxNQUFNLG1DQUEwQixDQUFDLGdCQUFTLEVBQUUseUJBQVEsQ0FBQyxDQUFBO0lBQzNFLE9BQU8sQ0FBQyxHQUFHLENBQUMsOEJBQThCLEVBQUUsYUFBYSxDQUFDLENBQUE7SUFDMUQsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7QUFDbkMsQ0FBQyxDQUFDLENBQUEifQ==