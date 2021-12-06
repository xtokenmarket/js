"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMaximumRedeemableXSnx = void 0;
const abis_1 = require("@xtoken/abis");
const utils_1 = require("ethers/lib/utils");
const constants_1 = require("../../constants");
const erc20_1 = require("../erc20");
const helper_1 = require("./helper");
const getMaximumRedeemableXSnx = async (provider) => {
    const { network, snxContract, tradeAccountingContract, xsnxContract, } = await helper_1.getXSnxContracts(provider);
    const { chainId } = network;
    const xsnxAdminAddress = abis_1.ADDRESSES[abis_1.X_SNX_ADMIN][chainId];
    const [availableEthBalance, totalSupply, snxBalanceOwned, debtValue,] = await Promise.all([
        tradeAccountingContract.getEthBalance(),
        xsnxContract.totalSupply(),
        erc20_1.getTokenBalance(abis_1.SNX, xsnxAdminAddress, provider),
        snxContract.debtBalanceOf(xsnxAdminAddress, utils_1.formatBytes32String('sUSD')),
    ]);
    const redeemTokenPrice = await tradeAccountingContract.calculateRedeemTokenPrice(totalSupply, snxBalanceOwned, debtValue);
    return utils_1.formatEther(availableEthBalance.mul(constants_1.DEC_18).div(redeemTokenPrice));
};
exports.getMaximumRedeemableXSnx = getMaximumRedeemableXSnx;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkZWVtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veHNueC9yZWRlZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsdUNBQTBEO0FBQzFELDRDQUFtRTtBQUVuRSwrQ0FBd0M7QUFFeEMsb0NBQTBDO0FBRTFDLHFDQUEyQztBQUVwQyxNQUFNLHdCQUF3QixHQUFHLEtBQUssRUFBRSxRQUFzQixFQUFFLEVBQUU7SUFDdkUsTUFBTSxFQUNKLE9BQU8sRUFDUCxXQUFXLEVBQ1gsdUJBQXVCLEVBQ3ZCLFlBQVksR0FDYixHQUFHLE1BQU0seUJBQWdCLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDcEMsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLE9BQU8sQ0FBQTtJQUUzQixNQUFNLGdCQUFnQixHQUFHLGdCQUFTLENBQUMsa0JBQVcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBRXhELE1BQU0sQ0FDSixtQkFBbUIsRUFDbkIsV0FBVyxFQUNYLGVBQWUsRUFDZixTQUFTLEVBQ1YsR0FBRyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUM7UUFDcEIsdUJBQXVCLENBQUMsYUFBYSxFQUFFO1FBQ3ZDLFlBQVksQ0FBQyxXQUFXLEVBQUU7UUFDMUIsdUJBQWUsQ0FBQyxVQUFHLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxDQUFDO1FBQy9DLFdBQXFCLENBQUMsYUFBYSxDQUNsQyxnQkFBZ0IsRUFDaEIsMkJBQW1CLENBQUMsTUFBTSxDQUFDLENBQzVCO0tBQ0YsQ0FBQyxDQUFBO0lBRUYsTUFBTSxnQkFBZ0IsR0FBRyxNQUFNLHVCQUF1QixDQUFDLHlCQUF5QixDQUM5RSxXQUFXLEVBQ1gsZUFBZSxFQUNmLFNBQVMsQ0FDVixDQUFBO0lBRUQsT0FBTyxtQkFBVyxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxrQkFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQTtBQUMzRSxDQUFDLENBQUE7QUFqQ1ksUUFBQSx3QkFBd0IsNEJBaUNwQyJ9