"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abis_1 = require("@xtoken/abis");
const ava_1 = __importDefault(require("ava"));
const constants_spec_1 = require("../../constants.spec");
const portfolio_1 = require("./portfolio");
ava_1.default('Get xU3LPa portfolio balance', async (t) => {
    const portfolioItem = await portfolio_1.getPortfolioItemXU3LP(abis_1.X_U3LP_A, constants_spec_1.testAddress, constants_spec_1.provider);
    console.log('Portfolio balance xU3LPa:', portfolioItem.quantity);
    t.true(Number(portfolioItem.quantity) > 0);
});
ava_1.default('Get xU3LPb portfolio balance', async (t) => {
    const portfolioItem = await portfolio_1.getPortfolioItemXU3LP(abis_1.X_U3LP_B, constants_spec_1.testAddress, constants_spec_1.provider);
    console.log('Portfolio balance xU3LPb:', portfolioItem.quantity);
    t.true(Number(portfolioItem.quantity) > 0);
});
ava_1.default('Get xU3LPc portfolio balance', async (t) => {
    const portfolioItem = await portfolio_1.getPortfolioItemXU3LP(abis_1.X_U3LP_C, constants_spec_1.testAddress, constants_spec_1.provider);
    console.log('Portfolio balance xU3LPc:', portfolioItem.quantity);
    t.true(Number(portfolioItem.quantity) > 0);
});
/*test('Get xU3LPd portfolio balance', async (t) => {
  const portfolioItem = await getPortfolioItemXU3LP(
    X_U3LP_D,
    testAddress,
    provider
  )
  console.log('Portfolio balance xU3LPd:', portfolioItem.quantity)
  t.true(Number(portfolioItem.quantity) > 0)
})

test('Get xU3LPe portfolio balance', async (t) => {
  const portfolioItem = await getPortfolioItemXU3LP(
    X_U3LP_E,
    testAddress,
    provider
  )
  console.log('Portfolio balance xU3LPe:', portfolioItem.quantity)
  t.true(Number(portfolioItem.quantity) > 0)
})*/
ava_1.default('Get xU3LPf portfolio balance', async (t) => {
    const portfolioItem = await portfolio_1.getPortfolioItemXU3LP(abis_1.X_U3LP_F, constants_spec_1.testAddress, constants_spec_1.provider);
    console.log('Portfolio balance xU3LPf:', portfolioItem.quantity);
    t.true(Number(portfolioItem.quantity) > 0);
});
ava_1.default('Get xU3LPg portfolio balance', async (t) => {
    const portfolioItem = await portfolio_1.getPortfolioItemXU3LP(abis_1.X_U3LP_G, constants_spec_1.testAddress, constants_spec_1.provider);
    console.log('Portfolio balance xU3LPg:', portfolioItem.quantity);
    t.true(Number(portfolioItem.quantity) > 0);
});
ava_1.default('Get xU3LPh portfolio balance', async (t) => {
    const portfolioItem = await portfolio_1.getPortfolioItemXU3LP(abis_1.X_U3LP_H, constants_spec_1.testAddress, constants_spec_1.provider);
    console.log('Portfolio balance xU3LPh:', portfolioItem.quantity);
    t.true(Number(portfolioItem.quantity) > 0);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9ydGZvbGlvLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi94dTNscC9wb3J0Zm9saW8uc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHVDQVNxQjtBQUNyQiw4Q0FBc0I7QUFFdEIseURBQTREO0FBRTVELDJDQUFtRDtBQUVuRCxhQUFJLENBQUMsOEJBQThCLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQy9DLE1BQU0sYUFBYSxHQUFHLE1BQU0saUNBQXFCLENBQy9DLGVBQVEsRUFDUiw0QkFBVyxFQUNYLHlCQUFRLENBQ1QsQ0FBQTtJQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLEVBQUUsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQ2hFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUM1QyxDQUFDLENBQUMsQ0FBQTtBQUVGLGFBQUksQ0FBQyw4QkFBOEIsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDL0MsTUFBTSxhQUFhLEdBQUcsTUFBTSxpQ0FBcUIsQ0FDL0MsZUFBUSxFQUNSLDRCQUFXLEVBQ1gseUJBQVEsQ0FDVCxDQUFBO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsRUFBRSxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDaEUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQzVDLENBQUMsQ0FBQyxDQUFBO0FBRUYsYUFBSSxDQUFDLDhCQUE4QixFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUMvQyxNQUFNLGFBQWEsR0FBRyxNQUFNLGlDQUFxQixDQUMvQyxlQUFRLEVBQ1IsNEJBQVcsRUFDWCx5QkFBUSxDQUNULENBQUE7SUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLDJCQUEyQixFQUFFLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUNoRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7QUFDNUMsQ0FBQyxDQUFDLENBQUE7QUFFRjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBa0JJO0FBRUosYUFBSSxDQUFDLDhCQUE4QixFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUMvQyxNQUFNLGFBQWEsR0FBRyxNQUFNLGlDQUFxQixDQUMvQyxlQUFRLEVBQ1IsNEJBQVcsRUFDWCx5QkFBUSxDQUNULENBQUE7SUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLDJCQUEyQixFQUFFLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUNoRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7QUFDNUMsQ0FBQyxDQUFDLENBQUE7QUFFRixhQUFJLENBQUMsOEJBQThCLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQy9DLE1BQU0sYUFBYSxHQUFHLE1BQU0saUNBQXFCLENBQy9DLGVBQVEsRUFDUiw0QkFBVyxFQUNYLHlCQUFRLENBQ1QsQ0FBQTtJQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLEVBQUUsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQ2hFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUM1QyxDQUFDLENBQUMsQ0FBQTtBQUVGLGFBQUksQ0FBQyw4QkFBOEIsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDL0MsTUFBTSxhQUFhLEdBQUcsTUFBTSxpQ0FBcUIsQ0FDL0MsZUFBUSxFQUNSLDRCQUFXLEVBQ1gseUJBQVEsQ0FDVCxDQUFBO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsRUFBRSxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDaEUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQzVDLENBQUMsQ0FBQyxDQUFBIn0=