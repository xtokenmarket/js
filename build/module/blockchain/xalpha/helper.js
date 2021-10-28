import { KYBER_PROXY } from '@xtoken/abis'
import { getContract, getTokenSymbol } from '../utils'
export const getXAlphaContracts = async (symbol, provider) => {
  const network = await provider.getNetwork()
  const xalphaContract = getContract(symbol, provider, network)
  const kyberProxyContract = getContract(KYBER_PROXY, provider, network)
  const tokenContract = getContract(getTokenSymbol(symbol), provider, network)
  if (!xalphaContract) {
    console.log('no xalphaContract')
  }
  if (!kyberProxyContract) {
    console.log('no kyberProxyContract')
  }
  if (!tokenContract) {
    console.log('no tokenContract')
  }
  if (!xalphaContract || !kyberProxyContract || !tokenContract) {
    // console.log('hello world')
    return Promise.reject(new Error('Contract missing'))
  }
  return {
    kyberProxyContract,
    network,
    tokenContract,
    xalphaContract,
  }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veGFscGhhL2hlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sY0FBYyxDQUFBO0FBSTFDLE9BQU8sRUFBRSxXQUFXLEVBQUUsY0FBYyxFQUFFLE1BQU0sVUFBVSxDQUFBO0FBRXRELE1BQU0sQ0FBQyxNQUFNLGtCQUFrQixHQUFHLEtBQUssRUFDckMsTUFBcUIsRUFDckIsUUFBc0IsRUFDdEIsRUFBRTtJQUNGLE1BQU0sT0FBTyxHQUFHLE1BQU0sUUFBUSxDQUFDLFVBQVUsRUFBRSxDQUFBO0lBRTNDLE1BQU0sY0FBYyxHQUFHLFdBQVcsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBVyxDQUFBO0lBQ3ZFLE1BQU0sa0JBQWtCLEdBQUcsV0FBVyxDQUNwQyxXQUFXLEVBQ1gsUUFBUSxFQUNSLE9BQU8sQ0FDTSxDQUFBO0lBRWYsTUFBTSxhQUFhLEdBQUcsV0FBVyxDQUMvQixjQUFjLENBQUMsTUFBTSxDQUFDLEVBQ3RCLFFBQVEsRUFDUixPQUFPLENBQ0ksQ0FBQTtJQUViLElBQUksQ0FBQyxjQUFjLEVBQUU7UUFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFBO0tBQ2pDO0lBRUQsSUFBSSxDQUFDLGtCQUFrQixFQUFFO1FBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQTtLQUNyQztJQUVELElBQUksQ0FBQyxhQUFhLEVBQUU7UUFDbEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFBO0tBQ2hDO0lBRUQsSUFBSSxDQUFDLGNBQWMsSUFBSSxDQUFDLGtCQUFrQixJQUFJLENBQUMsYUFBYSxFQUFFO1FBQzVELDZCQUE2QjtRQUM3QixPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFBO0tBQ3JEO0lBRUQsT0FBTztRQUNMLGtCQUFrQjtRQUNsQixPQUFPO1FBQ1AsYUFBYTtRQUNiLGNBQWM7S0FDZixDQUFBO0FBQ0gsQ0FBQyxDQUFBIn0=
