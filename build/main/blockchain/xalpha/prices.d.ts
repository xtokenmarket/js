import { XALPHA } from '../../types'
import { ITokenPrices } from '../../types/xToken'
/**
 * @example
 * ```typescript
 * import { ethers } from 'ethers'
 * import { Abi, ADDRESSES, X_ALPHA_A } from '@xtoken/abis'
 * import { getXAlphaPrices } from '@xtoken/js'
 *
 * const provider = new ethers.providers.InfuraProvider('homestead', <INFURA_API_KEY>)
 * const xalphaContract = new ethers.Contract(ADDRESSES[X_ALPHA_A][chainId], Abi.xALPHA, provider)
 *
 * const { priceEth, priceUsd } = await getXAlphaPrices(xalphaContract)
 * ```
 *
 * @param {XALPHA} xalphaContract xALPHAa token contract
 * @returns A promise of the token prices in ETH/USD along with AUM
 */
export declare const getXAlphaPrices: (
  xalphaContract: XALPHA
) => Promise<ITokenPrices>
