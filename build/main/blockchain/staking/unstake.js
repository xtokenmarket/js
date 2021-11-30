"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unstakeXXtkA = void 0;
const utils_1 = require("ethers/lib/utils");
const helper_1 = require("./helper");
const unstakeXXtkA = async (amount, provider) => {
    const stakingContract = await helper_1.getXtkStakingContract(provider);
    return stakingContract.unstake(utils_1.parseEther(amount));
};
exports.unstakeXXtkA = unstakeXXtkA;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5zdGFrZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9ibG9ja2NoYWluL3N0YWtpbmcvdW5zdGFrZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSw0Q0FBNkM7QUFFN0MscUNBQWdEO0FBRXpDLE1BQU0sWUFBWSxHQUFHLEtBQUssRUFBRSxNQUFjLEVBQUUsUUFBc0IsRUFBRSxFQUFFO0lBQzNFLE1BQU0sZUFBZSxHQUFHLE1BQU0sOEJBQXFCLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDN0QsT0FBTyxlQUFlLENBQUMsT0FBTyxDQUFDLGtCQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQTtBQUNwRCxDQUFDLENBQUE7QUFIWSxRQUFBLFlBQVksZ0JBR3hCIn0=