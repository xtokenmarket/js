import { BaseProvider } from '@ethersproject/providers'
import { formatEther } from 'ethers/lib/utils'

import { DEFAULT_PORTFOLIO_ITEM } from '../../constants'
import { XBNT } from '../../types'
import { IPortfolioItem, ITokenSymbols } from '../../types/xToken'
import { getUserAvailableTokenBalance } from '../utils'

import { getXBntContracts } from './helper'
import { getXBntPrices } from './prices'

export const getPortfolioItemXBnt = async (
  symbol: ITokenSymbols,
  address: string,
  provider: BaseProvider
): Promise<IPortfolioItem> => {
  try {
    const { kyberProxyContract, xbntContract } = await getXBntContracts(
      symbol,
      provider
    )

    const xbntBal = await getUserAvailableTokenBalance(xbntContract, address)

    const { priceUsd } = await getXBntPrices(xbntContract, kyberProxyContract)
    const xbntValue = (xbntBal * priceUsd).toFixed(2).toString()

    const tokenEquivalent = await getUnderlyingTokenEquivalent(
      xbntContract,
      address
    )

    return {
      symbol,
      quantity: xbntBal.toString(),
      price: priceUsd.toString(),
      value: xbntValue.toString(),
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
  xbntContract: XBNT,
  address: string
) => {
  const [userXbntBal, contractBntBal, xbntSupply] = await Promise.all([
    xbntContract.balanceOf(address),
    xbntContract.getNav(),
    xbntContract.totalSupply(),
  ])

  const userTokenEquivalent = contractBntBal.mul(userXbntBal).div(xbntSupply)
  return formatEther(userTokenEquivalent)
}
