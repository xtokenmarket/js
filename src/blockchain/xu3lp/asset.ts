import { BaseProvider } from '@ethersproject/providers'

import { ILPAsset, ILPTokenSymbols } from '../../types/xToken'
import { capitalizeToken, getLPTokenSymbol } from '../utils'

import { getXU3LPContracts } from './helper'
import { getXU3LPPrices } from './prices'

export const getXU3LPAsset = async (
  symbol: ILPTokenSymbols,
  provider: BaseProvider
): Promise<ILPAsset> => {
  const tokens = getLPTokenSymbol(symbol)
  const assets = `${capitalizeToken(tokens[0])}-${capitalizeToken(tokens[1])}`

  const { kyberProxyContract, xu3lpContract } = await getXU3LPContracts(
    symbol,
    provider
  )

  const { aum, priceBtc, priceEth, priceUsd } = await getXU3LPPrices(
    xu3lpContract,
    kyberProxyContract
  )

  return {
    assets,
    aum,
    mandate: `Maximize Yield: ${assets}`,
    price: priceUsd,
    priceBtc,
    priceEth,
    symbol,
  }
}
