import { BaseProvider } from '@ethersproject/providers'
import { ADDRESSES, ALPHA } from '@xtoken/abis'
import { formatEther, parseEther } from 'ethers/lib/utils'

import { DEC_18, DEFAULT_PRICES } from '../../constants'
import { XALPHA } from '../../types'
import { ITokenPrices } from '../../types/xToken'
import { formatNumber } from '../../utils'
import { getEthTokenPrice } from '../exchanges/uniswap'
import { getEthUsdcPrice } from '../exchanges/uniswap'

/**
 * @example
 * ```typescript
 * import { ethers } from 'ethers'
 * import { Abi, ADDRESSES, X_ALPHA_A } from '@xtoken/abis'
 * import { getXAlphaPrices } from '@xtoken/js'
 *
 * const provider = new ethers.providers.InfuraProvider('homestead', <INFURA_API_KEY>)
 * const xalphaContract = new ethers.Contract(ADDRESSES[X_ALPHA_A][chainId], Abi.xALPHA, provider)
 *
 * const { priceEth, priceUsd } = await getXAlphaPrices(xalphaContract)
 * ```
 *
 * @param {XALPHA} xalphaContract xALPHAa token contract
 * @returns A promise of the token prices in ETH/USD along with AUM
 */

export const getXAlphaPrices = async (
  xalphaContract: XALPHA
): Promise<ITokenPrices> => {
  try {
    const { provider } = xalphaContract
    const { chainId } = await provider.getNetwork()
    const alphaAddress = ADDRESSES[ALPHA][chainId]

    const [
      xalphaTotalSupply,
      xalphaAlphaBal,
      alphaEthPrice,
      ethUsdcPrice,
    ] = await Promise.all([
      xalphaContract.totalSupply(),
      xalphaContract.getNav(),
      getEthTokenPrice(alphaAddress, true, provider as BaseProvider),
      getEthUsdcPrice(provider as BaseProvider),
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
