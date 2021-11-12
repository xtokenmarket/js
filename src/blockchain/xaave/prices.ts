import { BaseProvider } from '@ethersproject/providers'
import { AAVE, ADDRESSES } from '@xtoken/abis'
import { formatEther, parseEther } from 'ethers/lib/utils'

import { DEC_18, DEFAULT_PRICES } from '../../constants'
import { XAAVE } from '../../types'
import { ITokenPrices } from '../../types/xToken'
import { formatNumber } from '../../utils'
import { getEthTokenPrice, getEthUsdcPrice } from '../exchanges/uniswap'

/**
 * @example
 * ```typescript
 * import { ethers } from 'ethers'
 * import { Abi, ADDRESSES, X_AAVE_A } from '@xtoken/abis'
 * import { getXAavePrices } from '@xtoken/js'
 *
 * const provider = new ethers.providers.InfuraProvider('homestead', <INFURA_API_KEY>)
 * const xaaveContract = new ethers.Contract(ADDRESSES[X_AAVE_A][chainId], Abi.xAAVE, provider)
 *
 * const { priceEth, priceUsd } = await getXAavePrices(xaaveContract)
 * ```
 *
 * @param {XAAVE} xaaveContract xAAVEa/xAAVEb token contract
 * @returns A promise of the token prices in ETH/USD along with AUM
 */
export const getXAavePrices = async (
  xaaveContract: XAAVE
): Promise<ITokenPrices> => {
  try {
    const { provider } = xaaveContract
    const { chainId } = await provider.getNetwork()
    const aaveAddress = ADDRESSES[AAVE][chainId]

    const [
      xaaveTotalSupply,
      xaaveAaveBal,
      aaveEthPrice,
      ethUsdcPrice,
    ] = await Promise.all([
      xaaveContract.totalSupply(),
      xaaveContract.getFundHoldings(),
      getEthTokenPrice(aaveAddress, true, provider as BaseProvider),
      getEthUsdcPrice(provider as BaseProvider),
    ])

    const aaveUsdPrice = parseEther(aaveEthPrice)
      .mul(parseEther(ethUsdcPrice))
      .div(DEC_18)
    const xaavePerToken = xaaveAaveBal.mul(DEC_18).div(xaaveTotalSupply)
    const priceUsd = xaavePerToken.mul(aaveUsdPrice).div(DEC_18)
    const priceEth = priceUsd.mul(DEC_18).div(parseEther(ethUsdcPrice))
    const aum = priceUsd.mul(xaaveTotalSupply).div(DEC_18)

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
