import { BaseProvider } from '@ethersproject/providers'
import { X_SNX_A } from '@xtoken/abis'

import { IAsset } from '../../types/xToken'

import { getXSnxContracts } from './helper'
import { getXSnxPrices } from './prices'

export const getXSnxAsset = async (
  symbol: typeof X_SNX_A,
  provider: BaseProvider
): Promise<IAsset> => {
  const { xsnxContract } = await getXSnxContracts(provider)

  const { aum, priceEth, priceUsd } = await getXSnxPrices(xsnxContract)

  return {
    aum,
    mandate: 'Aggressive staker; ETH bull',
    order: 3,
    price: priceUsd,
    priceEth,
    symbol,
  }
}
