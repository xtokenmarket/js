import { ADDRESSES, X_SNX_ADMIN } from '@xtoken/abis'
import { getExchangeRateContract } from '../utils'
import { getXSnxContracts } from './helper'
import { getXSnxPrices } from './prices'
export const getXSnxAsset = async (symbol, provider) => {
  const {
    network,
    snxContract,
    tradeAccountingContract,
    xsnxContract,
  } = await getXSnxContracts(provider)
  const { chainId } = network
  const xsnxAdminAddress = ADDRESSES[X_SNX_ADMIN][chainId]
  const exchangeRatesContract = await getExchangeRateContract(provider)
  const { aum, priceEth, priceUsd } = await getXSnxPrices(
    xsnxContract,
    xsnxAdminAddress,
    tradeAccountingContract,
    exchangeRatesContract,
    snxContract,
    provider
  )
  return {
    aum,
    mandate: 'Aggressive staker; ETH bull',
    price: priceUsd,
    priceEth,
    symbol,
  }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi94c254L2Fzc2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxTQUFTLEVBQVcsV0FBVyxFQUFFLE1BQU0sY0FBYyxDQUFBO0FBSzlELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUVsRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxVQUFVLENBQUE7QUFDM0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUV4QyxNQUFNLENBQUMsTUFBTSxZQUFZLEdBQUcsS0FBSyxFQUMvQixNQUFzQixFQUN0QixRQUFzQixFQUNMLEVBQUU7SUFDbkIsTUFBTSxFQUNKLE9BQU8sRUFDUCxXQUFXLEVBQ1gsdUJBQXVCLEVBQ3ZCLFlBQVksR0FDYixHQUFHLE1BQU0sZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDcEMsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLE9BQU8sQ0FBQTtJQUUzQixNQUFNLGdCQUFnQixHQUFHLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUN4RCxNQUFNLHFCQUFxQixHQUFHLENBQUMsTUFBTSx1QkFBdUIsQ0FDMUQsUUFBUSxDQUNULENBQWtCLENBQUE7SUFFbkIsTUFBTSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEdBQUcsTUFBTSxhQUFhLENBQ3JELFlBQVksRUFDWixnQkFBZ0IsRUFDaEIsdUJBQXVCLEVBQ3ZCLHFCQUFxQixFQUNyQixXQUF1QixFQUN2QixRQUFRLENBQ1QsQ0FBQTtJQUVELE9BQU87UUFDTCxHQUFHO1FBQ0gsT0FBTyxFQUFFLDZCQUE2QjtRQUN0QyxLQUFLLEVBQUUsUUFBUTtRQUNmLFFBQVE7UUFDUixNQUFNO0tBQ1AsQ0FBQTtBQUNILENBQUMsQ0FBQSJ9
