import { BaseProvider } from '@ethersproject/providers'
import { ADDRESSES, ETH, KNC, KYBER_PROXY } from '@xtoken/abis'
import { formatEther, parseEther } from 'ethers/lib/utils'

import { DEC_18, DEFAULT_PRICES } from '../../constants'
import { KyberProxy, XKNC } from '../../types'
import { ITokenPrices } from '../../types/xToken'
import { formatNumber } from '../../utils'
import { getEthUsdcPrice } from '../exchanges/uniswap'
import { getContract, getExpectedRate } from '../utils'

/**
 * @example
 * ```typescript
 * import { ethers } from 'ethers'
 * import { Abi, ADDRESSES, X_KNC_A } from '@xtoken/abis'
 * import { getXKncPrices } from '@xtoken/js'
 *
 * const provider = new ethers.providers.InfuraProvider('homestead', <INFURA_API_KEY>)
 * const xkncContract = new ethers.Contract(ADDRESSES[X_KNC_A][chainId], Abi.xKNC, provider)
 *
 * const { priceEth, priceUsd } = await getXKncPrices(xkncContract)
 * ```
 *
 * @param {XKNC} xkncContract xKNCa/xKNCb token contract
 * @returns A promise of the token prices in ETH/USD along with AUM
 */
export const getXKncPrices = async (
  xkncContract: XKNC
): Promise<ITokenPrices> => {
  try {
    const { provider } = xkncContract
    const network = await provider.getNetwork()
    const { chainId } = network

    const proxyValue = parseEther('1')
    const ethAddress = ADDRESSES[ETH] as string
    const kncAddress = ADDRESSES[KNC][chainId]

    const kyberProxyContract = getContract(
      KYBER_PROXY,
      provider as BaseProvider,
      network
    ) as KyberProxy

    const [
      xkncTotalSupply,
      xkncKncBal,
      kncEthPrice,
      ethUsdcPrice,
    ] = await Promise.all([
      xkncContract.totalSupply(),
      xkncContract.getFundKncBalanceTwei(),
      getExpectedRate(kyberProxyContract, kncAddress, ethAddress, proxyValue),
      getEthUsdcPrice(provider as BaseProvider),
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
