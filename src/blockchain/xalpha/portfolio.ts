import { BaseProvider } from '@ethersproject/providers'
import { formatEther } from 'ethers/lib/utils'

import { DEFAULT_PORTFOLIO_ITEM } from '../../constants'
import { XALPHA } from '../../types'
import { IPortfolioItem, ITokenSymbols } from '../../types/xToken'
import { getUserAvailableTokenBalance } from '../utils'

import { getXAlphaContracts } from './helper'
import { getXAlphaPrices } from './prices'

export const getPortfolioItemXAlpha = async (
  symbol: ITokenSymbols,
  address: string,
  provider: BaseProvider
): Promise<IPortfolioItem> => {
  try {
    const { xalphaContract } = await getXAlphaContracts(symbol, provider)

    const [xalphaBal, { priceUsd }, tokenEquivalent] = await Promise.all([
      getUserAvailableTokenBalance(xalphaContract, address),
      getXAlphaPrices(xalphaContract),
      getUnderlyingTokenEquivalent(xalphaContract, address),
    ])

    const xalphaValue = (xalphaBal * priceUsd).toFixed(2).toString()

    return {
      symbol,
      quantity: xalphaBal.toString(),
      price: priceUsd.toString(),
      value: xalphaValue.toString(),
      tokenEquivalent,
    }
  } catch (e) {
    console.error('Error while fetching portfolio balance: ', e)
    return {
      symbol,
      ...DEFAULT_PORTFOLIO_ITEM,
    }
  }
}

const getUnderlyingTokenEquivalent = async (
  xalphaContract: XALPHA,
  address: string
) => {
  const [userXalphaBal, contractAlphaBal, xalphaSupply] = await Promise.all([
    xalphaContract.balanceOf(address),
    xalphaContract.getNav(),
    xalphaContract.totalSupply(),
  ])

  const userTokenEquivalent = contractAlphaBal
    .mul(userXalphaBal)
    .div(xalphaSupply)
  return formatEther(userTokenEquivalent)
}
