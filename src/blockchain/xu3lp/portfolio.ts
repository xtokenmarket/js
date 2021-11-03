import { BaseProvider } from '@ethersproject/providers'

import { DEFAULT_LP_PORTFOLIO_ITEM } from '../../constants'
import { ILPTokenSymbols, IPortfolioItem } from '../../types/xToken'
import { getUserAvailableTokenBalance } from '../utils'

import { getXU3LPContracts } from './helper'
import { getXU3LPPrices } from './prices'

export const getPortfolioItemXU3LP = async (
  symbol: ILPTokenSymbols,
  address: string,
  provider: BaseProvider
): Promise<IPortfolioItem> => {
  try {
    const { xu3lpContract } = await getXU3LPContracts(symbol, provider)

    const xu3lpBal = await getUserAvailableTokenBalance(xu3lpContract, address)

    const { priceUsd } = await getXU3LPPrices(xu3lpContract, provider)
    const xu3lpValue = (xu3lpBal * priceUsd).toFixed(2).toString()

    return {
      symbol,
      quantity: xu3lpBal.toString(),
      price: priceUsd.toString(),
      value: xu3lpValue.toString(),
    }
  } catch (e) {
    console.error('Error while fetching portfolio balance:', e)
    return {
      symbol,
      ...DEFAULT_LP_PORTFOLIO_ITEM,
    }
  }
}
