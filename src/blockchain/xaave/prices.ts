import { formatEther, parseEther } from 'ethers/lib/utils'
import { AAVE, ADDRESSES, ETH, USDC } from 'xtoken-abis'

import { DEC_18 } from '../../constants'
import { KyberProxy, XAAVE } from '../../types'
import { ITokenPrices } from '../../types/xToken'
import { formatNumber } from '../../utils'
import { getExpectedRate } from '../utils'

/**
 * @example
 * ```typescript
 * import { ethers } from 'ethers'
 * import { ADDRESSES, KYBER_PROXY, X_AAVE_A } from 'xtoken-abis'
 * import KyberProxyAbi from 'xtoken-abis/build/main/abi/KyberProxy.json'
 * import xAAVEAbi from 'xtoken-abis/build/main/abi/xAAVE.json'
 * import { getXAavePrices } from 'xtoken-js'
 *
 * const provider = new ethers.providers.InfuraProvider('homestead', <INFURA_API_KEY>)
 * const network = await provider.getNetwork()
 * const { chainId } = network
 *
 * const xaaveContract = new ethers.Contract(ADDRESSES[X_AAVE_A][chainId], xAAVEAbi, provider)
 * const kyberProxyContract = new ethers.Contract(ADDRESSES[KYBER_PROXY][chainId], KyberProxyAbi, provider)
 *
 * const { priceEth, priceUsd } = await getXAavePrices(
 *   xaaveContract,
 *   kyberProxyContract,
 *   chainId
 * )
 * ```
 *
 * @param {XAAVE} xaaveContract xAAVEa/xAAVEb token contract
 * @param {KyberProxy} kyberProxyContract Kyber Proxy contract
 * @param {number} chainId Connected network's ID, 1 for Mainnet
 * @returns A promise of the token prices in ETH/USD along with AUM
 */
export const getXAavePrices = async (
  xaaveContract: XAAVE,
  kyberProxyContract: KyberProxy,
  chainId: number
): Promise<ITokenPrices> => {
  if (!xaaveContract) {
    return {
      aum: 0,
      priceEth: 0,
      priceUsd: 0,
    }
  }

  const proxyValue = parseEther('1')

  const aaveAddress = ADDRESSES[AAVE][chainId]
  const ethAddress = ADDRESSES[ETH] as string
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
  const priceEth = priceUsd.mul(DEC_18).div(ethUsdRate)
  const aum = priceUsd.mul(xaaveTotalSupply).div(DEC_18)

  return {
    aum: formatNumber(formatEther(aum), 0),
    priceEth: formatNumber(formatEther(priceEth), 6),
    priceUsd: formatNumber(formatEther(priceUsd)),
  }
}
