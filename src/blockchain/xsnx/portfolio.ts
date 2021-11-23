import { BaseProvider } from '@ethersproject/providers'
import { formatBytes32String, formatEther, parseEther } from 'ethers/lib/utils'

import { DEFAULT_PORTFOLIO_ITEM } from '../../constants'
import { ExchangeRates } from '../../types'
import { IPortfolioItem, ITokenSymbols } from '../../types/xToken'
import { getExchangeRateContract, getUserAvailableTokenBalance } from '../utils'

import { getXSnxContracts } from './helper'
import { getXSnxPrices } from './prices'

export const getPortfolioItemXSnx = async (
  symbol: ITokenSymbols,
  address: string,
  provider: BaseProvider
): Promise<IPortfolioItem> => {
  try {
    const { xsnxContract } = await getXSnxContracts(provider)

    const exchangeRatesContract = (await getExchangeRateContract(
      provider
    )) as ExchangeRates

    const [xsnxBal, { priceUsd }, { rate: snxPriceInUsd }] = await Promise.all([
      getUserAvailableTokenBalance(xsnxContract, address),
      getXSnxPrices(xsnxContract),
      exchangeRatesContract.rateAndUpdatedTime(formatBytes32String('SNX')),
    ])

    const xsnxValue = parseEther((xsnxBal * priceUsd).toString())
    const tokenEquivalent = xsnxValue.div(snxPriceInUsd).toString()

    return {
      symbol,
      quantity: xsnxBal.toString(),
      price: priceUsd.toString(),
      value: formatEther(xsnxValue),
      tokenEquivalent,
    }
  } catch (e) {
    console.error('Error while fetching portfolio balance:', e)
    return {
      symbol,
      ...DEFAULT_PORTFOLIO_ITEM,
    }
  }
}
