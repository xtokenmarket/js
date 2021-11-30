import { BaseProvider } from '@ethersproject/providers'

import { ILevAsset, IXAssetLev } from '../../types/xToken'

import { getXAssetLevContracts } from './helper'
import { getXAssetLevPrices } from './prices'

export const getXAssetLev = async (
  symbol: IXAssetLev,
  provider: BaseProvider
): Promise<ILevAsset> => {
  const { xassetlevContract } = await getXAssetLevContracts(symbol, provider)

  const { aum, priceEth, priceUsd } = await getXAssetLevPrices(
    xassetlevContract
  )

  return {
    aum,
    mandate: 'Liquid Staker',
    order: 18,
    price: priceUsd,
    priceEth,
    symbol,
  }
}
