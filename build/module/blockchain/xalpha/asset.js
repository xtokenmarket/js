import { getXAlphaContracts } from './helper'
import { getXAlphaPrices } from './prices'
export const getXAlphaAsset = async (symbol, provider) => {
  const { kyberProxyContract, xalphaContract } = await getXAlphaContracts(
    symbol,
    provider
  )
  const { aum, priceEth, priceUsd } = await getXAlphaPrices(
    xalphaContract,
    kyberProxyContract
  )
  return {
    aum,
    mandate: 'Liquid Staker',
    order: 17,
    price: priceUsd,
    priceEth,
    symbol,
  }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi94YWxwaGEvYXNzZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBS0EsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sVUFBVSxDQUFBO0FBQzdDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxVQUFVLENBQUE7QUFFMUMsTUFBTSxDQUFDLE1BQU0sY0FBYyxHQUFHLEtBQUssRUFDakMsTUFBd0IsRUFDeEIsUUFBc0IsRUFDTCxFQUFFO0lBQ25CLE1BQU0sRUFBRSxrQkFBa0IsRUFBRSxjQUFjLEVBQUUsR0FBRyxNQUFNLGtCQUFrQixDQUNyRSxNQUFNLEVBQ04sUUFBUSxDQUNULENBQUE7SUFFRCxNQUFNLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsR0FBRyxNQUFNLGVBQWUsQ0FDdkQsY0FBYyxFQUNkLGtCQUFrQixDQUNuQixDQUFBO0lBRUQsT0FBTztRQUNMLEdBQUc7UUFDSCxPQUFPLEVBQUUsZUFBZTtRQUN4QixLQUFLLEVBQUUsRUFBRTtRQUNULEtBQUssRUFBRSxRQUFRO1FBQ2YsUUFBUTtRQUNSLE1BQU07S0FDUCxDQUFBO0FBQ0gsQ0FBQyxDQUFBIn0=
