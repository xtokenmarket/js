import { X_U3LP_A, X_U3LP_B, X_U3LP_C, 
// X_U3LP_D,
// X_U3LP_E,
X_U3LP_F, X_U3LP_G, X_U3LP_H, } from '@xtoken/abis';
import test from 'ava';
import { provider, testAddress } from '../../constants.spec';
import { getPortfolioItemXU3LP } from './portfolio';
test('Get xU3LPa portfolio balance', async (t) => {
    const portfolioItem = await getPortfolioItemXU3LP(X_U3LP_A, testAddress, provider);
    console.log('Portfolio balance xU3LPa:', portfolioItem.quantity);
    t.true(Number(portfolioItem.quantity) > 0);
});
test('Get xU3LPb portfolio balance', async (t) => {
    const portfolioItem = await getPortfolioItemXU3LP(X_U3LP_B, testAddress, provider);
    console.log('Portfolio balance xU3LPb:', portfolioItem.quantity);
    t.true(Number(portfolioItem.quantity) > 0);
});
test('Get xU3LPc portfolio balance', async (t) => {
    const portfolioItem = await getPortfolioItemXU3LP(X_U3LP_C, testAddress, provider);
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
test('Get xU3LPf portfolio balance', async (t) => {
    const portfolioItem = await getPortfolioItemXU3LP(X_U3LP_F, testAddress, provider);
    console.log('Portfolio balance xU3LPf:', portfolioItem.quantity);
    t.true(Number(portfolioItem.quantity) > 0);
});
test('Get xU3LPg portfolio balance', async (t) => {
    const portfolioItem = await getPortfolioItemXU3LP(X_U3LP_G, testAddress, provider);
    console.log('Portfolio balance xU3LPg:', portfolioItem.quantity);
    t.true(Number(portfolioItem.quantity) > 0);
});
test('Get xU3LPh portfolio balance', async (t) => {
    const portfolioItem = await getPortfolioItemXU3LP(X_U3LP_H, testAddress, provider);
    console.log('Portfolio balance xU3LPh:', portfolioItem.quantity);
    t.true(Number(portfolioItem.quantity) > 0);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9ydGZvbGlvLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi94dTNscC9wb3J0Zm9saW8uc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsUUFBUSxFQUNSLFFBQVEsRUFDUixRQUFRO0FBQ1IsWUFBWTtBQUNaLFlBQVk7QUFDWixRQUFRLEVBQ1IsUUFBUSxFQUNSLFFBQVEsR0FDVCxNQUFNLGNBQWMsQ0FBQTtBQUNyQixPQUFPLElBQUksTUFBTSxLQUFLLENBQUE7QUFFdEIsT0FBTyxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQTtBQUU1RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxhQUFhLENBQUE7QUFFbkQsSUFBSSxDQUFDLDhCQUE4QixFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUMvQyxNQUFNLGFBQWEsR0FBRyxNQUFNLHFCQUFxQixDQUMvQyxRQUFRLEVBQ1IsV0FBVyxFQUNYLFFBQVEsQ0FDVCxDQUFBO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsRUFBRSxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDaEUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQzVDLENBQUMsQ0FBQyxDQUFBO0FBRUYsSUFBSSxDQUFDLDhCQUE4QixFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUMvQyxNQUFNLGFBQWEsR0FBRyxNQUFNLHFCQUFxQixDQUMvQyxRQUFRLEVBQ1IsV0FBVyxFQUNYLFFBQVEsQ0FDVCxDQUFBO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsRUFBRSxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDaEUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQzVDLENBQUMsQ0FBQyxDQUFBO0FBRUYsSUFBSSxDQUFDLDhCQUE4QixFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUMvQyxNQUFNLGFBQWEsR0FBRyxNQUFNLHFCQUFxQixDQUMvQyxRQUFRLEVBQ1IsV0FBVyxFQUNYLFFBQVEsQ0FDVCxDQUFBO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsRUFBRSxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDaEUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQzVDLENBQUMsQ0FBQyxDQUFBO0FBRUY7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWtCSTtBQUVKLElBQUksQ0FBQyw4QkFBOEIsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDL0MsTUFBTSxhQUFhLEdBQUcsTUFBTSxxQkFBcUIsQ0FDL0MsUUFBUSxFQUNSLFdBQVcsRUFDWCxRQUFRLENBQ1QsQ0FBQTtJQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLEVBQUUsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQ2hFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUM1QyxDQUFDLENBQUMsQ0FBQTtBQUVGLElBQUksQ0FBQyw4QkFBOEIsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDL0MsTUFBTSxhQUFhLEdBQUcsTUFBTSxxQkFBcUIsQ0FDL0MsUUFBUSxFQUNSLFdBQVcsRUFDWCxRQUFRLENBQ1QsQ0FBQTtJQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLEVBQUUsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQ2hFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUM1QyxDQUFDLENBQUMsQ0FBQTtBQUVGLElBQUksQ0FBQyw4QkFBOEIsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDL0MsTUFBTSxhQUFhLEdBQUcsTUFBTSxxQkFBcUIsQ0FDL0MsUUFBUSxFQUNSLFdBQVcsRUFDWCxRQUFRLENBQ1QsQ0FBQTtJQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLEVBQUUsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQ2hFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUM1QyxDQUFDLENBQUMsQ0FBQSJ9