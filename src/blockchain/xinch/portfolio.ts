import { BaseProvider } from '@ethersproject/providers'
import { formatEther } from 'ethers/lib/utils'

import { DEFAULT_PORTFOLIO_ITEM } from '../../constants'
import { XINCH } from '../../types'
import { IPortfolioItem, ITokenSymbols } from '../../types/xToken'
import { getUserAvailableTokenBalance } from '../utils'

import { getXInchContracts } from './helper'
import { getXInchPrices } from './prices'

export const getPortfolioItemXInch = async (
  symbol: ITokenSymbols,
  address: string,
  provider: BaseProvider
): Promise<IPortfolioItem> => {
  try {
    const { xinchContract } = await getXInchContracts(symbol, provider)

    const [xinchBal, { priceUsd }, tokenEquivalent] = await Promise.all([
      getUserAvailableTokenBalance(xinchContract, address),
      getXInchPrices(xinchContract),
      getUnderlyingTokenEquivalent(xinchContract, address),
    ])

    const xinchValue = (xinchBal * priceUsd).toFixed(2)

    return {
      symbol,
      quantity: xinchBal.toString(),
      price: priceUsd.toString(),
      value: xinchValue.toString(),
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
  xinchContract: XINCH,
  address: string
) => {
  const [userXinchBal, inchHoldings, xinchSupply] = await Promise.all([
    xinchContract.balanceOf(address),
    xinchContract.getNav(),
    xinchContract.totalSupply(),
  ])

  const userTokenEquivalent = inchHoldings.mul(userXinchBal).div(xinchSupply)
  return formatEther(userTokenEquivalent)
}
