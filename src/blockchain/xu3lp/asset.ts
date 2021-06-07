import { BaseProvider } from '@ethersproject/providers'

import { ILPAsset, ILPTokenSymbols } from '../../types/xToken'
import { capitalizeToken, getLPTokenSymbol } from '../utils'

import { getXU3LPContracts } from './helper'
import { getXU3LPPrices } from './prices'

export const getXU3LPAsset = async (
  symbol: ILPTokenSymbols,
  provider: BaseProvider
): Promise<ILPAsset> => {
  const assets = getLPTokenSymbol(symbol)
  const { kyberProxyContract, xu3lpContract } = await getXU3LPContracts(
    symbol,
    provider
  )

  const { aum, priceUsd } = await getXU3LPPrices(
    xu3lpContract,
    kyberProxyContract
  )

  return {
    aum,
    mandate: `Maximize Yield: ${capitalizeToken(assets[0])}-${capitalizeToken(
      assets[1]
    )}`,
    price: priceUsd,
    symbol,
  }
}
