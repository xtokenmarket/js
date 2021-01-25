import { formatEther, parseEther } from 'ethers/lib/utils'
import { ADDRESSES, ETH, INCH, USDC } from 'xtoken-abis'

import { DEC_18 } from '../../constants'
import { InchLiquidityProtocol, KyberProxy, XINCH } from '../../types'
import { ITokenPrices } from '../../types/xToken'
import { formatNumber } from '../../utils'
import { getExpectedRate } from '../utils'

import { getExpectedRateInch } from './helper'

/**
 * @example
 * ```typescript
 * import { ethers } from 'ethers'
 * import { ADDRESSES, INCH_LIQUIDITY_PROTOCOL, X_INCH_A } from 'xtoken-abis'
 * import InchLiquidityProtocolAbi from 'xtoken-abis/build/main/abi/InchLiquidityProtocol.json'
 * import KyberProxyAbi from 'xtoken-abis/build/main/abi/KyberProxy.json'
 * import xINCHAbi from 'xtoken-abis/build/main/abi/xINCH.json'
 * import { getXInchPrices } from 'xtoken-js'
 *
 * const provider = new ethers.providers.InfuraProvider('homestead', <INFURA_API_KEY>)
 * const network = await provider.getNetwork()
 * const { chainId } = network
 *
 * const xinchContract = new ethers.Contract(ADDRESSES[X_INCH_A][chainId], xINCHAbi, provider)
 * const inchLiquidityProtocolContract = new ethers.Contract(ADDRESSES[INCH_LIQUIDITY_PROTOCOL][chainId], InchLiquidityProtocolAbi, provider)
 * const kyberProxyContract = new ethers.Contract(ADDRESSES[KYBER_PROXY][chainId], KyberProxyAbi, provider)
 *
 * const { priceEth, priceUsd } = await getXInchPrices(
 *   xinchContract,
 *   inchLiquidityProtocolContract,
 *   kyberProxyContract,
 *   chainId
 * )
 * ```
 *
 * @param {XINCH} xinchContract xINCHa/xINCHb token contract
 * @param {InchLiquidityProtocol} inchLiquidityProtocolContract 1Inch liquidity protocol contract
 * @param {KyberProxy} kyberProxyContract Kyber proxy contract
 * @param {number} chainId Connected network's ID, 1 for Mainnet
 * @returns A promise of the token prices in ETH/USD along with AUM
 */
export const getXInchPrices = async (
  xinchContract: XINCH,
  inchLiquidityProtocolContract: InchLiquidityProtocol,
  kyberProxyContract: KyberProxy,
  chainId: number
): Promise<ITokenPrices> => {
  if (!xinchContract) {
    return {
      aum: 0,
      priceEth: 0,
      priceUsd: 0,
    }
  }

  const proxyValue = parseEther('1')

  const inchAddress = ADDRESSES[INCH][chainId]
  const ethAddress = ADDRESSES[ETH] as string
  const usdcAddress = ADDRESSES[USDC][chainId]

  const [
    xinchTotalSupply,
    inchHoldings,
    inchUsdRate,
    ethUsdRate,
  ] = await Promise.all([
    xinchContract.totalSupply(),
    xinchContract.getNav(),
    getExpectedRateInch(
      inchLiquidityProtocolContract,
      inchAddress,
      usdcAddress,
      proxyValue
    ),
    getExpectedRate(kyberProxyContract, ethAddress, usdcAddress, proxyValue),
  ])

  const xinchPerToken = inchHoldings.mul(DEC_18).div(xinchTotalSupply)
  const priceUsd = xinchPerToken.mul(inchUsdRate).div(DEC_18)
  const priceEth = priceUsd.mul(DEC_18).div(ethUsdRate)
  const aum = priceUsd.mul(xinchTotalSupply).div(DEC_18)

  return {
    aum: formatNumber(formatEther(aum), 0),
    priceEth: formatNumber(formatEther(priceEth), 6),
    priceUsd: formatNumber(formatEther(priceUsd)),
  }
}
