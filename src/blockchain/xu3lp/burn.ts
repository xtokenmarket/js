import { BigNumber } from '@ethersproject/bignumber'
import { ContractTransaction } from '@ethersproject/contracts'
import { BaseProvider } from '@ethersproject/providers'
import { BigNumberish, ethers } from 'ethers'

import { DEC_18, GAS_LIMIT_PERCENTAGE_DEFAULT } from '../../constants'
import { ILPTokenSymbols, IU3LPAssetId } from '../../types/xToken'
import { getPercentage } from '../../utils'
import { parseFees } from '../utils'

import { getXU3LPContracts } from './helper'
import { getXU3LPTokenPrices } from './prices'

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
  const inputAmount = parseEther(amount)
  const { xu3lpContract } = await getXU3LPContracts(symbol, provider)

  const [
    nav,
    totalSupply,
    { burnFee },
    { token0Price, token1Price },
  ] = await Promise.all([
    xu3lpContract.getNav(),
    xu3lpContract.totalSupply(),
    xu3lpContract.feeDivisors(),
    getXU3LPTokenPrices(xu3lpContract),
  ])

  const tokenPrice = outputAsset ? token1Price : token0Price

  const BURN_FEE = parseFees(burnFee)
  const expectedQty = inputAmount
    .mul(tokenPrice)
    .mul(nav as BigNumberish)
    .div(totalSupply as BigNumberish)
    .div(DEC_18)

  return formatEther(expectedQty.mul(BURN_FEE).div(DEC_18))
}
