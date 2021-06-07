import { ADDRESSES, X_SNX_A_ADMIN } from '@xtoken/abis'
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
  const xsnxAdminAddress = ADDRESSES[X_SNX_A_ADMIN][chainId]
  const exchangeRatesContract = await getExchangeRateContract(provider)
  const { aum, priceUsd } = await getXSnxPrices(
    xsnxContract,
    xsnxAdminAddress,
    tradeAccountingContract,
    exchangeRatesContract,
    snxContract,
    provider
  )
  return {
    aum,
    mandate: 'Aggressive staker; cautious ETH bull',
    price: priceUsd,
    symbol,
  }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi94c254L2Fzc2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxTQUFTLEVBQVcsYUFBYSxFQUFFLE1BQU0sY0FBYyxDQUFBO0FBS2hFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUVsRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxVQUFVLENBQUE7QUFDM0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUV4QyxNQUFNLENBQUMsTUFBTSxZQUFZLEdBQUcsS0FBSyxFQUMvQixNQUFzQixFQUN0QixRQUFzQixFQUNMLEVBQUU7SUFDbkIsTUFBTSxFQUNKLE9BQU8sRUFDUCxXQUFXLEVBQ1gsdUJBQXVCLEVBQ3ZCLFlBQVksR0FDYixHQUFHLE1BQU0sZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDcEMsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLE9BQU8sQ0FBQTtJQUUzQixNQUFNLGdCQUFnQixHQUFHLFNBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUMxRCxNQUFNLHFCQUFxQixHQUFHLENBQUMsTUFBTSx1QkFBdUIsQ0FDMUQsUUFBUSxDQUNULENBQWtCLENBQUE7SUFFbkIsTUFBTSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsR0FBRyxNQUFNLGFBQWEsQ0FDM0MsWUFBWSxFQUNaLGdCQUFnQixFQUNoQix1QkFBdUIsRUFDdkIscUJBQXFCLEVBQ3JCLFdBQXVCLEVBQ3ZCLFFBQVEsQ0FDVCxDQUFBO0lBRUQsT0FBTztRQUNMLEdBQUc7UUFDSCxPQUFPLEVBQUUsc0NBQXNDO1FBQy9DLEtBQUssRUFBRSxRQUFRO1FBQ2YsTUFBTTtLQUNQLENBQUE7QUFDSCxDQUFDLENBQUEifQ==
