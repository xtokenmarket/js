'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.getXAaveAsset = void 0
const abis_1 = require('@xtoken/abis')
const helper_1 = require('./helper')
const prices_1 = require('./prices')
const getXAaveAsset = async (symbol, provider) => {
  const {
    kyberProxyContract,
    network,
    xaaveContract,
  } = await helper_1.getXAaveContracts(symbol, provider)
  const { chainId } = network
  const { aum, priceUsd } = await prices_1.getXAavePrices(
    xaaveContract,
    kyberProxyContract,
    chainId
  )
  return {
    aum,
    mandate: `Staking Module; ${
      symbol === abis_1.X_AAVE_A ? 'Buchanan' : 'Samuelson'
    } Mandate`,
    price: priceUsd,
    symbol,
  }
}
exports.getXAaveAsset = getXAaveAsset
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi94YWF2ZS9hc3NldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSx1Q0FBaUQ7QUFJakQscUNBQTRDO0FBQzVDLHFDQUF5QztBQUVsQyxNQUFNLGFBQWEsR0FBRyxLQUFLLEVBQ2hDLE1BQXlDLEVBQ3pDLFFBQXNCLEVBQ0wsRUFBRTtJQUNuQixNQUFNLEVBQ0osa0JBQWtCLEVBQ2xCLE9BQU8sRUFDUCxhQUFhLEdBQ2QsR0FBRyxNQUFNLDBCQUFpQixDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQTtJQUM3QyxNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsT0FBTyxDQUFBO0lBRTNCLE1BQU0sRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLEdBQUcsTUFBTSx1QkFBYyxDQUM1QyxhQUFhLEVBQ2Isa0JBQWtCLEVBQ2xCLE9BQU8sQ0FDUixDQUFBO0lBRUQsT0FBTztRQUNMLEdBQUc7UUFDSCxPQUFPLEVBQUUsbUJBQ1AsTUFBTSxLQUFLLGVBQVEsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxXQUNyQyxVQUFVO1FBQ1YsS0FBSyxFQUFFLFFBQVE7UUFDZixNQUFNO0tBQ1AsQ0FBQTtBQUNILENBQUMsQ0FBQTtBQXpCWSxRQUFBLGFBQWEsaUJBeUJ6QiJ9
