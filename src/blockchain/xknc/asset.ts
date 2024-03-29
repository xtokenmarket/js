import { BaseProvider } from '@ethersproject/providers'
import { X_KNC_A, X_KNC_B } from '@xtoken/abis'

import { IAsset } from '../../types/xToken'

import { getXKncContracts } from './helper'
import { getXKncPrices } from './prices'

export const getXKncAsset = async (
  symbol: typeof X_KNC_A | typeof X_KNC_B,
  provider: BaseProvider
): Promise<IAsset> => {
  const { xkncContract } = await getXKncContracts(symbol, provider)

  const { aum, priceEth, priceUsd } = await getXKncPrices(xkncContract)

  return {
    aum,
    mandate: `Votes to maximize ${
      symbol === X_KNC_A ? 'staker rewards' : 'reserve rebates'
    }`,
    order: symbol === X_KNC_A ? 2 : 1,
    price: priceUsd,
    priceEth,
    symbol,
  }
}
