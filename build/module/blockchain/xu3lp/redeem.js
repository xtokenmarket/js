import { formatEther } from 'ethers/lib/utils';
import { getXU3LPContracts } from './helper';
export const getMaximumRedeemableXU3LP = async (symbol, outputAsset, provider) => {
    const { xu3lpContract } = await getXU3LPContracts(symbol, provider);
    const getBufferBalance = outputAsset
        ? xu3lpContract.getBufferToken1Balance
        : xu3lpContract.getBufferToken0Balance;
    const bufferHoldings = await getBufferBalance();
    return formatEther(bufferHoldings);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkZWVtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veHUzbHAvcmVkZWVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQTtBQUk5QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxVQUFVLENBQUE7QUFFNUMsTUFBTSxDQUFDLE1BQU0seUJBQXlCLEdBQUcsS0FBSyxFQUM1QyxNQUF1QixFQUN2QixXQUFxQixFQUNyQixRQUFzQixFQUN0QixFQUFFO0lBQ0YsTUFBTSxFQUFFLGFBQWEsRUFBRSxHQUFHLE1BQU0saUJBQWlCLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBRW5FLE1BQU0sZ0JBQWdCLEdBQUcsV0FBVztRQUNsQyxDQUFDLENBQUMsYUFBYSxDQUFDLHNCQUFzQjtRQUN0QyxDQUFDLENBQUMsYUFBYSxDQUFDLHNCQUFzQixDQUFBO0lBRXhDLE1BQU0sY0FBYyxHQUFHLE1BQU0sZ0JBQWdCLEVBQUUsQ0FBQTtJQUUvQyxPQUFPLFdBQVcsQ0FBQyxjQUFjLENBQUMsQ0FBQTtBQUNwQyxDQUFDLENBQUEifQ==