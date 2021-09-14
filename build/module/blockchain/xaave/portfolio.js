import { formatEther } from 'ethers/lib/utils'
import { DEFAULT_PORTFOLIO_ITEM } from '../../constants'
import { getUserAvailableTokenBalance } from '../utils'
import { getXAaveContracts } from './helper'
import { getXAavePrices } from './prices'
export const getPortfolioItemXAave = async (symbol, address, provider) => {
  try {
    const {
      kyberProxyContract,
      network,
      xaaveContract,
    } = await getXAaveContracts(symbol, provider)
    const { chainId } = network
    const xaaveBal = await getUserAvailableTokenBalance(xaaveContract, address)
    const { priceUsd } = await getXAavePrices(
      xaaveContract,
      kyberProxyContract,
      chainId
    )
    const xaaveValue = (xaaveBal * priceUsd).toFixed(2).toString()
    const tokenEquivalent = await getUnderlyingTokenEquivalent(
      xaaveContract,
      address
    )
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9ydGZvbGlvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veGFhdmUvcG9ydGZvbGlvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQTtBQUU5QyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQTtBQUd4RCxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxVQUFVLENBQUE7QUFFdkQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sVUFBVSxDQUFBO0FBQzVDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxVQUFVLENBQUE7QUFFekMsTUFBTSxDQUFDLE1BQU0scUJBQXFCLEdBQUcsS0FBSyxFQUN4QyxNQUFxQixFQUNyQixPQUFlLEVBQ2YsUUFBc0IsRUFDRyxFQUFFO0lBQzNCLElBQUk7UUFDRixNQUFNLEVBQ0osa0JBQWtCLEVBQ2xCLE9BQU8sRUFDUCxhQUFhLEdBQ2QsR0FBRyxNQUFNLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQTtRQUM3QyxNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsT0FBTyxDQUFBO1FBRTNCLE1BQU0sUUFBUSxHQUFHLE1BQU0sNEJBQTRCLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxDQUFBO1FBRTNFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxNQUFNLGNBQWMsQ0FDdkMsYUFBYSxFQUNiLGtCQUFrQixFQUNsQixPQUFPLENBQ1IsQ0FBQTtRQUNELE1BQU0sVUFBVSxHQUFHLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQTtRQUU5RCxNQUFNLGVBQWUsR0FBRyxNQUFNLDRCQUE0QixDQUN4RCxhQUFhLEVBQ2IsT0FBTyxDQUNSLENBQUE7UUFFRCxPQUFPO1lBQ0wsTUFBTTtZQUNOLFFBQVEsRUFBRSxRQUFRLENBQUMsUUFBUSxFQUFFO1lBQzdCLEtBQUssRUFBRSxRQUFRLENBQUMsUUFBUSxFQUFFO1lBQzFCLEtBQUssRUFBRSxVQUFVLENBQUMsUUFBUSxFQUFFO1lBQzVCLGVBQWU7U0FDaEIsQ0FBQTtLQUNGO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDVixPQUFPLENBQUMsS0FBSyxDQUFDLHlDQUF5QyxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQzNELE9BQU87WUFDTCxNQUFNO1lBQ04sR0FBRyxzQkFBc0I7U0FDMUIsQ0FBQTtLQUNGO0FBQ0gsQ0FBQyxDQUFBO0FBRUQsTUFBTSw0QkFBNEIsR0FBRyxLQUFLLEVBQ3hDLGFBQW9CLEVBQ3BCLE9BQWUsRUFDZixFQUFFO0lBQ0YsTUFBTSxDQUFDLFlBQVksRUFBRSxlQUFlLEVBQUUsV0FBVyxDQUFDLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDO1FBQ3JFLGFBQWEsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDO1FBQ2hDLGFBQWEsQ0FBQyxlQUFlLEVBQUU7UUFDL0IsYUFBYSxDQUFDLFdBQVcsRUFBRTtLQUM1QixDQUFDLENBQUE7SUFFRixNQUFNLG1CQUFtQixHQUFHLGVBQWUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFBO0lBQzlFLE9BQU8sV0FBVyxDQUFDLG1CQUFtQixDQUFDLENBQUE7QUFDekMsQ0FBQyxDQUFBIn0=
