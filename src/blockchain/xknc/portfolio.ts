import { JsonRpcProvider } from '@ethersproject/providers'
import { Contract } from 'ethers'
import { formatEther } from 'ethers/lib/utils'

import { XKNC } from '../../types'
import { IPortfolioItem, ITokenSymbols } from '../../types/xToken'
import { getUserAvailableTokenBalance } from '../utils'

import { getXKncContracts } from './helper'
import { getXKncPrices } from './prices'

export const getPortfolioItemXKnc = async (
  symbol: ITokenSymbols,
  address: string,
  provider: JsonRpcProvider
): Promise<IPortfolioItem> => {
  const {
    kncContract,
    kyberProxyContract,
    xkncContract,
  } = await getXKncContracts(symbol, provider)

  const xkncBal = await getUserAvailableTokenBalance(xkncContract, address)

  const { priceUsd } = await getXKncPrices(
    xkncContract,
    kncContract as Contract,
    kyberProxyContract
  )
  const xkncValue = (xkncBal * priceUsd).toFixed(2)
  const tokenEquivalent = await getUnderlyingTokenEquivalent(
    xkncContract,
    address
  )

  return {
    symbol,
    quantity: xkncBal.toString(),
    price: priceUsd.toString(),
    value: xkncValue.toString(),
    tokenEquivalent,
  }
}

const getUnderlyingTokenEquivalent = async (
  xkncContract: XKNC,
  address: string
) => {
  const [userXkncBal, contractKncBal, xkncSupply] = await Promise.all([
    xkncContract.balanceOf(address),
    xkncContract.getFundKncBalanceTwei(),
    xkncContract.totalSupply(),
  ])

  const userTokenEquivalent = contractKncBal.mul(userXkncBal).div(xkncSupply)
  return formatEther(userTokenEquivalent)
}
