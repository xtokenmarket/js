import { formatEther, parseEther } from 'ethers/lib/utils'
import { AAVE, ADDRESSES, ETH, USDC } from 'xtoken-abis'

import { DEC_18 } from '../../constants'
import { KyberProxy, XAAVE } from '../../types'
import { formatNumber } from '../../utils'
import { getExpectedRate } from '../utils'

export const getXAavePrices = async (
  xaaveContract: XAAVE,
  kyberProxyContract: KyberProxy,
  chainId: number
) => {
  if (!xaaveContract) {
    return {
      priceUsd: 0,
      priceEth: 0,
      aum: 0,
    }
  }

  const proxyValue = parseEther('1')

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const aaveAddress = ADDRESSES[AAVE][chainId]
  const ethAddress = ADDRESSES[ETH]
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const usdcAddress = ADDRESSES[USDC][chainId]

  const [
    xaaveTotalSupply,
    xaaveAaveBal,
    aaveUsdRate,
    ethUsdRate,
  ] = await Promise.all([
    xaaveContract.totalSupply(),
    xaaveContract.getFundHoldings(),
    getExpectedRate(kyberProxyContract, aaveAddress, usdcAddress, proxyValue),
    getExpectedRate(kyberProxyContract, ethAddress, usdcAddress, proxyValue),
  ])

  const xaavePerToken = xaaveAaveBal.mul(DEC_18).div(xaaveTotalSupply)
  const priceUsd = xaavePerToken.mul(aaveUsdRate).div(DEC_18)
  const priceEth = priceUsd.div(ethUsdRate)
  const aum = priceUsd.mul(xaaveTotalSupply).div(DEC_18)

  return {
    priceUsd: formatNumber(formatEther(priceUsd)),
    priceEth: formatNumber(formatEther(priceEth), 6),
    aum: formatNumber(formatEther(aum), 0),
  }
}
