import {
  AAVE_X_AAVE_A_CLR,
  BNT_X_BNT_A_CLR,
  INCH_X_INCH_A_CLR,
  INCH_X_INCH_B_CLR,
  X_AAVE_B_AAVE_CLR,
  X_ALPHA_A_ALPHA_CLR,
  X_KNC_A_KNC_CLR,
  X_KNC_B_KNC_CLR,
  X_SNX_A_SNX_CLR,
  XTK_ETH_CLR,
} from '@xtoken/abis'
import { BigNumber } from 'ethers'
import { formatEther, parseEther } from 'ethers/lib/utils'
import { DEC_18, DEFAULT_PRICES, DEFAULT_TOKEN_PRICES } from '../../constants'
import { formatNumber, getTWAP } from '../../utils'
import { getEthUsdcPrice } from '../exchanges/uniswap'
import { getXAssetCLRTokenSymbol, getXAssetPrices } from '../utils'
/**
 * @example
 * ```typescript
 * import { ethers } from 'ethers'
 * import { Abi, ADDRESSES, KYBER_PROXY, AAVE_X_AAVE_A_CLR } from '@xtoken/abis'
 * import { getXAssetCLRPrices } from '@xtoken/js'
 *
 * const provider = new ethers.providers.InfuraProvider('homestead', <INFURA_API_KEY>)
 *
 * const xAssetCLRContract = new ethers.Contract(ADDRESSES[AAVE_X_AAVE_A_CLR][chainId], Abi.xAssetCLR, provider)
 * const kyberProxyContract = new ethers.Contract(ADDRESSES[KYBER_PROXY][chainId], Abi.KyberProxy, provider)
 *
 * const { priceEth, priceUsd } = await getXAssetCLRPrices(
 *   xAssetCLRContract,
 *   kyberProxyContract,
 * )
 * ```
 *
 * @param {XAssetCLR} xAssetCLRContract xAssetCLR token contract
 * @param {KyberProxy} kyberProxyContract Kyber Proxy contract
 * @returns A promise of the token prices in ETH/USD along with AUM
 */
