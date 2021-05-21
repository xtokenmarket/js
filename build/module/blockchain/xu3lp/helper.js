import { KYBER_PROXY } from '@xtoken/abis'
import { getContract, getLPTokenSymbol } from '../utils'
export const getXU3LPContracts = async (symbol, provider) => {
  const network = await provider.getNetwork()
  const xu3lpContract = getContract(symbol, provider, network)
  const kyberProxyContract = getContract(KYBER_PROXY, provider, network)
  const token0Contract = getContract(
    getLPTokenSymbol(symbol)[0],
    provider,
    network
  )
  const token1Contract = getContract(
    getLPTokenSymbol(symbol)[1],
    provider,
    network
  )
  if (
    !xu3lpContract ||
    !kyberProxyContract ||
    !token0Contract ||
    !token1Contract
  ) {
    return Promise.reject(new Error('Unknown error'))
  }
  return {
    kyberProxyContract,
    network,
    token0Contract,
    token1Contract,
    xu3lpContract,
  }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veHUzbHAvaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxjQUFjLENBQUE7QUFJMUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUV4RCxNQUFNLENBQUMsTUFBTSxpQkFBaUIsR0FBRyxLQUFLLEVBQ3BDLE1BQXVCLEVBQ3ZCLFFBQXNCLEVBQ3RCLEVBQUU7SUFDRixNQUFNLE9BQU8sR0FBRyxNQUFNLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQTtJQUUzQyxNQUFNLGFBQWEsR0FBRyxXQUFXLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQVUsQ0FBQTtJQUNyRSxNQUFNLGtCQUFrQixHQUFHLFdBQVcsQ0FDcEMsV0FBVyxFQUNYLFFBQVEsRUFDUixPQUFPLENBQ00sQ0FBQTtJQUNmLE1BQU0sY0FBYyxHQUFHLFdBQVcsQ0FDaEMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQzNCLFFBQVEsRUFDUixPQUFPLENBQ0ksQ0FBQTtJQUNiLE1BQU0sY0FBYyxHQUFHLFdBQVcsQ0FDaEMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQzNCLFFBQVEsRUFDUixPQUFPLENBQ0ksQ0FBQTtJQUViLElBQ0UsQ0FBQyxhQUFhO1FBQ2QsQ0FBQyxrQkFBa0I7UUFDbkIsQ0FBQyxjQUFjO1FBQ2YsQ0FBQyxjQUFjLEVBQ2Y7UUFDQSxPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQTtLQUNsRDtJQUVELE9BQU87UUFDTCxrQkFBa0I7UUFDbEIsT0FBTztRQUNQLGNBQWM7UUFDZCxjQUFjO1FBQ2QsYUFBYTtLQUNkLENBQUE7QUFDSCxDQUFDLENBQUEifQ==
