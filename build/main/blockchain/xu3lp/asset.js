'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.getXU3LPAsset = void 0
const utils_1 = require('../utils')
const helper_1 = require('./helper')
const prices_1 = require('./prices')
const getXU3LPAsset = async (symbol, provider) => {
  const tokens = utils_1.getLPTokenSymbol(symbol)
  const assets = `${utils_1.capitalizeToken(
    tokens[0]
  )}-${utils_1.capitalizeToken(tokens[1])}`
  const {
    kyberProxyContract,
    xu3lpContract,
  } = await helper_1.getXU3LPContracts(symbol, provider)
  const { aum, priceBtc, priceEth, priceUsd } = await prices_1.getXU3LPPrices(
    xu3lpContract,
    kyberProxyContract
  )
  return {
    assets,
    aum,
    mandate: `Maximize Yield: ${assets}`,
    price: priceUsd,
    priceBtc,
    priceEth,
    symbol,
  }
}
exports.getXU3LPAsset = getXU3LPAsset
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi94dTNscC9hc3NldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFHQSxvQ0FBNEQ7QUFFNUQscUNBQTRDO0FBQzVDLHFDQUF5QztBQUVsQyxNQUFNLGFBQWEsR0FBRyxLQUFLLEVBQ2hDLE1BQXVCLEVBQ3ZCLFFBQXNCLEVBQ0gsRUFBRTtJQUNyQixNQUFNLE1BQU0sR0FBRyx3QkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUN2QyxNQUFNLE1BQU0sR0FBRyxHQUFHLHVCQUFlLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksdUJBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFBO0lBRTVFLE1BQU0sRUFBRSxrQkFBa0IsRUFBRSxhQUFhLEVBQUUsR0FBRyxNQUFNLDBCQUFpQixDQUNuRSxNQUFNLEVBQ04sUUFBUSxDQUNULENBQUE7SUFFRCxNQUFNLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEdBQUcsTUFBTSx1QkFBYyxDQUNoRSxhQUFhLEVBQ2Isa0JBQWtCLENBQ25CLENBQUE7SUFFRCxPQUFPO1FBQ0wsTUFBTTtRQUNOLEdBQUc7UUFDSCxPQUFPLEVBQUUsbUJBQW1CLE1BQU0sRUFBRTtRQUNwQyxLQUFLLEVBQUUsUUFBUTtRQUNmLFFBQVE7UUFDUixRQUFRO1FBQ1IsTUFBTTtLQUNQLENBQUE7QUFDSCxDQUFDLENBQUE7QUExQlksUUFBQSxhQUFhLGlCQTBCekIifQ==
