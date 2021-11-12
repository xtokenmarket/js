import { BaseProvider } from '@ethersproject/providers'
import { formatEther } from 'ethers/lib/utils'

import { DEFAULT_PORTFOLIO_ITEM } from '../../constants'
import { XAAVE } from '../../types'
import { IPortfolioItem, ITokenSymbols } from '../../types/xToken'
import { getUserAvailableTokenBalance } from '../utils'

import { getXAaveContracts } from './helper'
import { getXAavePrices } from './prices'

export const getPortfolioItemXAave = async (
  symbol: ITokenSymbols,
  address: string,
  provider: BaseProvider
): Promise<IPortfolioItem> => {
  try {
    const { xaaveContract } = await getXAaveContracts(symbol, provider)

    const [xaaveBal, { priceUsd }, tokenEquivalent] = await Promise.all([
      getUserAvailableTokenBalance(xaaveContract, address),
      getXAavePrices(xaaveContract),
      getUnderlyingTokenEquivalent(xaaveContract, address),
    ])

    const xaaveValue = (xaaveBal * priceUsd).toFixed(2).toString()

    return {
      symbol,
      quantity: xaaveBal.toString(),
      price: priceUsd.toString(),
      value: xaaveValue.toString(),
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
