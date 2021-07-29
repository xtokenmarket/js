import { BaseProvider } from '@ethersproject/providers'
import { ADDRESSES, X_SNX_A, X_SNX_ADMIN } from '@xtoken/abis'
import { Contract } from 'ethers'

import { ExchangeRates } from '../../types'
import { IAsset } from '../../types/xToken'
import { getExchangeRateContract } from '../utils'

import { getXSnxContracts } from './helper'
import { getXSnxPrices } from './prices'

export const getXSnxAsset = async (
  symbol: typeof X_SNX_A,
  provider: BaseProvider
): Promise<IAsset> => {
  const {
    network,
    snxContract,
    tradeAccountingContract,
    xsnxContract,
  } = await getXSnxContracts(provider)
  const { chainId } = network

  const xsnxAdminAddress = ADDRESSES[X_SNX_ADMIN][chainId]
  const exchangeRatesContract = (await getExchangeRateContract(
    provider
  )) as ExchangeRates

  const { aum, priceUsd } = await getXSnxPrices(
    xsnxContract,
    xsnxAdminAddress,
    tradeAccountingContract,
    exchangeRatesContract,
    snxContract as Contract,
    provider
  )

  return {
    aum,
    mandate: 'Aggressive staker; cautious ETH bull',
    price: priceUsd,
    symbol,
  }
}
