'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.getXAssetLev = void 0
const abis_1 = require('@xtoken/abis')
const helper_1 = require('./helper')
const prices_1 = require('./prices')
const getXAssetLev = async (symbol, provider) => {
  const { xassetlevContract } = await helper_1.getXAssetLevContracts(
    symbol,
    provider
  )
  const { aum, priceEth, priceUsd } = await prices_1.getXAssetLevPrices(
    xassetlevContract
  )
  let order = -1
  switch (symbol) {
    case abis_1.X_BTC_3X:
      order = 18
      break
    case abis_1.X_ETH_3X:
      order = 19
      break
  }
  return {
    aum,
    mandate: '3x leverage target',
    order,
    price: priceUsd,
    priceEth,
    symbol,
  }
}
exports.getXAssetLev = getXAssetLev
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi9sZXYvYXNzZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsdUNBQWlEO0FBSWpELHFDQUFnRDtBQUNoRCxxQ0FBNkM7QUFFdEMsTUFBTSxZQUFZLEdBQUcsS0FBSyxFQUMvQixNQUFrQixFQUNsQixRQUFzQixFQUNGLEVBQUU7SUFDdEIsTUFBTSxFQUFFLGlCQUFpQixFQUFFLEdBQUcsTUFBTSw4QkFBcUIsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFFM0UsTUFBTSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEdBQUcsTUFBTSwyQkFBa0IsQ0FDMUQsaUJBQWlCLENBQ2xCLENBQUE7SUFFRCxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQTtJQUNkLFFBQVEsTUFBTSxFQUFFO1FBQ2QsS0FBSyxlQUFRO1lBQ1gsS0FBSyxHQUFHLEVBQUUsQ0FBQTtZQUNWLE1BQUs7UUFDUCxLQUFLLGVBQVE7WUFDWCxLQUFLLEdBQUcsRUFBRSxDQUFBO1lBQ1YsTUFBSztLQUNSO0lBRUQsT0FBTztRQUNMLEdBQUc7UUFDSCxPQUFPLEVBQUUsb0JBQW9CO1FBQzdCLEtBQUs7UUFDTCxLQUFLLEVBQUUsUUFBUTtRQUNmLFFBQVE7UUFDUixNQUFNO0tBQ1AsQ0FBQTtBQUNILENBQUMsQ0FBQTtBQTVCWSxRQUFBLFlBQVksZ0JBNEJ4QiJ9
