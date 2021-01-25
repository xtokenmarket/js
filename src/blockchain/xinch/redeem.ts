import { JsonRpcProvider } from '@ethersproject/providers'
import { formatEther } from 'ethers/lib/utils'

import { ITokenSymbols } from '../../types/xToken'

import { getXInchContracts } from './helper'

export const getMaximumRedeemableXInch = async (
  symbol: ITokenSymbols,
  provider: JsonRpcProvider
) => {
  const { xinchContract } = await getXInchContracts(symbol, provider)

  const [bufferHoldings, inchHoldings, totalSupply] = await Promise.all([
    xinchContract.getBufferBalance(),
    xinchContract.getNav(),
    xinchContract.totalSupply(),
  ])

  const redeemable = bufferHoldings.mul(totalSupply).div(inchHoldings)
  return formatEther(redeemable)
}
