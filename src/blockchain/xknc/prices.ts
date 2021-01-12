import { Contract } from 'ethers'
import { formatEther, parseEther } from 'ethers/lib/utils'
import { ADDRESSES, ETH, USDC } from 'xtoken-abis'

import { DEC_18 } from '../../constants'
import { KyberProxy, XKNC } from '../../types'
import { formatNumber } from '../../utils'
import { getExpectedRate } from '../utils'

export const getXKncPrices = async (
  xkncContract: XKNC,
  kncContract: Contract,
  kyberProxyContract: KyberProxy,
  chainId: number
) => {
  if (!xkncContract) {
    return {
      priceUsd: 0,
      priceEth: 0,
      aum: 0,
    }
  }

  const proxyValue = parseEther('1')
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const usdcAddress = ADDRESSES[USDC][chainId]
  const ethAddress = ADDRESSES[ETH]

  const [
    xkncTotalSupply,
    xkncKncBal,
    kncUsdRate,
    ethUsdRate,
  ] = await Promise.all([
    xkncContract.totalSupply(),
    xkncContract.getFundKncBalanceTwei(),
    getExpectedRate(
      kyberProxyContract,
      kncContract.address,
      usdcAddress,
      proxyValue
    ),
    getExpectedRate(kyberProxyContract, ethAddress, usdcAddress, proxyValue),
  ])

  const priceUsd = xkncKncBal.mul(kncUsdRate).div(xkncTotalSupply)
  const priceEth = priceUsd.mul(DEC_18).div(ethUsdRate)
  const aum = priceUsd.mul(xkncTotalSupply).div(DEC_18)

  return {
    priceUsd: formatNumber(formatEther(priceUsd)),
    priceEth: formatNumber(formatEther(priceEth), 6),
    aum: formatNumber(formatEther(aum), 0),
  }
}
