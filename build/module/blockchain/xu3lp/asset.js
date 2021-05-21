import { getXU3LPContracts } from './helper'
import { getXU3LPPrices } from './prices'
export const getXU3LPAsset = async (symbol, provider) => {
  const { kyberProxyContract, xu3lpContract } = await getXU3LPContracts(
    symbol,
    provider
  )
  const { aum, priceUsd } = await getXU3LPPrices(
    xu3lpContract,
    kyberProxyContract
  )
  return {
    aum,
    price: priceUsd,
    symbol,
  }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi94dTNscC9hc3NldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFJQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxVQUFVLENBQUE7QUFDNUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUV6QyxNQUFNLENBQUMsTUFBTSxhQUFhLEdBQUcsS0FBSyxFQUNoQyxNQUF1QixFQUN2QixRQUFzQixFQUNILEVBQUU7SUFDckIsTUFBTSxFQUFFLGtCQUFrQixFQUFFLGFBQWEsRUFBRSxHQUFHLE1BQU0saUJBQWlCLENBQ25FLE1BQU0sRUFDTixRQUFRLENBQ1QsQ0FBQTtJQUVELE1BQU0sRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLEdBQUcsTUFBTSxjQUFjLENBQzVDLGFBQWEsRUFDYixrQkFBa0IsQ0FDbkIsQ0FBQTtJQUVELE9BQU87UUFDTCxHQUFHO1FBQ0gsS0FBSyxFQUFFLFFBQVE7UUFDZixNQUFNO0tBQ1AsQ0FBQTtBQUNILENBQUMsQ0FBQSJ9
