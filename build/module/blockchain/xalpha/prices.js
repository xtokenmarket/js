import { ADDRESSES, ALPHA } from '@xtoken/abis'
import { formatEther, parseEther } from 'ethers/lib/utils'
import { DEC_18, DEFAULT_PRICES } from '../../constants'
import { formatNumber } from '../../utils'
import { getEthTokenPrice } from '../exchanges/uniswap'
import { getEthUsdcPrice } from '../exchanges/uniswap'
/**
 * @example
 * ```typescript
 * import { ethers } from 'ethers'
 * import { Abi, ADDRESSES, KYBER_PROXY, X_ALPHA_A } from '@xtoken/abis'
 * import { getXAlphaPrices } from '@xtoken/js'
 *
 * const provider = new ethers.providers.InfuraProvider('homestead', <INFURA_API_KEY>)
 * const network = await provider.getNetwork()
 * const { chainId } = network
 *
 * const xalphaContract = new ethers.Contract(ADDRESSES[X_ALPHA_A][chainId], Abi.xALPHA, provider)
 * const kyberProxyContract = new ethers.Contract(ADDRESSES[KYBER_PROXY][chainId], Abi.KyberProxy, provider)
 *
 * const { priceEth, priceUsd } = await getXAlphaPrices(
 *   xalphaContract,
 *   kyberProxyContract,
 * )
 * ```
 *
 * @param {XALPHA} xalphaContract xALPHAa token contract
 * @param {KyberProxy} kyberProxyContract Kyber Proxy contract
 * @returns A promise of the token prices in ETH/USD along with AUM
 */
export const getXAlphaPrices = async (xalphaContract, kyberProxyContract) => {
  try {
    const { chainId } = await kyberProxyContract.provider.getNetwork()
    const alphaAddress = ADDRESSES[ALPHA][chainId]
    const [
      xalphaTotalSupply,
      xalphaAlphaBal,
      alphaEthPrice,
      ethUsdcPrice,
    ] = await Promise.all([
      xalphaContract.totalSupply(),
      xalphaContract.getNav(),
      getEthTokenPrice(alphaAddress, true, kyberProxyContract.provider),
      getEthUsdcPrice(kyberProxyContract.provider),
    ])
    const alphaUsdPrice = parseEther(alphaEthPrice)
      .mul(parseEther(ethUsdcPrice))
      .div(DEC_18)
    const xalphaPerToken = xalphaAlphaBal.mul(DEC_18).div(xalphaTotalSupply)
    const priceUsd = xalphaPerToken.mul(alphaUsdPrice).div(DEC_18)
    const priceEth = priceUsd.mul(DEC_18).div(parseEther(ethUsdcPrice))
    const aum = priceUsd.mul(xalphaTotalSupply).div(DEC_18)
    return {
      aum: formatNumber(formatEther(aum), 0),
      priceEth: formatNumber(formatEther(priceEth), 6),
      priceUsd: formatNumber(formatEther(priceUsd)),
    }
  } catch (e) {
    console.error('Error fetching token price: ', e)
    return DEFAULT_PRICES
  }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpY2VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veGFscGhhL3ByaWNlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGNBQWMsQ0FBQTtBQUMvQyxPQUFPLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxNQUFNLGtCQUFrQixDQUFBO0FBRTFELE9BQU8sRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUFFLE1BQU0saUJBQWlCLENBQUE7QUFHeEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGFBQWEsQ0FBQTtBQUMxQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQTtBQUN2RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0JBQXNCLENBQUE7QUFFdEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJHO0FBRUgsTUFBTSxDQUFDLE1BQU0sZUFBZSxHQUFHLEtBQUssRUFDbEMsY0FBc0IsRUFDdEIsa0JBQThCLEVBQ1AsRUFBRTtJQUN6QixJQUFJO1FBQ0YsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLE1BQU0sa0JBQWtCLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxDQUFBO1FBQ2xFLE1BQU0sWUFBWSxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUU5QyxNQUFNLENBQ0osaUJBQWlCLEVBQ2pCLGNBQWMsRUFDZCxhQUFhLEVBQ2IsWUFBWSxFQUNiLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDO1lBQ3BCLGNBQWMsQ0FBQyxXQUFXLEVBQUU7WUFDNUIsY0FBYyxDQUFDLE1BQU0sRUFBRTtZQUN2QixnQkFBZ0IsQ0FDZCxZQUFZLEVBQ1osSUFBSSxFQUNKLGtCQUFrQixDQUFDLFFBQXdCLENBQzVDO1lBQ0QsZUFBZSxDQUFDLGtCQUFrQixDQUFDLFFBQXdCLENBQUM7U0FDN0QsQ0FBQyxDQUFBO1FBRUYsTUFBTSxhQUFhLEdBQUcsVUFBVSxDQUFDLGFBQWEsQ0FBQzthQUM1QyxHQUFHLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQzdCLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUNkLE1BQU0sY0FBYyxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUE7UUFDeEUsTUFBTSxRQUFRLEdBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDOUQsTUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUE7UUFDbkUsTUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUV2RCxPQUFPO1lBQ0wsR0FBRyxFQUFFLFlBQVksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3RDLFFBQVEsRUFBRSxZQUFZLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNoRCxRQUFRLEVBQUUsWUFBWSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUM5QyxDQUFBO0tBQ0Y7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLE9BQU8sQ0FBQyxLQUFLLENBQUMsOEJBQThCLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDaEQsT0FBTyxjQUFjLENBQUE7S0FDdEI7QUFDSCxDQUFDLENBQUEifQ==
