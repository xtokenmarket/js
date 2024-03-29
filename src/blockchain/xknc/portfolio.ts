import { BaseProvider } from '@ethersproject/providers'
import { formatEther } from 'ethers/lib/utils'

import { DEFAULT_PORTFOLIO_ITEM } from '../../constants'
import { XKNC } from '../../types'
import { IPortfolioItem, ITokenSymbols } from '../../types/xToken'
import { getUserAvailableTokenBalance } from '../utils'

import { getXKncContracts } from './helper'
import { getXKncPrices } from './prices'

export const getPortfolioItemXKnc = async (
  symbol: ITokenSymbols,
  address: string,
  provider: BaseProvider
): Promise<IPortfolioItem> => {
  try {
    const { xkncContract } = await getXKncContracts(symbol, provider)

    const [xkncBal, { priceUsd }, tokenEquivalent] = await Promise.all([
      getUserAvailableTokenBalance(xkncContract, address),
      getXKncPrices(xkncContract),
      getUnderlyingTokenEquivalent(xkncContract, address),
    ])

    const xkncValue = (xkncBal * priceUsd).toFixed(2)

    return {
      symbol,
      quantity: xkncBal.toString(),
      price: priceUsd.toString(),
      value: xkncValue.toString(),
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
