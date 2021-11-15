import { BigNumber } from 'ethers'
import { XAssetCLR } from '../../types'
import { ITokenPrices } from '../../types/xToken'
/**
 * @example
 * ```typescript
 * import { ethers } from 'ethers'
 * import { Abi, ADDRESSES, AAVE_X_AAVE_A_CLR } from '@xtoken/abis'
 * import { getXAssetCLRPrices } from '@xtoken/js'
 *
 * const provider = new ethers.providers.InfuraProvider('homestead', <INFURA_API_KEY>)
 * const xAssetCLRContract = new ethers.Contract(ADDRESSES[AAVE_X_AAVE_A_CLR][chainId], Abi.xAssetCLR, provider)
 *
 * const { priceEth, priceUsd } = await getXAssetCLRPrices(xAssetCLRContract)
 * ```
 *
 * @param {XAssetCLR} xAssetCLRContract xAssetCLR token contract
 * @returns A promise of the token prices in ETH/USD along with AUM
 */
export declare const getXAssetCLRPrices: (
  xAssetCLRContract: XAssetCLR
) => Promise<ITokenPrices>
export declare const getXAssetCLRTokenPrices: (
  XAssetCLR: XAssetCLR
) => Promise<{
  readonly token0Price: BigNumber
  readonly token1Price: BigNumber
}>
