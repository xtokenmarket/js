import { JsonRpcProvider } from '@ethersproject/providers'
import { formatEther, parseEther } from 'ethers/lib/utils'
import { ADDRESSES, INCH } from 'xtoken-abis'

import { DEC_18 } from '../../constants'
import { KyberProxy, XINCH } from '../../types'
import { ITokenPrices } from '../../types/xToken'
import { formatNumber } from '../../utils'
import { getEthTokenPrice, getEthUsdcPrice } from '../exchanges/uniswap'

/**
 * @example
 * ```typescript
 * import { ethers } from 'ethers'
 * import { Abi, ADDRESSES, INCH_LIQUIDITY_PROTOCOL, X_INCH_A } from 'xtoken-abis'
 * import { getXInchPrices } from 'xtoken-js'
 *
 * const provider = new ethers.providers.InfuraProvider('homestead', <INFURA_API_KEY>)
 * const network = await provider.getNetwork()
 * const { chainId } = network
 *
 * const xinchContract = new ethers.Contract(ADDRESSES[X_INCH_A][chainId], Abi.xINCH, provider)
 * const kyberProxyContract = new ethers.Contract(ADDRESSES[KYBER_PROXY][chainId], Abi.KyberProxy, provider)
 *
 * const { priceEth, priceUsd } = await getXInchPrices(
 *   xinchContract,
 *   kyberProxyContract,
 *   chainId
 * )
 * ```
 *
 * @param {XINCH} xinchContract xINCHa/xINCHb token contract
 * @param {KyberProxy} kyberProxyContract Kyber proxy contract
 * @param {number} chainId Connected network's ID, 1 for Mainnet
 * @returns A promise of the token prices in ETH/USD along with AUM
 */
export const getXInchPrices = async (
  xinchContract: XINCH,
  kyberProxyContract: KyberProxy,
  chainId: number
): Promise<ITokenPrices> => {
  if (!xinchContract) {
    return {
      aum: 0,
      priceEth: 0,
      priceUsd: 0,
    }
  }

  const inchAddress = ADDRESSES[INCH][chainId]

  const [
    xinchTotalSupply,
    inchHoldings,
    inchEthPrice,
    ethUsdcPrice,
  ] = await Promise.all([
    xinchContract.totalSupply(),
    xinchContract.getNav(),
    getEthTokenPrice(
      inchAddress,
      true,
      kyberProxyContract.provider as JsonRpcProvider
    ),
    getEthUsdcPrice(kyberProxyContract.provider as JsonRpcProvider),
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
}
