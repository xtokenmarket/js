import { BaseProvider } from '@ethersproject/providers'
import { formatEther } from 'ethers/lib/utils'

import { IAssetId, ILPTokenSymbols } from '../../types/xToken'

import { getXU3LPContracts } from './helper'

export const getMaximumRedeemableXU3LP = async (
  symbol: ILPTokenSymbols,
  outputAsset: IAssetId,
  provider: BaseProvider
) => {
  const { xu3lpContract } = await getXU3LPContracts(symbol, provider)

  const getBufferBalance = outputAsset
    ? xu3lpContract.getBufferToken1Balance
    : xu3lpContract.getBufferToken0Balance

  const bufferHoldings = await getBufferBalance()

  return formatEther(bufferHoldings)
}
