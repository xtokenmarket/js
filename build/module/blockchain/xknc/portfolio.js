import { formatEther } from 'ethers/lib/utils'
import { DEFAULT_PORTFOLIO_ITEM } from '../../constants'
import { getUserAvailableTokenBalance } from '../utils'
import { getXKncContracts } from './helper'
import { getXKncPrices } from './prices'
export const getPortfolioItemXKnc = async (symbol, address, provider) => {
  try {
    const {
      kncContract,
      kyberProxyContract,
      xkncContract,
    } = await getXKncContracts(symbol, provider)
    const xkncBal = await getUserAvailableTokenBalance(xkncContract, address)
    const { priceUsd } = await getXKncPrices(
      xkncContract,
      kncContract,
      kyberProxyContract
    )
    const xkncValue = (xkncBal * priceUsd).toFixed(2)
    const tokenEquivalent = await getUnderlyingTokenEquivalent(
      xkncContract,
      address
    )
    return {
      symbol,
      quantity: xkncBal.toString(),
      price: priceUsd.toString(),
      value: xkncValue.toString(),
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
const getUnderlyingTokenEquivalent = async (xkncContract, address) => {
  const [userXkncBal, contractKncBal, xkncSupply] = await Promise.all([
    xkncContract.balanceOf(address),
    xkncContract.getFundKncBalanceTwei(),
    xkncContract.totalSupply(),
  ])
  const userTokenEquivalent = contractKncBal.mul(userXkncBal).div(xkncSupply)
  return formatEther(userTokenEquivalent)
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9ydGZvbGlvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veGtuYy9wb3J0Zm9saW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGtCQUFrQixDQUFBO0FBRTlDLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLGlCQUFpQixDQUFBO0FBR3hELE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUV2RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxVQUFVLENBQUE7QUFDM0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUV4QyxNQUFNLENBQUMsTUFBTSxvQkFBb0IsR0FBRyxLQUFLLEVBQ3ZDLE1BQXFCLEVBQ3JCLE9BQWUsRUFDZixRQUFzQixFQUNHLEVBQUU7SUFDM0IsSUFBSTtRQUNGLE1BQU0sRUFDSixXQUFXLEVBQ1gsa0JBQWtCLEVBQ2xCLFlBQVksR0FDYixHQUFHLE1BQU0sZ0JBQWdCLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFBO1FBRTVDLE1BQU0sT0FBTyxHQUFHLE1BQU0sNEJBQTRCLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FBQyxDQUFBO1FBRXpFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxNQUFNLGFBQWEsQ0FDdEMsWUFBWSxFQUNaLFdBQXVCLEVBQ3ZCLGtCQUFrQixDQUNuQixDQUFBO1FBQ0QsTUFBTSxTQUFTLEdBQUcsQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ2pELE1BQU0sZUFBZSxHQUFHLE1BQU0sNEJBQTRCLENBQ3hELFlBQVksRUFDWixPQUFPLENBQ1IsQ0FBQTtRQUVELE9BQU87WUFDTCxNQUFNO1lBQ04sUUFBUSxFQUFFLE9BQU8sQ0FBQyxRQUFRLEVBQUU7WUFDNUIsS0FBSyxFQUFFLFFBQVEsQ0FBQyxRQUFRLEVBQUU7WUFDMUIsS0FBSyxFQUFFLFNBQVMsQ0FBQyxRQUFRLEVBQUU7WUFDM0IsZUFBZTtTQUNoQixDQUFBO0tBQ0Y7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLE9BQU8sQ0FBQyxLQUFLLENBQUMseUNBQXlDLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDM0QsT0FBTztZQUNMLE1BQU07WUFDTixHQUFHLHNCQUFzQjtTQUMxQixDQUFBO0tBQ0Y7QUFDSCxDQUFDLENBQUE7QUFFRCxNQUFNLDRCQUE0QixHQUFHLEtBQUssRUFDeEMsWUFBa0IsRUFDbEIsT0FBZSxFQUNmLEVBQUU7SUFDRixNQUFNLENBQUMsV0FBVyxFQUFFLGNBQWMsRUFBRSxVQUFVLENBQUMsR0FBRyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUM7UUFDbEUsWUFBWSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUM7UUFDL0IsWUFBWSxDQUFDLHFCQUFxQixFQUFFO1FBQ3BDLFlBQVksQ0FBQyxXQUFXLEVBQUU7S0FDM0IsQ0FBQyxDQUFBO0lBRUYsTUFBTSxtQkFBbUIsR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQTtJQUMzRSxPQUFPLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFBO0FBQ3pDLENBQUMsQ0FBQSJ9
