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
 * const xinchContract = new ethers.Contract(ADDRESSES[X_INCH_A][chainId], Abi.xINCH, provider)
 *
 * const { priceEth, priceUsd } = await getXInchPrices(xinchContract)
 * ```
 *
 * @param {XINCH} xinchContract xINCHa/xINCHb token contract
 * @returns A promise of the token prices in ETH/USD along with AUM
 */
export const getXInchPrices = async (xinchContract) => {
  try {
    const { provider } = xinchContract
    const { chainId } = await provider.getNetwork()
    const inchAddress = ADDRESSES[INCH][chainId]
    const [
      xinchTotalSupply,
      inchHoldings,
      inchEthPrice,
      ethUsdcPrice,
    ] = await Promise.all([
      xinchContract.totalSupply(),
      xinchContract.getNav(),
      getEthTokenPrice(inchAddress, true, provider),
      getEthUsdcPrice(provider),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpY2VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veGluY2gvcHJpY2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLE1BQU0sY0FBYyxDQUFBO0FBQzlDLE9BQU8sRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLE1BQU0sa0JBQWtCLENBQUE7QUFFMUQsT0FBTyxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQTtBQUd4RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sYUFBYSxDQUFBO0FBQzFDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxlQUFlLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQTtBQUV4RTs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFDSCxNQUFNLENBQUMsTUFBTSxjQUFjLEdBQUcsS0FBSyxFQUNqQyxhQUFvQixFQUNHLEVBQUU7SUFDekIsSUFBSTtRQUNGLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxhQUFhLENBQUE7UUFDbEMsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLE1BQU0sUUFBUSxDQUFDLFVBQVUsRUFBRSxDQUFBO1FBQy9DLE1BQU0sV0FBVyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUU1QyxNQUFNLENBQ0osZ0JBQWdCLEVBQ2hCLFlBQVksRUFDWixZQUFZLEVBQ1osWUFBWSxFQUNiLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDO1lBQ3BCLGFBQWEsQ0FBQyxXQUFXLEVBQUU7WUFDM0IsYUFBYSxDQUFDLE1BQU0sRUFBRTtZQUN0QixnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsSUFBSSxFQUFFLFFBQXdCLENBQUM7WUFDN0QsZUFBZSxDQUFDLFFBQXdCLENBQUM7U0FDMUMsQ0FBQyxDQUFBO1FBRUYsTUFBTSxZQUFZLEdBQUcsVUFBVSxDQUFDLFlBQVksQ0FBQzthQUMxQyxHQUFHLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQzdCLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUNkLE1BQU0sWUFBWSxHQUFHLFlBQVksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUE7UUFDbkUsTUFBTSxRQUFRLEdBQUcsWUFBWSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDM0QsTUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUE7UUFDbkUsTUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUV0RCxPQUFPO1lBQ0wsR0FBRyxFQUFFLFlBQVksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3RDLFFBQVEsRUFBRSxZQUFZLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNoRCxRQUFRLEVBQUUsWUFBWSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUM5QyxDQUFBO0tBQ0Y7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLE9BQU8sQ0FBQyxLQUFLLENBQUMsbUNBQW1DLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDckQsT0FBTyxjQUFjLENBQUE7S0FDdEI7QUFDSCxDQUFDLENBQUEifQ==
