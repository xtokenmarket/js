import { ADDRESSES, INCH } from '@xtoken/abis'
import { formatEther, parseEther } from 'ethers/lib/utils'
import { DEC_18, DEFAULT_PRICES } from '../../constants'
import { formatNumber } from '../../utils'
import { getEthTokenPrice, getEthUsdcPrice } from '../exchanges/uniswap'
/**
 * @example
 * ```typescript
 * import { ethers } from 'ethers'
 * import { Abi, ADDRESSES, INCH_LIQUIDITY_PROTOCOL, X_INCH_A } from '@xtoken/abis'
 * import { getXInchPrices } from '@xtoken/js'
 *
 * const provider = new ethers.providers.InfuraProvider('homestead', <INFURA_API_KEY>)
 * const network = await provider.getNetwork()
 * const { chainId } = network
 *
 * const xinchContract = new ethers.Contract(ADDRESSES[X_INCH_A][chainId], Abi.xINCH, provider)
 * const kyberProxyContract = new ethers.Contract(ADDRESSES[KYBER_PROXY][chainId], Abi.KyberProxy, provider)
 *
 * const { priceEth, priceUsd } = await getXInchPrices(
 *   xinchContract,
 *   kyberProxyContract,
 *   chainId
 * )
 * ```
 *
 * @param {XINCH} xinchContract xINCHa/xINCHb token contract
 * @param {KyberProxy} kyberProxyContract Kyber proxy contract
 * @param {number} chainId Connected network's ID, 1 for Mainnet
 * @returns A promise of the token prices in ETH/USD along with AUM
 */
export const getXInchPrices = async (
  xinchContract,
  kyberProxyContract,
  chainId
) => {
  try {
    const inchAddress = ADDRESSES[INCH][chainId]
    const [
      xinchTotalSupply,
      inchHoldings,
      inchEthPrice,
      ethUsdcPrice,
    ] = await Promise.all([
      xinchContract.totalSupply(),
      xinchContract.getNav(),
      getEthTokenPrice(inchAddress, true, kyberProxyContract.provider),
      getEthUsdcPrice(kyberProxyContract.provider),
    ])
    const inchUsdPrice = parseEther(inchEthPrice)
      .mul(parseEther(ethUsdcPrice))
      .div(DEC_18)
    const inchPerToken = inchHoldings.mul(DEC_18).div(xinchTotalSupply)
    const priceUsd = inchPerToken.mul(inchUsdPrice).div(DEC_18)
    const priceEth = priceUsd.mul(DEC_18).div(parseEther(ethUsdcPrice))
    const aum = priceUsd.mul(xinchTotalSupply).div(DEC_18)
    return {
      aum: formatNumber(formatEther(aum), 0),
      priceEth: formatNumber(formatEther(priceEth), 6),
      priceUsd: formatNumber(formatEther(priceUsd)),
    }
  } catch (e) {
    console.error('Error while fetching token price:', e)
    return DEFAULT_PRICES
  }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpY2VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veGluY2gvcHJpY2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLE1BQU0sY0FBYyxDQUFBO0FBQzlDLE9BQU8sRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLE1BQU0sa0JBQWtCLENBQUE7QUFFMUQsT0FBTyxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQTtBQUd4RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sYUFBYSxDQUFBO0FBQzFDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxlQUFlLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQTtBQUV4RTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCRztBQUNILE1BQU0sQ0FBQyxNQUFNLGNBQWMsR0FBRyxLQUFLLEVBQ2pDLGFBQW9CLEVBQ3BCLGtCQUE4QixFQUM5QixPQUFlLEVBQ1EsRUFBRTtJQUN6QixJQUFJO1FBQ0YsTUFBTSxXQUFXLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBRTVDLE1BQU0sQ0FDSixnQkFBZ0IsRUFDaEIsWUFBWSxFQUNaLFlBQVksRUFDWixZQUFZLEVBQ2IsR0FBRyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUM7WUFDcEIsYUFBYSxDQUFDLFdBQVcsRUFBRTtZQUMzQixhQUFhLENBQUMsTUFBTSxFQUFFO1lBQ3RCLGdCQUFnQixDQUNkLFdBQVcsRUFDWCxJQUFJLEVBQ0osa0JBQWtCLENBQUMsUUFBd0IsQ0FDNUM7WUFDRCxlQUFlLENBQUMsa0JBQWtCLENBQUMsUUFBd0IsQ0FBQztTQUM3RCxDQUFDLENBQUE7UUFFRixNQUFNLFlBQVksR0FBRyxVQUFVLENBQUMsWUFBWSxDQUFDO2FBQzFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDN0IsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQ2QsTUFBTSxZQUFZLEdBQUcsWUFBWSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtRQUNuRSxNQUFNLFFBQVEsR0FBRyxZQUFZLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUMzRCxNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQTtRQUNuRSxNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBRXRELE9BQU87WUFDTCxHQUFHLEVBQUUsWUFBWSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDdEMsUUFBUSxFQUFFLFlBQVksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2hELFFBQVEsRUFBRSxZQUFZLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQzlDLENBQUE7S0FDRjtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsT0FBTyxDQUFDLEtBQUssQ0FBQyxtQ0FBbUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUNyRCxPQUFPLGNBQWMsQ0FBQTtLQUN0QjtBQUNILENBQUMsQ0FBQSJ9
