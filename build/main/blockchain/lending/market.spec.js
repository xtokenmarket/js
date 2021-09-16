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
const market_1 = require('./market')
ava_1.default('Get borrowing limit for xAAVEa market', async (t) => {
  const borrowingLimit = await market_1.getBorrowingLimit(
    abis_1.LENDING_X_AAVE_A_MARKET,
    constants_spec_1.provider,
    constants_spec_1.oneAddress
  )
  console.log('[Lending] xAAVEa Borrowing Limit:', borrowingLimit)
  t.true(Number(borrowingLimit) === 0)
})
ava_1.default('Get borrowing limit for xAAVEb market', async (t) => {
  const borrowingLimit = await market_1.getBorrowingLimit(
    abis_1.LENDING_X_AAVE_B_MARKET,
    constants_spec_1.provider,
    constants_spec_1.oneAddress
  )
  console.log('[Lending] xAAVEb Borrowing Limit:', borrowingLimit)
  t.true(Number(borrowingLimit) === 0)
})
ava_1.default('Get borrowing limit for xINCHa market', async (t) => {
  const borrowingLimit = await market_1.getBorrowingLimit(
    abis_1.LENDING_X_INCH_A_MARKET,
    constants_spec_1.provider,
    constants_spec_1.oneAddress
  )
  console.log('[Lending] xINCHa Borrowing Limit:', borrowingLimit)
  t.true(Number(borrowingLimit) === 0)
})
ava_1.default('Get borrowing limit for xINCHb market', async (t) => {
  const borrowingLimit = await market_1.getBorrowingLimit(
    abis_1.LENDING_X_INCH_B_MARKET,
    constants_spec_1.provider,
    constants_spec_1.oneAddress
  )
  console.log('[Lending] xINCHb Borrowing Limit:', borrowingLimit)
  t.true(Number(borrowingLimit) === 0)
})
ava_1.default('Get borrowing limit for xKNCa market', async (t) => {
  const borrowingLimit = await market_1.getBorrowingLimit(
    abis_1.LENDING_X_KNC_A_MARKET,
    constants_spec_1.provider,
    constants_spec_1.oneAddress
  )
  console.log('[Lending] xKNCa Borrowing Limit:', borrowingLimit)
  t.true(Number(borrowingLimit) === 0)
})
ava_1.default('Get borrowing limit for xKNCb market', async (t) => {
  const borrowingLimit = await market_1.getBorrowingLimit(
    abis_1.LENDING_X_KNC_B_MARKET,
    constants_spec_1.provider,
    constants_spec_1.oneAddress
  )
  console.log('[Lending] xKNCb Borrowing Limit:', borrowingLimit)
  t.true(Number(borrowingLimit) === 0)
})
ava_1.default('Get collateral for xAAVEa market', async (t) => {
  const collateral = await market_1.getCollateral(
    abis_1.LENDING_X_AAVE_A_MARKET,
    constants_spec_1.provider,
    constants_spec_1.oneAddress
  )
  console.log('[Lending] xAAVEa Collateral:', collateral)
  t.true(Number(collateral) === 0)
})
ava_1.default('Get collateral for xAAVEb market', async (t) => {
  const collateral = await market_1.getCollateral(
    abis_1.LENDING_X_AAVE_B_MARKET,
    constants_spec_1.provider,
    constants_spec_1.oneAddress
  )
  console.log('[Lending] xAAVEb Collateral:', collateral)
  t.true(Number(collateral) === 0)
})
ava_1.default('Get collateral for xINCHa market', async (t) => {
  const collateral = await market_1.getCollateral(
    abis_1.LENDING_X_INCH_A_MARKET,
    constants_spec_1.provider,
    constants_spec_1.oneAddress
  )
  console.log('[Lending] xINCHa Collateral:', collateral)
  t.true(Number(collateral) === 0)
})
ava_1.default('Get collateral for xINCHb market', async (t) => {
  const collateral = await market_1.getCollateral(
    abis_1.LENDING_X_INCH_B_MARKET,
    constants_spec_1.provider,
    constants_spec_1.oneAddress
  )
  console.log('[Lending] xINCHb Collateral:', collateral)
  t.true(Number(collateral) === 0)
})
ava_1.default('Get collateral for xKNCa market', async (t) => {
  const collateral = await market_1.getCollateral(
    abis_1.LENDING_X_KNC_A_MARKET,
    constants_spec_1.provider,
    constants_spec_1.oneAddress
  )
  console.log('[Lending] xKNCa Collateral:', collateral)
  t.true(Number(collateral) === 0)
})
ava_1.default('Get collateral for xKNCb market', async (t) => {
  const collateral = await market_1.getCollateral(
    abis_1.LENDING_X_KNC_B_MARKET,
    constants_spec_1.provider,
    constants_spec_1.oneAddress
  )
  console.log('[Lending] xKNCb Collateral:', collateral)
  t.true(Number(collateral) === 0)
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2V0LnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi9sZW5kaW5nL21hcmtldC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsdUNBT3FCO0FBQ3JCLDhDQUFzQjtBQUV0Qix5REFBMkQ7QUFFM0QscUNBQTJEO0FBRTNELGFBQUksQ0FBQyx1Q0FBdUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDeEQsTUFBTSxjQUFjLEdBQUcsTUFBTSwwQkFBaUIsQ0FDNUMsOEJBQXVCLEVBQ3ZCLHlCQUFRLEVBQ1IsMkJBQVUsQ0FDWCxDQUFBO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQ0FBbUMsRUFBRSxjQUFjLENBQUMsQ0FBQTtJQUNoRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQTtBQUN0QyxDQUFDLENBQUMsQ0FBQTtBQUVGLGFBQUksQ0FBQyx1Q0FBdUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDeEQsTUFBTSxjQUFjLEdBQUcsTUFBTSwwQkFBaUIsQ0FDNUMsOEJBQXVCLEVBQ3ZCLHlCQUFRLEVBQ1IsMkJBQVUsQ0FDWCxDQUFBO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQ0FBbUMsRUFBRSxjQUFjLENBQUMsQ0FBQTtJQUNoRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQTtBQUN0QyxDQUFDLENBQUMsQ0FBQTtBQUVGLGFBQUksQ0FBQyx1Q0FBdUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDeEQsTUFBTSxjQUFjLEdBQUcsTUFBTSwwQkFBaUIsQ0FDNUMsOEJBQXVCLEVBQ3ZCLHlCQUFRLEVBQ1IsMkJBQVUsQ0FDWCxDQUFBO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQ0FBbUMs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
