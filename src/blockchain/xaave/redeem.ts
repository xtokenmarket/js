import { BaseProvider } from '@ethersproject/providers'
import { formatEther } from 'ethers/lib/utils'

import { ITokenSymbols } from '../../types/xToken'

import { getXAaveContracts } from './helper'

export const getMaximumRedeemableXAave = async (
  symbol: ITokenSymbols,
  provider: BaseProvider
) => {
  const { xaaveContract } = await getXAaveContracts(symbol, provider)

  const [bufferHoldings, aaveHoldings, totalSupply] = await Promise.all([
    xaaveContract.getBufferBalance(),
    xaaveContract.getFundHoldings(),
    xaaveContract.totalSupply(),
  ])

  const redeemable = bufferHoldings.mul(totalSupply).div(aaveHoldings)
  return formatEther(redeemable)
}
