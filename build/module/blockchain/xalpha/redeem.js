import { formatEther } from 'ethers/lib/utils';
import { getXAlphaContracts } from './helper';
export const getMaximumRedeemableXAlpha = async (symbol, provider) => {
    const { xalphaContract } = await getXAlphaContracts(symbol, provider);
    const [bufferHoldings, alphaHoldings, totalSupply] = await Promise.all([
        xalphaContract.getBufferBalance(),
        xalphaContract.getNav(),
        xalphaContract.totalSupply(),
    ]);
    const redeemable = bufferHoldings.mul(totalSupply).div(alphaHoldings);
    return formatEther(redeemable);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkZWVtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veGFscGhhL3JlZGVlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sa0JBQWtCLENBQUE7QUFJOUMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sVUFBVSxDQUFBO0FBRTdDLE1BQU0sQ0FBQyxNQUFNLDBCQUEwQixHQUFHLEtBQUssRUFDN0MsTUFBcUIsRUFDckIsUUFBc0IsRUFDdEIsRUFBRTtJQUNGLE1BQU0sRUFBRSxjQUFjLEVBQUUsR0FBRyxNQUFNLGtCQUFrQixDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQTtJQUVyRSxNQUFNLENBQUMsY0FBYyxFQUFFLGFBQWEsRUFBRSxXQUFXLENBQUMsR0FBRyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUM7UUFDckUsY0FBYyxDQUFDLGdCQUFnQixFQUFFO1FBQ2pDLGNBQWMsQ0FBQyxNQUFNLEVBQUU7UUFDdkIsY0FBYyxDQUFDLFdBQVcsRUFBRTtLQUM3QixDQUFDLENBQUE7SUFFRixNQUFNLFVBQVUsR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQTtJQUNyRSxPQUFPLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQTtBQUNoQyxDQUFDLENBQUEifQ==