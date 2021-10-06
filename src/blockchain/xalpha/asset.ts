import { BaseProvider } from '@ethersproject/providers'
import { X_ALPHA_A } from '@xtoken/abis'

import { IAsset } from '../../types/xToken'

import { getXAlphaContracts } from './helper'
import { getXAlphaPrices } from './prices'

export const getXAlphaAsset = async (
  symbol: typeof X_ALPHA_A,
  provider: BaseProvider
): Promise<IAsset> => {
  const { kyberProxyContract, xalphaContract } = await getXAlphaContracts(
    symbol,
    provider
  )

  const { aum, priceEth, priceUsd } = await getXAlphaPrices(
    xalphaContract,
    kyberProxyContract
  )

  return {
    aum,
    mandate: 'Liquid Staker',
    price: priceUsd,
    priceEth,
    symbol,
  }
}
