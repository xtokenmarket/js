import { BigNumber } from '@ethersproject/bignumber'
import { ContractTransaction } from '@ethersproject/contracts'
import { BaseProvider } from '@ethersproject/providers'
import { ADDRESSES, ALPHA, ETH } from '@xtoken/abis'
import { ethers } from 'ethers'

import {
  DEC_18,
  GAS_LIMIT_PERCENTAGE_DEFAULT,
  GAS_LIMIT_PERCENTAGE_ETH,
} from '../../constants'
import { XALPHA } from '../../types'
import { ITokenSymbols } from '../../types/xToken'
import { getPercentage } from '../../utils'
import { getExpectedRate, parseFees } from '../utils'

import { getXAlphaContracts } from './helper'

const { formatEther, parseEther } = ethers.utils

export const burnXAlpha = async (
  symbol: ITokenSymbols,
  sellForEth: boolean,
  amount: BigNumber,
  provider: BaseProvider
): Promise<ContractTransaction> => {
  const { xalphaContract } = await getXAlphaContracts(symbol, provider)

  // estimate gasLimit
  const gasLimit = getPercentage(
    await xalphaContract.estimateGas.burn(amount, sellForEth, '1'),
    sellForEth ? GAS_LIMIT_PERCENTAGE_ETH : GAS_LIMIT_PERCENTAGE_DEFAULT
  )

  return xalphaContract.burn(amount, sellForEth, '1', {
    gasLimit,
  })
}

export const getExpectedQuantityOnBurnXAlpha = async (
  symbol: ITokenSymbols,
  sellForEth: boolean,
  amount: string,
  provider: BaseProvider
) => {
  const inputAmount = parseEther(amount)
  const {
    kyberProxyContract,
    network,
    xalphaContract,
  } = await getXAlphaContracts(symbol, provider)

  const { chainId } = network

  const { BURN_FEE, proRataAlpha } = await getProRataAlpha(
    xalphaContract,
    inputAmount
  )

  let expectedQty: BigNumber

  if (!sellForEth) {
    expectedQty = proRataAlpha
  } else {
    const ethAddress = ADDRESSES[ETH]
    const alphaAddress = ADDRESSES[ALPHA][chainId]

    const expectedRate = await getExpectedRate(
      kyberProxyContract,
      alphaAddress,
      ethAddress as string,
      proRataAlpha
    )

    expectedQty = proRataAlpha.mul(expectedRate).div(DEC_18)
  }

  return formatEther(expectedQty.mul(BURN_FEE).div(DEC_18))
}

const getProRataAlpha = async (xalphaContract: XALPHA, amount: BigNumber) => {
  const [alphaHoldings, xalphaSupply, { burnFee }] = await Promise.all([
    xalphaContract.getNav(),
    xalphaContract.totalSupply(),
    xalphaContract.feeDivisors(),
  ])

  const BURN_FEE = parseFees(burnFee)
  const proRataAlpha = alphaHoldings.mul(amount).div(xalphaSupply)

  return { BURN_FEE, proRataAlpha }
}
