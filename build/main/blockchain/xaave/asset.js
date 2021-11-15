'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.getXAaveAsset = void 0
const abis_1 = require('@xtoken/abis')
const helper_1 = require('./helper')
const prices_1 = require('./prices')
const getXAaveAsset = async (symbol, provider) => {
  const { xaaveContract } = await helper_1.getXAaveContracts(symbol, provider)
  const { aum, priceEth, priceUsd } = await prices_1.getXAavePrices(
    xaaveContract
  )
  return {
    aum,
    mandate: `Staking Module; ${
      symbol === abis_1.X_AAVE_A ? 'Buchanan' : 'Samuelson'
    } Mandate`,
    order: symbol === abis_1.X_AAVE_A ? 5 : 4,
    price: priceUsd,
    priceEth,
    symbol,
  }
}
exports.getXAaveAsset = getXAaveAsset
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi94YWF2ZS9hc3NldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSx1Q0FBaUQ7QUFJakQscUNBQTRDO0FBQzVDLHFDQUF5QztBQUVsQyxNQUFNLGFBQWEsR0FBRyxLQUFLLEVBQ2hDLE1BQXlDLEVBQ3pDLFFBQXNCLEVBQ0wsRUFBRTtJQUNuQixNQUFNLEVBQUUsYUFBYSxFQUFFLEdBQUcsTUFBTSwwQkFBaUIsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFFbkUsTUFBTSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEdBQUcsTUFBTSx1QkFBYyxDQUFDLGFBQWEsQ0FBQyxDQUFBO0lBRXZFLE9BQU87UUFDTCxHQUFHO1FBQ0gsT0FBTyxFQUFFLG1CQUNQLE1BQU0sS0FBSyxlQUFRLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsV0FDckMsVUFBVTtRQUNWLEtBQUssRUFBRSxNQUFNLEtBQUssZUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEMsS0FBSyxFQUFFLFFBQVE7UUFDZixRQUFRO1FBQ1IsTUFBTTtLQUNQLENBQUE7QUFDSCxDQUFDLENBQUE7QUFsQlksUUFBQSxhQUFhLGlCQWtCekIifQ==
