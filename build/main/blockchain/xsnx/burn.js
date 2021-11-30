"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExpectedQuantityOnBurnXSnx = exports.burnXSnx = void 0;
const ethers_1 = require("ethers");
const constants_1 = require("../../constants");
const utils_1 = require("../../utils");
const helper_1 = require("./helper");
const { formatEther, parseEther } = ethers_1.ethers.utils;
const burnXSnx = async (amount, provider) => {
    const { xsnxContract } = await helper_1.getXSnxContracts(provider);
    // Estimate `gasLimit`
    const gasLimit = utils_1.getPercentage(await xsnxContract.estimateGas.burn(amount), constants_1.GAS_LIMIT_PERCENTAGE_ETH);
    return xsnxContract.burn(amount, { gasLimit });
};
exports.burnXSnx = burnXSnx;
const getExpectedQuantityOnBurnXSnx = async (amount, provider) => {
    const inputAmount = parseEther(amount);
    const { tradeAccountingContract, xsnxContract } = await helper_1.getXSnxContracts(provider);
    const totalSupply = await xsnxContract.totalSupply();
    const redemptionValue = await tradeAccountingContract.calculateRedemptionValue(totalSupply, inputAmount);
    return formatEther(redemptionValue);
};
exports.getExpectedQuantityOnBurnXSnx = getExpectedQuantityOnBurnXSnx;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVybi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9ibG9ja2NoYWluL3hzbngvYnVybi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSxtQ0FBMEM7QUFFMUMsK0NBQTBEO0FBQzFELHVDQUEyQztBQUUzQyxxQ0FBMkM7QUFFM0MsTUFBTSxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsR0FBRyxlQUFNLENBQUMsS0FBSyxDQUFBO0FBRXpDLE1BQU0sUUFBUSxHQUFHLEtBQUssRUFDM0IsTUFBaUIsRUFDakIsUUFBc0IsRUFDUSxFQUFFO0lBQ2hDLE1BQU0sRUFBRSxZQUFZLEVBQUUsR0FBRyxNQUFNLHlCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBRXpELHNCQUFzQjtJQUN0QixNQUFNLFFBQVEsR0FBRyxxQkFBYSxDQUM1QixNQUFNLFlBQVksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUMzQyxvQ0FBd0IsQ0FDekIsQ0FBQTtJQUVELE9BQU8sWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFBO0FBQ2hELENBQUMsQ0FBQTtBQWJZLFFBQUEsUUFBUSxZQWFwQjtBQUVNLE1BQU0sNkJBQTZCLEdBQUcsS0FBSyxFQUNoRCxNQUFjLEVBQ2QsUUFBc0IsRUFDdEIsRUFBRTtJQUNGLE1BQU0sV0FBVyxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUV0QyxNQUFNLEVBQUUsdUJBQXVCLEVBQUUsWUFBWSxFQUFFLEdBQUcsTUFBTSx5QkFBZ0IsQ0FDdEUsUUFBUSxDQUNULENBQUE7SUFFRCxNQUFNLFdBQVcsR0FBRyxNQUFNLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQTtJQUNwRCxNQUFNLGVBQWUsR0FBRyxNQUFNLHVCQUF1QixDQUFDLHdCQUF3QixDQUM1RSxXQUFXLEVBQ1gsV0FBVyxDQUNaLENBQUE7SUFFRCxPQUFPLFdBQVcsQ0FBQyxlQUFlLENBQUMsQ0FBQTtBQUNyQyxDQUFDLENBQUE7QUFqQlksUUFBQSw2QkFBNkIsaUNBaUJ6QyJ9