import { BigNumber } from '@ethersproject/bignumber'
import { ContractTransaction } from '@ethersproject/contracts'
import { BaseProvider } from '@ethersproject/providers'
import { BigNumberish, ethers } from 'ethers'

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
  outputAsset: IU3LPAssetId,
  amount: string,
  provider: BaseProvider
) => {
  const { xu3lpContract } = await getXU3LPContracts(symbol, provider)

  const [nav, totalSupply, { burnFee }] = await Promise.all([
    xu3lpContract.getNav(),
    xu3lpContract.totalSupply(),
    xu3lpContract.feeDivisors(),
  ])

  const getAmountInAssetTerms = !outputAsset
    ? xu3lpContract.getAmountInAsset0Terms
    : xu3lpContract.getAmountInAsset1Terms

  const BURN_FEE = parseFees(burnFee)
  const inputAmount = parseEther(amount)
    .mul(nav as BigNumberish)
    .div(totalSupply as BigNumberish)

  const expectedQty = await getAmountInAssetTerms(inputAmount)

  return formatEther(expectedQty.mul(BURN_FEE).div(DEC_18))
}
