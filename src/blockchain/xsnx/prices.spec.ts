import test from 'ava'
import { Contract, ethers } from 'ethers'
import { ADDRESSES, SNX, X_SNX_A_ADMIN } from 'xtoken-abis'

import { ExchangeRates } from '../../types'
import { getContract, getExchangeRateContract } from '../utils'

import { getXSnxContracts } from './helper'
import { getXSnxPrices } from './prices'

const provider = new ethers.providers.InfuraProvider(
  'homestead',
  '645c2c65dd8f4be18a50a0bf011bab85'
)

test('Get xSNXa prices', async (t) => {
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

  const { priceEth, priceUsd } = await getXSnxPrices(
    xsnxContract,
    xsnxAdminAddress,
    tradeAccountingContract,
    exchangeRatesContract as ExchangeRates,
    snxContract as Contract,
    provider
  )

  console.log('xSNXa priceEth:', priceEth)
  console.log('xSNXa priceUsd:', priceUsd)
  t.is(typeof priceEth, 'number')
  t.is(typeof priceUsd, 'number')
})
