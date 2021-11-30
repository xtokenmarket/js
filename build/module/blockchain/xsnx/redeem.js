import { ADDRESSES, SNX, X_SNX_ADMIN } from '@xtoken/abis';
import { formatBytes32String, formatEther } from 'ethers/lib/utils';
import { DEC_18 } from '../../constants';
import { getTokenBalance } from '../erc20';
import { getXSnxContracts } from './helper';
export const getMaximumRedeemableXSnx = async (provider) => {
    const { network, snxContract, tradeAccountingContract, xsnxContract, } = await getXSnxContracts(provider);
    const { chainId } = network;
    const xsnxAdminAddress = ADDRESSES[X_SNX_ADMIN][chainId];
    const [availableEthBalance, totalSupply, snxBalanceOwned, debtValue,] = await Promise.all([
        tradeAccountingContract.getEthBalance(),
        xsnxContract.totalSupply(),
        getTokenBalance(SNX, xsnxAdminAddress, provider),
        snxContract.debtBalanceOf(xsnxAdminAddress, formatBytes32String('sUSD')),
    ]);
    const redeemTokenPrice = await tradeAccountingContract.calculateRedeemTokenPrice(totalSupply, snxBalanceOwned, debtValue);
    return formatEther(availableEthBalance.mul(DEC_18).div(redeemTokenPrice));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkZWVtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veHNueC9yZWRlZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsV0FBVyxFQUFFLE1BQU0sY0FBYyxDQUFBO0FBQzFELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxXQUFXLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQTtBQUVuRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUE7QUFFeEMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUUxQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxVQUFVLENBQUE7QUFFM0MsTUFBTSxDQUFDLE1BQU0sd0JBQXdCLEdBQUcsS0FBSyxFQUFFLFFBQXNCLEVBQUUsRUFBRTtJQUN2RSxNQUFNLEVBQ0osT0FBTyxFQUNQLFdBQVcsRUFDWCx1QkFBdUIsRUFDdkIsWUFBWSxHQUNiLEdBQUcsTUFBTSxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUNwQyxNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsT0FBTyxDQUFBO0lBRTNCLE1BQU0sZ0JBQWdCLEdBQUcsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBRXhELE1BQU0sQ0FDSixtQkFBbUIsRUFDbkIsV0FBVyxFQUNYLGVBQWUsRUFDZixTQUFTLEVBQ1YsR0FBRyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUM7UUFDcEIsdUJBQXVCLENBQUMsYUFBYSxFQUFFO1FBQ3ZDLFlBQVksQ0FBQyxXQUFXLEVBQUU7UUFDMUIsZUFBZSxDQUFDLEdBQUcsRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLENBQUM7UUFDL0MsV0FBcUIsQ0FBQyxhQUFhLENBQ2xDLGdCQUFnQixFQUNoQixtQkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FDNUI7S0FDRixDQUFDLENBQUE7SUFFRixNQUFNLGdCQUFnQixHQUFHLE1BQU0sdUJBQXVCLENBQUMseUJBQXlCLENBQzlFLFdBQVcsRUFDWCxlQUFlLEVBQ2YsU0FBUyxDQUNWLENBQUE7SUFFRCxPQUFPLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQTtBQUMzRSxDQUFDLENBQUEifQ==