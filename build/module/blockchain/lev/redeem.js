import { formatEther } from 'ethers/lib/utils';
import { getXAssetLevContracts } from './helper';
export const getMaximumRedeemableXAssetLev = async (symbol, provider) => {
    const { xassetlevContract } = await getXAssetLevContracts(symbol, provider);
    const [bufferHoldings, { bufferBalance, marketBalance }, totalSupply,] = await Promise.all([
        xassetlevContract.getBufferBalance(),
        xassetlevContract.getFundBalances(),
        xassetlevContract.totalSupply(),
    ]);
    const redeemable = bufferHoldings
        .mul(totalSupply)
        .div(bufferBalance.add(marketBalance));
    return formatEther(redeemable);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkZWVtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4vbGV2L3JlZGVlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sa0JBQWtCLENBQUE7QUFJOUMsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sVUFBVSxDQUFBO0FBRWhELE1BQU0sQ0FBQyxNQUFNLDZCQUE2QixHQUFHLEtBQUssRUFDaEQsTUFBa0IsRUFDbEIsUUFBc0IsRUFDdEIsRUFBRTtJQUNGLE1BQU0sRUFBRSxpQkFBaUIsRUFBRSxHQUFHLE1BQU0scUJBQXFCLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBRTNFLE1BQU0sQ0FDSixjQUFjLEVBQ2QsRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFFLEVBQ2hDLFdBQVcsRUFDWixHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUNwQixpQkFBaUIsQ0FBQyxnQkFBZ0IsRUFBRTtRQUNwQyxpQkFBaUIsQ0FBQyxlQUFlLEVBQUU7UUFDbkMsaUJBQWlCLENBQUMsV0FBVyxFQUFFO0tBQ2hDLENBQUMsQ0FBQTtJQUVGLE1BQU0sVUFBVSxHQUFHLGNBQWM7U0FDOUIsR0FBRyxDQUFDLFdBQVcsQ0FBQztTQUNoQixHQUFHLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFBO0lBQ3hDLE9BQU8sV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFBO0FBQ2hDLENBQUMsQ0FBQSJ9