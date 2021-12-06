"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTokenBalance = void 0;
const abis_1 = require("@xtoken/abis");
const ethers_1 = require("ethers");
const utils_1 = require("ethers/lib/utils");
const getTokenBalance = async (symbol, address, provider) => {
    const { chainId } = await provider.getNetwork();
    const tokenAddress = abis_1.ADDRESSES[symbol][chainId];
    const contract = new ethers_1.ethers.Contract(tokenAddress, abis_1.Abi.ERC20, provider);
    const [tokenBalance, decimals] = await Promise.all([
        contract.balanceOf(address),
        contract.decimals(),
    ]);
    return utils_1.formatUnits(tokenBalance, decimals);
};
exports.getTokenBalance = getTokenBalance;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFsYW5jZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9ibG9ja2NoYWluL2VyYzIwL2JhbGFuY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsdUNBQTBEO0FBQzFELG1DQUErQjtBQUMvQiw0Q0FBOEM7QUFLdkMsTUFBTSxlQUFlLEdBQUcsS0FBSyxFQUNsQyxNQUEwRSxFQUMxRSxPQUFlLEVBQ2YsUUFBc0IsRUFDdEIsRUFBRTtJQUNGLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxNQUFNLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQTtJQUMvQyxNQUFNLFlBQVksR0FBRyxnQkFBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQy9DLE1BQU0sUUFBUSxHQUFHLElBQUksZUFBTSxDQUFDLFFBQVEsQ0FDbEMsWUFBWSxFQUNaLFVBQUcsQ0FBQyxLQUFLLEVBQ1QsUUFBUSxDQUNBLENBQUE7SUFDVixNQUFNLENBQUMsWUFBWSxFQUFFLFFBQVEsQ0FBQyxHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUNqRCxRQUFRLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQztRQUMzQixRQUFRLENBQUMsUUFBUSxFQUFFO0tBQ3BCLENBQUMsQ0FBQTtJQUNGLE9BQU8sbUJBQVcsQ0FBQyxZQUFZLEVBQUUsUUFBUSxDQUFDLENBQUE7QUFDNUMsQ0FBQyxDQUFBO0FBakJZLFFBQUEsZUFBZSxtQkFpQjNCIn0=