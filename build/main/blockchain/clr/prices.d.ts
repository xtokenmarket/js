import { BigNumber } from 'ethers'
import { KyberProxy, XAssetCLR } from '../../types'
import { ITokenPrices } from '../../types/xToken'
/**
 * @example
 * ```typescript
 * import { ethers } from 'ethers'
 * import { Abi, ADDRESSES, KYBER_PROXY, AAVE_X_AAVE_A_CLR } from '@xtoken/abis'
 * import { getXAssetCLRPrices } from '@xtoken/js'
 *
 * const provider = new ethers.providers.InfuraProvider('homestead', <INFURA_API_KEY>)
 *
 * const xAssetCLRContract = new ethers.Contract(ADDRESSES[AAVE_X_AAVE_A_CLR][chainId], Abi.xAssetCLR, provider)
 * const kyberProxyContract = new ethers.Contract(ADDRESSES[KYBER_PROXY][chainId], Abi.KyberProxy, provider)
 *
 * const { priceEth, priceUsd } = await getXAssetCLRPrices(
 *   xAssetCLRContract,
 *   kyberProxyContract,
 * )
 * ```
 *
 * @param {XAssetCLR} xAssetCLRContract xAssetCLR token contract
 * @param {KyberProxy} kyberProxyContract Kyber Proxy contract
 * @returns A promise of the token prices in ETH/USD along with AUM
 */
export declare const getXAssetCLRPrices: (
  xAssetCLRContract: XAssetCLR,
  kyberProxyContract: KyberProxy
) => Promise<ITokenPrices>
export declare const getXAssetCLRTokenPrices: (
  XAssetCLR: XAssetCLR
) => Promise<{
  readonly token0Price: BigNumber
  readonly token1Price: BigNumber
}>
