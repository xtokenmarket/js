'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.getAllMarkets = exports.getHealthRatio = exports.getBorrowingCapacity = void 0
const utils_1 = require('ethers/lib/utils')
const helper_1 = require('./helper')
/**
 * Get Borrowing Capacity for an address
 * @param address
 * @param provider
 * @returns
 */
const getBorrowingCapacity = async (address, provider) => {
  const comptroller = await helper_1.getComptrollerContract(provider)
  const borrowingCapacity = await comptroller.borrowingCapacity(address)
  return utils_1.formatEther(borrowingCapacity)
}
exports.getBorrowingCapacity = getBorrowingCapacity
/**
 * Get Health Ratio for an address
 * @param address
 * @param provider
 * @returns
 */
const getHealthRatio = async (address, provider) => {
  const comptroller = await helper_1.getComptrollerContract(provider)
  const healthRatio = await comptroller.getHealthRatio(address)
  return utils_1.formatEther(healthRatio)
}
exports.getHealthRatio = getHealthRatio
/**
 * Get all markets registered in Comptroller
 * @param provider
 * @returns
 */
const getAllMarkets = async (provider) => {
  const comptroller = await helper_1.getComptrollerContract(provider)
  return comptroller.getAllMarkets()
}
exports.getAllMarkets = getAllMarkets
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcHRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi9sZW5kaW5nL2NvbXB0cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLDRDQUE4QztBQUU5QyxxQ0FBaUQ7QUFFakQ7Ozs7O0dBS0c7QUFDSSxNQUFNLG9CQUFvQixHQUFHLEtBQUssRUFDdkMsT0FBZSxFQUNmLFFBQXNCLEVBQ3RCLEVBQUU7SUFDRixNQUFNLFdBQVcsR0FBRyxNQUFNLCtCQUFzQixDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQzFELE1BQU0saUJBQWlCLEdBQUcsTUFBTSxXQUFXLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDdEUsT0FBTyxtQkFBVyxDQUFDLGlCQUFpQixDQUFDLENBQUE7QUFDdkMsQ0FBQyxDQUFBO0FBUFksUUFBQSxvQkFBb0Isd0JBT2hDO0FBRUQ7Ozs7O0dBS0c7QUFDSSxNQUFNLGNBQWMsR0FBRyxLQUFLLEVBQ2pDLE9BQWUsRUFDZixRQUFzQixFQUN0QixFQUFFO0lBQ0YsTUFBTSxXQUFXLEdBQUcsTUFBTSwrQkFBc0IsQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUMxRCxNQUFNLFdBQVcsR0FBRyxNQUFNLFdBQVcsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDN0QsT0FBTyxtQkFBVyxDQUFDLFdBQVcsQ0FBQyxDQUFBO0FBQ2pDLENBQUMsQ0FBQTtBQVBZLFFBQUEsY0FBYyxrQkFPMUI7QUFFRDs7OztHQUlHO0FBQ0ksTUFBTSxhQUFhLEdBQUcsS0FBSyxFQUFFLFFBQXNCLEVBQUUsRUFBRTtJQUM1RCxNQUFNLFdBQVcsR0FBRyxNQUFNLCtCQUFzQixDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQzFELE9BQU8sV0FBVyxDQUFDLGFBQWEsRUFBRSxDQUFBO0FBQ3BDLENBQUMsQ0FBQTtBQUhZLFFBQUEsYUFBYSxpQkFHekIifQ==
