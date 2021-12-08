import { formatEther } from 'ethers/lib/utils'
import { getXAssetLevContracts } from './helper'
export const getMaximumRedeemableXAssetLev = async (symbol, provider) => {
  const { xassetlevContract } = await getXAssetLevContracts(symbol, provider)
  const [
    bufferHoldings,
    { bufferBalance, marketBalance },
    totalSupply,
    liquidityBuffer,
  ] = await Promise.all([
    xassetlevContract.getBufferBalance(),
    xassetlevContract.getFundBalances(),
    xassetlevContract.totalSupply(),
    xassetlevContract.getLiquidityBuffer(),
  ])
  if (bufferHoldings.sub(liquidityBuffer).lt('0')) {
    return '0'
  }
  const redeemable = bufferHoldings
    .sub(liquidityBuffer)
    .mul(totalSupply)
    .div(bufferBalance.add(marketBalance))
  return formatEther(redeemable)
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkZWVtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4vbGV2L3JlZGVlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sa0JBQWtCLENBQUE7QUFJOUMsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sVUFBVSxDQUFBO0FBRWhELE1BQU0sQ0FBQyxNQUFNLDZCQUE2QixHQUFHLEtBQUssRUFDaEQsTUFBa0IsRUFDbEIsUUFBc0IsRUFDdEIsRUFBRTtJQUNGLE1BQU0sRUFBRSxpQkFBaUIsRUFBRSxHQUFHLE1BQU0scUJBQXFCLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBRTNFLE1BQU0sQ0FDSixjQUFjLEVBQ2QsRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFFLEVBQ2hDLFdBQVcsRUFDWCxlQUFlLEVBQ2hCLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDO1FBQ3BCLGlCQUFpQixDQUFDLGdCQUFnQixFQUFFO1FBQ3BDLGlCQUFpQixDQUFDLGVBQWUsRUFBRTtRQUNuQyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUU7UUFDL0IsaUJBQWlCLENBQUMsa0JBQWtCLEVBQUU7S0FDdkMsQ0FBQyxDQUFBO0lBRUYsSUFBSSxjQUFjLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUMvQyxPQUFPLEdBQUcsQ0FBQTtLQUNYO0lBRUQsTUFBTSxVQUFVLEdBQUcsY0FBYztTQUM5QixHQUFHLENBQUMsZUFBZSxDQUFDO1NBQ3BCLEdBQUcsQ0FBQyxXQUFXLENBQUM7U0FDaEIsR0FBRyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQTtJQUV4QyxPQUFPLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQTtBQUNoQyxDQUFDLENBQUEifQ==
