import { XAAVE } from '../../types';
import { ITokenPrices } from '../../types/xToken';
/**
 * @example
 * ```typescript
 * import { ethers } from 'ethers'
 * import { Abi, ADDRESSES, X_AAVE_A } from '@xtoken/abis'
 * import { getXAavePrices } from '@xtoken/js'
 *
 * const provider = new ethers.providers.InfuraProvider('homestead', <INFURA_API_KEY>)
 * const xaaveContract = new ethers.Contract(ADDRESSES[X_AAVE_A][chainId], Abi.xAAVE, provider)
 *
 * const { priceEth, priceUsd } = await getXAavePrices(xaaveContract)
 * ```
 *
 * @param {XAAVE} xaaveContract xAAVEa/xAAVEb token contract
 * @returns A promise of the token prices in ETH/USD along with AUM
 */
export declare const getXAavePrices: (xaaveContract: XAAVE) => Promise<ITokenPrices>;
