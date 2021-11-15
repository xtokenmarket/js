import { formatEther } from 'ethers/lib/utils'
import { DEFAULT_PORTFOLIO_ITEM } from '../../constants'
import { getUserAvailableTokenBalance } from '../utils'
import { getXInchContracts } from './helper'
import { getXInchPrices } from './prices'
export const getPortfolioItemXInch = async (symbol, address, provider) => {
  try {
    const { xinchContract } = await getXInchContracts(symbol, provider)
    const [xinchBal, { priceUsd }, tokenEquivalent] = await Promise.all([
      getUserAvailableTokenBalance(xinchContract, address),
      getXInchPrices(xinchContract),
      getUnderlyingTokenEquivalent(xinchContract, address),
    ])
    const xinchValue = (xinchBal * priceUsd).toFixed(2)
    return {
      symbol,
      quantity: xinchBal.toString(),
      price: priceUsd.toString(),
      value: xinchValue.toString(),
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
const getUnderlyingTokenEquivalent = async (xinchContract, address) => {
  const [userXinchBal, inchHoldings, xinchSupply] = await Promise.all([
    xinchContract.balanceOf(address),
    xinchContract.getNav(),
    xinchContract.totalSupply(),
  ])
  const userTokenEquivalent = inchHoldings.mul(userXinchBal).div(xinchSupply)
  return formatEther(userTokenEquivalent)
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9ydGZvbGlvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veGluY2gvcG9ydGZvbGlvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQTtBQUU5QyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQTtBQUd4RCxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxVQUFVLENBQUE7QUFFdkQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sVUFBVSxDQUFBO0FBQzVDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxVQUFVLENBQUE7QUFFekMsTUFBTSxDQUFDLE1BQU0scUJBQXFCLEdBQUcsS0FBSyxFQUN4QyxNQUFxQixFQUNyQixPQUFlLEVBQ2YsUUFBc0IsRUFDRyxFQUFFO0lBQzNCLElBQUk7UUFDRixNQUFNLEVBQUUsYUFBYSxFQUFFLEdBQUcsTUFBTSxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUE7UUFFbkUsTUFBTSxDQUFDLFFBQVEsRUFBRSxFQUFFLFFBQVEsRUFBRSxFQUFFLGVBQWUsQ0FBQyxHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQztZQUNsRSw0QkFBNEIsQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDO1lBQ3BELGNBQWMsQ0FBQyxhQUFhLENBQUM7WUFDN0IsNEJBQTRCLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQztTQUNyRCxDQUFDLENBQUE7UUFFRixNQUFNLFVBQVUsR0FBRyxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFFbkQsT0FBTztZQUNMLE1BQU07WUFDTixRQUFRLEVBQUUsUUFBUSxDQUFDLFFBQVEsRUFBRTtZQUM3QixLQUFLLEVBQUUsUUFBUSxDQUFDLFFBQVEsRUFBRTtZQUMxQixLQUFLLEVBQUUsVUFBVSxDQUFDLFFBQVEsRUFBRTtZQUM1QixlQUFlO1NBQ2hCLENBQUE7S0FDRjtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsT0FBTyxDQUFDLEtBQUssQ0FBQyx5Q0FBeUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUMzRCxPQUFPO1lBQ0wsTUFBTTtZQUNOLEdBQUcsc0JBQXNCO1NBQzFCLENBQUE7S0FDRjtBQUNILENBQUMsQ0FBQTtBQUVELE1BQU0sNEJBQTRCLEdBQUcsS0FBSyxFQUN4QyxhQUFvQixFQUNwQixPQUFlLEVBQ2YsRUFBRTtJQUNGLE1BQU0sQ0FBQyxZQUFZLEVBQUUsWUFBWSxFQUFFLFdBQVcsQ0FBQyxHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUNsRSxhQUFhLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQztRQUNoQyxhQUFhLENBQUMsTUFBTSxFQUFFO1FBQ3RCLGFBQWEsQ0FBQyxXQUFXLEVBQUU7S0FDNUIsQ0FBQyxDQUFBO0lBRUYsTUFBTSxtQkFBbUIsR0FBRyxZQUFZLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQTtJQUMzRSxPQUFPLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFBO0FBQ3pDLENBQUMsQ0FBQSJ9
