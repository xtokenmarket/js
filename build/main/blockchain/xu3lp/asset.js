'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.getXU3LPAsset = void 0
const abis_1 = require('@xtoken/abis')
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
  let order = -1
  switch (symbol) {
    case abis_1.X_U3LP_A:
      order = 9
      break
    case abis_1.X_U3LP_B:
      order = 10
      break
    case abis_1.X_U3LP_C:
      order = 11
      break
    case abis_1.X_U3LP_D:
      order = 12
      break
    case abis_1.X_U3LP_E:
      order = 13
      break
    case abis_1.X_U3LP_F:
      order = 14
      break
    case abis_1.X_U3LP_G:
      order = 15
      break
    case abis_1.X_U3LP_H:
      order = 16
      break
  }
  return {
    assets,
    aum,
    mandate: `Maximize Yield: ${assets}`,
    order,
    price: priceUsd,
    priceBtc,
    priceEth,
    symbol,
  }
}
exports.getXU3LPAsset = getXU3LPAsset
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi94dTNscC9hc3NldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSx1Q0FTcUI7QUFHckIsb0NBQTREO0FBRTVELHFDQUE0QztBQUM1QyxxQ0FBeUM7QUFFbEMsTUFBTSxhQUFhLEdBQUcsS0FBSyxFQUNoQyxNQUF1QixFQUN2QixRQUFzQixFQUNILEVBQUU7SUFDckIsTUFBTSxNQUFNLEdBQUcsd0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDdkMsTUFBTSxNQUFNLEdBQUcsR0FBRyx1QkFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLHVCQUFlLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQTtJQUU1RSxNQUFNLEVBQUUsa0JBQWtCLEVBQUUsYUFBYSxFQUFFLEdBQUcsTUFBTSwwQkFBaUIsQ0FDbkUsTUFBTSxFQUNOLFFBQVEsQ0FDVCxDQUFBO0lBRUQsTUFBTSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxHQUFHLE1BQU0sdUJBQWMsQ0FDaEUsYUFBYSxFQUNiLGtCQUFrQixDQUNuQixDQUFBO0lBRUQsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUE7SUFDZCxRQUFRLE1BQU0sRUFBRTtRQUNkLEtBQUssZUFBUTtZQUNYLEtBQUssR0FBRyxDQUFDLENBQUE7WUFDVCxNQUFLO1FBQ1AsS0FBSyxlQUFRO1lBQ1gsS0FBSyxHQUFHLEVBQUUsQ0FBQTtZQUNWLE1BQUs7UUFDUCxLQUFLLGVBQVE7WUFDWCxLQUFLLEdBQUcsRUFBRSxDQUFBO1lBQ1YsTUFBSztRQUNQLEtBQUssZUFBUTtZQUNYLEtBQUssR0FBRyxFQUFFLENBQUE7WUFDVixNQUFLO1FBQ1AsS0FBSyxlQUFRO1lBQ1gsS0FBSyxHQUFHLEVBQUUsQ0FBQTtZQUNWLE1BQUs7UUFDUCxLQUFLLGVBQVE7WUFDWCxLQUFLLEdBQUcsRUFBRSxDQUFBO1lBQ1YsTUFBSztRQUNQLEtBQUssZUFBUTtZQUNYLEtBQUssR0FBRyxFQUFFLENBQUE7WUFDVixNQUFLO1FBQ1AsS0FBSyxlQUFRO1lBQ1gsS0FBSyxHQUFHLEVBQUUsQ0FBQTtZQUNWLE1BQUs7S0FDUjtJQUVELE9BQU87UUFDTCxNQUFNO1FBQ04sR0FBRztRQUNILE9BQU8sRUFBRSxtQkFBbUIsTUFBTSxFQUFFO1FBQ3BDLEtBQUs7UUFDTCxLQUFLLEVBQUUsUUFBUTtRQUNmLFFBQVE7UUFDUixRQUFRO1FBQ1IsTUFBTTtLQUNQLENBQUE7QUFDSCxDQUFDLENBQUE7QUF2RFksUUFBQSxhQUFhLGlCQXVEekIifQ==
