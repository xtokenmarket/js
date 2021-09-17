import { BaseProvider } from '@ethersproject/providers'
import { formatEther, parseEther } from 'ethers/lib/utils'

import { DEC_18, DEFAULT_PRICES } from '../../constants'
import { KyberProxy, XALPHA, XBNT } from '../../types'
import { ITokenPrices } from '../../types/xToken'

import { formatNumber } from '../../utils'

// create getAlphaEthPrice fn
import { getAlphaEthPrice } from '../exchanges/uniswap'
import { getEthUsdcPrice } from '../exchanges/uniswap'

// TODO - add documentation and examples

export const getXAlphaPrices = async (
  xalphaContract: XALPHA,
  kyberProxyContract: KyberProxy
): Promise<ITokenPrices> => {
  try {
    const [
      xalphaTotalSupply,
      xalphaAlphaBal,
      alphaEthPrice,
      ethUsdcPrice,
    ] = await Promise.all([
      xalphaContract.totalSupply(),
      xalphaContract.getNav(), // check this method
      getAlphaEthPrice(kyberProxyContract.provider as BaseProvider),
      getEthUsdcPrice(kyberProxyContract.provider as BaseProvider),
    ])

    const alphaUsdPrice = parseEther(alphaEthPrice)
      .mul(parseEther(ethUsdcPrice))
      .div(DEC_18)
    const xalphaPerToken = xalphaAlphaBal.mul(DEC_18).div(xalphaTotalSupply)
    const priceUsd = xalphaPerToken.mul(alphaUsdPrice).div(DEC_18)
    const priceEth = priceUsd.mul(DEC_18).div(parseEther(ethUsdcPrice))
    const aum = priceUsd.mul(xalphaTotalSupply).div(DEC_18)

    return {
      aum: formatNumber(formatEther(aum), 0),
      priceEth: formatNumber(formatEther(priceEth), 6),
      priceUsd: formatNumber(formatEther(priceUsd)),
    }
  } catch (e) {
    console.error('Error fetching token price: ', e)
    return DEFAULT_PRICES
  }
}
