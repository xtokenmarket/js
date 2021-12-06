"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const constants_spec_1 = require("../../constants.spec");
const helper_1 = require("./helper");
const prices_1 = require("./prices");
ava_1.default('Get xSNXa prices', async (t) => {
    const { xsnxContract } = await helper_1.getXSnxContracts(constants_spec_1.provider);
    const { aum, priceEth, priceUsd } = await prices_1.getXSnxPrices(xsnxContract);
    console.log('xSNXa aum:', aum);
    console.log('xSNXa priceEth:', priceEth);
    console.log('xSNXa priceUsd:', priceUsd);
    t.true(aum > 0);
    t.true(priceEth > 0);
    t.true(priceUsd > 0);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpY2VzLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi94c254L3ByaWNlcy5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsOENBQXNCO0FBRXRCLHlEQUErQztBQUUvQyxxQ0FBMkM7QUFDM0MscUNBQXdDO0FBRXhDLGFBQUksQ0FBQyxrQkFBa0IsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDbkMsTUFBTSxFQUFFLFlBQVksRUFBRSxHQUFHLE1BQU0seUJBQWdCLENBQUMseUJBQVEsQ0FBQyxDQUFBO0lBRXpELE1BQU0sRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxHQUFHLE1BQU0sc0JBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQTtJQUVyRSxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxHQUFHLENBQUMsQ0FBQTtJQUM5QixPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBQ3hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFDeEMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUE7SUFDZixDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQTtJQUNwQixDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUN0QixDQUFDLENBQUMsQ0FBQSJ9