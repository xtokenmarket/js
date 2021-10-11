import { BaseProvider } from '@ethersproject/providers'
import { X_BNT_A } from '@xtoken/abis'

import { IAsset } from '../../types/xToken'

import { getXBntContracts } from './helper'
import { getXBntPrices } from './prices'

export const getXBntAsset = async (
  symbol: typeof X_BNT_A,
  provider: BaseProvider
): Promise<IAsset> => {
  const { kyberProxyContract, xbntContract } = await getXBntContracts(
    symbol,
    provider
  )

  const { aum, priceEth, priceUsd } = await getXBntPrices(
    xbntContract,
    kyberProxyContract
  )

  return {
    aum,
    mandate: 'Dynamic Allocator; Buchanan Mandate',
    order: 8,
    price: priceUsd,
    priceEth,
    symbol,
  }
}
