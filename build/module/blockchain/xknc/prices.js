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
 * @param {Contract} kncContract KNC token contract
 * @param {KyberProxy} kyberProxyContract Kyber Proxy contract
 * @returns A promise of the token prices in ETH/USD along with AUM
 */
export const getXKncPrices = async (
  xkncContract,
  kncContract,
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
        kncContract.address,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpY2VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veGtuYy9wcmljZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsTUFBTSxjQUFjLENBQUE7QUFFN0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQTtBQUUxRCxPQUFPLEVBQUUsTUFBTSxFQUFFLGNBQWMsRUFBRSxNQUFNLGlCQUFpQixDQUFBO0FBR3hELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxhQUFhLENBQUE7QUFDMUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFBO0FBQ3RELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxVQUFVLENBQUE7QUFFMUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdCRztBQUNILE1BQU0sQ0FBQyxNQUFNLGFBQWEsR0FBRyxLQUFLLEVBQ2hDLFlBQWtCLEVBQ2xCLFdBQXFCLEVBQ3JCLGtCQUE4QixFQUNQLEVBQUU7SUFDekIsSUFBSTtRQUNGLE1BQU0sVUFBVSxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNsQyxNQUFNLFVBQVUsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFXLENBQUE7UUFFM0MsTUFBTSxDQUNKLGVBQWUsRUFDZixVQUFVLEVBQ1YsV0FBVyxFQUNYLFlBQVksRUFDYixHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQztZQUNwQixZQUFZLENBQUMsV0FBVyxFQUFFO1lBQzFCLFlBQVksQ0FBQyxxQkFBcUIsRUFBRTtZQUNwQyxlQUFlLENBQ2Isa0JBQWtCLEVBQ2xCLFdBQVcsQ0FBQyxPQUFPLEVBQ25CLFVBQVUsRUFDVixVQUFVLENBQ1g7WUFDRCxlQUFlLENBQUMsa0JBQWtCLENBQUMsUUFBd0IsQ0FBQztTQUM3RCxDQUFDLENBQUE7UUFFRixNQUFNLFlBQVksR0FBRyxXQUFXLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUMxRSxNQUFNLFFBQVEsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQTtRQUNsRSxNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQTtRQUNuRSxNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUVyRCxPQUFPO1lBQ0wsUUFBUSxFQUFFLFlBQVksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDN0MsUUFBUSxFQUFFLFlBQVksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2hELEdBQUcsRUFBRSxZQUFZLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUN2QyxDQUFBO0tBQ0Y7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLE9BQU8sQ0FBQyxLQUFLLENBQUMsbUNBQW1DLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDckQsT0FBTyxjQUFjLENBQUE7S0FDdEI7QUFDSCxDQUFDLENBQUEifQ==
