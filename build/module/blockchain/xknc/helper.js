import { KNC, KYBER_PROXY } from '@xtoken/abis'
import { getContract, getTokenSymbol } from '../utils'
export const getXKncContracts = async (symbol, provider) => {
  const network = await provider.getNetwork()
  const xkncContract = getContract(symbol, provider, network)
  const kncContract = getContract(KNC, provider, network)
  const kyberProxyContract = getContract(KYBER_PROXY, provider, network)
  const tokenContract = getContract(getTokenSymbol(symbol), provider, network)
  if (!xkncContract || !kncContract || !kyberProxyContract || !tokenContract) {
    return Promise.reject(new Error('Unknown error'))
  }
  return {
    kncContract,
    kyberProxyContract,
    network,
    tokenContract,
    xkncContract,
  }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veGtuYy9oZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsT0FBTyxFQUFFLEdBQUcsRUFBRSxXQUFXLEVBQUUsTUFBTSxjQUFjLENBQUE7QUFJL0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxjQUFjLEVBQUUsTUFBTSxVQUFVLENBQUE7QUFFdEQsTUFBTSxDQUFDLE1BQU0sZ0JBQWdCLEdBQUcsS0FBSyxFQUNuQyxNQUFxQixFQUNyQixRQUFzQixFQUN0QixFQUFFO0lBQ0YsTUFBTSxPQUFPLEdBQUcsTUFBTSxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUE7SUFFM0MsTUFBTSxZQUFZLEdBQUcsV0FBVyxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFTLENBQUE7SUFDbkUsTUFBTSxXQUFXLEdBQUcsV0FBVyxDQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUE7SUFDdkQsTUFBTSxrQkFBa0IsR0FBRyxXQUFXLENBQ3BDLFdBQVcsRUFDWCxRQUFRLEVBQ1IsT0FBTyxDQUNNLENBQUE7SUFDZixNQUFNLGFBQWEsR0FBRyxXQUFXLENBQy9CLGNBQWMsQ0FBQyxNQUFNLENBQUMsRUFDdEIsUUFBUSxFQUNSLE9BQU8sQ0FDSSxDQUFBO0lBRWIsSUFBSSxDQUFDLFlBQVksSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLGtCQUFrQixJQUFJLENBQUMsYUFBYSxFQUFFO1FBQzFFLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFBO0tBQ2xEO0lBRUQsT0FBTztRQUNMLFdBQVc7UUFDWCxrQkFBa0I7UUFDbEIsT0FBTztRQUNQLGFBQWE7UUFDYixZQUFZO0tBQ2IsQ0FBQTtBQUNILENBQUMsQ0FBQSJ9
