import { KyberProxy, XBNT } from '../../types'
import { ITokenPrices } from '../../types/xToken'
/**
 * @example
 * ```typescript
 * import { ethers } from 'ethers'
 * import { Abi, ADDRESSES, KYBER_PROXY, X_BNT_A } from '@xtoken/abis'
 * import { getXBntPrices } from '@xtoken/js'
 *
 * const provider = new ethers.providers.InfuraProvider('homestead', <INFURA_API_KEY>)
 * const network = await provider.getNetwork()
 * const { chainId } = network
 *
 * const xbntContract = new ethers.Contract(ADDRESSES[X_BNT_A][chainId], Abi.xBNT, provider)
 * const kyberProxyContract = new ethers.Contract(ADDRESSES[KYBER_PROXY][chainId], Abi.KyberProxy, provider)
 *
 * const { priceEth, priceUsd } = await getXBntPrices(
 *   xbntContract,
 *   kyberProxyContract,
 * )
 * ```
 *
 * @param {XBNT} xbntContract xBNTa token contract
 * @param {KyberProxy} kyberProxyContract Kyber Proxy contract
 * @returns A promise of the token prices in ETH/USD along with AUM
 */
export declare const getXBntPrices: (
  xbntContract: XBNT,
  kyberProxyContract: KyberProxy
) => Promise<ITokenPrices>
