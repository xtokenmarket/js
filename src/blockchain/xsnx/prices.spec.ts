import test from 'ava'
import { Contract } from 'ethers'
import { ADDRESSES, X_SNX_A_ADMIN } from 'xtoken-abis'

import { provider } from '../../constants.spec'
import { ExchangeRates } from '../../types'
import { getExchangeRateContract } from '../utils'

import { getXSnxContracts } from './helper'
import { getXSnxPrices } from './prices'

test('Get xSNXa prices', async (t) => {
  const {
    network,
    snxContract,
    tradeAccountingContract,
    xsnxContract,
  } = await getXSnxContracts(provider)
  const { chainId } = network

  const xsnxAdminAddress = ADDRESSES[X_SNX_A_ADMIN][chainId]
  const exchangeRatesContract = await getExchangeRateContract(provider)

  const { aum, priceEth, priceUsd } = await getXSnxPrices(
    xsnxContract,
    xsnxAdminAddress,
    tradeAccountingContract,
    exchangeRatesContract as ExchangeRates,
    snxContract as Contract,
    provider
  )

  console.log('xSNXa aum:', aum)
  console.log('xSNXa priceEth:', priceEth)
  console.log('xSNXa priceUsd:', priceUsd)
  t.true(aum > 0)
  t.true(priceEth > 0)
  t.true(priceUsd > 0)
})
