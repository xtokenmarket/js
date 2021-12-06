"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abis_1 = require("@xtoken/abis");
const ava_1 = __importDefault(require("ava"));
const constants_spec_1 = require("../../constants.spec");
const portfolio_1 = require("./portfolio");
ava_1.default('Get xBTC3x portfolio balance', async (t) => {
    const portfolioItem = await portfolio_1.getPortfolioItemXAssetLev(abis_1.X_BTC_3X, constants_spec_1.testAddress, constants_spec_1.arbitrumProvider);
    console.log('Portfolio balance xBTC3x: ', portfolioItem.quantity);
    t.true(Number(portfolioItem.quantity) > 0);
});
ava_1.default('Get xETH3x portfolio balance', async (t) => {
    const portfolioItem = await portfolio_1.getPortfolioItemXAssetLev(abis_1.X_ETH_3X, constants_spec_1.testAddress, constants_spec_1.arbitrumProvider);
    console.log('Portfolio balance xETH3x: ', portfolioItem.quantity);
    t.true(Number(portfolioItem.quantity) > 0);
});
/*test('Get xLINK3x portfolio balance', async (t) => {
  const portfolioItem = await getPortfolioItemXAssetLev(
    X_LINK_3X,
    testAddress,
    arbitrumProvider
  )
  console.log('Portfolio balance xLINK3x: ', portfolioItem.quantity)
  t.true(Number(portfolioItem.quantity) > 0)
})*/
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9ydGZvbGlvLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi9sZXYvcG9ydGZvbGlvLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSx1Q0FBaUQ7QUFDakQsOENBQXNCO0FBRXRCLHlEQUFvRTtBQUVwRSwyQ0FBdUQ7QUFFdkQsYUFBSSxDQUFDLDhCQUE4QixFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUMvQyxNQUFNLGFBQWEsR0FBRyxNQUFNLHFDQUF5QixDQUNuRCxlQUFRLEVBQ1IsNEJBQVcsRUFDWCxpQ0FBZ0IsQ0FDakIsQ0FBQTtJQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsNEJBQTRCLEVBQUUsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQ2pFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUM1QyxDQUFDLENBQUMsQ0FBQTtBQUVGLGFBQUksQ0FBQyw4QkFBOEIsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDL0MsTUFBTSxhQUFhLEdBQUcsTUFBTSxxQ0FBeUIsQ0FDbkQsZUFBUSxFQUNSLDRCQUFXLEVBQ1gsaUNBQWdCLENBQ2pCLENBQUE7SUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLDRCQUE0QixFQUFFLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUNqRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7QUFDNUMsQ0FBQyxDQUFDLENBQUE7QUFFRjs7Ozs7Ozs7SUFRSSJ9