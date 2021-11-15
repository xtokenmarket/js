import { XBNT } from '../../types'
import { ITokenPrices } from '../../types/xToken'
/**
 * @example
 * ```typescript
 * import { ethers } from 'ethers'
 * import { Abi, ADDRESSES, X_BNT_A } from '@xtoken/abis'
 * import { getXBntPrices } from '@xtoken/js'
 *
 * const provider = new ethers.providers.InfuraProvider('homestead', <INFURA_API_KEY>)
 * const xbntContract = new ethers.Contract(ADDRESSES[X_BNT_A][chainId], Abi.xBNT, provider)
 *
 * const { priceEth, priceUsd } = await getXBntPrices(xbntContract)
 * ```
 *
 * @param {XBNT} xbntContract xBNTa token contract
 * @returns A promise of the token prices in ETH/USD along with AUM
 */
export declare const getXBntPrices: (
  xbntContract: XBNT
) => Promise<ITokenPrices>
