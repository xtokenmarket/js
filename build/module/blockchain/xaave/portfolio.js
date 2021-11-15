import { formatEther } from 'ethers/lib/utils'
import { DEFAULT_PORTFOLIO_ITEM } from '../../constants'
import { getUserAvailableTokenBalance } from '../utils'
import { getXAaveContracts } from './helper'
import { getXAavePrices } from './prices'
export const getPortfolioItemXAave = async (symbol, address, provider) => {
  try {
    const { xaaveContract } = await getXAaveContracts(symbol, provider)
    const [xaaveBal, { priceUsd }, tokenEquivalent] = await Promise.all([
      getUserAvailableTokenBalance(xaaveContract, address),
      getXAavePrices(xaaveContract),
      getUnderlyingTokenEquivalent(xaaveContract, address),
    ])
    const xaaveValue = (xaaveBal * priceUsd).toFixed(2).toString()
    return {
      symbol,
      quantity: xaaveBal.toString(),
      price: priceUsd.toString(),
      value: xaaveValue.toString(),
      tokenEquivalent,
    }
  } catch (e) {
    console.error('Error while fetching portfolio balance:', e)
    return {
      symbol,
      ...DEFAULT_PORTFOLIO_ITEM,
    }
  }
}
const getUnderlyingTokenEquivalent = async (xaaveContract, address) => {
  const [userXaaveBal, contractAaveBal, xaaveSupply] = await Promise.all([
    xaaveContract.balanceOf(address),
    xaaveContract.getFundHoldings(),
    xaaveContract.totalSupply(),
  ])
  const userTokenEquivalent = contractAaveBal.mul(userXaaveBal).div(xaaveSupply)
  return formatEther(userTokenEquivalent)
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9ydGZvbGlvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veGFhdmUvcG9ydGZvbGlvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQTtBQUU5QyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQTtBQUd4RCxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxVQUFVLENBQUE7QUFFdkQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sVUFBVSxDQUFBO0FBQzVDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxVQUFVLENBQUE7QUFFekMsTUFBTSxDQUFDLE1BQU0scUJBQXFCLEdBQUcsS0FBSyxFQUN4QyxNQUFxQixFQUNyQixPQUFlLEVBQ2YsUUFBc0IsRUFDRyxFQUFFO0lBQzNCLElBQUk7UUFDRixNQUFNLEVBQUUsYUFBYSxFQUFFLEdBQUcsTUFBTSxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUE7UUFFbkUsTUFBTSxDQUFDLFFBQVEsRUFBRSxFQUFFLFFBQVEsRUFBRSxFQUFFLGVBQWUsQ0FBQyxHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQztZQUNsRSw0QkFBNEIsQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDO1lBQ3BELGNBQWMsQ0FBQyxhQUFhLENBQUM7WUFDN0IsNEJBQTRCLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQztTQUNyRCxDQUFDLENBQUE7UUFFRixNQUFNLFVBQVUsR0FBRyxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUE7UUFFOUQsT0FBTztZQUNMLE1BQU07WUFDTixRQUFRLEVBQUUsUUFBUSxDQUFDLFFBQVEsRUFBRTtZQUM3QixLQUFLLEVBQUUsUUFBUSxDQUFDLFFBQVEsRUFBRTtZQUMxQixLQUFLLEVBQUUsVUFBVSxDQUFDLFFBQVEsRUFBRTtZQUM1QixlQUFlO1NBQ2hCLENBQUE7S0FDRjtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsT0FBTyxDQUFDLEtBQUssQ0FBQyx5Q0FBeUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUMzRCxPQUFPO1lBQ0wsTUFBTTtZQUNOLEdBQUcsc0JBQXNCO1NBQzFCLENBQUE7S0FDRjtBQUNILENBQUMsQ0FBQTtBQUVELE1BQU0sNEJBQTRCLEdBQUcsS0FBSyxFQUN4QyxhQUFvQixFQUNwQixPQUFlLEVBQ2YsRUFBRTtJQUNGLE1BQU0sQ0FBQyxZQUFZLEVBQUUsZUFBZSxFQUFFLFdBQVcsQ0FBQyxHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUNyRSxhQUFhLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQztRQUNoQyxhQUFhLENBQUMsZUFBZSxFQUFFO1FBQy9CLGFBQWEsQ0FBQyxXQUFXLEVBQUU7S0FDNUIsQ0FBQyxDQUFBO0lBRUYsTUFBTSxtQkFBbUIsR0FBRyxlQUFlLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQTtJQUM5RSxPQUFPLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFBO0FBQ3pDLENBQUMsQ0FBQSJ9
