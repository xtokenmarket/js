import { JsonRpcProvider } from '@ethersproject/providers'
import { ADDRESSES, HEGIC } from '@xtoken/abis'
import { formatEther, parseEther } from 'ethers/lib/utils'

import { DEC_18 } from '../../constants'
import { KyberProxy, XAAVE } from '../../types'
import { ITokenPrices } from '../../types/xToken'
import { formatNumber } from '../../utils'
import { getEthTokenPrice, getEthUsdcPrice } from '../exchanges/uniswap'

/**
 * @example
 * ```typescript
 * import { ethers } from 'ethers'
 * import { Abi, ADDRESSES, KYBER_PROXY, X_HEGIC_A } from '@xtoken/abis'
 * import { getXHegicPrices } from '@xtoken/js'
 *
 * const provider = new ethers.providers.InfuraProvider('homestead', <INFURA_API_KEY>)
 * const network = await provider.getNetwork()
 * const { chainId } = network
 *
 * const xhegicContract = new ethers.Contract(ADDRESSES[X_HEGIC_A][chainId], Abi.xHEGIC, provider)
 * const kyberProxyContract = new ethers.Contract(ADDRESSES[KYBER_PROXY][chainId], Abi.KyberProxy, provider)
 *
 * const { priceEth, priceUsd } = await getXHegicPrices(
 *   xhegicContract,
 *   kyberProxyContract,
 *   chainId
 * )
 * ```
 *
 * @param {XHEGIC} xhegicContract xHEGICa/xHEGICb token contract
 * @param {KyberProxy} kyberProxyContract Kyber Proxy contract
 * @param {number} chainId Connected network's ID, 1 for Mainnet
 * @returns A promise of the token prices in ETH/USD along with AUM
 */
export const getXHegicPrices = async (
  xhegicContract: XAAVE,
  kyberProxyContract: KyberProxy,
  chainId: number
): Promise<ITokenPrices> => {
  if (!xhegicContract) {
    return {
      aum: 0,
      priceEth: 0,
      priceUsd: 0,
    }
  }

  const hegicAddress = ADDRESSES[HEGIC][chainId]

  const [
    xhegicTotalSupply,
    xhegicHegicBal,
    hegicEthPrice,
    ethUsdcPrice,
  ] = await Promise.all([
    xhegicContract.totalSupply(),
    xhegicContract.getFundHoldings(),
    getEthTokenPrice(
      hegicAddress,
      true,
      kyberProxyContract.provider as JsonRpcProvider
    ),
    getEthUsdcPrice(kyberProxyContract.provider as JsonRpcProvider),
  ])

  const hegicUsdPrice = parseEther(hegicEthPrice)
    .mul(parseEther(ethUsdcPrice))
    .div(DEC_18)
  const xhegicPerToken = xhegicHegicBal.mul(DEC_18).div(xhegicTotalSupply)
  const priceUsd = xhegicPerToken.mul(hegicUsdPrice).div(DEC_18)
  const priceEth = priceUsd.mul(DEC_18).div(parseEther(ethUsdcPrice))
  const aum = priceUsd.mul(xhegicTotalSupply).div(DEC_18)

  return {
    aum: formatNumber(formatEther(aum), 0),
    priceEth: formatNumber(formatEther(priceEth), 6),
    priceUsd: formatNumber(formatEther(priceUsd)),
  }
}
