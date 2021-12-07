import { formatEther } from 'ethers/lib/utils';
import { getXAssetCLRContracts } from './helper';
export const getMaximumRedeemableXAssetCLR = async (symbol, provider) => {
    const { xAssetCLRContract } = await getXAssetCLRContracts(symbol, provider);
    const totalLiquidity = await xAssetCLRContract.getTotalLiquidity();
    return formatEther(totalLiquidity);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkZWVtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4vY2xyL3JlZGVlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sa0JBQWtCLENBQUE7QUFJOUMsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sVUFBVSxDQUFBO0FBRWhELE1BQU0sQ0FBQyxNQUFNLDZCQUE2QixHQUFHLEtBQUssRUFDaEQsTUFBa0IsRUFDbEIsUUFBc0IsRUFDdEIsRUFBRTtJQUNGLE1BQU0sRUFBRSxpQkFBaUIsRUFBRSxHQUFHLE1BQU0scUJBQXFCLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBQzNFLE1BQU0sY0FBYyxHQUFHLE1BQU0saUJBQWlCLENBQUMsaUJBQWlCLEVBQUUsQ0FBQTtJQUNsRSxPQUFPLFdBQVcsQ0FBQyxjQUFjLENBQUMsQ0FBQTtBQUNwQyxDQUFDLENBQUEifQ==