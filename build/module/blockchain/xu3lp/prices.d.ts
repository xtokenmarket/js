import { BigNumber } from 'ethers'
import { KyberProxy, XU3LP } from '../../types'
import { ITokenPrices } from '../../types/xToken'
/**
 * @example
 * ```typescript
 * import { ethers } from 'ethers'
 * import { Abi, ADDRESSES, KYBER_PROXY, X_U3LP_A } from '@xtoken/abis'
 * import { getXU3LPPrices } from '@xtoken/js'
 *
 * const provider = new ethers.providers.InfuraProvider('homestead', <INFURA_API_KEY>)
 *
 * const xu3lpContract = new ethers.Contract(ADDRESSES[X_U3LP_A][chainId], Abi.xU3LP, provider)
 * const kyberProxyContract = new ethers.Contract(ADDRESSES[KYBER_PROXY][chainId], Abi.KyberProxy, provider)
 *
 * const { priceEth, priceUsd } = await getXU3LPPrices(
 *   xu3lpContract,
 *   kyberProxyContract,
 * )
 * ```
 *
 * @param {XU3LP} xu3lpContract xU3LPa token contract
 * @param {KyberProxy} kyberProxyContract Kyber Proxy contract
 * @returns A promise of the token prices in ETH/USD along with AUM
 */
export declare const getXU3LPPrices: (
  xu3lpContract: XU3LP,
  kyberProxyContract: KyberProxy
) => Promise<ITokenPrices>
export declare const getXU3LPTokenPrices: (
  xu3lpContract: XU3LP
) => Promise<{
  readonly token0Price: BigNumber
  readonly token1Price: BigNumber
}>
