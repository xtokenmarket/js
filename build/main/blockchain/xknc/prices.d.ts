import { XKNC } from '../../types'
import { ITokenPrices } from '../../types/xToken'
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
export declare const getXKncPrices: (
  xkncContract: XKNC
) => Promise<ITokenPrices>
