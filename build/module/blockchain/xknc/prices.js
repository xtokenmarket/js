import { ADDRESSES, ETH } from '@xtoken/abis'
import { formatEther, parseEther } from 'ethers/lib/utils'
import { DEC_18, DEFAULT_PRICES } from '../../constants'
import { formatNumber } from '../../utils'
import { getEthUsdcPrice } from '../exchanges/uniswap'
import { getExpectedRate } from '../utils'
/**
 * @example
 * ```typescript
 * import { ethers } from 'ethers'
 * import { Abi, ADDRESSES, KNC, KYBER_PROXY, X_KNC_A } from '@xtoken/abis'
 * import { getXKncPrices } from '@xtoken/js'
 *
 * const provider = new ethers.providers.InfuraProvider('homestead', <INFURA_API_KEY>)
 *
 * const xkncContract = new ethers.Contract(ADDRESSES[X_KNC_A][chainId], Abi.xKNC, provider)
 * const kncContract = new ethers.Contract(ADDRESSES[KNC][chainId], Abi.ERC20, provider)
 * const kyberProxyContract = new ethers.Contract(ADDRESSES[KYBER_PROXY][chainId], Abi.KyberProxy, provider)
 *
 * const { priceEth, priceUsd } = await getXKncPrices(
 *   xkncContract,
 *   kncContract,
 *   kyberProxyContract,
 * )
 * ```
 *
 * @param {XKNC} xkncContract xKNCa/xKNCb token contract
 * @param {Contract} _kncContract KNC token contract
 * @param {KyberProxy} kyberProxyContract Kyber Proxy contract
 * @returns A promise of the token prices in ETH/USD along with AUM
 */
export const getXKncPrices = async (
  xkncContract,
  _kncContract,
  kyberProxyContract
) => {
  try {
    const proxyValue = parseEther('1')
    const ethAddress = ADDRESSES[ETH]
    const [
      xkncTotalSupply,
      xkncKncBal,
      kncEthPrice,
      ethUsdcPrice,
    ] = await Promise.all([
      xkncContract.totalSupply(),
      xkncContract.getFundKncBalanceTwei(),
      getExpectedRate(
        kyberProxyContract,
        '0xdd974D5C2e2928deA5F71b9825b8b646686BD200', // old `KNC` address
        // kncContract.address, // TODO: Revert this to support Kyber V3 contract upgrades
        ethAddress,
        proxyValue
      ),
      getEthUsdcPrice(kyberProxyContract.provider),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpY2VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veGtuYy9wcmljZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsTUFBTSxjQUFjLENBQUE7QUFFN0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQTtBQUUxRCxPQUFPLEVBQUUsTUFBTSxFQUFFLGNBQWMsRUFBRSxNQUFNLGlCQUFpQixDQUFBO0FBR3hELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxhQUFhLENBQUE7QUFDMUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFBO0FBQ3RELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxVQUFVLENBQUE7QUFFMUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdCRztBQUNILE1BQU0sQ0FBQyxNQUFNLGFBQWEsR0FBRyxLQUFLLEVBQ2hDLFlBQWtCLEVBQ2xCLFlBQXNCLEVBQ3RCLGtCQUE4QixFQUNQLEVBQUU7SUFDekIsSUFBSTtRQUNGLE1BQU0sVUFBVSxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNsQyxNQUFNLFVBQVUsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFXLENBQUE7UUFFM0MsTUFBTSxDQUNKLGVBQWUsRUFDZixVQUFVLEVBQ1YsV0FBVyxFQUNYLFlBQVksRUFDYixHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQztZQUNwQixZQUFZLENBQUMsV0FBVyxFQUFFO1lBQzFCLFlBQVksQ0FBQyxxQkFBcUIsRUFBRTtZQUNwQyxlQUFlLENBQ2Isa0JBQWtCLEVBQ2xCLDRDQUE0QyxFQUFFLG9CQUFvQjtZQUNsRSxrRkFBa0Y7WUFDbEYsVUFBVSxFQUNWLFVBQVUsQ0FDWDtZQUNELGVBQWUsQ0FBQyxrQkFBa0IsQ0FBQyxRQUF3QixDQUFDO1NBQzdELENBQUMsQ0FBQTtRQUVGLE1BQU0sWUFBWSxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQzFFLE1BQU0sUUFBUSxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFBO1FBQ2xFLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFBO1FBQ25FLE1BQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBRXJELE9BQU87WUFDTCxRQUFRLEVBQUUsWUFBWSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUM3QyxRQUFRLEVBQUUsWUFBWSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDaEQsR0FBRyxFQUFFLFlBQVksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ3ZDLENBQUE7S0FDRjtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsT0FBTyxDQUFDLEtBQUssQ0FBQyxtQ0FBbUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUNyRCxPQUFPLGNBQWMsQ0FBQTtLQUN0QjtBQUNILENBQUMsQ0FBQSJ9
