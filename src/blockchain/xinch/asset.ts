import { JsonRpcProvider } from '@ethersproject/providers'
import { X_INCH_A, X_INCH_B } from '@xtoken/abis'

import { IAsset } from '../../types/xToken'

import { getXInchContracts } from './helper'
import { getXInchPrices } from './prices'

export const getXInchAsset = async (
  symbol: typeof X_INCH_A | typeof X_INCH_B,
  provider: JsonRpcProvider
): Promise<IAsset> => {
  const {
    kyberProxyContract,
    network,
    xinchContract,
  } = await getXInchContracts(symbol, provider)
  const { chainId } = network

  const { aum, priceUsd } = await getXInchPrices(
    xinchContract,
    kyberProxyContract,
    chainId
  )

  return {
    aum,
    mandate: `Accumulator; ${
      symbol === X_INCH_A ? 'Buchanan' : 'Samuelson'
    } Mandate`,
    price: priceUsd,
    symbol,
  }
}
