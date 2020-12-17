import { JsonRpcProvider } from '@ethersproject/providers'
import { Contract } from 'ethers'
import { formatBytes32String, formatEther } from 'ethers/lib/utils'

import { DEC_18 } from '../../constants'
import { ExchangeRates, TradeAccounting, XSNX } from '../../types'
import { formatNumber } from '../../utils'
import { getTokenBalance } from '../utils'

export const getXSnxPrices = async (
  xsnxContract: XSNX,
  xsnxAdminAddress: string,
  tradeAccountingContract: TradeAccounting,
  exchangeRatesContract: ExchangeRates,
  snxContract: Contract,
  provider: JsonRpcProvider
) => {
  if (!tradeAccountingContract || !exchangeRatesContract) {
    return {
      priceUsd: 0,
      priceEth: 0,
      aum: 0,
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
  const aum = totalSupply.mul(priceUsd).div(DEC_18)

  return {
    priceEth: formatNumber(formatEther(issueTokenPriceInEth)),
    sellPriceEth: formatNumber(formatEther(redeemTokenPriceEth)),
    priceUsd: formatNumber(formatEther(priceUsd)),
    aum: formatNumber(formatEther(aum), 0),
  }
}
