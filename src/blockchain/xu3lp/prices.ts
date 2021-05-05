import { BaseProvider } from '@ethersproject/providers'
import { BigNumberish } from 'ethers'
import { formatEther, parseEther } from 'ethers/lib/utils'

import { DEC_18, DEFAULT_PRICES } from '../../constants'
import { KyberProxy, XU3LP } from '../../types'
import { ITokenPrices } from '../../types/xToken'
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
export const getXU3LPPrices = async (
  xu3lpContract: XU3LP,
  kyberProxyContract: KyberProxy
): Promise<ITokenPrices> => {
  try {
    const [
      token0Price,
      token1Price,
      stakedTokenBalances,
      bufferTokenBalances,
      xu3lpTotalSupply,
      ethUsdcPrice,
    ] = await Promise.all([
      xu3lpContract.getAsset0Price(),
      xu3lpContract.getAsset1Price(),
      xu3lpContract.getStakedTokenBalance(),
      xu3lpContract.getBufferTokenBalance(),
      xu3lpContract.totalSupply(),
      getEthUsdcPrice(kyberProxyContract.provider as BaseProvider),
    ])

    const token0Balance = stakedTokenBalances.amount0.add(
      bufferTokenBalances.amount0
    )
    const token1Balance = stakedTokenBalances.amount1.add(
      bufferTokenBalances.amount1
    )

    const token0PriceTWAP = getTWAP(token0Price)
    const token1PriceTWAP = getTWAP(token1Price)

    const token0Value = token0Balance.mul(
      parseEther(token0PriceTWAP.toString())
    )
    const token1Value = token1Balance.mul(
      parseEther(token1PriceTWAP.toString())
    )

    const aum = token0Value.add(token1Value).div(DEC_18)
    const priceUsd = aum.mul(DEC_18).div(xu3lpTotalSupply as BigNumberish)
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
