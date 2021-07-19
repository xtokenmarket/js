import { BaseProvider } from '@ethersproject/providers'
import { formatEther } from 'ethers/lib/utils'

import { ILPTokenSymbols, IU3LPAssetId } from '../../types/xToken'

import { getXU3LPContracts } from './helper'

export const getMaximumRedeemableXU3LP = async (
  symbol: ILPTokenSymbols,
  outputAsset: IU3LPAssetId,
  provider: BaseProvider
) => {
  const { xu3lpContract } = await getXU3LPContracts(symbol, provider)

  const getBufferBalance = outputAsset
    ? xu3lpContract.getBufferToken0Balance
    : xu3lpContract.getBufferToken1Balance

  const bufferHoldings = await getBufferBalance()

  return formatEther(bufferHoldings)
}
