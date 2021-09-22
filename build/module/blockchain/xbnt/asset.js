import { getXBntContracts } from './helper'
import { getXBntPrices } from './prices'
export const getXBntAsset = async (symbol, provider) => {
  const { kyberProxyContract, xbntContract } = await getXBntContracts(
    symbol,
    provider
  )
  const { aum, priceEth, priceUsd } = await getXBntPrices(
    xbntContract,
    kyberProxyContract
  )
  return {
    aum,
    mandate: 'Dynamic Allocator; Buchanan Mandate',
    price: priceUsd,
    priceEth,
    symbol,
  }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi94Ym50L2Fzc2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUtBLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUMzQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sVUFBVSxDQUFBO0FBRXhDLE1BQU0sQ0FBQyxNQUFNLFlBQVksR0FBRyxLQUFLLEVBQy9CLE1BQXNCLEVBQ3RCLFFBQXNCLEVBQ0wsRUFBRTtJQUNuQixNQUFNLEVBQUUsa0JBQWtCLEVBQUUsWUFBWSxFQUFFLEdBQUcsTUFBTSxnQkFBZ0IsQ0FDakUsTUFBTSxFQUNOLFFBQVEsQ0FDVCxDQUFBO0lBRUQsTUFBTSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEdBQUcsTUFBTSxhQUFhLENBQ3JELFlBQVksRUFDWixrQkFBa0IsQ0FDbkIsQ0FBQTtJQUVELE9BQU87UUFDTCxHQUFHO1FBQ0gsT0FBTyxFQUFFLHFDQUFxQztRQUM5QyxLQUFLLEVBQUUsUUFBUTtRQUNmLFFBQVE7UUFDUixNQUFNO0tBQ1AsQ0FBQTtBQUNILENBQUMsQ0FBQSJ9