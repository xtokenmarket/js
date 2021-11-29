'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const abis_1 = require('@xtoken/abis')
const ava_1 = __importDefault(require('ava'))
const constants_spec_1 = require('../../constants.spec')
const portfolio_1 = require('./portfolio')
ava_1.default('Get xAAVEa portfolio balance', async (t) => {
  const portfolioItem = await portfolio_1.getPortfolioItemXAave(
    abis_1.X_AAVE_A,
    constants_spec_1.testAddress,
    constants_spec_1.provider
  )
  console.log('Portfolio balance xAAVEa:', portfolioItem.quantity)
  t.true(Number(portfolioItem.quantity) > 0)
})
ava_1.default('Get xAAVEb portfolio balance', async (t) => {
  const portfolioItem = await portfolio_1.getPortfolioItemXAave(
    abis_1.X_AAVE_B,
    constants_spec_1.testAddress,
    constants_spec_1.provider
  )
  console.log('Portfolio balance xAAVEb:', portfolioItem.quantity)
  t.true(Number(portfolioItem.quantity) > 0)
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9ydGZvbGlvLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi94YWF2ZS9wb3J0Zm9saW8uc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHVDQUFpRDtBQUNqRCw4Q0FBc0I7QUFFdEIseURBQTREO0FBRTVELDJDQUFtRDtBQUVuRCxhQUFJLENBQUMsOEJBQThCLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQy9DLE1BQU0sYUFBYSxHQUFHLE1BQU0saUNBQXFCLENBQy9DLGVBQVEsRUFDUiw0QkFBVyxFQUNYLHlCQUFRLENBQ1QsQ0FBQTtJQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLEVBQUUsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQ2hFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUM1QyxDQUFDLENBQUMsQ0FBQTtBQUVGLGFBQUksQ0FBQyw4QkFBOEIsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDL0MsTUFBTSxhQUFhLEdBQUcsTUFBTSxpQ0FBcUIsQ0FDL0MsZUFBUSxFQUNSLDRCQUFXLEVBQ1gseUJBQVEsQ0FDVCxDQUFBO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsRUFBRSxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDaEUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQzVDLENBQUMsQ0FBQyxDQUFBIn0=
