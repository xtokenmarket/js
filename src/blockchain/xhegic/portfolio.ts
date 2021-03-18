import { JsonRpcProvider } from '@ethersproject/providers'
import { formatEther } from 'ethers/lib/utils'

import { XAAVE } from '../../types'
import { IPortfolioItem, ITokenSymbols } from '../../types/xToken'
import { getUserAvailableTokenBalance } from '../utils'

import { getXHegicContracts } from './helper'
import { getXHegicPrices } from './prices'

export const getPortfolioItemXHegic = async (
  symbol: ITokenSymbols,
  address: string,
  provider: JsonRpcProvider
): Promise<IPortfolioItem> => {
  const {
    kyberProxyContract,
    network,
    xhegicContract,
  } = await getXHegicContracts(symbol, provider)
  const { chainId } = network

  const xhegicBal = await getUserAvailableTokenBalance(xhegicContract, address)

  const { priceUsd } = await getXHegicPrices(
    xhegicContract,
    kyberProxyContract,
    chainId
  )
  const xhegicValue = (xhegicBal * priceUsd).toFixed(2).toString()

  const tokenEquivalent = await getUnderlyingTokenEquivalent(
    xhegicContract,
    address
  )

  return {
    symbol,
    quantity: xhegicBal.toString(),
    price: priceUsd.toString(),
    value: xhegicValue.toString(),
    tokenEquivalent,
  }
}

const getUnderlyingTokenEquivalent = async (
  xhegicContract: XAAVE,
  address: string
) => {
  const [userXhegicBal, contractHegicBal, xhegicSupply] = await Promise.all([
    xhegicContract.balanceOf(address),
    xhegicContract.getFundHoldings(),
    xhegicContract.totalSupply(),
  ])

  const userTokenEquivalent = contractHegicBal
    .mul(userXhegicBal)
    .div(xhegicSupply)
  return formatEther(userTokenEquivalent)
}
