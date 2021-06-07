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
  const { aum, priceUsd } = await getXAavePrices(
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
    symbol,
  }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi94YWF2ZS9hc3NldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsUUFBUSxFQUFZLE1BQU0sY0FBYyxDQUFBO0FBSWpELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUM1QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sVUFBVSxDQUFBO0FBRXpDLE1BQU0sQ0FBQyxNQUFNLGFBQWEsR0FBRyxLQUFLLEVBQ2hDLE1BQXlDLEVBQ3pDLFFBQXNCLEVBQ0wsRUFBRTtJQUNuQixNQUFNLEVBQ0osa0JBQWtCLEVBQ2xCLE9BQU8sRUFDUCxhQUFhLEdBQ2QsR0FBRyxNQUFNLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQTtJQUM3QyxNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsT0FBTyxDQUFBO0lBRTNCLE1BQU0sRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLEdBQUcsTUFBTSxjQUFjLENBQzVDLGFBQWEsRUFDYixrQkFBa0IsRUFDbEIsT0FBTyxDQUNSLENBQUE7SUFFRCxPQUFPO1FBQ0wsR0FBRztRQUNILE9BQU8sRUFBRSxtQkFDUCxNQUFNLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFdBQ3JDLFVBQVU7UUFDVixLQUFLLEVBQUUsUUFBUTtRQUNmLE1BQU07S0FDUCxDQUFBO0FBQ0gsQ0FBQyxDQUFBIn0=
