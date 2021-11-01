import {
  // LENDING_X_AAVE_A_MARKET,
  // LENDING_X_AAVE_B_MARKET,
  LENDING_X_INCH_A_MARKET,
} from '@xtoken/abis'
import test from 'ava'
import {
  kovanProvider,
  oneAddress,
  provider,
  testAddress,
} from '../../constants.spec'
import { getBorrowingLimit, getCollateral, getLendingMarkets } from './market'
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
test('Get borrowing limit for xINCHa market', async (t) => {
  const borrowingLimit = await getBorrowingLimit(
    LENDING_X_INCH_A_MARKET,
    oneAddress,
    provider
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
test('Get collateral for xINCHa market', async (t) => {
  const collateral = await getCollateral(
    LENDING_X_INCH_A_MARKET,
    oneAddress,
    provider
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
test('Get lending markets', async (t) => {
  const lendingMarkets = await getLendingMarkets(testAddress, kovanProvider)
  console.log('[Lending] Markets:', JSON.stringify(lendingMarkets))
  t.true(lendingMarkets.length === 1)
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2V0LnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi9sZW5kaW5nL21hcmtldC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU87QUFDTCwyQkFBMkI7QUFDM0IsMkJBQTJCO0FBQzNCLHVCQUF1QixHQUl4QixNQUFNLGNBQWMsQ0FBQTtBQUNyQixPQUFPLElBQUksTUFBTSxLQUFLLENBQUE7QUFFdEIsT0FBTyxFQUNMLGFBQWEsRUFDYixVQUFVLEVBQ1YsUUFBUSxFQUNSLFdBQVcsR0FDWixNQUFNLHNCQUFzQixDQUFBO0FBRTdCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxhQUFhLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxVQUFVLENBQUE7QUFFOUU7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWtCSTtBQUVKLElBQUksQ0FBQyx1Q0FBdUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDeEQsTUFBTSxjQUFjLEdBQUcsTUFBTSxpQkFBaUIsQ0FDNUMsdUJBQXVCLEVBQ3ZCLFVBQVUsRUFDVixRQUFRLENBQ1QsQ0FBQTtJQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsbUNBQW1DLEVBQUUsY0FBYyxDQUFDLENBQUE7SUFDaEUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7QUFDdEMsQ0FBQyxDQUFDLENBQUE7QUFFRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBZ0RJO0FBRUosSUFBSSxDQUFDLGtDQUFrQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUNuRCxNQUFNLFVBQVUsR0FBRyxNQUFNLGFBQWEsQ0FDcEMsdUJBQXVCLEVBQ3ZCLFVBQVUsRUFDVixRQUFRLENBQ1QsQ0FBQTtJQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsOEJBQThCLEVBQUUsVUFBVSxDQUFDLENBQUE7SUFDdkQsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7QUFDbEMsQ0FBQyxDQUFDLENBQUE7QUFFRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQTRCSTtBQUVKLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDdEMsTUFBTSxjQUFjLEdBQUcsTUFBTSxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsYUFBYSxDQUFDLENBQUE7SUFDMUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUE7SUFDakUsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFBO0FBQ3JDLENBQUMsQ0FBQyxDQUFBIn0=
