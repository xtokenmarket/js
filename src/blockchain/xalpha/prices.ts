import { BaseProvider } from '@ethersproject/providers'
import { formatEther, parseEther } from 'ethers/lib/utils'

import { DEC_18, DEFAULT_PRICES } from '../../constants'
import { KyberProxy, XALPHA } from '../../types'
import { ITokenPrices } from '../../types/xToken'
import { formatNumber } from '../../utils'
import { getAlphaEthPrice } from '../exchanges/uniswap'
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

export const getXAlphaPrices = async (
  xalphaContract: XALPHA,
  kyberProxyContract: KyberProxy
): Promise<ITokenPrices> => {
  try {
    const [
      xalphaTotalSupply,
      xalphaAlphaBal,
      alphaEthPrice,
      ethUsdcPrice,
    ] = await Promise.all([
      xalphaContract.totalSupply(),
      xalphaContract.getNav(),
      getAlphaEthPrice(kyberProxyContract.provider as BaseProvider),
      getEthUsdcPrice(kyberProxyContract.provider as BaseProvider),
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
