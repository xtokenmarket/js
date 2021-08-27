import { BigNumber } from '@ethersproject/bignumber'
import { ContractTransaction } from '@ethersproject/contracts'
import { BaseProvider } from '@ethersproject/providers'
import { ethers } from 'ethers'

import { GAS_LIMIT_PERCENTAGE_DEFAULT } from '../../constants'
import { ICLRBurnQty, IXAssetCLR } from '../../types/xToken'
import { getPercentage } from '../../utils'

import { getXAssetCLRContracts } from './helper'

const { formatEther, parseEther } = ethers.utils

export const burnXAssetCLR = async (
  symbol: IXAssetCLR,
  amount: BigNumber,
  provider: BaseProvider
): Promise<ContractTransaction> => {
  const { xAssetCLRContract } = await getXAssetCLRContracts(symbol, provider)

  // Estimate `gasLimit`
  const gasLimit = getPercentage(
    await xAssetCLRContract.estimateGas.burn(amount),
    GAS_LIMIT_PERCENTAGE_DEFAULT
  )

  return xAssetCLRContract.burn(amount, {
    gasLimit,
  })
}

export const getExpectedQuantityOnBurnXAssetCLR = async (
  symbol: IXAssetCLR,
  amount: string,
  provider: BaseProvider
): Promise<ICLRBurnQty> => {
  const { xAssetCLRContract } = await getXAssetCLRContracts(symbol, provider)

  const [totalLiquidity, totalSupply] = await Promise.all([
    xAssetCLRContract.getTotalLiquidity(),
    xAssetCLRContract.totalSupply(),
  ])

  const proRataBalance = parseEther(amount).mul(totalLiquidity).div(totalSupply)
  const { amount0, amount1 } = await xAssetCLRContract.getAmountsForLiquidity(
    proRataBalance
  )

  return {
    0: formatEther(amount0),
    1: formatEther(amount1),
  }
}
