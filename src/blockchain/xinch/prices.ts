import { BaseProvider } from '@ethersproject/providers'
import { ADDRESSES, INCH } from '@xtoken/abis'
import { formatEther, parseEther } from 'ethers/lib/utils'

import { DEC_18, DEFAULT_PRICES } from '../../constants'
import { XINCH } from '../../types'
import { ITokenPrices } from '../../types/xToken'
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
export const getXInchPrices = async (
  xinchContract: XINCH
): Promise<ITokenPrices> => {
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
      getEthTokenPrice(inchAddress, true, provider as BaseProvider),
      getEthUsdcPrice(provider as BaseProvider),
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
