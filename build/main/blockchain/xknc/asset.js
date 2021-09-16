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
  const { aum, priceEth, priceUsd } = await prices_1.getXKncPrices(
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
    priceEth,
    symbol,
  }
}
exports.getXKncAsset = getXKncAsset
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi94a25jL2Fzc2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLHVDQUErQztBQUkvQyxxQ0FBMkM7QUFDM0MscUNBQXdDO0FBRWpDLE1BQU0sWUFBWSxHQUFHLEtBQUssRUFDL0IsTUFBdUMsRUFDdkMsUUFBc0IsRUFDTCxFQUFFO0lBQ25CLE1BQU0sRUFDSixXQUFXLEVBQ1gsa0JBQWtCLEVBQ2xCLFlBQVksR0FDYixHQUFHLE1BQU0seUJBQWdCLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBRTVDLE1BQU0sRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxHQUFHLE1BQU0sc0JBQWEsQ0FDckQsWUFBWSxFQUNaLFdBQVcsRUFDWCxrQkFBa0IsQ0FDbkIsQ0FBQTtJQUVELE9BQU87UUFDTCxHQUFHO1FBQ0gsT0FBTyxFQUFFLHFCQUNQLE1BQU0sS0FBSyxjQUFPLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxpQkFDMUMsRUFBRTtRQUNGLEtBQUssRUFBRSxRQUFRO1FBQ2YsUUFBUTtRQUNSLE1BQU07S0FDUCxDQUFBO0FBQ0gsQ0FBQyxDQUFBO0FBekJZLFFBQUEsWUFBWSxnQkF5QnhCIn0=