export const getXAssetCLRPrices = async (
  xAssetCLRContract,
  kyberProxyContract
) => {
  try {
    const [
      symbol,
      { token0Price, token1Price },
      stakedTokenBalances,
      bufferTokenBalances,
      xAssetCLRTotalSupply,
      ethUsdcPrice,
    ] = await Promise.all([
      xAssetCLRContract.symbol(),
      getXAssetCLRTokenPrices(xAssetCLRContract),
      xAssetCLRContract.getStakedTokenBalance(),
      xAssetCLRContract.getBufferTokenBalance(),
      xAssetCLRContract.totalSupply(),
      getEthUsdcPrice(kyberProxyContract.provider),
    ])
    const assets = getXAssetCLRTokenSymbol(symbol)
    const token0Balance = stakedTokenBalances.amount0.add(
      bufferTokenBalances.amount0
    )
    const token1Balance = stakedTokenBalances.amount1.add(
      bufferTokenBalances.amount1
    )
    let isToken0 = true
    let aum = BigNumber.from('0')
    switch (symbol) {
      case X_AAVE_B_AAVE_CLR:
      case X_KNC_A_KNC_CLR:
      case X_KNC_B_KNC_CLR:
      case X_SNX_A_SNX_CLR:
        aum = token1Balance.mul(token1Price).div(DEC_18).add(token0Balance)
        break
      case AAVE_X_AAVE_A_CLR:
      case X_ALPHA_A_ALPHA_CLR:
      case BNT_X_BNT_A_CLR:
      case INCH_X_INCH_A_CLR:
      case INCH_X_INCH_B_CLR:
      case XTK_ETH_CLR:
        isToken0 = false
        aum = token0Balance.mul(token0Price).div(DEC_18).add(token1Balance)
        break
    }
    let priceEth
    let priceUsd
    if (symbol === XTK_ETH_CLR) {
      priceEth = aum.mul(DEC_18).div(xAssetCLRTotalSupply)
      priceUsd = priceEth.mul(parseEther(ethUsdcPrice)).div(DEC_18)
      // Convert AUM to USD from ETH
      aum = aum.mul(parseEther(ethUsdcPrice))
    } else {
      const { priceUsd: xAssetPriceUsd } = await getXAssetPrices(
        isToken0 ? assets[0] : assets[1],
        kyberProxyContract.provider
      )
      aum = aum.mul(parseEther(xAssetPriceUsd.toString()))
      priceUsd = aum.div(xAssetCLRTotalSupply)
      priceEth = priceUsd.mul(DEC_18).div(parseEther(ethUsdcPrice))
    }
    return {
      aum: formatNumber(formatEther(aum.div(DEC_18))),
      priceBtc: 0,
      priceEth: formatNumber(formatEther(priceEth), 6),
      priceUsd: formatNumber(formatEther(priceUsd)),
    }
  } catch (e) {
    console.error('Error while fetching token price:', e)
    return DEFAULT_PRICES
  }
}
export const getXAssetCLRTokenPrices = async (XAssetCLR) => {
  try {
    const [asset0Price, asset1Price] = await Promise.all([
      XAssetCLR.getAsset0Price(),
      XAssetCLR.getAsset1Price(),
    ])
    const token0Price = getTWAP(asset0Price)
    const token1Price = getTWAP(asset1Price)
    return {
      token0Price,
      token1Price,
    }
  } catch (e) {
    console.error('Error while fetching token price:', e)
    return DEFAULT_TOKEN_PRICES
  }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpY2VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4vY2xyL3ByaWNlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQ0wsaUJBQWlCLEVBQ2pCLGVBQWUsRUFDZixpQkFBaUIsRUFDakIsaUJBQWlCLEVBQ2pCLGlCQUFpQixFQUNqQixtQkFBbUIsRUFDbkIsZUFBZSxFQUNmLGVBQWUsRUFDZixlQUFlLEVBQ2YsV0FBVyxHQUNaLE1BQU0sY0FBYyxDQUFBO0FBQ3JCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxRQUFRLENBQUE7QUFDbEMsT0FBTyxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQTtBQUUxRCxPQUFPLEVBQUUsTUFBTSxFQUFFLGNBQWMsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGlCQUFpQixDQUFBO0FBRzlFLE9BQU8sRUFBRSxZQUFZLEVBQUUsT0FBTyxFQUFFLE1BQU0sYUFBYSxDQUFBO0FBQ25ELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQTtBQUN0RCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsZUFBZSxFQUFFLE1BQU0sVUFBVSxDQUFBO0FBRW5FOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFDSCxNQUFNLENBQUMsTUFBTSxrQkFBa0IsR0FBRyxLQUFLLEVBQ3JDLGlCQUE0QixFQUM1QixrQkFBOEIsRUFDUCxFQUFFO0lBQ3pCLElBQUk7UUFDRixNQUFNLENBQ0osTUFBTSxFQUNOLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxFQUM1QixtQkFBbUIsRUFDbkIsbUJBQW1CLEVBQ25CLG9CQUFvQixFQUNwQixZQUFZLEVBQ2IsR0FBRyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUM7WUFDcEIsaUJBQWlCLENBQUMsTUFBTSxFQUFFO1lBQzFCLHVCQUF1QixDQUFDLGlCQUFpQixDQUFDO1lBQzFDLGlCQUFpQixDQUFDLHFCQUFxQixFQUFFO1lBQ3pDLGlCQUFpQixDQUFDLHFCQUFxQixFQUFFO1lBQ3pDLGlCQUFpQixDQUFDLFdBQVcsRUFBRTtZQUMvQixlQUFlLENBQUMsa0JBQWtCLENBQUMsUUFBd0IsQ0FBQztTQUM3RCxDQUFDLENBQUE7UUFFRixNQUFNLE1BQU0sR0FBRyx1QkFBdUIsQ0FBQyxNQUFvQixDQUFDLENBQUE7UUFFNUQsTUFBTSxhQUFhLEdBQUcsbUJBQW1CLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FDbkQsbUJBQW1CLENBQUMsT0FBTyxDQUM1QixDQUFBO1FBQ0QsTUFBTSxhQUFhLEdBQUcsbUJBQW1CLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FDbkQsbUJBQW1CLENBQUMsT0FBTyxDQUM1QixDQUFBO1FBRUQsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFBO1FBQ25CLElBQUksR0FBRyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7UUFFN0IsUUFBUSxNQUFNLEVBQUU7WUFDZCxLQUFLLGlCQUFpQixDQUFDO1lBQ3ZCLEtBQUssZUFBZSxDQUFDO1lBQ3JCLEtBQUssZUFBZSxDQUFDO1lBQ3JCLEtBQUssZUFBZTtnQkFDbEIsR0FBRyxHQUFHLGFBQWEsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQTtnQkFDbkUsTUFBSztZQUVQLEtBQUssaUJBQWlCLENBQUM7WUFDdkIsS0FBSyxtQkFBbUIsQ0FBQztZQUN6QixLQUFLLGVBQWUsQ0FBQztZQUNyQixLQUFLLGlCQUFpQixDQUFDO1lBQ3ZCLEtBQUssaUJBQWlCLENBQUM7WUFDdkIsS0FBSyxXQUFXO2dCQUNkLFFBQVEsR0FBRyxLQUFLLENBQUE7Z0JBQ2hCLEdBQUcsR0FBRyxhQUFhLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUE7Z0JBQ25FLE1BQUs7U0FDUjtRQUVELElBQUksUUFBUSxDQUFBO1FBQ1osSUFBSSxRQUFRLENBQUE7UUFFWixJQUFJLE1BQU0sS0FBSyxXQUFXLEVBQUU7WUFDMUIsUUFBUSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUE7WUFDcEQsUUFBUSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBRTdELDhCQUE4QjtZQUM5QixHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQTtTQUN4QzthQUFNO1lBQ0wsTUFBTSxFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUUsR0FBRyxNQUFNLGVBQWUsQ0FDeEQsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFrQixFQUNuRCxrQkFBa0IsQ0FBQyxRQUF3QixDQUM1QyxDQUFBO1lBRUQsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUE7WUFDcEQsUUFBUSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQTtZQUN4QyxRQUFRLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUE7U0FDOUQ7UUFFRCxPQUFPO1lBQ0wsR0FBRyxFQUFFLFlBQVksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQy9DLFFBQVEsRUFBRSxDQUFDO1lBQ1gsUUFBUSxFQUFFLFlBQVksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2hELFFBQVEsRUFBRSxZQUFZLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQzlDLENBQUE7S0FDRjtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsT0FBTyxDQUFDLEtBQUssQ0FBQyxtQ0FBbUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUNyRCxPQUFPLGNBQWMsQ0FBQTtLQUN0QjtBQUNILENBQUMsQ0FBQTtBQUVELE1BQU0sQ0FBQyxNQUFNLHVCQUF1QixHQUFHLEtBQUssRUFDMUMsU0FBb0IsRUFJbkIsRUFBRTtJQUNILElBQUk7UUFDRixNQUFNLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQztZQUNuRCxTQUFTLENBQUMsY0FBYyxFQUFFO1lBQzFCLFNBQVMsQ0FBQyxjQUFjLEVBQUU7U0FDM0IsQ0FBQyxDQUFBO1FBRUYsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFBO1FBQ3hDLE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQTtRQUV4QyxPQUFPO1lBQ0wsV0FBVztZQUNYLFdBQVc7U0FDWixDQUFBO0tBQ0Y7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLE9BQU8sQ0FBQyxLQUFLLENBQUMsbUNBQW1DLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDckQsT0FBTyxvQkFBb0IsQ0FBQTtLQUM1QjtBQUNILENBQUMsQ0FBQSJ9
