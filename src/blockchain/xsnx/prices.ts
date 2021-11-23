import { BaseProvider } from '@ethersproject/providers'
import { ADDRESSES, X_SNX_ADMIN } from '@xtoken/abis'
import { SNX } from '@xtoken/abis'
import { formatBytes32String, formatEther, parseEther } from 'ethers/lib/utils'

import { DEC_18, DEFAULT_PRICES } from '../../constants'
import { ExchangeRates, XSNX } from '../../types'
import { ITokenPrices } from '../../types/xToken'
import { formatNumber } from '../../utils'
import { getTokenBalance } from '../erc20'
import { getExchangeRateContract } from '../utils'

import { getXSnxContracts } from './helper'

/**
 * @example
 * ```typescript
 * import { ethers } from 'ethers'
 * import { Abi, ADDRESSES, X_SNX_A } from '@xtoken/abis'
 * import { getXSnxPrices } from '@xtoken/js'
 *
 * const provider = new ethers.providers.InfuraProvider('homestead', <INFURA_API_KEY>)
 * const xsnxContract = new ethers.Contract(ADDRESSES[X_SNX_A][chainId], Abi.xSNX, provider)
 *
 * const { priceEth, priceUsd } = await getXSnxPrices(xsnxContract)
 * ```
 *
 * @param {XSNX} xsnxContract xSNXa token contract
 * @returns A promise of the token prices in ETH/USD along with AUM
 */
export const getXSnxPrices = async (
  xsnxContract: XSNX
): Promise<ITokenPrices> => {
  try {
    const { provider } = xsnxContract
    const { chainId } = await provider.getNetwork()
    const xsnxAdminAddress = ADDRESSES[X_SNX_ADMIN][chainId]

    const { snxContract, tradeAccountingContract } = await getXSnxContracts(
      provider as BaseProvider
    )
    const exchangeRatesContract = (await getExchangeRateContract(
      provider as BaseProvider
    )) as ExchangeRates

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
      snxTokenBalance,
    ] = await Promise.all([
      tradeAccountingContract.getSnxBalance(),
      tradeAccountingContract.getSetHoldingsValueInWei(),
      tradeAccountingContract.getEthBalance(),
      xsnxContract.totalSupply(),
      getTokenBalance(SNX, xsnxAdminAddress, provider as BaseProvider),
    ])

    const snxBalanceOwned = parseEther(snxTokenBalance)
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
  } catch (e) {
    console.error('Error while fetching token price:', e)
    return DEFAULT_PRICES
  }
}
