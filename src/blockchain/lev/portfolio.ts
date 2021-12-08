import { BaseProvider } from '@ethersproject/providers'
import { formatEther } from 'ethers/lib/utils'

import { DEFAULT_PORTFOLIO_ITEM } from '../../constants'
import { XAssetLev } from '../../types'
import { IPortfolioItem, IXAssetLev } from '../../types/xToken'
import { getUserAvailableTokenBalance } from '../utils'

import { getXAssetLevContracts } from './helper'
import { getXAssetLevPrices } from './prices'

export const getPortfolioItemXAssetLev = async (
  symbol: IXAssetLev,
  address: string,
  provider: BaseProvider
): Promise<IPortfolioItem> => {
  try {
    const { xassetlevContract } = await getXAssetLevContracts(symbol, provider)

    const [xassetlevBal, { priceUsd }, tokenEquivalent] = await Promise.all([
      getUserAvailableTokenBalance(xassetlevContract, address),
      getXAssetLevPrices(xassetlevContract),
      getUnderlyingTokenEquivalent(xassetlevContract, address),
    ])

    const xassetlevValue = (xassetlevBal * priceUsd).toFixed(2).toString()

    return {
      symbol,
      quantity: xassetlevBal.toString(),
      price: priceUsd.toString(),
      value: xassetlevValue.toString(),
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
  xassetlevContract: XAssetLev,
  address: string
) => {
  const [
    userXAssetLevBal,
    { bufferBalance, marketBalance },
    xassetlevSupply,
  ] = await Promise.all([
    xassetlevContract.balanceOf(address),
    xassetlevContract.getFundBalances(),
    xassetlevContract.totalSupply(),
  ])

  const userTokenEquivalent = bufferBalance
    .add(marketBalance)
    .mul(userXAssetLevBal)
    .div(xassetlevSupply)
  return formatEther(userTokenEquivalent)
}
