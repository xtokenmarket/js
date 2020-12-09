import { ContractTransaction } from '@ethersproject/contracts'
import { JsonRpcProvider } from '@ethersproject/providers'
import { BigNumber, ethers } from 'ethers'

import { estimateGas } from '../utils'

import { getXSnxContracts } from './helper'

const { formatEther, parseEther } = ethers.utils

export const burnXSnx = async (
  amount: BigNumber,
  provider: JsonRpcProvider
): Promise<ContractTransaction> => {
  const { xsnxContract } = await getXSnxContracts(provider)
  const gasPrice = await estimateGas()

  return xsnxContract.burn(amount, {
    gasPrice,
  })
}

export const getExpectedQuantityOnBurnXSnx = async (
  amount: string,
  provider: JsonRpcProvider
) => {
  const inputAmount = parseEther(amount)

  const { tradeAccountingContract, xsnxContract } = await getXSnxContracts(
    provider
  )

  const totalSupply = await xsnxContract.totalSupply()
  const redemptionValue = await tradeAccountingContract.calculateRedemptionValue(
    totalSupply,
    inputAmount
  )

  return formatEther(redemptionValue)
}
