import { ADDRESSES, X_SNX_A_ADMIN } from '@xtoken/abis'
import { formatBytes32String, formatEther, parseEther } from 'ethers/lib/utils'
import { DEFAULT_PORTFOLIO_ITEM } from '../../constants'
import { getExchangeRateContract, getUserAvailableTokenBalance } from '../utils'
import { getXSnxContracts } from './helper'
import { getXSnxPrices } from './prices'
// Might need to refactor if we add xSNX instance
export const getPortfolioItemXSnx = async (symbol, address, provider) => {
  try {
    const {
      network,
      snxContract,
      tradeAccountingContract,
      xsnxContract,
    } = await getXSnxContracts(provider)
    const { chainId } = network
    const xsnxAdminAddress = ADDRESSES[X_SNX_A_ADMIN][chainId]
    const exchangeRatesContract = await getExchangeRateContract(provider)
    const xsnxBal = await getUserAvailableTokenBalance(xsnxContract, address)
    const {
      rate: snxPriceInUsd,
    } = await exchangeRatesContract.rateAndUpdatedTime(
      formatBytes32String('SNX')
    )
    const { priceUsd } = await getXSnxPrices(
      xsnxContract,
      xsnxAdminAddress,
      tradeAccountingContract,
      exchangeRatesContract,
      snxContract,
      provider
    )
    const xsnxValue = parseEther((xsnxBal * priceUsd).toString())
    const tokenEquivalent = xsnxValue.div(snxPriceInUsd).toString()
    return {
      symbol,
      quantity: xsnxBal.toString(),
      price: priceUsd.toString(),
      value: formatEther(xsnxValue),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9ydGZvbGlvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veHNueC9wb3J0Zm9saW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLFNBQVMsRUFBRSxhQUFhLEVBQUUsTUFBTSxjQUFjLENBQUE7QUFFdkQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQTtBQUUvRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQTtBQUd4RCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxVQUFVLENBQUE7QUFFaEYsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sVUFBVSxDQUFBO0FBQzNDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxVQUFVLENBQUE7QUFFeEMsaURBQWlEO0FBQ2pELE1BQU0sQ0FBQyxNQUFNLG9CQUFvQixHQUFHLEtBQUssRUFDdkMsTUFBcUIsRUFDckIsT0FBZSxFQUNmLFFBQXNCLEVBQ0csRUFBRTtJQUMzQixJQUFJO1FBQ0YsTUFBTSxFQUNKLE9BQU8sRUFDUCxXQUFXLEVBQ1gsdUJBQXVCLEVBQ3ZCLFlBQVksR0FDYixHQUFHLE1BQU0sZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDcEMsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLE9BQU8sQ0FBQTtRQUUzQixNQUFNLGdCQUFnQixHQUFHLFNBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUMxRCxNQUFNLHFCQUFxQixHQUFHLENBQUMsTUFBTSx1QkFBdUIsQ0FDMUQsUUFBUSxDQUNULENBQWtCLENBQUE7UUFFbkIsTUFBTSxPQUFPLEdBQUcsTUFBTSw0QkFBNEIsQ0FBQyxZQUFZLEVBQUUsT0FBTyxDQUFDLENBQUE7UUFDekUsTUFBTSxFQUNKLElBQUksRUFBRSxhQUFhLEdBQ3BCLEdBQUcsTUFBTSxxQkFBcUIsQ0FBQyxrQkFBa0IsQ0FDaEQsbUJBQW1CLENBQUMsS0FBSyxDQUFDLENBQzNCLENBQUE7UUFDRCxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsTUFBTSxhQUFhLENBQ3RDLFlBQVksRUFDWixnQkFBZ0IsRUFDaEIsdUJBQXVCLEVBQ3ZCLHFCQUFxQixFQUNyQixXQUF1QixFQUN2QixRQUFRLENBQ1QsQ0FBQTtRQUVELE1BQU0sU0FBUyxHQUFHLFVBQVUsQ0FBQyxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFBO1FBQzdELE1BQU0sZUFBZSxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUE7UUFFL0QsT0FBTztZQUNMLE1BQU07WUFDTixRQUFRLEVBQUUsT0FBTyxDQUFDLFFBQVEsRUFBRTtZQUM1QixLQUFLLEVBQUUsUUFBUSxDQUFDLFFBQVEsRUFBRTtZQUMxQixLQUFLLEVBQUUsV0FBVyxDQUFDLFNBQVMsQ0FBQztZQUM3QixlQUFlO1NBQ2hCLENBQUE7S0FDRjtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsT0FBTyxDQUFDLEtBQUssQ0FBQyx5Q0FBeUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUMzRCxPQUFPO1lBQ0wsTUFBTTtZQUNOLEdBQUcsc0JBQXNCO1NBQzFCLENBQUE7S0FDRjtBQUNILENBQUMsQ0FBQSJ9
