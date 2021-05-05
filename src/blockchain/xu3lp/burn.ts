import { BigNumber } from '@ethersproject/bignumber'
import { ContractTransaction } from '@ethersproject/contracts'
import { BaseProvider } from '@ethersproject/providers'
import { ethers } from 'ethers'

import { DEC_18, GAS_LIMIT_PERCENTAGE_DEFAULT } from '../../constants'
import { ILPTokenSymbols, IU3LPAssetId } from '../../types/xToken'
import { getPercentage } from '../../utils'
import { parseFees } from '../utils'

import { getXU3LPContracts } from './helper'

const { formatEther, parseEther } = ethers.utils

export const burnXU3LP = async (
  symbol: ILPTokenSymbols,
  outputAsset: IU3LPAssetId,
  amount: BigNumber,
  provider: BaseProvider
): Promise<ContractTransaction> => {
  const { xu3lpContract } = await getXU3LPContracts(symbol, provider)

  // Estimate `gasLimit`
  const gasLimit = getPercentage(
    await xu3lpContract.estimateGas.burn(outputAsset, amount),
    GAS_LIMIT_PERCENTAGE_DEFAULT
  )

  return xu3lpContract.burn(outputAsset, amount, {
    gasLimit,
  })
}

export const getExpectedQuantityOnBurnXU3LP = async (
  symbol: ILPTokenSymbols,
  amount: string,
  provider: BaseProvider
) => {
  const inputAmount = parseEther(amount)
  const { xu3lpContract } = await getXU3LPContracts(symbol, provider)

  const [{ burnFee }] = await Promise.all([xu3lpContract.feeDivisors()])
  const BURN_FEE = parseFees(burnFee)

  return formatEther(inputAmount.mul(BURN_FEE).div(DEC_18))
}
