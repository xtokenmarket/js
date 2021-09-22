import { X_SNX_A } from '@xtoken/abis'
import test from 'ava'
import { provider, testAddress } from '../../constants.spec'
import { getPortfolioItemXSnx } from './portfolio'
test('Get xSNXa portfolio balance', async (t) => {
  const portfolioItem = await getPortfolioItemXSnx(
    X_SNX_A,
    testAddress,
    provider
  )
  console.log('Portfolio balance xSNXa:', portfolioItem.quantity)
  t.true(Number(portfolioItem.quantity) > 0)
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9ydGZvbGlvLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi94c254L3BvcnRmb2xpby5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxjQUFjLENBQUE7QUFDdEMsT0FBTyxJQUFJLE1BQU0sS0FBSyxDQUFBO0FBRXRCLE9BQU8sRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0JBQXNCLENBQUE7QUFFNUQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sYUFBYSxDQUFBO0FBRWxELElBQUksQ0FBQyw2QkFBNkIsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDOUMsTUFBTSxhQUFhLEdBQUcsTUFBTSxvQkFBb0IsQ0FDOUMsT0FBTyxFQUNQLFdBQVcsRUFDWCxRQUFRLENBQ1QsQ0FBQTtJQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsMEJBQTBCLEVBQUUsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQy9ELENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUM1QyxDQUFDLENBQUMsQ0FBQSJ9