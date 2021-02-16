import { Contract } from 'ethers'
import { formatEther, parseEther } from 'ethers/lib/utils'
import { ADDRESSES, ETH, USDC } from 'xtoken-abis'

import { DEC_18, Exchange } from '../../constants'
import { KyberProxy, XKNC } from '../../types'
import { ITokenPrices } from '../../types/xToken'
import { formatNumber } from '../../utils'
import { getExpectedRate } from '../utils'

/**
 * @example
 * ```typescript
 * import { ethers } from 'ethers'
 * import { Abi, ADDRESSES, KNC, KYBER_PROXY, X_KNC_A } from 'xtoken-abis'
 * import { getXKncPrices } from 'xtoken-js'
 *
 * const provider = new ethers.providers.InfuraProvider('homestead', <INFURA_API_KEY>)
 * const network = await provider.getNetwork()
 * const { chainId } = network
 *
 * const xkncContract = new ethers.Contract(ADDRESSES[X_KNC_A][chainId], Abi.xKNC, provider)
 * const kncContract = new ethers.Contract(ADDRESSES[KNC][chainId], Abi.ERC20, provider)
 * const kyberProxyContract = new ethers.Contract(ADDRESSES[KYBER_PROXY][chainId], Abi.KyberProxy, provider)
 *
 * const { priceEth, priceUsd } = await getXKncPrices(
 *   xkncContract,
 *   kncContract,
 *   kyberProxyContract,
 *   chainId
 * )
 * ```
 *
 * @param {XKNC} xkncContract xKNCa/xKNCb token contract
 * @param {Contract} kncContract KNC token contract
 * @param {KyberProxy} kyberProxyContract Kyber Proxy contract
 * @param {number} chainId Connected network's ID, 1 for Mainnet
 * @returns A promise of the token prices in ETH/USD along with AUM
 */
export const getXKncPrices = async (
  xkncContract: XKNC,
  kncContract: Contract,
  kyberProxyContract: KyberProxy,
  chainId: number
): Promise<ITokenPrices> => {
  if (!xkncContract) {
    return {
      aum: 0,
      priceEth: 0,
      priceUsd: 0,
    }
  }

  const proxyValue = parseEther('1')

  const usdcAddress = ADDRESSES[USDC][chainId]
  const ethAddress = ADDRESSES[ETH] as string

  const [
    xkncTotalSupply,
    xkncKncBal,
    kncUsdRate,
    ethUsdRate,
  ] = await Promise.all([
    xkncContract.totalSupply(),
    xkncContract.getFundKncBalanceTwei(),
    getExpectedRate(
      Exchange.KYBER,
      kyberProxyContract,
      kncContract.address,
      usdcAddress,
      proxyValue
    ),
    getExpectedRate(
      Exchange.INCH,
      kyberProxyContract,
      ethAddress,
      usdcAddress,
      proxyValue
    ),
  ])

  const priceUsd = xkncKncBal.mul(kncUsdRate).div(xkncTotalSupply)
  const priceEth = priceUsd.mul(DEC_18).div(ethUsdRate)
  const aum = priceUsd.mul(xkncTotalSupply).div(DEC_18)

  return {
    priceUsd: formatNumber(formatEther(priceUsd)),
    priceEth: formatNumber(formatEther(priceEth), 6),
    aum: formatNumber(formatEther(aum), 0),
  }
}
