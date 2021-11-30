"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllMarkets = exports.getHealthRatio = exports.getBorrowingCapacity = void 0;
const utils_1 = require("ethers/lib/utils");
const constants_1 = require("../../constants");
const helper_1 = require("./helper");
/**
 * Get Borrowing Capacity for an address
 * @param address
 * @param provider
 * @returns
 */
const getBorrowingCapacity = async (address, provider) => {
    const comptroller = await helper_1.getComptrollerContract(provider);
    const borrowingCapacity = await comptroller.borrowingCapacity(address);
    return utils_1.formatEther(borrowingCapacity);
};
exports.getBorrowingCapacity = getBorrowingCapacity;
/**
 * Get Health Ratio for an address
 * @param address
 * @param provider
 * @returns
 */
const getHealthRatio = async (address, provider) => {
    const comptroller = await helper_1.getComptrollerContract(provider);
    const healthRatio = await comptroller.getHealthRatio(address);
    return healthRatio.eq(constants_1.DEC_18)
        ? utils_1.formatEther(healthRatio)
        : utils_1.formatUnits(healthRatio, 2);
};
exports.getHealthRatio = getHealthRatio;
/**
 * Get all markets registered in Comptroller
 * @param provider
 * @returns
 */
const getAllMarkets = async (provider) => {
    const comptroller = await helper_1.getComptrollerContract(provider);
    return comptroller.getAllMarkets();
};
exports.getAllMarkets = getAllMarkets;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcHRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi9sZW5kaW5nL2NvbXB0cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLDRDQUEyRDtBQUUzRCwrQ0FBd0M7QUFFeEMscUNBQWlEO0FBRWpEOzs7OztHQUtHO0FBQ0ksTUFBTSxvQkFBb0IsR0FBRyxLQUFLLEVBQ3ZDLE9BQWUsRUFDZixRQUFzQixFQUN0QixFQUFFO0lBQ0YsTUFBTSxXQUFXLEdBQUcsTUFBTSwrQkFBc0IsQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUMxRCxNQUFNLGlCQUFpQixHQUFHLE1BQU0sV0FBVyxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ3RFLE9BQU8sbUJBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO0FBQ3ZDLENBQUMsQ0FBQTtBQVBZLFFBQUEsb0JBQW9CLHdCQU9oQztBQUVEOzs7OztHQUtHO0FBQ0ksTUFBTSxjQUFjLEdBQUcsS0FBSyxFQUNqQyxPQUFlLEVBQ2YsUUFBc0IsRUFDdEIsRUFBRTtJQUNGLE1BQU0sV0FBVyxHQUFHLE1BQU0sK0JBQXNCLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDMUQsTUFBTSxXQUFXLEdBQUcsTUFBTSxXQUFXLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQzdELE9BQU8sV0FBVyxDQUFDLEVBQUUsQ0FBQyxrQkFBTSxDQUFDO1FBQzNCLENBQUMsQ0FBQyxtQkFBVyxDQUFDLFdBQVcsQ0FBQztRQUMxQixDQUFDLENBQUMsbUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUE7QUFDakMsQ0FBQyxDQUFBO0FBVFksUUFBQSxjQUFjLGtCQVMxQjtBQUVEOzs7O0dBSUc7QUFDSSxNQUFNLGFBQWEsR0FBRyxLQUFLLEVBQUUsUUFBc0IsRUFBRSxFQUFFO0lBQzVELE1BQU0sV0FBVyxHQUFHLE1BQU0sK0JBQXNCLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDMUQsT0FBTyxXQUFXLENBQUMsYUFBYSxFQUFFLENBQUE7QUFDcEMsQ0FBQyxDQUFBO0FBSFksUUFBQSxhQUFhLGlCQUd6QiJ9