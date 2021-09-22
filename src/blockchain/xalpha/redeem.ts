import { BaseProvider } from '@ethersproject/providers'
import { formatEther } from 'ethers/lib/utils'

import { ITokenSymbols } from '../../types/xToken'

import { getXAlphaContracts } from './helper'

export const getMaximumRedeemableXAlpha = async (
  symbol: ITokenSymbols,
  provider: BaseProvider
) => {
  const { xalphaContract } = await getXAlphaContracts(symbol, provider)

  const [bufferHoldings, alphaHoldings, totalSupply] = await Promise.all([
    xalphaContract.getBufferBalance(),
    xalphaContract.getNav(),
    xalphaContract.totalSupply(),
  ])

  const redeemable = bufferHoldings.mul(totalSupply).div(alphaHoldings)
  return formatEther(redeemable)
}
