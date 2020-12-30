import { JsonRpcProvider } from '@ethersproject/providers'

import { DEC_18 } from '../../constants'
import { XAAVE } from '../../types'
import { ITokenSymbols } from '../../types/xToken'
import { formatNumberWithCommas } from '../../utils'
import { getUserAvailableTokenBalance } from '../utils'

import { getXAaveContracts } from './helper'
import { getXAavePrices } from './prices'

export const getPortfolioItemXAave = async (
  symbol: ITokenSymbols,
  address: string,
  provider: JsonRpcProvider,
  loggedIn: boolean
) => {
  const {
    kyberProxyContract,
    network,
    xaaveContract,
  } = await getXAaveContracts(symbol, provider)
  const { chainId } = network

  let xaaveBal
  if (loggedIn) {
    xaaveBal = await getUserAvailableTokenBalance(xaaveContract, address)
  } else {
    xaaveBal = 0
  }

  const { priceUsd } = await getXAavePrices(
    xaaveContract,
    kyberProxyContract,
    chainId
  )
  const xaaveValue = (xaaveBal * priceUsd).toFixed(2).toString()

  const tokenEquivalent = await getUnderlyingTokenEquivalent(
    xaaveContract,
    address
  )

  return {
    symbol,
    quantity: formatNumberWithCommas(xaaveBal.toString()),
    price: `$${priceUsd}`,
    value: `$${formatNumberWithCommas(xaaveValue)}`,
    tokenEquivalent,
  }
}

const getUnderlyingTokenEquivalent = async (
  xaaveContract: XAAVE,
  address: string
) => {
  const [userXaaveBal, contractAaveBal, xaaveSupply] = await Promise.all([
    xaaveContract.balanceOf(address),
    xaaveContract.getFundHoldings(),
    xaaveContract.totalSupply(),
  ])

  const userTokenEquivalent = contractAaveBal
    .mul(userXaaveBal)
    .div(xaaveSupply)
    .div(DEC_18)
  if (Number(userTokenEquivalent) < 1000)
    return Number(userTokenEquivalent).toFixed(4)
  return formatNumberWithCommas(userTokenEquivalent.toString())
}
