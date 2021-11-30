import { formatEther } from 'ethers/lib/utils';
import { getXAaveContracts } from './helper';
export const getMaximumRedeemableXAave = async (symbol, provider) => {
    const { xaaveContract } = await getXAaveContracts(symbol, provider);
    const [bufferHoldings, aaveHoldings, totalSupply] = await Promise.all([
        xaaveContract.getBufferBalance(),
        xaaveContract.getFundHoldings(),
        xaaveContract.totalSupply(),
    ]);
    const redeemable = bufferHoldings.mul(totalSupply).div(aaveHoldings);
    return formatEther(redeemable);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkZWVtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veGFhdmUvcmVkZWVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQTtBQUk5QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxVQUFVLENBQUE7QUFFNUMsTUFBTSxDQUFDLE1BQU0seUJBQXlCLEdBQUcsS0FBSyxFQUM1QyxNQUFxQixFQUNyQixRQUFzQixFQUN0QixFQUFFO0lBQ0YsTUFBTSxFQUFFLGFBQWEsRUFBRSxHQUFHLE1BQU0saUJBQWlCLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBRW5FLE1BQU0sQ0FBQyxjQUFjLEVBQUUsWUFBWSxFQUFFLFdBQVcsQ0FBQyxHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUNwRSxhQUFhLENBQUMsZ0JBQWdCLEVBQUU7UUFDaEMsYUFBYSxDQUFDLGVBQWUsRUFBRTtRQUMvQixhQUFhLENBQUMsV0FBVyxFQUFFO0tBQzVCLENBQUMsQ0FBQTtJQUVGLE1BQU0sVUFBVSxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFBO0lBQ3BFLE9BQU8sV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFBO0FBQ2hDLENBQUMsQ0FBQSJ9