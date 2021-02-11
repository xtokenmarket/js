import { JsonRpcProvider } from '@ethersproject/providers'
import { formatEther } from 'ethers/lib/utils'

import { XAAVE } from '../../types'
import { IPortfolioItem, ITokenSymbols } from '../../types/xToken'
import { getUserAvailableTokenBalance } from '../utils'

import { getXAaveContracts } from './helper'
import { getXAavePrices } from './prices'

export const getPortfolioItemXAave = async (
  symbol: ITokenSymbols,
  address: string,
  provider: JsonRpcProvider
): Promise<IPortfolioItem> => {
  const {
    kyberProxyContract,
    network,
    xaaveContract,
  } = await getXAaveContracts(symbol, provider)
  const { chainId } = network

  const xaaveBal = await getUserAvailableTokenBalance(xaaveContract, address)

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
    quantity: xaaveBal.toString(),
    price: priceUsd.toString(),
    value: xaaveValue.toString(),
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

  const userTokenEquivalent = contractAaveBal.mul(userXaaveBal).div(xaaveSupply)
  return formatEther(userTokenEquivalent)
}
