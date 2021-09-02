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
ava_1.default('Get xKNCa portfolio balance', async (t) => {
  const portfolioItem = await portfolio_1.getPortfolioItemXKnc(
    abis_1.X_KNC_A,
    constants_spec_1.testAddress,
    constants_spec_1.provider
  )
  console.log('Portfolio balance xKNCa:', portfolioItem.quantity)
  t.true(Number(portfolioItem.quantity) > 0)
})
ava_1.default('Get xKNCb portfolio balance', async (t) => {
  const portfolioItem = await portfolio_1.getPortfolioItemXKnc(
    abis_1.X_KNC_B,
    constants_spec_1.testAddress,
    constants_spec_1.provider
  )
  console.log('Portfolio balance xKNCb:', portfolioItem.quantity)
  t.true(Number(portfolioItem.quantity) > 0)
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9ydGZvbGlvLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi94a25jL3BvcnRmb2xpby5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsdUNBQStDO0FBQy9DLDhDQUFzQjtBQUV0Qix5REFBNEQ7QUFFNUQsMkNBQWtEO0FBRWxELGFBQUksQ0FBQyw2QkFBNkIsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDOUMsTUFBTSxhQUFhLEdBQUcsTUFBTSxnQ0FBb0IsQ0FDOUMsY0FBTyxFQUNQLDRCQUFXLEVBQ1gseUJBQVEsQ0FDVCxDQUFBO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsRUFBRSxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDL0QsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQzVDLENBQUMsQ0FBQyxDQUFBO0FBRUYsYUFBSSxDQUFDLDZCQUE2QixFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUM5QyxNQUFNLGFBQWEsR0FBRyxNQUFNLGdDQUFvQixDQUM5QyxjQUFPLEVBQ1AsNEJBQVcsRUFDWCx5QkFBUSxDQUNULENBQUE7SUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLDBCQUEwQixFQUFFLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUMvRCxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7QUFDNUMsQ0FBQyxDQUFDLENBQUEifQ==
