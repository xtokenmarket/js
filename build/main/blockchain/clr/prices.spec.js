"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abis_1 = require("@xtoken/abis");
const ava_1 = __importDefault(require("ava"));
const constants_spec_1 = require("../../constants.spec");
const helper_1 = require("./helper");
const prices_1 = require("./prices");
ava_1.default(`Get ${abis_1.AAVE_X_AAVE_A_CLR} prices`, async (t) => {
    const { xAssetCLRContract } = await helper_1.getXAssetCLRContracts(abis_1.AAVE_X_AAVE_A_CLR, constants_spec_1.provider);
    const { aum, priceEth, priceUsd } = await prices_1.getXAssetCLRPrices(xAssetCLRContract);
    console.log(`${abis_1.AAVE_X_AAVE_A_CLR} aum:`, aum);
    console.log(`${abis_1.AAVE_X_AAVE_A_CLR} priceEth:`, priceEth);
    console.log(`${abis_1.AAVE_X_AAVE_A_CLR} priceUsd:`, priceUsd);
    t.true(aum > 0);
    t.true(priceEth > 0);
    t.true(priceUsd > 0);
});
ava_1.default(`Get ${abis_1.X_ALPHA_A_ALPHA_CLR} prices`, async (t) => {
    const { xAssetCLRContract } = await helper_1.getXAssetCLRContracts(abis_1.X_ALPHA_A_ALPHA_CLR, constants_spec_1.provider);
    const { aum, priceEth, priceUsd } = await prices_1.getXAssetCLRPrices(xAssetCLRContract);
    console.log(`${abis_1.X_ALPHA_A_ALPHA_CLR} aum:`, aum);
    console.log(`${abis_1.X_ALPHA_A_ALPHA_CLR} priceEth:`, priceEth);
    console.log(`${abis_1.X_ALPHA_A_ALPHA_CLR} priceUsd:`, priceUsd);
    t.true(aum > 0);
    t.true(priceEth > 0);
    t.true(priceUsd > 0);
});
ava_1.default(`Get ${abis_1.XTK_ETH_CLR} prices`, async (t) => {
    const { xAssetCLRContract } = await helper_1.getXAssetCLRContracts(abis_1.XTK_ETH_CLR, constants_spec_1.provider);
    const { aum, priceEth, priceUsd } = await prices_1.getXAssetCLRPrices(xAssetCLRContract);
    console.log(`${abis_1.XTK_ETH_CLR} aum:`, aum);
    console.log(`${abis_1.XTK_ETH_CLR} priceEth:`, priceEth);
    console.log(`${abis_1.XTK_ETH_CLR} priceUsd:`, priceUsd);
    t.true(aum > 0);
    t.true(priceEth > 0);
    t.true(priceUsd > 0);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpY2VzLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi9jbHIvcHJpY2VzLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSx1Q0FJcUI7QUFDckIsOENBQXNCO0FBRXRCLHlEQUErQztBQUUvQyxxQ0FBZ0Q7QUFDaEQscUNBQTZDO0FBRTdDLGFBQUksQ0FBQyxPQUFPLHdCQUFpQixTQUFTLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQ2xELE1BQU0sRUFBRSxpQkFBaUIsRUFBRSxHQUFHLE1BQU0sOEJBQXFCLENBQ3ZELHdCQUFpQixFQUNqQix5QkFBUSxDQUNULENBQUE7SUFFRCxNQUFNLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsR0FBRyxNQUFNLDJCQUFrQixDQUMxRCxpQkFBaUIsQ0FDbEIsQ0FBQTtJQUVELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyx3QkFBaUIsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFBO0lBQzdDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyx3QkFBaUIsWUFBWSxFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBQ3ZELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyx3QkFBaUIsWUFBWSxFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBQ3ZELENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFBO0lBQ2YsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUE7SUFDcEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUE7QUFDdEIsQ0FBQyxDQUFDLENBQUE7QUFFRixhQUFJLENBQUMsT0FBTywwQkFBbUIsU0FBUyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUNwRCxNQUFNLEVBQUUsaUJBQWlCLEVBQUUsR0FBRyxNQUFNLDhCQUFxQixDQUN2RCwwQkFBbUIsRUFDbkIseUJBQVEsQ0FDVCxDQUFBO0lBRUQsTUFBTSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEdBQUcsTUFBTSwyQkFBa0IsQ0FDMUQsaUJBQWlCLENBQ2xCLENBQUE7SUFFRCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsMEJBQW1CLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQTtJQUMvQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsMEJBQW1CLFlBQVksRUFBRSxRQUFRLENBQUMsQ0FBQTtJQUN6RCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsMEJBQW1CLFlBQVksRUFBRSxRQUFRLENBQUMsQ0FBQTtJQUN6RCxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQTtJQUNmLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFBO0lBQ3BCLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQ3RCLENBQUMsQ0FBQyxDQUFBO0FBRUYsYUFBSSxDQUFDLE9BQU8sa0JBQVcsU0FBUyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUM1QyxNQUFNLEVBQUUsaUJBQWlCLEVBQUUsR0FBRyxNQUFNLDhCQUFxQixDQUN2RCxrQkFBVyxFQUNYLHlCQUFRLENBQ1QsQ0FBQTtJQUVELE1BQU0sRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxHQUFHLE1BQU0sMkJBQWtCLENBQzFELGlCQUFpQixDQUNsQixDQUFBO0lBRUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLGtCQUFXLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQTtJQUN2QyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsa0JBQVcsWUFBWSxFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBQ2pELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxrQkFBVyxZQUFZLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFDakQsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUE7SUFDZixDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQTtJQUNwQixDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUN0QixDQUFDLENBQUMsQ0FBQSJ9