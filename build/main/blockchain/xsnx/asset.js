'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.getXSnxAsset = void 0
const abis_1 = require('@xtoken/abis')
const utils_1 = require('../utils')
const helper_1 = require('./helper')
const prices_1 = require('./prices')
const getXSnxAsset = async (symbol, provider) => {
  const {
    network,
    snxContract,
    tradeAccountingContract,
    xsnxContract,
  } = await helper_1.getXSnxContracts(provider)
  const { chainId } = network
  const xsnxAdminAddress = abis_1.ADDRESSES[abis_1.X_SNX_ADMIN][chainId]
  const exchangeRatesContract = await utils_1.getExchangeRateContract(provider)
  const { aum, priceEth, priceUsd } = await prices_1.getXSnxPrices(
    xsnxContract,
    xsnxAdminAddress,
    tradeAccountingContract,
    exchangeRatesContract,
    snxContract,
    provider
  )
  return {
    aum,
    mandate: 'Aggressive staker; ETH bull',
    price: priceUsd,
    priceEth,
    symbol,
  }
}
exports.getXSnxAsset = getXSnxAsset
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi94c254L2Fzc2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLHVDQUE4RDtBQUs5RCxvQ0FBa0Q7QUFFbEQscUNBQTJDO0FBQzNDLHFDQUF3QztBQUVqQyxNQUFNLFlBQVksR0FBRyxLQUFLLEVBQy9CLE1BQXNCLEVBQ3RCLFFBQXNCLEVBQ0wsRUFBRTtJQUNuQixNQUFNLEVBQ0osT0FBTyxFQUNQLFdBQVcsRUFDWCx1QkFBdUIsRUFDdkIsWUFBWSxHQUNiLEdBQUcsTUFBTSx5QkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUNwQyxNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsT0FBTyxDQUFBO0lBRTNCLE1BQU0sZ0JBQWdCLEdBQUcsZ0JBQVMsQ0FBQyxrQkFBVyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDeEQsTUFBTSxxQkFBcUIsR0FBRyxDQUFDLE1BQU0sK0JBQXVCLENBQzFELFFBQVEsQ0FDVCxDQUFrQixDQUFBO0lBRW5CLE1BQU0sRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxHQUFHLE1BQU0sc0JBQWEsQ0FDckQsWUFBWSxFQUNaLGdCQUFnQixFQUNoQix1QkFBdUIsRUFDdkIscUJBQXFCLEVBQ3JCLFdBQXVCLEVBQ3ZCLFFBQVEsQ0FDVCxDQUFBO0lBRUQsT0FBTztRQUNMLEdBQUc7UUFDSCxPQUFPLEVBQUUsNkJBQTZCO1FBQ3RDLEtBQUssRUFBRSxRQUFRO1FBQ2YsUUFBUTtRQUNSLE1BQU07S0FDUCxDQUFBO0FBQ0gsQ0FBQyxDQUFBO0FBakNZLFFBQUEsWUFBWSxnQkFpQ3hCIn0=
