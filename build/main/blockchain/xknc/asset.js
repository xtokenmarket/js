'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.getXKncAsset = void 0
const abis_1 = require('@xtoken/abis')
const helper_1 = require('./helper')
const prices_1 = require('./prices')
const getXKncAsset = async (symbol, provider) => {
  const {
    kncContract,
    kyberProxyContract,
    xkncContract,
  } = await helper_1.getXKncContracts(symbol, provider)
  const { aum, priceUsd } = await prices_1.getXKncPrices(
    xkncContract,
    kncContract,
    kyberProxyContract
  )
  return {
    aum,
    mandate: `Votes to maximize ${
      symbol === abis_1.X_KNC_A ? 'staker rewards' : 'reserve rebates'
    }`,
    price: priceUsd,
    symbol,
  }
}
exports.getXKncAsset = getXKncAsset
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi94a25jL2Fzc2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLHVDQUErQztBQUkvQyxxQ0FBMkM7QUFDM0MscUNBQXdDO0FBRWpDLE1BQU0sWUFBWSxHQUFHLEtBQUssRUFDL0IsTUFBdUMsRUFDdkMsUUFBc0IsRUFDTCxFQUFFO0lBQ25CLE1BQU0sRUFDSixXQUFXLEVBQ1gsa0JBQWtCLEVBQ2xCLFlBQVksR0FDYixHQUFHLE1BQU0seUJBQWdCLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBRTVDLE1BQU0sRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLEdBQUcsTUFBTSxzQkFBYSxDQUMzQyxZQUFZLEVBQ1osV0FBVyxFQUNYLGtCQUFrQixDQUNuQixDQUFBO0lBRUQsT0FBTztRQUNMLEdBQUc7UUFDSCxPQUFPLEVBQUUscUJBQ1AsTUFBTSxLQUFLLGNBQU8sQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLGlCQUMxQyxFQUFFO1FBQ0YsS0FBSyxFQUFFLFFBQVE7UUFDZixNQUFNO0tBQ1AsQ0FBQTtBQUNILENBQUMsQ0FBQTtBQXhCWSxRQUFBLFlBQVksZ0JBd0J4QiJ9
