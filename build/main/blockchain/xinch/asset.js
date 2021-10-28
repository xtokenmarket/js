'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.getXInchAsset = void 0
const abis_1 = require('@xtoken/abis')
const helper_1 = require('./helper')
const prices_1 = require('./prices')
const getXInchAsset = async (symbol, provider) => {
  const {
    kyberProxyContract,
    network,
    xinchContract,
  } = await helper_1.getXInchContracts(symbol, provider)
  const { chainId } = network
  const { aum, priceEth, priceUsd } = await prices_1.getXInchPrices(
    xinchContract,
    kyberProxyContract,
    chainId
  )
  return {
    aum,
    mandate: `Accumulator; ${
      symbol === abis_1.X_INCH_A ? 'Buchanan' : 'Samuelson'
    } Mandate`,
    order: symbol === abis_1.X_INCH_A ? 7 : 6,
    price: priceUsd,
    priceEth,
    symbol,
  }
}
exports.getXInchAsset = getXInchAsset
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi94aW5jaC9hc3NldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSx1Q0FBaUQ7QUFJakQscUNBQTRDO0FBQzVDLHFDQUF5QztBQUVsQyxNQUFNLGFBQWEsR0FBRyxLQUFLLEVBQ2hDLE1BQXlDLEVBQ3pDLFFBQXNCLEVBQ0wsRUFBRTtJQUNuQixNQUFNLEVBQ0osa0JBQWtCLEVBQ2xCLE9BQU8sRUFDUCxhQUFhLEdBQ2QsR0FBRyxNQUFNLDBCQUFpQixDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQTtJQUM3QyxNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsT0FBTyxDQUFBO0lBRTNCLE1BQU0sRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxHQUFHLE1BQU0sdUJBQWMsQ0FDdEQsYUFBYSxFQUNiLGtCQUFrQixFQUNsQixPQUFPLENBQ1IsQ0FBQTtJQUVELE9BQU87UUFDTCxHQUFHO1FBQ0gsT0FBTyxFQUFFLGdCQUNQLE1BQU0sS0FBSyxlQUFRLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsV0FDckMsVUFBVTtRQUNWLEtBQUssRUFBRSxNQUFNLEtBQUssZUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEMsS0FBSyxFQUFFLFFBQVE7UUFDZixRQUFRO1FBQ1IsTUFBTTtLQUNQLENBQUE7QUFDSCxDQUFDLENBQUE7QUEzQlksUUFBQSxhQUFhLGlCQTJCekIifQ==
