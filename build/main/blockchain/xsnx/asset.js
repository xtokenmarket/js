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
  const xsnxAdminAddress = abis_1.ADDRESSES[abis_1.X_SNX_A_ADMIN][chainId]
  const exchangeRatesContract = await utils_1.getExchangeRateContract(provider)
  const { aum, priceUsd } = await prices_1.getXSnxPrices(
    xsnxContract,
    xsnxAdminAddress,
    tradeAccountingContract,
    exchangeRatesContract,
    snxContract,
    provider
  )
  return {
    aum,
    mandate: 'Aggressive staker; cautious ETH bull',
    price: priceUsd,
    symbol,
  }
}
exports.getXSnxAsset = getXSnxAsset
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi94c254L2Fzc2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLHVDQUFnRTtBQUtoRSxvQ0FBa0Q7QUFFbEQscUNBQTJDO0FBQzNDLHFDQUF3QztBQUVqQyxNQUFNLFlBQVksR0FBRyxLQUFLLEVBQy9CLE1BQXNCLEVBQ3RCLFFBQXNCLEVBQ0wsRUFBRTtJQUNuQixNQUFNLEVBQ0osT0FBTyxFQUNQLFdBQVcsRUFDWCx1QkFBdUIsRUFDdkIsWUFBWSxHQUNiLEdBQUcsTUFBTSx5QkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUNwQyxNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsT0FBTyxDQUFBO0lBRTNCLE1BQU0sZ0JBQWdCLEdBQUcsZ0JBQVMsQ0FBQyxvQkFBYSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDMUQsTUFBTSxxQkFBcUIsR0FBRyxDQUFDLE1BQU0sK0JBQXVCLENBQzFELFFBQVEsQ0FDVCxDQUFrQixDQUFBO0lBRW5CLE1BQU0sRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLEdBQUcsTUFBTSxzQkFBYSxDQUMzQyxZQUFZLEVBQ1osZ0JBQWdCLEVBQ2hCLHVCQUF1QixFQUN2QixxQkFBcUIsRUFDckIsV0FBdUIsRUFDdkIsUUFBUSxDQUNULENBQUE7SUFFRCxPQUFPO1FBQ0wsR0FBRztRQUNILE9BQU8sRUFBRSxzQ0FBc0M7UUFDL0MsS0FBSyxFQUFFLFFBQVE7UUFDZixNQUFNO0tBQ1AsQ0FBQTtBQUNILENBQUMsQ0FBQTtBQWhDWSxRQUFBLFlBQVksZ0JBZ0N4QiJ9
