import { JsonRpcProvider } from '@ethersproject/providers'
import { formatEther } from 'ethers/lib/utils'

import { ITokenSymbols } from '../../types/xToken'

import { getXHegicContracts } from './helper'

export const getMaximumRedeemableXHegic = async (
  symbol: ITokenSymbols,
  provider: JsonRpcProvider
) => {
  const { xhegicContract } = await getXHegicContracts(symbol, provider)

  const [bufferHoldings, hegicHoldings, totalSupply] = await Promise.all([
    xhegicContract.getBufferBalance(),
    xhegicContract.getFundHoldings(),
    xhegicContract.totalSupply(),
  ])

  const redeemable = bufferHoldings.mul(totalSupply).div(hegicHoldings)
  return formatEther(redeemable)
}
