import { BaseProvider } from '@ethersproject/providers'
import { X_BTC_3X, X_ETH_3X } from '@xtoken/abis'

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

  let order = -1
  switch (symbol) {
    case X_BTC_3X:
      order = 18
      break
    case X_ETH_3X:
      order = 19
      break
  }

  return {
    aum,
    mandate: '3x leverage target',
    order,
    price: priceUsd,
    priceEth,
    symbol,
  }
}
