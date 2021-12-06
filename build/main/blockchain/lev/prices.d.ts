import { XAssetLev } from '../../types';
import { ITokenPrices } from '../../types/xToken';
/**
 * @example
 * ```typescript
 * import { ethers } from 'ethers'
 * import { Abi, ADDRESSES, X_ETH_3X } from '@xtoken/abis'
 * import { getXAssetLevPrices } from '@xtoken/js'
 *
 * const provider = new ethers.providers.InfuraProvider('homestead', <INFURA_API_KEY>)
 * const xassetlevContract = new ethers.Contract(ADDRESSES[X_ETH_3X][chainId], Abi.xAssetLev, provider)
 *
 * const { priceEth, priceUsd } = await getXAssetLevPrices(xassetlevContract)
 * ```
 *
 * @param {XAssetLev} xassetlevContract xAssetLev token contract
 * @returns A promise of the token prices in ETH/USD along with AUM
 */
export declare const getXAssetLevPrices: (xassetlevContract: XAssetLev) => Promise<ITokenPrices>;
