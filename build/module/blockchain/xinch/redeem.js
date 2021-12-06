import { formatEther } from 'ethers/lib/utils';
import { getXInchContracts } from './helper';
export const getMaximumRedeemableXInch = async (symbol, provider) => {
    const { xinchContract } = await getXInchContracts(symbol, provider);
    const [bufferHoldings, inchHoldings, totalSupply] = await Promise.all([
        xinchContract.getBufferBalance(),
        xinchContract.getNav(),
        xinchContract.totalSupply(),
    ]);
    const redeemable = bufferHoldings.mul(totalSupply).div(inchHoldings);
    return formatEther(redeemable);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkZWVtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veGluY2gvcmVkZWVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQTtBQUk5QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxVQUFVLENBQUE7QUFFNUMsTUFBTSxDQUFDLE1BQU0seUJBQXlCLEdBQUcsS0FBSyxFQUM1QyxNQUFxQixFQUNyQixRQUFzQixFQUN0QixFQUFFO0lBQ0YsTUFBTSxFQUFFLGFBQWEsRUFBRSxHQUFHLE1BQU0saUJBQWlCLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBRW5FLE1BQU0sQ0FBQyxjQUFjLEVBQUUsWUFBWSxFQUFFLFdBQVcsQ0FBQyxHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUNwRSxhQUFhLENBQUMsZ0JBQWdCLEVBQUU7UUFDaEMsYUFBYSxDQUFDLE1BQU0sRUFBRTtRQUN0QixhQUFhLENBQUMsV0FBVyxFQUFFO0tBQzVCLENBQUMsQ0FBQTtJQUVGLE1BQU0sVUFBVSxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFBO0lBQ3BFLE9BQU8sV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFBO0FBQ2hDLENBQUMsQ0FBQSJ9