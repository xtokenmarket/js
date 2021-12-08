import { BaseProvider } from '@ethersproject/providers'
import { formatEther, parseEther } from 'ethers/lib/utils'

import { DEC_18, DEFAULT_PRICES } from '../../constants'
import { XBNT } from '../../types'
import { ITokenPrices } from '../../types/xToken'
import { formatNumber } from '../../utils'
import { getBntEthPrice } from '../exchanges/bancor'
import { getEthUsdcPrice } from '../exchanges/uniswap'

/**
 * @example
 * ```typescript
 * import { ethers } from 'ethers'
 * import { Abi, ADDRESSES, X_BNT_A } from '@xtoken/abis'
 * import { getXBntPrices } from '@xtoken/js'
 *
 * const provider = new ethers.providers.InfuraProvider('homestead', <INFURA_API_KEY>)
 * const xbntContract = new ethers.Contract(ADDRESSES[X_BNT_A][chainId], Abi.xBNT, provider)
 *
 * const { priceEth, priceUsd } = await getXBntPrices(xbntContract)
 * ```
 *
 * @param {XBNT} xbntContract xBNTa token contract
 * @returns A promise of the token prices in ETH/USD along with AUM
 */
export const getXBntPrices = async (
  xbntContract: XBNT
): Promise<ITokenPrices> => {
  try {
    const { provider } = xbntContract

    const [
      xbntTotalSupply,
      xbntBntBal,
      bntEthPrice,
      ethUsdcPrice,
    ] = await Promise.all([
      xbntContract.totalSupply(),
      xbntContract.getNav(),
      getBntEthPrice(provider as BaseProvider),
      getEthUsdcPrice(provider as BaseProvider),
    ])

    const bntUsdPrice = parseEther(bntEthPrice)
      .mul(parseEther(ethUsdcPrice))
      .div(DEC_18)
    const xbntPerToken = xbntBntBal.mul(DEC_18).div(xbntTotalSupply)
    const priceUsd = xbntPerToken.mul(bntUsdPrice).div(DEC_18)
    const priceEth = priceUsd.mul(DEC_18).div(parseEther(ethUsdcPrice))
    const aum = priceUsd.mul(xbntTotalSupply).div(DEC_18)

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
