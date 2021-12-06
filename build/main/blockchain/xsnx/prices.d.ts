import { XSNX } from '../../types';
import { ITokenPrices } from '../../types/xToken';
/**
 * @example
 * ```typescript
 * import { ethers } from 'ethers'
 * import { Abi, ADDRESSES, X_SNX_A } from '@xtoken/abis'
 * import { getXSnxPrices } from '@xtoken/js'
 *
 * const provider = new ethers.providers.InfuraProvider('homestead', <INFURA_API_KEY>)
 * const xsnxContract = new ethers.Contract(ADDRESSES[X_SNX_A][chainId], Abi.xSNX, provider)
 *
 * const { priceEth, priceUsd } = await getXSnxPrices(xsnxContract)
 * ```
 *
 * @param {XSNX} xsnxContract xSNXa token contract
 * @returns A promise of the token prices in ETH/USD along with AUM
 */
export declare const getXSnxPrices: (xsnxContract: XSNX) => Promise<ITokenPrices>;
