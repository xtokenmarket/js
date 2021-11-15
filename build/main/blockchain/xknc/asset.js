'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.getXKncAsset = void 0
const abis_1 = require('@xtoken/abis')
const helper_1 = require('./helper')
const prices_1 = require('./prices')
const getXKncAsset = async (symbol, provider) => {
  const { xkncContract } = await helper_1.getXKncContracts(symbol, provider)
  const { aum, priceEth, priceUsd } = await prices_1.getXKncPrices(xkncContract)
  return {
    aum,
    mandate: `Votes to maximize ${
      symbol === abis_1.X_KNC_A ? 'staker rewards' : 'reserve rebates'
    }`,
    order: symbol === abis_1.X_KNC_A ? 2 : 1,
    price: priceUsd,
    priceEth,
    symbol,
  }
}
exports.getXKncAsset = getXKncAsset
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi94a25jL2Fzc2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLHVDQUErQztBQUkvQyxxQ0FBMkM7QUFDM0MscUNBQXdDO0FBRWpDLE1BQU0sWUFBWSxHQUFHLEtBQUssRUFDL0IsTUFBdUMsRUFDdkMsUUFBc0IsRUFDTCxFQUFFO0lBQ25CLE1BQU0sRUFBRSxZQUFZLEVBQUUsR0FBRyxNQUFNLHlCQUFnQixDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQTtJQUVqRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsR0FBRyxNQUFNLHNCQUFhLENBQUMsWUFBWSxDQUFDLENBQUE7SUFFckUsT0FBTztRQUNMLEdBQUc7UUFDSCxPQUFPLEVBQUUscUJBQ1AsTUFBTSxLQUFLLGNBQU8sQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLGlCQUMxQyxFQUFFO1FBQ0YsS0FBSyxFQUFFLE1BQU0sS0FBSyxjQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqQyxLQUFLLEVBQUUsUUFBUTtRQUNmLFFBQVE7UUFDUixNQUFNO0tBQ1AsQ0FBQTtBQUNILENBQUMsQ0FBQTtBQWxCWSxRQUFBLFlBQVksZ0JBa0J4QiJ9
