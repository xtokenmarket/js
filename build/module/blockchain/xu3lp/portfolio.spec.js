import { X_U3LP_A, X_U3LP_B, X_U3LP_C, X_U3LP_D } from '@xtoken/abis'
import test from 'ava'
import { provider, testAddress } from '../../constants.spec'
import { getPortfolioItemXU3LP } from './portfolio'
test('Get xU3LPa portfolio balance', async (t) => {
  const portfolioItem = await getPortfolioItemXU3LP(
    X_U3LP_A,
    testAddress,
    provider
  )
  console.log('Portfolio balance xU3LPa:', portfolioItem.quantity)
  t.true(Number(portfolioItem.quantity) > 0)
})
test('Get xU3LPb portfolio balance', async (t) => {
  const portfolioItem = await getPortfolioItemXU3LP(
    X_U3LP_B,
    testAddress,
    provider
  )
  console.log('Portfolio balance xU3LPb:', portfolioItem.quantity)
  t.true(Number(portfolioItem.quantity) > 0)
})
test('Get xU3LPc portfolio balance', async (t) => {
  const portfolioItem = await getPortfolioItemXU3LP(
    X_U3LP_C,
    testAddress,
    provider
  )
  console.log('Portfolio balance xU3LPc:', portfolioItem.quantity)
  t.true(Number(portfolioItem.quantity) > 0)
})
test('Get xU3LPd portfolio balance', async (t) => {
  const portfolioItem = await getPortfolioItemXU3LP(
    X_U3LP_D,
    testAddress,
    provider
  )
  console.log('Portfolio balance xU3LPd:', portfolioItem.quantity)
  t.true(Number(portfolioItem.quantity) > 0)
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9ydGZvbGlvLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi94dTNscC9wb3J0Zm9saW8uc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sY0FBYyxDQUFBO0FBQ3JFLE9BQU8sSUFBSSxNQUFNLEtBQUssQ0FBQTtBQUV0QixPQUFPLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxNQUFNLHNCQUFzQixDQUFBO0FBRTVELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGFBQWEsQ0FBQTtBQUVuRCxJQUFJLENBQUMsOEJBQThCLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQy9DLE1BQU0sYUFBYSxHQUFHLE1BQU0scUJBQXFCLENBQy9DLFFBQVEsRUFDUixXQUFXLEVBQ1gsUUFBUSxDQUNULENBQUE7SUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLDJCQUEyQixFQUFFLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUNoRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7QUFDNUMsQ0FBQyxDQUFDLENBQUE7QUFFRixJQUFJLENBQUMsOEJBQThCLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQy9DLE1BQU0sYUFBYSxHQUFHLE1BQU0scUJBQXFCLENBQy9DLFFBQVEsRUFDUixXQUFXLEVBQ1gsUUFBUSxDQUNULENBQUE7SUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLDJCQUEyQixFQUFFLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUNoRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7QUFDNUMsQ0FBQyxDQUFDLENBQUE7QUFFRixJQUFJLENBQUMsOEJBQThCLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQy9DLE1BQU0sYUFBYSxHQUFHLE1BQU0scUJBQXFCLENBQy9DLFFBQVEsRUFDUixXQUFXLEVBQ1gsUUFBUSxDQUNULENBQUE7SUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLDJCQUEyQixFQUFFLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUNoRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7QUFDNUMsQ0FBQyxDQUFDLENBQUE7QUFFRixJQUFJLENBQUMsOEJBQThCLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQy9DLE1BQU0sYUFBYSxHQUFHLE1BQU0scUJBQXFCLENBQy9DLFFBQVEsRUFDUixXQUFXLEVBQ1gsUUFBUSxDQUNULENBQUE7SUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLDJCQUEyQixFQUFFLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUNoRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7QUFDNUMsQ0FBQyxDQUFDLENBQUEifQ==