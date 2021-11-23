import { BaseProvider } from '@ethersproject/providers'
import {
  AAVE_X_AAVE_A_CLR,
  BNT_X_BNT_A_CLR,
  INCH_X_INCH_A_CLR,
  INCH_X_INCH_B_CLR,
  X_AAVE_B_AAVE_CLR,
  X_ALPHA_A_ALPHA_CLR,
  X_KNC_A_KNC_CLR,
  X_KNC_B_KNC_CLR,
  X_SNX_A_SNX_CLR,
  XTK_ETH_CLR,
} from '@xtoken/abis'
import { BigNumber } from 'ethers'
import { formatEther, parseEther } from 'ethers/lib/utils'

import { DEC_18, DEFAULT_PRICES, DEFAULT_TOKEN_PRICES } from '../../constants'
import { XAssetCLR } from '../../types'
import { ITokenPrices, ITokenSymbols, IXAssetCLR } from '../../types/xToken'
import { formatNumber, getTWAP } from '../../utils'
import { getEthUsdcPrice } from '../exchanges/uniswap'
import { getXAssetCLRTokenSymbol, getXAssetPrices } from '../utils'

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
export const getXAssetCLRPrices = async (
  xAssetCLRContract: XAssetCLR
): Promise<ITokenPrices> => {
  try {
    const [
      symbol,
      { token0Price, token1Price },
      stakedTokenBalances,
      bufferTokenBalances,
      xAssetCLRTotalSupply,
      ethUsdcPrice,
    ] = await Promise.all([
      xAssetCLRContract.symbol(),
      getXAssetCLRTokenPrices(xAssetCLRContract),
      xAssetCLRContract.getStakedTokenBalance(),
      xAssetCLRContract.getBufferTokenBalance(),
      xAssetCLRContract.totalSupply(),
      getEthUsdcPrice(xAssetCLRContract.provider as BaseProvider),
    ])

    const assets = getXAssetCLRTokenSymbol(symbol as IXAssetCLR)

    const token0Balance = stakedTokenBalances.amount0.add(
      bufferTokenBalances.amount0
    )
    const token1Balance = stakedTokenBalances.amount1.add(
      bufferTokenBalances.amount1
    )

    let isToken0 = true
    let aum = BigNumber.from('0')

    switch (symbol) {
      case X_AAVE_B_AAVE_CLR:
      case X_ALPHA_A_ALPHA_CLR:
      case X_KNC_A_KNC_CLR:
      case X_KNC_B_KNC_CLR:
      case X_SNX_A_SNX_CLR:
        aum = token1Balance.mul(token1Price).div(DEC_18).add(token0Balance)
        break

      case AAVE_X_AAVE_A_CLR:
      case BNT_X_BNT_A_CLR:
      case INCH_X_INCH_A_CLR:
      case INCH_X_INCH_B_CLR:
      case XTK_ETH_CLR:
        isToken0 = false
        aum = token0Balance.mul(token0Price).div(DEC_18).add(token1Balance)
        break
    }

    let priceEth
    let priceUsd

    if (symbol === XTK_ETH_CLR) {
      priceEth = aum.mul(DEC_18).div(xAssetCLRTotalSupply)
      priceUsd = priceEth.mul(parseEther(ethUsdcPrice)).div(DEC_18)

      // Convert AUM to USD from ETH
      aum = aum.mul(parseEther(ethUsdcPrice))
    } else {
      const { priceUsd: xAssetPriceUsd } = await getXAssetPrices(
        (isToken0 ? assets[0] : assets[1]) as ITokenSymbols,
        xAssetCLRContract.provider as BaseProvider
      )

      aum = aum.mul(parseEther(xAssetPriceUsd.toString()))
      priceUsd = aum.div(xAssetCLRTotalSupply)
      priceEth = priceUsd.mul(DEC_18).div(parseEther(ethUsdcPrice))
    }

    return {
      aum: formatNumber(formatEther(aum.div(DEC_18))),
      priceBtc: 0,
      priceEth: formatNumber(formatEther(priceEth), 6),
      priceUsd: formatNumber(formatEther(priceUsd)),
    }
  } catch (e) {
    console.error('Error while fetching token price:', e)
    return DEFAULT_PRICES
  }
}

export const getXAssetCLRTokenPrices = async (
  XAssetCLR: XAssetCLR
): Promise<{
  readonly token0Price: BigNumber
  readonly token1Price: BigNumber
}> => {
  try {
    const [asset0Price, asset1Price] = await Promise.all([
      XAssetCLR.getAsset0Price(),
      XAssetCLR.getAsset1Price(),
    ])

    const token0Price = getTWAP(asset0Price)
    const token1Price = getTWAP(asset1Price)

    return {
      token0Price,
      token1Price,
    }
  } catch (e) {
    console.error('Error while fetching token price:', e)
    return DEFAULT_TOKEN_PRICES
  }
}
