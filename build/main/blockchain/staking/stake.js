"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stakeXtk = exports.approveXtk = void 0;
const abis_1 = require("@xtoken/abis");
const ethers_1 = require("ethers");
const utils_1 = require("ethers/lib/utils");
const utils_2 = require("../utils");
const helper_1 = require("./helper");
const XTK_ADDRESS = '0x7f3edcdd180dbe4819bd98fee8929b5cedb3adeb';
const approveXtk = async (amount, provider) => {
    const contract = new ethers_1.Contract(XTK_ADDRESS, abis_1.Abi.ERC20, utils_2.getSigner(provider));
    const network = await provider.getNetwork();
    return contract.approve(abis_1.ADDRESSES[abis_1.XTK_MANAGEMENT_STAKING_MODULE][network.chainId], amount);
};
exports.approveXtk = approveXtk;
const stakeXtk = async (amount, provider) => {
    const inputAmount = utils_1.parseEther(amount);
    const stakingContract = await helper_1.getXtkStakingContract(provider);
    const address = await utils_2.getSignerAddress(provider);
    const approvedAmount = await _getApprovedAmount(address, provider);
    if (approvedAmount.lt(inputAmount)) {
        return Promise.reject(new Error('Please approve the tokens before staking'));
    }
    return stakingContract.stake(inputAmount);
};
exports.stakeXtk = stakeXtk;
const _getApprovedAmount = async (address, provider) => {
    const xtkContract = new ethers_1.Contract(XTK_ADDRESS, abis_1.Abi.ERC20, provider);
    const network = await provider.getNetwork();
    return xtkContract.allowance(address, abis_1.ADDRESSES[abis_1.XTK_MANAGEMENT_STAKING_MODULE][network.chainId]);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Rha2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi9zdGFraW5nL3N0YWtlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLHVDQUE0RTtBQUM1RSxtQ0FBNEM7QUFDNUMsNENBQTZDO0FBRTdDLG9DQUFzRDtBQUV0RCxxQ0FBZ0Q7QUFFaEQsTUFBTSxXQUFXLEdBQUcsNENBQTRDLENBQUE7QUFFekQsTUFBTSxVQUFVLEdBQUcsS0FBSyxFQUFFLE1BQWlCLEVBQUUsUUFBc0IsRUFBRSxFQUFFO0lBQzVFLE1BQU0sUUFBUSxHQUFHLElBQUksaUJBQVEsQ0FBQyxXQUFXLEVBQUUsVUFBRyxDQUFDLEtBQUssRUFBRSxpQkFBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUE7SUFDMUUsTUFBTSxPQUFPLEdBQUcsTUFBTSxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUE7SUFFM0MsT0FBTyxRQUFRLENBQUMsT0FBTyxDQUNyQixnQkFBUyxDQUFDLG9DQUE2QixDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUN6RCxNQUFNLENBQ1AsQ0FBQTtBQUNILENBQUMsQ0FBQTtBQVJZLFFBQUEsVUFBVSxjQVF0QjtBQUVNLE1BQU0sUUFBUSxHQUFHLEtBQUssRUFBRSxNQUFjLEVBQUUsUUFBc0IsRUFBRSxFQUFFO0lBQ3ZFLE1BQU0sV0FBVyxHQUFHLGtCQUFVLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDdEMsTUFBTSxlQUFlLEdBQUcsTUFBTSw4QkFBcUIsQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUM3RCxNQUFNLE9BQU8sR0FBRyxNQUFNLHdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQ2hELE1BQU0sY0FBYyxHQUFHLE1BQU0sa0JBQWtCLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBRWxFLElBQUksY0FBYyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsRUFBRTtRQUNsQyxPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsMENBQTBDLENBQUMsQ0FBQyxDQUFBO0tBQzdFO0lBRUQsT0FBTyxlQUFlLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFBO0FBQzNDLENBQUMsQ0FBQTtBQVhZLFFBQUEsUUFBUSxZQVdwQjtBQUVELE1BQU0sa0JBQWtCLEdBQUcsS0FBSyxFQUFFLE9BQWUsRUFBRSxRQUFzQixFQUFFLEVBQUU7SUFDM0UsTUFBTSxXQUFXLEdBQUcsSUFBSSxpQkFBUSxDQUFDLFdBQVcsRUFBRSxVQUFHLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBQ2xFLE1BQU0sT0FBTyxHQUFHLE1BQU0sUUFBUSxDQUFDLFVBQVUsRUFBRSxDQUFBO0lBRTNDLE9BQU8sV0FBVyxDQUFDLFNBQVMsQ0FDMUIsT0FBTyxFQUNQLGdCQUFTLENBQUMsb0NBQTZCLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQzFELENBQUE7QUFDSCxDQUFDLENBQUEifQ==