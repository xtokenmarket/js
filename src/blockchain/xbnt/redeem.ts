import { BaseProvider } from '@ethersproject/providers'
import { formatEther } from 'ethers/lib/utils'

import { ITokenSymbols } from '../../types/xToken'

import { getXBntContracts } from './helper'

export const getMaximumRedeemableXBnt = async (
  symbol: ITokenSymbols,
  provider: BaseProvider
) => {
  const { xbntContract } = await getXBntContracts(symbol, provider)

  const [bufferHoldings, bntHoldings, totalSupply] = await Promise.all([
    xbntContract.getBufferBalance(),
    xbntContract.getNav(),
    xbntContract.totalSupply(),
  ])

  const redeemable = bufferHoldings.mul(totalSupply).div(bntHoldings)
  return formatEther(redeemable)
}
