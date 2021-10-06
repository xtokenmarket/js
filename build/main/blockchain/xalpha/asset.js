'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.getXAlphaAsset = void 0
const helper_1 = require('./helper')
const prices_1 = require('./prices')
const getXAlphaAsset = async (symbol, provider) => {
  const {
    kyberProxyContract,
    xalphaContract,
  } = await helper_1.getXAlphaContracts(symbol, provider)
  const { aum, priceEth, priceUsd } = await prices_1.getXAlphaPrices(
    xalphaContract,
    kyberProxyContract
  )
  return {
    aum,
    mandate: 'Liquid Staker',
    price: priceUsd,
    priceEth,
    symbol,
  }
}
exports.getXAlphaAsset = getXAlphaAsset
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi94YWxwaGEvYXNzZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBS0EscUNBQTZDO0FBQzdDLHFDQUEwQztBQUVuQyxNQUFNLGNBQWMsR0FBRyxLQUFLLEVBQ2pDLE1BQXdCLEVBQ3hCLFFBQXNCLEVBQ0wsRUFBRTtJQUNuQixNQUFNLEVBQUUsa0JBQWtCLEVBQUUsY0FBYyxFQUFFLEdBQUcsTUFBTSwyQkFBa0IsQ0FDckUsTUFBTSxFQUNOLFFBQVEsQ0FDVCxDQUFBO0lBRUQsTUFBTSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEdBQUcsTUFBTSx3QkFBZSxDQUN2RCxjQUFjLEVBQ2Qsa0JBQWtCLENBQ25CLENBQUE7SUFFRCxPQUFPO1FBQ0wsR0FBRztRQUNILE9BQU8sRUFBRSxlQUFlO1FBQ3hCLEtBQUssRUFBRSxRQUFRO1FBQ2YsUUFBUTtRQUNSLE1BQU07S0FDUCxDQUFBO0FBQ0gsQ0FBQyxDQUFBO0FBckJZLFFBQUEsY0FBYyxrQkFxQjFCIn0=
