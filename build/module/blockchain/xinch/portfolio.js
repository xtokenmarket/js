import { formatEther } from 'ethers/lib/utils'
import { DEFAULT_PORTFOLIO_ITEM } from '../../constants'
import { getUserAvailableTokenBalance } from '../utils'
import { getXInchContracts } from './helper'
import { getXInchPrices } from './prices'
export const getPortfolioItemXInch = async (symbol, address, provider) => {
  try {
    const {
      kyberProxyContract,
      network,
      xinchContract,
    } = await getXInchContracts(symbol, provider)
    const { chainId } = network
    const xinchBal = await getUserAvailableTokenBalance(xinchContract, address)
    const { priceUsd } = await getXInchPrices(
      xinchContract,
      kyberProxyContract,
      chainId
    )
    const xinchValue = (xinchBal * priceUsd).toFixed(2)
    const tokenEquivalent = await getUnderlyingTokenEquivalent(
      xinchContract,
      address
    )
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9ydGZvbGlvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veGluY2gvcG9ydGZvbGlvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQTtBQUU5QyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQTtBQUd4RCxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxVQUFVLENBQUE7QUFFdkQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sVUFBVSxDQUFBO0FBQzVDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxVQUFVLENBQUE7QUFFekMsTUFBTSxDQUFDLE1BQU0scUJBQXFCLEdBQUcsS0FBSyxFQUN4QyxNQUFxQixFQUNyQixPQUFlLEVBQ2YsUUFBc0IsRUFDRyxFQUFFO0lBQzNCLElBQUk7UUFDRixNQUFNLEVBQ0osa0JBQWtCLEVBQ2xCLE9BQU8sRUFDUCxhQUFhLEdBQ2QsR0FBRyxNQUFNLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQTtRQUM3QyxNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsT0FBTyxDQUFBO1FBRTNCLE1BQU0sUUFBUSxHQUFHLE1BQU0sNEJBQTRCLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxDQUFBO1FBRTNFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxNQUFNLGNBQWMsQ0FDdkMsYUFBYSxFQUNiLGtCQUFrQixFQUNsQixPQUFPLENBQ1IsQ0FBQTtRQUNELE1BQU0sVUFBVSxHQUFHLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUVuRCxNQUFNLGVBQWUsR0FBRyxNQUFNLDRCQUE0QixDQUN4RCxhQUFhLEVBQ2IsT0FBTyxDQUNSLENBQUE7UUFFRCxPQUFPO1lBQ0wsTUFBTTtZQUNOLFFBQVEsRUFBRSxRQUFRLENBQUMsUUFBUSxFQUFFO1lBQzdCLEtBQUssRUFBRSxRQUFRLENBQUMsUUFBUSxFQUFFO1lBQzFCLEtBQUssRUFBRSxVQUFVLENBQUMsUUFBUSxFQUFFO1lBQzVCLGVBQWU7U0FDaEIsQ0FBQTtLQUNGO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDVixPQUFPLENBQUMsS0FBSyxDQUFDLHlDQUF5QyxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQzNELE9BQU87WUFDTCxNQUFNO1lBQ04sR0FBRyxzQkFBc0I7U0FDMUIsQ0FBQTtLQUNGO0FBQ0gsQ0FBQyxDQUFBO0FBRUQsTUFBTSw0QkFBNEIsR0FBRyxLQUFLLEVBQ3hDLGFBQW9CLEVBQ3BCLE9BQWUsRUFDZixFQUFFO0lBQ0YsTUFBTSxDQUFDLFlBQVksRUFBRSxZQUFZLEVBQUUsV0FBVyxDQUFDLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDO1FBQ2xFLGFBQWEsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDO1FBQ2hDLGFBQWEsQ0FBQyxNQUFNLEVBQUU7UUFDdEIsYUFBYSxDQUFDLFdBQVcsRUFBRTtLQUM1QixDQUFDLENBQUE7SUFFRixNQUFNLG1CQUFtQixHQUFHLFlBQVksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFBO0lBQzNFLE9BQU8sV0FBVyxDQUFDLG1CQUFtQixDQUFDLENBQUE7QUFDekMsQ0FBQyxDQUFBIn0=
