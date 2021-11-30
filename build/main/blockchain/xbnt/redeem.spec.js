"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abis_1 = require("@xtoken/abis");
const ava_1 = __importDefault(require("ava"));
const constants_spec_1 = require("../../constants.spec");
const redeem_1 = require("./redeem");
ava_1.default('Get maximum redeemable xBNTa', async (t) => {
    const maxRedeemable = await redeem_1.getMaximumRedeemableXBnt(abis_1.X_BNT_A, constants_spec_1.provider);
    console.log('Maximum redeemable xBNTa:', maxRedeemable);
    t.true(Number(maxRedeemable) > 0);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkZWVtLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi94Ym50L3JlZGVlbS5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsdUNBQXNDO0FBQ3RDLDhDQUFzQjtBQUV0Qix5REFBK0M7QUFFL0MscUNBQW1EO0FBRW5ELGFBQUksQ0FBQyw4QkFBOEIsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDL0MsTUFBTSxhQUFhLEdBQUcsTUFBTSxpQ0FBd0IsQ0FBQyxjQUFPLEVBQUUseUJBQVEsQ0FBQyxDQUFBO0lBQ3ZFLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLEVBQUUsYUFBYSxDQUFDLENBQUE7SUFDdkQsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7QUFDbkMsQ0FBQyxDQUFDLENBQUEifQ==