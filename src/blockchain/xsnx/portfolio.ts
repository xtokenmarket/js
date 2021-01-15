import { JsonRpcProvider } from '@ethersproject/providers'
import { Contract } from 'ethers'
import { formatEther } from 'ethers/lib/utils'
import { ADDRESSES, SNX, X_SNX_A_ADMIN } from 'xtoken-abis'

import { ExchangeRates } from '../../types'
import { IPortfolioItem, ITokenSymbols } from '../../types/xToken'
import { formatNumberWithCommas } from '../../utils'
import {
  getContract,
  getExchangeRateContract,
  getTokenBalance,
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

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const xsnxAdminAddress = ADDRESSES[X_SNX_A_ADMIN][chainId]

  const exchangeRatesContract = await getExchangeRateContract(provider)
  const snxContract = getContract(SNX, provider, network)
  const xsnxBal = await getUserAvailableTokenBalance(xsnxContract, address)
  const xsnxBalRaw = await getTokenBalance(
    xsnxContract.address,
    address,
    provider
  )
  const { priceUsd } = await getXSnxPrices(
    xsnxContract,
    xsnxAdminAddress,
    tradeAccountingContract,
    exchangeRatesContract as ExchangeRates,
    snxContract as Contract,
    provider
  )
  const xsnxValue = (xsnxBal * priceUsd).toFixed(2)

  const xsnxTotalSupply = await xsnxContract.totalSupply()
  const contractSnxBalance = await tradeAccountingContract.getSnxBalance()
  const tokenEquivalent = contractSnxBalance
    .mul(xsnxBalRaw)
    .div(xsnxTotalSupply)

  return {
    symbol,
    quantity: formatNumberWithCommas(xsnxBal.toString()),
    price: `$${priceUsd}`,
    value: `$${xsnxValue}`,
    tokenEquivalent: formatNumberWithCommas(formatEther(tokenEquivalent)),
  }
}
