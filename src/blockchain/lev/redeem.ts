import { BaseProvider } from '@ethersproject/providers'
import { formatEther } from 'ethers/lib/utils'

import { IXAssetLev } from '../../types/xToken'

import { getXAssetLevContracts } from './helper'

export const getMaximumRedeemableXAssetLev = async (
  symbol: IXAssetLev,
  provider: BaseProvider
) => {
  const { xassetlevContract } = await getXAssetLevContracts(symbol, provider)

  const [
    bufferHoldings,
    { bufferBalance, marketBalance },
    totalSupply,
    liquidityBuffer,
  ] = await Promise.all([
    xassetlevContract.getBufferBalance(),
    xassetlevContract.getFundBalances(),
    xassetlevContract.totalSupply(),
    xassetlevContract.getLiquidityBuffer(),
  ])

  if (bufferHoldings.sub(liquidityBuffer).lt('0')) {
    return '0'
  }

  const redeemable = bufferHoldings
    .sub(liquidityBuffer)
    .mul(totalSupply)
    .div(bufferBalance.add(marketBalance))

  return formatEther(redeemable)
}
