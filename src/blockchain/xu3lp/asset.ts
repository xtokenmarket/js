import { BaseProvider } from '@ethersproject/providers'

import { ILPAsset, ILPTokenSymbols } from '../../types/xToken'

import { getXU3LPContracts } from './helper'
import { getXU3LPPrices } from './prices'

export const getXU3LPAsset = async (
  symbol: ILPTokenSymbols,
  provider: BaseProvider
): Promise<ILPAsset> => {
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
    price: priceUsd,
    symbol,
  }
}
