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
/*test('Get borrowing limit for xAAVEa market', async (t) => {
  const borrowingLimit = await getBorrowingLimit(
    LENDING_X_AAVE_A_MARKET,
    provider,
    oneAddress
  )
  console.log('[Lending] xAAVEa Borrowing Limit:', borrowingLimit)
  t.true(Number(borrowingLimit) === 0)
})

test('Get borrowing limit for xAAVEb market', async (t) => {
  const borrowingLimit = await getBorrowingLimit(
    LENDING_X_AAVE_B_MARKET,
    provider,
    oneAddress
  )
  console.log('[Lending] xAAVEb Borrowing Limit:', borrowingLimit)
  t.true(Number(borrowingLimit) === 0)
})*/
ava_1.default('Get borrowing limit for xINCHa market', async (t) => {
  const borrowingLimit = await market_1.getBorrowingLimit(
    abis_1.LENDING_X_INCH_A_MARKET,
    constants_spec_1.oneAddress,
    constants_spec_1.provider
  )
  console.log('[Lending] xINCHa Borrowing Limit:', borrowingLimit)
  t.true(Number(borrowingLimit) === 0)
})
/*test('Get borrowing limit for xINCHb market', async (t) => {
  const borrowingLimit = await getBorrowingLimit(
    LENDING_X_INCH_B_MARKET,
    provider,
    oneAddress
  )
  console.log('[Lending] xINCHb Borrowing Limit:', borrowingLimit)
  t.true(Number(borrowingLimit) === 0)
})

test('Get borrowing limit for xKNCa market', async (t) => {
  const borrowingLimit = await getBorrowingLimit(
    LENDING_X_KNC_A_MARKET,
    provider,
    oneAddress
  )
  console.log('[Lending] xKNCa Borrowing Limit:', borrowingLimit)
  t.true(Number(borrowingLimit) === 0)
})

test('Get borrowing limit for xKNCb market', async (t) => {
  const borrowingLimit = await getBorrowingLimit(
    LENDING_X_KNC_B_MARKET,
    provider,
    oneAddress
  )
  console.log('[Lending] xKNCb Borrowing Limit:', borrowingLimit)
  t.true(Number(borrowingLimit) === 0)
})

test('Get collateral for xAAVEa market', async (t) => {
  const collateral = await getCollateral(
    LENDING_X_AAVE_A_MARKET,
    provider,
    oneAddress
  )
  console.log('[Lending] xAAVEa Collateral:', collateral)
  t.true(Number(collateral) === 0)
})

test('Get collateral for xAAVEb market', async (t) => {
  const collateral = await getCollateral(
    LENDING_X_AAVE_B_MARKET,
    provider,
    oneAddress
  )
  console.log('[Lending] xAAVEb Collateral:', collateral)
  t.true(Number(collateral) === 0)
})*/
ava_1.default('Get collateral for xINCHa market', async (t) => {
  const collateral = await market_1.getCollateral(
    abis_1.LENDING_X_INCH_A_MARKET,
    constants_spec_1.oneAddress,
    constants_spec_1.provider
  )
  console.log('[Lending] xINCHa Collateral:', collateral)
  t.true(Number(collateral) === 0)
})
/*test('Get collateral for xINCHb market', async (t) => {
  const collateral = await getCollateral(
    LENDING_X_INCH_B_MARKET,
    provider,
    oneAddress
  )
  console.log('[Lending] xINCHb Collateral:', collateral)
  t.true(Number(collateral) === 0)
})

test('Get collateral for xKNCa market', async (t) => {
  const collateral = await getCollateral(
    LENDING_X_KNC_A_MARKET,
    provider,
    oneAddress
  )
  console.log('[Lending] xKNCa Collateral:', collateral)
  t.true(Number(collateral) === 0)
})

test('Get collateral for xKNCb market', async (t) => {
  const collateral = await getCollateral(
    LENDING_X_KNC_B_MARKET,
    provider,
    oneAddress
  )
  console.log('[Lending] xKNCb Collateral:', collateral)
  t.true(Number(collateral) === 0)
})*/
ava_1.default('Get lending markets', async (t) => {
  const lendingMarkets = await market_1.getLendingMarkets(
    constants_spec_1.testAddress,
    constants_spec_1.kovanProvider
  )
  console.log('[Lending] Markets:', JSON.stringify(lendingMarkets))
  t.true(lendingMarkets.length === 1)
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2V0LnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi9sZW5kaW5nL21hcmtldC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsdUNBT3FCO0FBQ3JCLDhDQUFzQjtBQUV0Qix5REFLNkI7QUFFN0IscUNBQThFO0FBRTlFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFrQkk7QUFFSixhQUFJLENBQUMsdUNBQXVDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQ3hELE1BQU0sY0FBYyxHQUFHLE1BQU0sMEJBQWlCLENBQzVDLDhCQUF1QixFQUN2QiwyQkFBVSxFQUNWLHlCQUFRLENBQ1QsQ0FBQTtJQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsbUNBQW1DLEVBQUUsY0FBYyxDQUFDLENBQUE7SUFDaEUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7QUFDdEMsQ0FBQyxDQUFDLENBQUE7QUFFRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBZ0RJO0FBRUosYUFBSSxDQUFDLGtDQUFrQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUNuRCxNQUFNLFVBQVUsR0FBRyxNQUFNLHNCQUFhLENBQ3BDLDhCQUF1QixFQUN2QiwyQkFBVSxFQUNWLHlCQUFRLENBQ1QsQ0FBQTtJQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsOEJBQThCLEVBQUUsVUFBVSxDQUFDLENBQUE7SUFDdkQsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7QUFDbEMsQ0FBQyxDQUFDLENBQUE7QUFFRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQTRCSTtBQUVKLGFBQUksQ0FBQyxxQkFBcUIsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDdEMsTUFBTSxjQUFjLEdBQUcsTUFBTSwwQkFBaUIsQ0FBQyw0QkFBVyxFQUFFLDhCQUFhLENBQUMsQ0FBQTtJQUMxRSxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQTtJQUNqRSxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUE7QUFDckMsQ0FBQyxDQUFDLENBQUEifQ==
