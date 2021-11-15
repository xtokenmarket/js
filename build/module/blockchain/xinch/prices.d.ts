import { XINCH } from '../../types'
import { ITokenPrices } from '../../types/xToken'
/**
 * @example
 * ```typescript
 * import { ethers } from 'ethers'
 * import { Abi, ADDRESSES, INCH_LIQUIDITY_PROTOCOL, X_INCH_A } from '@xtoken/abis'
 * import { getXInchPrices } from '@xtoken/js'
 *
 * const provider = new ethers.providers.InfuraProvider('homestead', <INFURA_API_KEY>)
 * const xinchContract = new ethers.Contract(ADDRESSES[X_INCH_A][chainId], Abi.xINCH, provider)
 *
 * const { priceEth, priceUsd } = await getXInchPrices(xinchContract)
 * ```
 *
 * @param {XINCH} xinchContract xINCHa/xINCHb token contract
 * @returns A promise of the token prices in ETH/USD along with AUM
 */
export declare const getXInchPrices: (
  xinchContract: XINCH
) => Promise<ITokenPrices>
