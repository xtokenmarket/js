"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLendingPrice = void 0;
const utils_1 = require("ethers/lib/utils");
const helper_1 = require("./helper");
/**
 * Get xAsset Price
 * @param priceName Pricing contract name
 * @param provider
 * @returns
 */
const getLendingPrice = async (priceName, provider) => {
    const pricingContracts = await helper_1.getPricingContracts(provider);
    const pricingContract = pricingContracts[priceName];
    const lendingPrice = await pricingContract.getPrice();
    return utils_1.formatEther(lendingPrice);
};
exports.getLendingPrice = getLendingPrice;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi9sZW5kaW5nL3ByaWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLDRDQUE4QztBQUk5QyxxQ0FBOEM7QUFFOUM7Ozs7O0dBS0c7QUFDSSxNQUFNLGVBQWUsR0FBRyxLQUFLLEVBQ2xDLFNBQTBCLEVBQzFCLFFBQXNCLEVBQ3RCLEVBQUU7SUFDRixNQUFNLGdCQUFnQixHQUFHLE1BQU0sNEJBQW1CLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDNUQsTUFBTSxlQUFlLEdBQUcsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLENBQUE7SUFDbkQsTUFBTSxZQUFZLEdBQUcsTUFBTSxlQUFlLENBQUMsUUFBUSxFQUFFLENBQUE7SUFDckQsT0FBTyxtQkFBVyxDQUFDLFlBQVksQ0FBQyxDQUFBO0FBQ2xDLENBQUMsQ0FBQTtBQVJZLFFBQUEsZUFBZSxtQkFRM0IifQ==