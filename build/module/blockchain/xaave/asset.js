import { X_AAVE_A } from '@xtoken/abis'
import { getXAaveContracts } from './helper'
import { getXAavePrices } from './prices'
export const getXAaveAsset = async (symbol, provider) => {
  const {
    kyberProxyContract,
    network,
    xaaveContract,
  } = await getXAaveContracts(symbol, provider)
  const { chainId } = network
  const { aum, priceEth, priceUsd } = await getXAavePrices(
    xaaveContract,
    kyberProxyContract,
    chainId
  )
  return {
    aum,
    mandate: `Staking Module; ${
      symbol === X_AAVE_A ? 'Buchanan' : 'Samuelson'
    } Mandate`,
    price: priceUsd,
    priceEth,
    symbol,
  }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi94YWF2ZS9hc3NldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsUUFBUSxFQUFZLE1BQU0sY0FBYyxDQUFBO0FBSWpELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUM1QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sVUFBVSxDQUFBO0FBRXpDLE1BQU0sQ0FBQyxNQUFNLGFBQWEsR0FBRyxLQUFLLEVBQ2hDLE1BQXlDLEVBQ3pDLFFBQXNCLEVBQ0wsRUFBRTtJQUNuQixNQUFNLEVBQ0osa0JBQWtCLEVBQ2xCLE9BQU8sRUFDUCxhQUFhLEdBQ2QsR0FBRyxNQUFNLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQTtJQUM3QyxNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsT0FBTyxDQUFBO0lBRTNCLE1BQU0sRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxHQUFHLE1BQU0sY0FBYyxDQUN0RCxhQUFhLEVBQ2Isa0JBQWtCLEVBQ2xCLE9BQU8sQ0FDUixDQUFBO0lBRUQsT0FBTztRQUNMLEdBQUc7UUFDSCxPQUFPLEVBQUUsbUJBQ1AsTUFBTSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxXQUNyQyxVQUFVO1FBQ1YsS0FBSyxFQUFFLFFBQVE7UUFDZixRQUFRO1FBQ1IsTUFBTTtLQUNQLENBQUE7QUFDSCxDQUFDLENBQUEifQ==
