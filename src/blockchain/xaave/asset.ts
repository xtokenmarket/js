import { JsonRpcProvider } from '@ethersproject/providers'
import { X_AAVE_A, X_AAVE_B } from 'xtoken-abis'

import { IAsset } from '../../types/xToken'

import { getXAaveContracts } from './helper'
import { getXAavePrices } from './prices'

export const getXAaveAsset = async (
  symbol: typeof X_AAVE_A | typeof X_AAVE_B,
  provider: JsonRpcProvider
): Promise<IAsset> => {
  const {
    kyberProxyContract,
    network,
    xaaveContract,
  } = await getXAaveContracts(symbol, provider)
  const { chainId } = network

  const { aum, priceUsd } = await getXAavePrices(
    xaaveContract,
    kyberProxyContract,
    chainId
  )

  return {
    aum,
    mandate: `Staking Module; ${
      symbol === X_AAVE_A ? 'Buchanan' : 'Samuelson'
    } Mandate`,
    price: priceUsd,
    symbol,
  }
}
