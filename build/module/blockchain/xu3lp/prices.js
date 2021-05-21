import { formatEther, parseEther } from 'ethers/lib/utils'
import { DEC_18, DEFAULT_PRICES, DEFAULT_TOKEN_PRICES } from '../../constants'
import { formatNumber, getTWAP } from '../../utils'
import { getEthUsdcPrice } from '../exchanges/uniswap'
/**
 * @example
 * ```typescript
 * import { ethers } from 'ethers'
 * import { Abi, ADDRESSES, KYBER_PROXY, X_U3LP_A } from '@xtoken/abis'
 * import { getXU3LPPrices } from '@xtoken/js'
 *
 * const provider = new ethers.providers.InfuraProvider('homestead', <INFURA_API_KEY>)
 *
 * const xu3lpContract = new ethers.Contract(ADDRESSES[X_U3LP_A][chainId], Abi.xU3LP, provider)
 * const kyberProxyContract = new ethers.Contract(ADDRESSES[KYBER_PROXY][chainId], Abi.KyberProxy, provider)
 *
 * const { priceEth, priceUsd } = await getXU3LPPrices(
 *   xu3lpContract,
 *   kyberProxyContract,
 * )
 * ```
 *
 * @param {XU3LP} xu3lpContract xU3LPa token contract
 * @param {KyberProxy} kyberProxyContract Kyber Proxy contract
 * @returns A promise of the token prices in ETH/USD along with AUM
 */
export const getXU3LPPrices = async (xu3lpContract, kyberProxyContract) => {
  try {
    const [
      { token0Price, token1Price },
      stakedTokenBalances,
      bufferTokenBalances,
      xu3lpTotalSupply,
      ethUsdcPrice,
    ] = await Promise.all([
      getXU3LPTokenPrices(xu3lpContract),
      xu3lpContract.getStakedTokenBalance(),
      xu3lpContract.getBufferTokenBalance(),
      xu3lpContract.totalSupply(),
      getEthUsdcPrice(kyberProxyContract.provider),
    ])
    const token0Balance = stakedTokenBalances.amount0.add(
      bufferTokenBalances.amount0
    )
    const token1Balance = stakedTokenBalances.amount1.add(
      bufferTokenBalances.amount1
    )
    const token0Value = token0Balance.mul(token0Price)
    const token1Value = token1Balance.mul(token1Price)
    const aum = token0Value.add(token1Value).div(DEC_18)
    const priceUsd = aum.mul(DEC_18).div(xu3lpTotalSupply)
    const priceEth = priceUsd.mul(DEC_18).div(parseEther(ethUsdcPrice))
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
export const getXU3LPTokenPrices = async (xu3lpContract) => {
  try {
    const [token0PriceRaw, token1PriceRaw] = await Promise.all([
      xu3lpContract.getAsset0Price(),
      xu3lpContract.getAsset1Price(),
    ])
    const token0Price = getTWAP(token0PriceRaw)
    const token1Price = getTWAP(token1PriceRaw)
    return {
      token0Price,
      token1Price,
    }
  } catch (e) {
    console.error('Error while fetching token price:', e)
    return DEFAULT_TOKEN_PRICES
  }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpY2VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veHUzbHAvcHJpY2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU8sRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLE1BQU0sa0JBQWtCLENBQUE7QUFFMUQsT0FBTyxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQTtBQUc5RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE9BQU8sRUFBRSxNQUFNLGFBQWEsQ0FBQTtBQUNuRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0JBQXNCLENBQUE7QUFFdEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFCRztBQUNILE1BQU0sQ0FBQyxNQUFNLGNBQWMsR0FBRyxLQUFLLEVBQ2pDLGFBQW9CLEVBQ3BCLGtCQUE4QixFQUNQLEVBQUU7SUFDekIsSUFBSTtRQUNGLE1BQU0sQ0FDSixFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsRUFDNUIsbUJBQW1CLEVBQ25CLG1CQUFtQixFQUNuQixnQkFBZ0IsRUFDaEIsWUFBWSxFQUNiLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDO1lBQ3BCLG1CQUFtQixDQUFDLGFBQWEsQ0FBQztZQUNsQyxhQUFhLENBQUMscUJBQXFCLEVBQUU7WUFDckMsYUFBYSxDQUFDLHFCQUFxQixFQUFFO1lBQ3JDLGFBQWEsQ0FBQyxXQUFXLEVBQUU7WUFDM0IsZUFBZSxDQUFDLGtCQUFrQixDQUFDLFFBQXdCLENBQUM7U0FDN0QsQ0FBQyxDQUFBO1FBRUYsTUFBTSxhQUFhLEdBQUcsbUJBQW1CLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FDbkQsbUJBQW1CLENBQUMsT0FBTyxDQUM1QixDQUFBO1FBQ0QsTUFBTSxhQUFhLEdBQUcsbUJBQW1CLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FDbkQsbUJBQW1CLENBQUMsT0FBTyxDQUM1QixDQUFBO1FBRUQsTUFBTSxXQUFXLEdBQUcsYUFBYSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQTtRQUNsRCxNQUFNLFdBQVcsR0FBRyxhQUFhLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFBO1FBRWxELE1BQU0sR0FBRyxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQ3BELE1BQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLGdCQUFnQyxDQUFDLENBQUE7UUFDdEUsTUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUE7UUFFbkUsT0FBTztZQUNMLEdBQUcsRUFBRSxZQUFZLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN0QyxRQUFRLEVBQUUsWUFBWSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDaEQsUUFBUSxFQUFFLFlBQVksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDOUMsQ0FBQTtLQUNGO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDVixPQUFPLENBQUMsS0FBSyxDQUFDLG1DQUFtQyxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQ3JELE9BQU8sY0FBYyxDQUFBO0tBQ3RCO0FBQ0gsQ0FBQyxDQUFBO0FBRUQsTUFBTSxDQUFDLE1BQU0sbUJBQW1CLEdBQUcsS0FBSyxFQUN0QyxhQUFvQixFQUluQixFQUFFO0lBQ0gsSUFBSTtRQUNGLE1BQU0sQ0FBQyxjQUFjLEVBQUUsY0FBYyxDQUFDLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDO1lBQ3pELGFBQWEsQ0FBQyxjQUFjLEVBQUU7WUFDOUIsYUFBYSxDQUFDLGNBQWMsRUFBRTtTQUMvQixDQUFDLENBQUE7UUFFRixNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUE7UUFDM0MsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFBO1FBRTNDLE9BQU87WUFDTCxXQUFXO1lBQ1gsV0FBVztTQUNaLENBQUE7S0FDRjtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsT0FBTyxDQUFDLEtBQUssQ0FBQyxtQ0FBbUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUNyRCxPQUFPLG9CQUFvQixDQUFBO0tBQzVCO0FBQ0gsQ0FBQyxDQUFBIn0=
