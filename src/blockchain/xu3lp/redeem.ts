import { BaseProvider } from '@ethersproject/providers'
import { BigNumberish } from 'ethers'
import { formatEther } from 'ethers/lib/utils'

import { ILPTokenSymbols, IU3LPAssetId } from '../../types/xToken'

import { getXU3LPContracts } from './helper'

export const getMaximumRedeemableXU3LP = async (
  symbol: ILPTokenSymbols,
  outputAsset: IU3LPAssetId,
  provider: BaseProvider
) => {
  const { xu3lpContract } = await getXU3LPContracts(symbol, provider)

  const [bufferHoldings, nav, totalSupply] = await Promise.all([
    xu3lpContract.getBufferBalance(),
    xu3lpContract.getNav(),
    xu3lpContract.totalSupply(),
  ])

  const getAmountInAssetTerms = outputAsset
    ? xu3lpContract.getAmountInAsset0Terms
    : xu3lpContract.getAmountInAsset1Terms

  const amount = bufferHoldings
    .mul(totalSupply as BigNumberish)
    .div(nav as BigNumberish)

  const redeemable = await getAmountInAssetTerms(amount)

  // Account for slippage buffer of 1%
  const redeemableWithSlippage = redeemable.sub(redeemable.div(100))

  return formatEther(redeemableWithSlippage)
}
