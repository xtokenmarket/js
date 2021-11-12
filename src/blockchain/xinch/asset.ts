import { BaseProvider } from '@ethersproject/providers'
import { X_INCH_A, X_INCH_B } from '@xtoken/abis'

import { IAsset } from '../../types/xToken'

import { getXInchContracts } from './helper'
import { getXInchPrices } from './prices'

export const getXInchAsset = async (
  symbol: typeof X_INCH_A | typeof X_INCH_B,
  provider: BaseProvider
): Promise<IAsset> => {
  const { xinchContract } = await getXInchContracts(symbol, provider)

  const { aum, priceEth, priceUsd } = await getXInchPrices(xinchContract)

  return {
    aum,
    mandate: `Accumulator; ${
      symbol === X_INCH_A ? 'Buchanan' : 'Samuelson'
    } Mandate`,
    order: symbol === X_INCH_A ? 7 : 6,
    price: priceUsd,
    priceEth,
    symbol,
  }
}
