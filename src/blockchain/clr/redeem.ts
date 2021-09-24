import { BaseProvider } from '@ethersproject/providers'
import { formatEther } from 'ethers/lib/utils'

import { IXAssetCLR } from '../../types/xToken'

import { getXAssetCLRContracts } from './helper'

export const getMaximumRedeemableXAssetCLR = async (
  symbol: IXAssetCLR,
  provider: BaseProvider
) => {
  const { xAssetCLRContract } = await getXAssetCLRContracts(symbol, provider)
  const totalLiquidity = await xAssetCLRContract.getTotalLiquidity()
  return formatEther(totalLiquidity)
}
