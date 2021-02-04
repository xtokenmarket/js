import { JsonRpcProvider } from '@ethersproject/providers'
import { Contract } from 'ethers'
import { formatBytes32String, formatEther } from 'ethers/lib/utils'

import { DEC_18 } from '../../constants'
import { ExchangeRates, TradeAccounting, XSNX } from '../../types'
import { ITokenPrices } from '../../types/xToken'
import { formatNumber } from '../../utils'
import { getTokenBalance } from '../utils'

/**
 * @example
 * ```typescript
 * import { ethers } from 'ethers'
 * import { ADDRESSES, EXCHANGE_RATES, TRADE_ACCOUNTING, SNX, X_SNX_A, X_SNX_A_ADMIN } from 'xtoken-abis'
 * import ExchangeRatesAbi from 'xtoken-abis/build/main/abi/ExchangeRates.json'
 * import SynthetixAbi from 'xtoken-abis/build/main/abi/Synthetix.json'
 * import TradeAccountingAbi from 'xtoken-abis/build/main/abi/TradeAccounting.json'
 * import xSNXAbi from 'xtoken-abis/build/main/abi/xSNX.json'
 * import { getXSnxPrices } from 'xtoken-js'
 *
 * const provider = new ethers.providers.InfuraProvider('homestead', <INFURA_API_KEY>)
 * const network = await provider.getNetwork()
 * const { chainId } = network
 *
 * const xsnxContract = new ethers.Contract(ADDRESSES[X_SNX_A][chainId], xSNXAbi, provider)
 * const snxContract = new ethers.Contract(ADDRESSES[SNX][chainId], SynthetixAbi, provider)
 * const exchangeRatesContract = new ethers.Contract(ADDRESSES[EXCHANGE_RATES][chainId], ExchangeRatesAbi, provider)
 * const tradeAccountingContract = new ethers.Contract(ADDRESSES[TRADE_ACCOUNTING][chainId], TradeAccountingAbi, provider)
 *
 * const { priceEth, priceUsd } = await getXSnxPrices(
 *   xsnxContract,
 *   ADDRESSES[X_SNX_A_ADMIN][chainId],
 *   tradeAccountingContract,
 *   exchangeRatesContract,
 *   snxContract,
 *   provider
 * )
 * ```
 *
 * @param {XSNX} xsnxContract xSNXa token contract
 * @param {string} xsnxAdminAddress XSNX contract admin address
 * @param {TradeAccounting} tradeAccountingContract Trade accounting contract
 * @param {ExchangeRates} exchangeRatesContract Exchange rates contract
 * @param {Contract} snxContract SNX contract
 * @param {JsonRpcProvider} provider Ether.js Provider
 * @returns A promise of the token prices in ETH/USD along with AUM
 */
export const getXSnxPrices = async (
  xsnxContract: XSNX,
  xsnxAdminAddress: string,
  tradeAccountingContract: TradeAccounting,
  exchangeRatesContract: ExchangeRates,
  snxContract: Contract,
  provider: JsonRpcProvider
): Promise<ITokenPrices> => {
  if (!tradeAccountingContract || !exchangeRatesContract) {
    return {
      aum: 0,
      priceEth: 0,
      priceUsd: 0,
      sellPriceEth: 0,
    }
  }

  const [
    { rate: snxUsdPrice },
    { rate: ethUsdPrice },
    contractDebtValue,
  ] = await Promise.all([
    exchangeRatesContract.rateAndUpdatedTime(formatBytes32String('SNX')),
    exchangeRatesContract.rateAndUpdatedTime(formatBytes32String('sETH')),
    snxContract.debtBalanceOf(xsnxAdminAddress, formatBytes32String('sUSD')),
  ])
  const weiPerOneSnx = snxUsdPrice.mul(DEC_18).div(ethUsdPrice)

  const [
    snxBalanceBefore,
    setHoldings,
    ethBal,
    totalSupply,
    snxBalanceOwned,
  ] = await Promise.all([
    tradeAccountingContract.getSnxBalance(),
    tradeAccountingContract.getSetHoldingsValueInWei(),
    tradeAccountingContract.getEthBalance(),
    xsnxContract.totalSupply(),
    getTokenBalance(snxContract.address, xsnxAdminAddress, provider),
  ])
  const nonSnxAssetValue = setHoldings.add(ethBal)

  const [issueTokenPriceInEth, redeemTokenPriceEth] = await Promise.all([
    tradeAccountingContract.calculateIssueTokenPrice(
      weiPerOneSnx,
      snxBalanceBefore,
      nonSnxAssetValue,
      totalSupply
    ),
    tradeAccountingContract.calculateRedeemTokenPrice(
      totalSupply,
      snxBalanceOwned,
      contractDebtValue
    ),
  ])

  const priceUsd = issueTokenPriceInEth.mul(ethUsdPrice).div(DEC_18)
  const sellPriceUsd = redeemTokenPriceEth.mul(ethUsdPrice).div(DEC_18)
  const aum = totalSupply.mul(priceUsd).div(DEC_18)

  return {
    aum: formatNumber(formatEther(aum), 0),
    priceEth: formatNumber(formatEther(issueTokenPriceInEth)),
    priceUsd: formatNumber(formatEther(priceUsd)),
    sellPriceEth: formatNumber(formatEther(redeemTokenPriceEth)),
    sellPriceUsd: formatNumber(formatEther(sellPriceUsd)),
  }
}
