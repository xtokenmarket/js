import { BaseProvider } from '@ethersproject/providers'
import { X_BTC_3X, X_ETH_3X } from '@xtoken/abis'
import { BigNumber } from 'ethers'
import { formatEther, parseEther, parseUnits } from 'ethers/lib/utils'

import { DEC_18, DEFAULT_PRICES } from '../../constants'
import { XAssetLev } from '../../types'
import { ITokenPrices, IXAssetLev } from '../../types/xToken'
import { formatNumber } from '../../utils'
// import { getEthTokenPrice } from '../exchanges/uniswap'
import {
  getEthUsdcPriceUniswapV3,
  getTokenEthPriceUniswapV3,
} from '../exchanges/uniswapV3'
import { getXAssetLevTokenSymbol } from '../utils'

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
export const getXAssetLevPrices = async (
  xassetlevContract: XAssetLev
): Promise<ITokenPrices> => {
  try {
    const { provider } = xassetlevContract
    const symbol = (await xassetlevContract.symbol()) as IXAssetLev
    const token = getXAssetLevTokenSymbol(symbol)

    const [
      xassetlevTotalSupply,
      { bufferBalance, marketBalance },
      ethUsdcPrice,
    ] = await Promise.all([
      xassetlevContract.totalSupply(),
      xassetlevContract.getFundBalances(),
      getEthUsdcPriceUniswapV3(provider as BaseProvider),
    ])

    let tokenEthPrice = BigNumber.from('0')
    if (symbol !== X_ETH_3X) {
      tokenEthPrice = parseEther(
        await getTokenEthPriceUniswapV3(token, provider as BaseProvider)
      )
    }

    // Price in terms of base asset
    const priceToken = bufferBalance
      .add(marketBalance)
      .mul(DEC_18)
      .div(xassetlevTotalSupply)

    let priceBtc = BigNumber.from('0')
    let priceEth

    if (symbol === X_ETH_3X) {
      priceEth = priceToken
    } else {
      if (symbol === X_BTC_3X) {
        priceBtc = parseUnits(priceToken.toString(), 10)
        priceEth = priceBtc.mul(tokenEthPrice).div(DEC_18)
      } else {
        priceEth = priceToken.mul(tokenEthPrice).div(DEC_18)
      }
    }

    const priceUsd = priceEth.mul(parseEther(ethUsdcPrice)).div(DEC_18)
    const aum = priceUsd.mul(xassetlevTotalSupply).div(DEC_18)

    return {
      aum: formatNumber(formatEther(aum), 0),
      priceBtc: priceBtc.isZero() ? 0 : formatNumber(formatEther(priceBtc), 6),
      priceEth: formatNumber(formatEther(priceEth), 6),
      priceUsd: formatNumber(formatEther(priceUsd)),
    }
  } catch (e) {
    console.error('Error fetching token price: ', e)
    return DEFAULT_PRICES
  }
}
