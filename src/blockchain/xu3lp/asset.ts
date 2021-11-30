import { BaseProvider } from '@ethersproject/providers'
import {
  X_U3LP_A,
  X_U3LP_B,
  X_U3LP_C,
  X_U3LP_D,
  X_U3LP_E,
  X_U3LP_F,
  X_U3LP_G,
  X_U3LP_H,
} from '@xtoken/abis'

import { ILPAsset, ILPTokenSymbols } from '../../types/xToken'
import { capitalizeToken, getLPTokenSymbol } from '../utils'

import { getXU3LPContracts } from './helper'
import { getXU3LPPrices } from './prices'

export const getXU3LPAsset = async (
  symbol: ILPTokenSymbols,
  provider: BaseProvider
): Promise<ILPAsset> => {
  const { chainId } = await provider.getNetwork()
  const tokens = getLPTokenSymbol(symbol, chainId)
  const assets = `${capitalizeToken(tokens[0])}-${capitalizeToken(tokens[1])}`

  const { xu3lpContract } = await getXU3LPContracts(symbol, provider)

  const { aum, priceBtc, priceEth, priceUsd } = await getXU3LPPrices(
    xu3lpContract,
    provider
  )

  let order = -1
  switch (symbol) {
    case X_U3LP_A:
      order = 9
      break
    case X_U3LP_B:
      order = 10
      break
    case X_U3LP_C:
      order = 11
      break
    case X_U3LP_D:
      order = 12
      break
    case X_U3LP_E:
      order = 13
      break
    case X_U3LP_F:
      order = 14
      break
    case X_U3LP_G:
      order = 15
      break
    case X_U3LP_H:
      order = 16
      break
  }

  return {
    assets,
    aum,
    mandate: `Maximize Yield: ${assets}`,
    order,
    price: priceUsd,
    priceBtc,
    priceEth,
    symbol,
  }
}
