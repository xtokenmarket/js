import { JsonRpcProvider } from '@ethersproject/providers'
import { Contract } from 'ethers'
import { formatBytes32String, formatEther, parseEther } from 'ethers/lib/utils'
import { ADDRESSES, SNX, X_SNX_A_ADMIN } from 'xtoken-abis'

import { ExchangeRates } from '../../types'
import { IPortfolioItem, ITokenSymbols } from '../../types/xToken'
import {
  getContract,
  getExchangeRateContract,
  getUserAvailableTokenBalance,
} from '../utils'

import { getXSnxContracts } from './helper'
import { getXSnxPrices } from './prices'

// Might need to refactor if we add xSNX instance
export const getPortfolioItemXSnx = async (
  symbol: ITokenSymbols,
  address: string,
  provider: JsonRpcProvider
): Promise<IPortfolioItem> => {
  const {
    network,
    tradeAccountingContract,
    xsnxContract,
  } = await getXSnxContracts(provider)
  const { chainId } = network

  const xsnxAdminAddress = ADDRESSES[X_SNX_A_ADMIN][chainId]

  const exchangeRatesContract = (await getExchangeRateContract(
    provider
  )) as ExchangeRates
  const snxContract = getContract(SNX, provider, network)

  const xsnxBal = await getUserAvailableTokenBalance(xsnxContract, address)
  const {
    rate: snxPriceInUsd,
  } = await exchangeRatesContract.rateAndUpdatedTime(formatBytes32String('SNX'))
  const { priceUsd } = await getXSnxPrices(
    xsnxContract,
    xsnxAdminAddress,
    tradeAccountingContract,
    exchangeRatesContract,
    snxContract as Contract,
    provider
  )

  const xsnxValue = parseEther((xsnxBal * priceUsd).toString())
  const tokenEquivalent = xsnxValue.div(snxPriceInUsd).toString()

  return {
    symbol,
    quantity: xsnxBal.toString(),
    price: priceUsd.toString(),
    value: formatEther(xsnxValue),
    tokenEquivalent,
  }
}
