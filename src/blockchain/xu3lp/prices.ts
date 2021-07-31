import { BaseProvider } from '@ethersproject/providers'
import { USDC, X_U3LP_D, X_U3LP_E } from '@xtoken/abis'
import { BigNumber, BigNumberish } from 'ethers'
import { formatEther, parseEther } from 'ethers/lib/utils'

import { DEC_18, DEFAULT_PRICES, DEFAULT_TOKEN_PRICES } from '../../constants'
import { KyberProxy, XU3LP } from '../../types'
import { ILPTokenSymbols, ITokenPrices } from '../../types/xToken'
import { formatNumber, getTWAP } from '../../utils'
import { getBtcUsdcPrice, getEthUsdcPrice } from '../exchanges/uniswap'
import { getLPTokenSymbol } from '../utils'

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
      symbol,
      { token0Price, token1Price },
      stakedTokenBalances,
      bufferTokenBalances,
      xu3lpTotalSupply,
      ethUsdcPrice,
    ] = await Promise.all([
      xu3lpContract.symbol(),
      getXU3LPTokenPrices(xu3lpContract),
      xu3lpContract.getStakedTokenBalance(),
      xu3lpContract.getBufferTokenBalance(),
      xu3lpContract.totalSupply(),
      getEthUsdcPrice(kyberProxyContract.provider as BaseProvider),
    ])

    const assets = getLPTokenSymbol(symbol as ILPTokenSymbols)

    const token0Balance = stakedTokenBalances.amount0.add(
      bufferTokenBalances.amount0
    )
    const token1Balance = stakedTokenBalances.amount1.add(
      bufferTokenBalances.amount1
    )

    const token0Value = token0Balance.mul(
      assets[0] !== USDC ? token0Price : DEC_18
    )
    const token1Value = token1Balance.mul(
      assets[1] !== USDC ? token1Price : DEC_18
    )

    const aum = token0Value.add(token1Value)

    let priceBtc = BigNumber.from('0')
    let priceEth = BigNumber.from('0')
    let priceUsd

    if (symbol === X_U3LP_D) {
      priceEth = aum.div(xu3lpTotalSupply as BigNumberish)
      priceUsd = priceEth.mul(parseEther(ethUsdcPrice)).div(DEC_18)
    } else if (symbol === X_U3LP_E) {
      const btcUsdcPrice = await getBtcUsdcPrice(
        kyberProxyContract.provider as BaseProvider
      )
      priceBtc = aum.div(xu3lpTotalSupply as BigNumberish)
      priceUsd = priceBtc.mul(parseEther(btcUsdcPrice)).div(DEC_18)
    } else {
      priceUsd = aum.div(xu3lpTotalSupply as BigNumberish)
      priceEth = priceUsd.mul(DEC_18).div(parseEther(ethUsdcPrice))
    }

    return {
      aum: formatNumber(formatEther(aum.div(DEC_18))),
      priceBtc: priceBtc.isZero() ? 0 : formatNumber(formatEther(priceBtc), 6),
      priceEth: formatNumber(formatEther(priceEth), 6),
      priceUsd: formatNumber(formatEther(priceUsd)),
    }
  } catch (e) {
    console.error('Error while fetching token price:', e)
    return DEFAULT_PRICES
  }
}

export const getXU3LPTokenPrices = async (
  xu3lpContract: XU3LP
): Promise<{
  readonly token0Price: BigNumber
  readonly token1Price: BigNumber
}> => {
  try {
    const [asset0Price, asset1Price] = await Promise.all([
      xu3lpContract.getAsset0Price(),
      xu3lpContract.getAsset1Price(),
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
