import { X_ALPHA_A } from '@xtoken/abis'
import test from 'ava'
import { provider, testAddress } from '../../constants.spec'
import { getPortfolioItemXAlpha } from './portfolio'
test('Get xALPHAa portfolio balance', async (t) => {
  const portfolioItem = await getPortfolioItemXAlpha(
    X_ALPHA_A,
    testAddress,
    provider
  )
  console.log('Portfolio balance xALPHAa: ', portfolioItem.quantity)
  t.true(Number(portfolioItem.quantity) > 0)
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9ydGZvbGlvLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi94YWxwaGEvcG9ydGZvbGlvLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGNBQWMsQ0FBQTtBQUN4QyxPQUFPLElBQUksTUFBTSxLQUFLLENBQUE7QUFFdEIsT0FBTyxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQTtBQUU1RCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxhQUFhLENBQUE7QUFFcEQsSUFBSSxDQUFDLCtCQUErQixFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUNoRCxNQUFNLGFBQWEsR0FBRyxNQUFNLHNCQUFzQixDQUNoRCxTQUFTLEVBQ1QsV0FBVyxFQUNYLFFBQVEsQ0FDVCxDQUFBO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyw2QkFBNkIsRUFBRSxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDbEUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQzVDLENBQUMsQ0FBQyxDQUFBIn0=
