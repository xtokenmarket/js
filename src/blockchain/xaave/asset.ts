import { BaseProvider } from '@ethersproject/providers'
import { X_AAVE_A, X_AAVE_B } from '@xtoken/abis'

import { IAsset } from '../../types/xToken'

import { getXAaveContracts } from './helper'
import { getXAavePrices } from './prices'

export const getXAaveAsset = async (
  symbol: typeof X_AAVE_A | typeof X_AAVE_B,
  provider: BaseProvider
): Promise<IAsset> => {
  const { xaaveContract } = await getXAaveContracts(symbol, provider)

  const { aum, priceEth, priceUsd } = await getXAavePrices(xaaveContract)

  return {
    aum,
    mandate: `Staking Module; ${
      symbol === X_AAVE_A ? 'Buchanan' : 'Samuelson'
    } Mandate`,
    order: symbol === X_AAVE_A ? 5 : 4,
    price: priceUsd,
    priceEth,
    symbol,
  }
}
