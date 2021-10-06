import { KyberProxy, XALPHA } from '../../types'
import { ITokenPrices } from '../../types/xToken'
/**
 * @example
 * ```typescript
 * import { ethers } from 'ethers'
 * import { Abi, ADDRESSES, KYBER_PROXY, X_ALPHA_A } from '@xtoken/abis'
 * import { getXAlphaPrices } from '@xtoken/js'
 *
 * const provider = new ethers.providers.InfuraProvider('homestead', <INFURA_API_KEY>)
 * const network = await provider.getNetwork()
 * const { chainId } = network
 *
 * const xalphaContract = new ethers.Contract(ADDRESSES[X_ALPHA_A][chainId], Abi.xALPHA, provider)
 * const kyberProxyContract = new ethers.Contract(ADDRESSES[KYBER_PROXY][chainId], Abi.KyberProxy, provider)
 *
 * const { priceEth, priceUsd } = await getXAlphaPrices(
 *   xalphaContract,
 *   kyberProxyContract,
 * )
 * ```
 *
 * @param {XALPHA} xalphaContract xALPHAa token contract
 * @param {KyberProxy} kyberProxyContract Kyber Proxy contract
 * @returns A promise of the token prices in ETH/USD along with AUM
 */
export declare const getXAlphaPrices: (
  xalphaContract: XALPHA,
  kyberProxyContract: KyberProxy
) => Promise<ITokenPrices>
