import { ADDRESSES, ETH, KNC, KYBER_PROXY } from '@xtoken/abis'
import { formatEther, parseEther } from 'ethers/lib/utils'
import { DEC_18, DEFAULT_PRICES } from '../../constants'
import { formatNumber } from '../../utils'
import { getEthUsdcPrice } from '../exchanges/uniswap'
import { getContract, getExpectedRate } from '../utils'
/**
 * @example
 * ```typescript
 * import { ethers } from 'ethers'
 * import { Abi, ADDRESSES, X_KNC_A } from '@xtoken/abis'
 * import { getXKncPrices } from '@xtoken/js'
 *
 * const provider = new ethers.providers.InfuraProvider('homestead', <INFURA_API_KEY>)
 * const xkncContract = new ethers.Contract(ADDRESSES[X_KNC_A][chainId], Abi.xKNC, provider)
 *
 * const { priceEth, priceUsd } = await getXKncPrices(xkncContract)
 * ```
 *
 * @param {XKNC} xkncContract xKNCa/xKNCb token contract
 * @returns A promise of the token prices in ETH/USD along with AUM
 */
export const getXKncPrices = async (xkncContract) => {
  try {
    const { provider } = xkncContract
    const network = await provider.getNetwork()
    const { chainId } = network
    const proxyValue = parseEther('1')
    const ethAddress = ADDRESSES[ETH]
    const kncAddress = ADDRESSES[KNC][chainId]
    const kyberProxyContract = getContract(KYBER_PROXY, provider, network)
    const [
      xkncTotalSupply,
      xkncKncBal,
      kncEthPrice,
      ethUsdcPrice,
    ] = await Promise.all([
      xkncContract.totalSupply(),
      xkncContract.getFundKncBalanceTwei(),
      getExpectedRate(kyberProxyContract, kncAddress, ethAddress, proxyValue),
      getEthUsdcPrice(provider),
    ])
    const kncUsdcPrice = kncEthPrice.mul(parseEther(ethUsdcPrice)).div(DEC_18)
    const priceUsd = xkncKncBal.mul(kncUsdcPrice).div(xkncTotalSupply)
    const priceEth = priceUsd.mul(DEC_18).div(parseEther(ethUsdcPrice))
    const aum = priceUsd.mul(xkncTotalSupply).div(DEC_18)
    return {
      priceUsd: formatNumber(formatEther(priceUsd)),
      priceEth: formatNumber(formatEther(priceEth), 6),
      aum: formatNumber(formatEther(aum), 0),
    }
  } catch (e) {
    console.error('Error while fetching token price:', e)
    return DEFAULT_PRICES
  }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpY2VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veGtuYy9wcmljZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLFdBQVcsRUFBRSxNQUFNLGNBQWMsQ0FBQTtBQUMvRCxPQUFPLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxNQUFNLGtCQUFrQixDQUFBO0FBRTFELE9BQU8sRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUFFLE1BQU0saUJBQWlCLENBQUE7QUFHeEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGFBQWEsQ0FBQTtBQUMxQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0JBQXNCLENBQUE7QUFDdEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxlQUFlLEVBQUUsTUFBTSxVQUFVLENBQUE7QUFFdkQ7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sYUFBYSxHQUFHLEtBQUssRUFDaEMsWUFBa0IsRUFDSyxFQUFFO0lBQ3pCLElBQUk7UUFDRixNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsWUFBWSxDQUFBO1FBQ2pDLE1BQU0sT0FBTyxHQUFHLE1BQU0sUUFBUSxDQUFDLFVBQVUsRUFBRSxDQUFBO1FBQzNDLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxPQUFPLENBQUE7UUFFM0IsTUFBTSxVQUFVLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ2xDLE1BQU0sVUFBVSxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQVcsQ0FBQTtRQUMzQyxNQUFNLFVBQVUsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUE7UUFFMUMsTUFBTSxrQkFBa0IsR0FBRyxXQUFXLENBQ3BDLFdBQVcsRUFDWCxRQUF3QixFQUN4QixPQUFPLENBQ00sQ0FBQTtRQUVmLE1BQU0sQ0FDSixlQUFlLEVBQ2YsVUFBVSxFQUNWLFdBQVcsRUFDWCxZQUFZLEVBQ2IsR0FBRyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUM7WUFDcEIsWUFBWSxDQUFDLFdBQVcsRUFBRTtZQUMxQixZQUFZLENBQUMscUJBQXFCLEVBQUU7WUFDcEMsZUFBZSxDQUFDLGtCQUFrQixFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDO1lBQ3ZFLGVBQWUsQ0FBQyxRQUF3QixDQUFDO1NBQzFDLENBQUMsQ0FBQTtRQUVGLE1BQU0sWUFBWSxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQzFFLE1BQU0sUUFBUSxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFBO1FBQ2xFLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFBO1FBQ25FLE1BQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBRXJELE9BQU87WUFDTCxRQUFRLEVBQUUsWUFBWSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUM3QyxRQUFRLEVBQUUsWUFBWSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDaEQsR0FBRyxFQUFFLFlBQVksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ3ZDLENBQUE7S0FDRjtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsT0FBTyxDQUFDLEtBQUssQ0FBQyxtQ0FBbUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUNyRCxPQUFPLGNBQWMsQ0FBQTtLQUN0QjtBQUNILENBQUMsQ0FBQSJ9
