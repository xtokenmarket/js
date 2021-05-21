'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const abis_1 = require('@xtoken/abis')
const ava_1 = __importDefault(require('ava'))
const constants_spec_1 = require('../../constants.spec')
const utils_1 = require('../utils')
const helper_1 = require('./helper')
const prices_1 = require('./prices')
ava_1.default('Get xSNXa prices', async (t) => {
  const {
    network,
    snxContract,
    tradeAccountingContract,
    xsnxContract,
  } = await helper_1.getXSnxContracts(constants_spec_1.provider)
  const { chainId } = network
  const xsnxAdminAddress = abis_1.ADDRESSES[abis_1.X_SNX_A_ADMIN][chainId]
  const exchangeRatesContract = await utils_1.getExchangeRateContract(
    constants_spec_1.provider
  )
  const { aum, priceEth, priceUsd } = await prices_1.getXSnxPrices(
    xsnxContract,
    xsnxAdminAddress,
    tradeAccountingContract,
    exchangeRatesContract,
    snxContract,
    constants_spec_1.provider
  )
  console.log('xSNXa aum:', aum)
  console.log('xSNXa priceEth:', priceEth)
  console.log('xSNXa priceUsd:', priceUsd)
  t.true(aum > 0)
  t.true(priceEth > 0)
  t.true(priceUsd > 0)
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpY2VzLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi94c254L3ByaWNlcy5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsdUNBQXVEO0FBQ3ZELDhDQUFzQjtBQUd0Qix5REFBK0M7QUFFL0Msb0NBQWtEO0FBRWxELHFDQUEyQztBQUMzQyxxQ0FBd0M7QUFFeEMsYUFBSSxDQUFDLGtCQUFrQixFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUNuQyxNQUFNLEVBQ0osT0FBTyxFQUNQLFdBQVcsRUFDWCx1QkFBdUIsRUFDdkIsWUFBWSxHQUNiLEdBQUcsTUFBTSx5QkFBZ0IsQ0FBQyx5QkFBUSxDQUFDLENBQUE7SUFDcEMsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLE9BQU8sQ0FBQTtJQUUzQixNQUFNLGdCQUFnQixHQUFHLGdCQUFTLENBQUMsb0JBQWEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQzFELE1BQU0scUJBQXFCLEdBQUcsTUFBTSwrQkFBdUIsQ0FBQyx5QkFBUSxDQUFDLENBQUE7SUFFckUsTUFBTSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEdBQUcsTUFBTSxzQkFBYSxDQUNyRCxZQUFZLEVBQ1osZ0JBQWdCLEVBQ2hCLHVCQUF1QixFQUN2QixxQkFBc0MsRUFDdEMsV0FBdUIsRUFDdkIseUJBQVEsQ0FDVCxDQUFBO0lBRUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsR0FBRyxDQUFDLENBQUE7SUFDOUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxRQUFRLENBQUMsQ0FBQTtJQUN4QyxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBQ3hDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFBO0lBQ2YsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUE7SUFDcEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUE7QUFDdEIsQ0FBQyxDQUFDLENBQUEifQ==
