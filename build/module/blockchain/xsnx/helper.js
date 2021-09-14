import { KYBER_PROXY, SNX, TRADE_ACCOUNTING, X_SNX_A } from '@xtoken/abis'
import { getContract, getTokenSymbol } from '../utils'
export const getXSnxContracts = async (provider) => {
  const network = await provider.getNetwork()
  const xsnxContract = getContract(X_SNX_A, provider, network)
  const snxContract = getContract(SNX, provider, network)
  const kyberProxyContract = getContract(KYBER_PROXY, provider, network)
  const tokenContract = getContract(getTokenSymbol(X_SNX_A), provider, network)
  const tradeAccountingContract = getContract(
    TRADE_ACCOUNTING,
    provider,
    network
  )
  if (
    !xsnxContract ||
    !kyberProxyContract ||
    !tokenContract ||
    !tradeAccountingContract ||
    !snxContract
  ) {
    return Promise.reject(new Error('Unknown error'))
  }
  return {
    kyberProxyContract,
    network,
    snxContract,
    tokenContract,
    tradeAccountingContract,
    xsnxContract,
  }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veHNueC9oZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxHQUFHLEVBQUUsZ0JBQWdCLEVBQUUsT0FBTyxFQUFFLE1BQU0sY0FBYyxDQUFBO0FBRzFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsY0FBYyxFQUFFLE1BQU0sVUFBVSxDQUFBO0FBRXRELE1BQU0sQ0FBQyxNQUFNLGdCQUFnQixHQUFHLEtBQUssRUFBRSxRQUFzQixFQUFFLEVBQUU7SUFDL0QsTUFBTSxPQUFPLEdBQUcsTUFBTSxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUE7SUFFM0MsTUFBTSxZQUFZLEdBQUcsV0FBVyxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFTLENBQUE7SUFDcEUsTUFBTSxXQUFXLEdBQUcsV0FBVyxDQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFhLENBQUE7SUFDbkUsTUFBTSxrQkFBa0IsR0FBRyxXQUFXLENBQ3BDLFdBQVcsRUFDWCxRQUFRLEVBQ1IsT0FBTyxDQUNNLENBQUE7SUFDZixNQUFNLGFBQWEsR0FBRyxXQUFXLENBQy9CLGNBQWMsQ0FBQyxPQUFPLENBQUMsRUFDdkIsUUFBUSxFQUNSLE9BQU8sQ0FDSSxDQUFBO0lBQ2IsTUFBTSx1QkFBdUIsR0FBRyxXQUFXLENBQ3pDLGdCQUFnQixFQUNoQixRQUFRLEVBQ1IsT0FBTyxDQUNXLENBQUE7SUFFcEIsSUFDRSxDQUFDLFlBQVk7UUFDYixDQUFDLGtCQUFrQjtRQUNuQixDQUFDLGFBQWE7UUFDZCxDQUFDLHVCQUF1QjtRQUN4QixDQUFDLFdBQVcsRUFDWjtRQUNBLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFBO0tBQ2xEO0lBRUQsT0FBTztRQUNMLGtCQUFrQjtRQUNsQixPQUFPO1FBQ1AsV0FBVztRQUNYLGFBQWE7UUFDYix1QkFBdUI7UUFDdkIsWUFBWTtLQUNiLENBQUE7QUFDSCxDQUFDLENBQUEifQ==
