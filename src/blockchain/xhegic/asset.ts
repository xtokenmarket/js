import { JsonRpcProvider } from '@ethersproject/providers'
import { X_HEGIC_A, X_HEGIC_B } from '@xtoken/abis'

import { IAsset } from '../../types/xToken'

import { getXHegicContracts } from './helper'
import { getXHegicPrices } from './prices'

export const getXHegicAsset = async (
  symbol: typeof X_HEGIC_A | typeof X_HEGIC_B,
  provider: JsonRpcProvider
): Promise<IAsset> => {
  const {
    kyberProxyContract,
    network,
    xhegicContract,
  } = await getXHegicContracts(symbol, provider)
  const { chainId } = network

  const { aum, priceUsd } = await getXHegicPrices(
    xhegicContract,
    kyberProxyContract,
    chainId
  )

  return {
    aum,
    mandate: `Staking Module; ${
      symbol === X_HEGIC_A ? 'Buchanan' : 'Samuelson'
    } Mandate`,
    price: priceUsd,
    symbol,
  }
}
