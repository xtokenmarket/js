import { BigNumber } from '@ethersproject/bignumber'
import { ContractTransaction } from '@ethersproject/contracts'
import { BaseProvider } from '@ethersproject/providers'
import { ADDRESSES, BNT, ETH } from '@xtoken/abis'
import { ethers } from 'ethers'

import {
  DEC_18,
  GAS_LIMIT_PERCENTAGE_DEFAULT,
  GAS_LIMIT_PERCENTAGE_ETH,
} from '../../constants'
import { XBNT } from '../../types'
import { ITokenSymbols } from '../../types/xToken'
import { getPercentage } from '../../utils'
import { getExpectedRate, parseFees } from '../utils'

import { getXBntContracts } from './helper'

const { formatEther, parseEther } = ethers.utils

export const burnXBnt = async (
  symbol: ITokenSymbols,
  sellForEth: boolean,
  amount: BigNumber,
  provider: BaseProvider
): Promise<ContractTransaction> => {
  const { xbntContract } = await getXBntContracts(symbol, provider)

  // Estimate `gasLimit`
  const gasLimit = getPercentage(
    await xbntContract.estimateGas.burn(amount, sellForEth, '1'),
    sellForEth ? GAS_LIMIT_PERCENTAGE_ETH : GAS_LIMIT_PERCENTAGE_DEFAULT
  )

  return xbntContract.burn(amount, sellForEth, '1', {
    gasLimit,
  })
}

export const getExpectedQuantityOnBurnXBnt = async (
  symbol: ITokenSymbols,
  sellForEth: boolean,
  amount: string,
  provider: BaseProvider
) => {
  const inputAmount = parseEther(amount)
  const { kyberProxyContract, network, xbntContract } = await getXBntContracts(
    symbol,
    provider
  )
  const { chainId } = network

  const { BURN_FEE, proRataBnt } = await getProRataBnt(
    xbntContract,
    inputAmount
  )
  let expectedQty: BigNumber

  if (!sellForEth) {
    expectedQty = proRataBnt
  } else {
    const ethAddress = ADDRESSES[ETH] as string
    const bntAddress = ADDRESSES[BNT][chainId]

    const expectedRate = await getExpectedRate(
      kyberProxyContract,
      bntAddress,
      ethAddress,
      proRataBnt
    )

    expectedQty = proRataBnt.mul(expectedRate).div(DEC_18)
  }

  return formatEther(expectedQty.mul(BURN_FEE).div(DEC_18))
}

const getProRataBnt = async (xbntContract: XBNT, amount: BigNumber) => {
  const [bntHoldings, xbntSupply, { burnFee }] = await Promise.all([
    xbntContract.getNav(),
    xbntContract.totalSupply(),
    xbntContract.feeDivisors(),
  ])

  const BURN_FEE = parseFees(burnFee)
  const proRataBnt = bntHoldings.mul(amount).div(xbntSupply)

  return { BURN_FEE, proRataBnt }
}
