import { X_KNC_A } from '@xtoken/abis'
import { getXKncContracts } from './helper'
import { getXKncPrices } from './prices'
export const getXKncAsset = async (symbol, provider) => {
  const {
    kncContract,
    kyberProxyContract,
    xkncContract,
  } = await getXKncContracts(symbol, provider)
  const { aum, priceEth, priceUsd } = await getXKncPrices(
    xkncContract,
    kncContract,
    kyberProxyContract
  )
  return {
    aum,
    mandate: `Votes to maximize ${
      symbol === X_KNC_A ? 'staker rewards' : 'reserve rebates'
    }`,
    price: priceUsd,
    priceEth,
    symbol,
  }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi94a25jL2Fzc2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxPQUFPLEVBQVcsTUFBTSxjQUFjLENBQUE7QUFJL0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sVUFBVSxDQUFBO0FBQzNDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxVQUFVLENBQUE7QUFFeEMsTUFBTSxDQUFDLE1BQU0sWUFBWSxHQUFHLEtBQUssRUFDL0IsTUFBdUMsRUFDdkMsUUFBc0IsRUFDTCxFQUFFO0lBQ25CLE1BQU0sRUFDSixXQUFXLEVBQ1gsa0JBQWtCLEVBQ2xCLFlBQVksR0FDYixHQUFHLE1BQU0sZ0JBQWdCLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBRTVDLE1BQU0sRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxHQUFHLE1BQU0sYUFBYSxDQUNyRCxZQUFZLEVBQ1osV0FBVyxFQUNYLGtCQUFrQixDQUNuQixDQUFBO0lBRUQsT0FBTztRQUNMLEdBQUc7UUFDSCxPQUFPLEVBQUUscUJBQ1AsTUFBTSxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLGlCQUMxQyxFQUFFO1FBQ0YsS0FBSyxFQUFFLFFBQVE7UUFDZixRQUFRO1FBQ1IsTUFBTTtLQUNQLENBQUE7QUFDSCxDQUFDLENBQUEifQ==
