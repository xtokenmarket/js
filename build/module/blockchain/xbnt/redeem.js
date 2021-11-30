import { formatEther } from 'ethers/lib/utils';
import { getXBntContracts } from './helper';
export const getMaximumRedeemableXBnt = async (symbol, provider) => {
    const { xbntContract } = await getXBntContracts(symbol, provider);
    const [bufferHoldings, bntHoldings, totalSupply] = await Promise.all([
        xbntContract.getBufferBalance(),
        xbntContract.getNav(),
        xbntContract.totalSupply(),
    ]);
    const redeemable = bufferHoldings.mul(totalSupply).div(bntHoldings);
    return formatEther(redeemable);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkZWVtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veGJudC9yZWRlZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGtCQUFrQixDQUFBO0FBSTlDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUUzQyxNQUFNLENBQUMsTUFBTSx3QkFBd0IsR0FBRyxLQUFLLEVBQzNDLE1BQXFCLEVBQ3JCLFFBQXNCLEVBQ3RCLEVBQUU7SUFDRixNQUFNLEVBQUUsWUFBWSxFQUFFLEdBQUcsTUFBTSxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFFakUsTUFBTSxDQUFDLGNBQWMsRUFBRSxXQUFXLEVBQUUsV0FBVyxDQUFDLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDO1FBQ25FLFlBQVksQ0FBQyxnQkFBZ0IsRUFBRTtRQUMvQixZQUFZLENBQUMsTUFBTSxFQUFFO1FBQ3JCLFlBQVksQ0FBQyxXQUFXLEVBQUU7S0FDM0IsQ0FBQyxDQUFBO0lBRUYsTUFBTSxVQUFVLEdBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUE7SUFDbkUsT0FBTyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUE7QUFDaEMsQ0FBQyxDQUFBIn0=