import { BaseProvider } from '@ethersproject/providers'
import { X_KNC_A, X_KNC_B } from '@xtoken/abis'

import { IAsset } from '../../types/xToken'

import { getXKncContracts } from './helper'
import { getXKncPrices } from './prices'

export const getXKncAsset = async (
  symbol: typeof X_KNC_A | typeof X_KNC_B,
  provider: BaseProvider
): Promise<IAsset> => {
  const {
    kncContract,
    kyberProxyContract,
    xkncContract,
  } = await getXKncContracts(symbol, provider)

  const { aum, priceUsd } = await getXKncPrices(
    xkncContract,
    kncContract,
    kyberProxyContract
  )

  return {
    aum,
    mandate: `Votes to maximize ${
      symbol === X_KNC_A ? 'staker rewards' : 'reserve rebates'
    }`,
    price: priceUsd,
    symbol,
  }
}
