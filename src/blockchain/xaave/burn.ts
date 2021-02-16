import { BigNumber } from '@ethersproject/bignumber'
import { ContractTransaction } from '@ethersproject/contracts'
import { JsonRpcProvider } from '@ethersproject/providers'
import { ethers } from 'ethers'
import { AAVE, ADDRESSES, ETH } from 'xtoken-abis'

import { DEC_18, Exchange } from '../../constants'
import { XAAVE } from '../../types'
import { ITokenSymbols } from '../../types/xToken'
import { getExpectedRate, parseFees } from '../utils'

import { getXAaveContracts } from './helper'

const { formatEther, parseEther } = ethers.utils

export const burnXAave = async (
  symbol: ITokenSymbols,
  sellForEth: boolean,
  amount: BigNumber,
  provider: JsonRpcProvider
): Promise<ContractTransaction> => {
  const {
    kyberProxyContract,
    tokenContract,
    xaaveContract,
  } = await getXAaveContracts(symbol, provider)

  const { proRataAave } = await getProRataAave(xaaveContract, amount)

  const minRate = await getExpectedRate(
    Exchange.INCH,
    kyberProxyContract,
    tokenContract.address,
    ADDRESSES[ETH] as string,
    proRataAave,
    true
  )

  return xaaveContract.burn(amount, sellForEth, minRate)
}

export const getExpectedQuantityOnBurnXAave = async (
  symbol: ITokenSymbols,
  sellForEth: boolean,
  amount: string,
  provider: JsonRpcProvider
) => {
  const inputAmount = parseEther(amount)
  const {
    kyberProxyContract,
    network,
    xaaveContract,
  } = await getXAaveContracts(symbol, provider)
  const { chainId } = network

  const { BURN_FEE, proRataAave } = await getProRataAave(
    xaaveContract,
    inputAmount
  )
  let expectedQty: BigNumber

  if (!sellForEth) {
    expectedQty = proRataAave
  } else {
    const ethAddress = ADDRESSES[ETH] as string
    const aaveAddress = ADDRESSES[AAVE][chainId]

    const expectedRate = await getExpectedRate(
      Exchange.INCH,
      kyberProxyContract,
      aaveAddress,
      ethAddress,
      proRataAave
    )

    expectedQty = proRataAave.mul(expectedRate).div(DEC_18)
  }

  return formatEther(expectedQty.mul(BURN_FEE).div(DEC_18))
}

const getProRataAave = async (xaaveContract: XAAVE, amount: BigNumber) => {
  const [aaveHoldings, xaaveSupply, { burnFee }] = await Promise.all([
    xaaveContract.getFundHoldings(),
    xaaveContract.totalSupply(),
    xaaveContract.feeDivisors(),
  ])

  const BURN_FEE = parseFees(burnFee)
  const proRataAave = aaveHoldings.mul(amount).div(xaaveSupply)

  return { BURN_FEE, proRataAave }
}
