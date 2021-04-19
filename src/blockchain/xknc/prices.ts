import { BaseProvider } from '@ethersproject/providers'
import { ADDRESSES, ETH } from '@xtoken/abis'
import { Contract } from 'ethers'
import { formatEther, parseEther } from 'ethers/lib/utils'

import { DEC_18, DEFAULT_PRICES } from '../../constants'
import { KyberProxy, XKNC } from '../../types'
import { ITokenPrices } from '../../types/xToken'
import { formatNumber } from '../../utils'
import { getEthUsdcPrice } from '../exchanges/uniswap'
import { getExpectedRate } from '../utils'

/**
 * @example
 * ```typescript
 * import { ethers } from 'ethers'
 * import { Abi, ADDRESSES, KNC, KYBER_PROXY, X_KNC_A } from '@xtoken/abis'
 * import { getXKncPrices } from '@xtoken/js'
 *
 * const provider = new ethers.providers.InfuraProvider('homestead', <INFURA_API_KEY>)
 *
 * const xkncContract = new ethers.Contract(ADDRESSES[X_KNC_A][chainId], Abi.xKNC, provider)
 * const kncContract = new ethers.Contract(ADDRESSES[KNC][chainId], Abi.ERC20, provider)
 * const kyberProxyContract = new ethers.Contract(ADDRESSES[KYBER_PROXY][chainId], Abi.KyberProxy, provider)
 *
 * const { priceEth, priceUsd } = await getXKncPrices(
 *   xkncContract,
 *   kncContract,
 *   kyberProxyContract,
 * )
 * ```
 *
 * @param {XKNC} xkncContract xKNCa/xKNCb token contract
 * @param {Contract} kncContract KNC token contract
 * @param {KyberProxy} kyberProxyContract Kyber Proxy contract
 * @returns A promise of the token prices in ETH/USD along with AUM
 */
export const getXKncPrices = async (
  xkncContract: XKNC,
  kncContract: Contract,
  kyberProxyContract: KyberProxy
): Promise<ITokenPrices> => {
  try {
    const proxyValue = parseEther('1')
    const ethAddress = ADDRESSES[ETH] as string

    const [
      xkncTotalSupply,
      xkncKncBal,
      kncEthPrice,
      ethUsdcPrice,
    ] = await Promise.all([
      xkncContract.totalSupply(),
      xkncContract.getFundKncBalanceTwei(),
      getExpectedRate(
        kyberProxyContract,
        kncContract.address,
        ethAddress,
        proxyValue
      ),
      getEthUsdcPrice(kyberProxyContract.provider as BaseProvider),
    ])

    const kncUsdcPrice = kncEthPrice.mul(parseEther(ethUsdcPrice)).div(DEC_18)
    const priceUsd = xkncKncBal.mul(kncUsdcPrice).div(xkncTotalSupply)
    const priceEth = priceUsd.mul(DEC_18).div(parseEther(ethUsdcPrice))
    const aum = priceUsd.mul(xkncTotalSupply).div(DEC_18)

    return {
      priceUsd: formatNumber(formatEther(priceUsd)),
      priceEth: formatNumber(formatEther(priceEth), 6),
      aum: formatNumber(formatEther(aum), 0),
    }
  } catch (e) {
    console.error('Error while fetching token price:', e)
    return DEFAULT_PRICES
  }
}
