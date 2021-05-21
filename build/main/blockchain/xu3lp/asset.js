'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.getXU3LPAsset = void 0
const helper_1 = require('./helper')
const prices_1 = require('./prices')
const getXU3LPAsset = async (symbol, provider) => {
  const {
    kyberProxyContract,
    xu3lpContract,
  } = await helper_1.getXU3LPContracts(symbol, provider)
  const { aum, priceUsd } = await prices_1.getXU3LPPrices(
    xu3lpContract,
    kyberProxyContract
  )
  return {
    aum,
    price: priceUsd,
    symbol,
  }
}
exports.getXU3LPAsset = getXU3LPAsset
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi94dTNscC9hc3NldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFJQSxxQ0FBNEM7QUFDNUMscUNBQXlDO0FBRWxDLE1BQU0sYUFBYSxHQUFHLEtBQUssRUFDaEMsTUFBdUIsRUFDdkIsUUFBc0IsRUFDSCxFQUFFO0lBQ3JCLE1BQU0sRUFBRSxrQkFBa0IsRUFBRSxhQUFhLEVBQUUsR0FBRyxNQUFNLDBCQUFpQixDQUNuRSxNQUFNLEVBQ04sUUFBUSxDQUNULENBQUE7SUFFRCxNQUFNLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxHQUFHLE1BQU0sdUJBQWMsQ0FDNUMsYUFBYSxFQUNiLGtCQUFrQixDQUNuQixDQUFBO0lBRUQsT0FBTztRQUNMLEdBQUc7UUFDSCxLQUFLLEVBQUUsUUFBUTtRQUNmLE1BQU07S0FDUCxDQUFBO0FBQ0gsQ0FBQyxDQUFBO0FBbkJZLFFBQUEsYUFBYSxpQkFtQnpCIn0=
