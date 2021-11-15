import { formatEther } from 'ethers/lib/utils'
import { DEFAULT_PORTFOLIO_ITEM } from '../../constants'
import { getUserAvailableTokenBalance } from '../utils'
import { getXAlphaContracts } from './helper'
import { getXAlphaPrices } from './prices'
export const getPortfolioItemXAlpha = async (symbol, address, provider) => {
  try {
    const { xalphaContract } = await getXAlphaContracts(symbol, provider)
    const [xalphaBal, { priceUsd }, tokenEquivalent] = await Promise.all([
      getUserAvailableTokenBalance(xalphaContract, address),
      getXAlphaPrices(xalphaContract),
      getUnderlyingTokenEquivalent(xalphaContract, address),
    ])
    const xalphaValue = (xalphaBal * priceUsd).toFixed(2).toString()
    return {
      symbol,
      quantity: xalphaBal.toString(),
      price: priceUsd.toString(),
      value: xalphaValue.toString(),
      tokenEquivalent,
    }
  } catch (e) {
    console.error('Error while fetching portfolio balance: ', e)
    return {
      symbol,
      ...DEFAULT_PORTFOLIO_ITEM,
    }
  }
}
const getUnderlyingTokenEquivalent = async (xalphaContract, address) => {
  const [userXalphaBal, contractAlphaBal, xalphaSupply] = await Promise.all([
    xalphaContract.balanceOf(address),
    xalphaContract.getNav(),
    xalphaContract.totalSupply(),
  ])
  const userTokenEquivalent = contractAlphaBal
    .mul(userXalphaBal)
    .div(xalphaSupply)
  return formatEther(userTokenEquivalent)
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9ydGZvbGlvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veGFscGhhL3BvcnRmb2xpby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sa0JBQWtCLENBQUE7QUFFOUMsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0saUJBQWlCLENBQUE7QUFHeEQsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sVUFBVSxDQUFBO0FBRXZELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUM3QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sVUFBVSxDQUFBO0FBRTFDLE1BQU0sQ0FBQyxNQUFNLHNCQUFzQixHQUFHLEtBQUssRUFDekMsTUFBcUIsRUFDckIsT0FBZSxFQUNmLFFBQXNCLEVBQ0csRUFBRTtJQUMzQixJQUFJO1FBQ0YsTUFBTSxFQUFFLGNBQWMsRUFBRSxHQUFHLE1BQU0sa0JBQWtCLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFBO1FBRXJFLE1BQU0sQ0FBQyxTQUFTLEVBQUUsRUFBRSxRQUFRLEVBQUUsRUFBRSxlQUFlLENBQUMsR0FBRyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUM7WUFDbkUsNEJBQTRCLENBQUMsY0FBYyxFQUFFLE9BQU8sQ0FBQztZQUNyRCxlQUFlLENBQUMsY0FBYyxDQUFDO1lBQy9CLDRCQUE0QixDQUFDLGNBQWMsRUFBRSxPQUFPLENBQUM7U0FDdEQsQ0FBQyxDQUFBO1FBRUYsTUFBTSxXQUFXLEdBQUcsQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFBO1FBRWhFLE9BQU87WUFDTCxNQUFNO1lBQ04sUUFBUSxFQUFFLFNBQVMsQ0FBQyxRQUFRLEVBQUU7WUFDOUIsS0FBSyxFQUFFLFFBQVEsQ0FBQyxRQUFRLEVBQUU7WUFDMUIsS0FBSyxFQUFFLFdBQVcsQ0FBQyxRQUFRLEVBQUU7WUFDN0IsZUFBZTtTQUNoQixDQUFBO0tBQ0Y7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLE9BQU8sQ0FBQyxLQUFLLENBQUMsMENBQTBDLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDNUQsT0FBTztZQUNMLE1BQU07WUFDTixHQUFHLHNCQUFzQjtTQUMxQixDQUFBO0tBQ0Y7QUFDSCxDQUFDLENBQUE7QUFFRCxNQUFNLDRCQUE0QixHQUFHLEtBQUssRUFDeEMsY0FBc0IsRUFDdEIsT0FBZSxFQUNmLEVBQUU7SUFDRixNQUFNLENBQUMsYUFBYSxFQUFFLGdCQUFnQixFQUFFLFlBQVksQ0FBQyxHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUN4RSxjQUFjLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQztRQUNqQyxjQUFjLENBQUMsTUFBTSxFQUFFO1FBQ3ZCLGNBQWMsQ0FBQyxXQUFXLEVBQUU7S0FDN0IsQ0FBQyxDQUFBO0lBRUYsTUFBTSxtQkFBbUIsR0FBRyxnQkFBZ0I7U0FDekMsR0FBRyxDQUFDLGFBQWEsQ0FBQztTQUNsQixHQUFHLENBQUMsWUFBWSxDQUFDLENBQUE7SUFDcEIsT0FBTyxXQUFXLENBQUMsbUJBQW1CLENBQUMsQ0FBQTtBQUN6QyxDQUFDLENBQUEifQ==
