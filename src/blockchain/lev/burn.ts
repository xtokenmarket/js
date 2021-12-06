import { BigNumber } from '@ethersproject/bignumber'
import { ContractTransaction } from '@ethersproject/contracts'
import { BaseProvider } from '@ethersproject/providers'
import { ETH, SELL, WBTC, X_BTC_3X, X_ETH_3X } from '@xtoken/abis'
import { ethers } from 'ethers'
import { formatUnits, parseEther } from 'ethers/lib/utils'

import {
  DEC_18,
  GAS_LIMIT_PERCENTAGE_DEFAULT,
  GAS_LIMIT_PERCENTAGE_ETH,
} from '../../constants'
import { XAssetLev } from '../../types'
import { IXAssetLev } from '../../types/xToken'
import { getPercentage } from '../../utils'
import { getUniswapV3EstimatedQty } from '../exchanges/uniswapV3'
import { getXAssetLevTokenSymbol, parseFees } from '../utils'

import { getXAssetLevContracts } from './helper'

const { formatEther } = ethers.utils

export const burnXAssetLev = async (
  symbol: IXAssetLev,
  sellForEth: boolean,
  amount: BigNumber,
  provider: BaseProvider
): Promise<ContractTransaction> => {
  const { xassetlevContract } = await getXAssetLevContracts(symbol, provider)

  if (symbol === X_BTC_3X) {
    amount = amount.div('10000000000')
  }

  // estimate gasLimit
  const gasLimit = getPercentage(
    await xassetlevContract.estimateGas.burn(amount, sellForEth, '1'),
    sellForEth ? GAS_LIMIT_PERCENTAGE_ETH : GAS_LIMIT_PERCENTAGE_DEFAULT
  )

  return xassetlevContract.burn(amount, sellForEth, '0', {
    gasLimit,
  })
}

export const getExpectedQuantityOnBurnXAssetLev = async (
  symbol: IXAssetLev,
  sellForEth: boolean,
  amount: string,
  provider: BaseProvider
) => {
  const inputAmount = parseEther(amount)
  const tokenSymbol = getXAssetLevTokenSymbol(symbol)
  const { xassetlevContract } = await getXAssetLevContracts(symbol, provider)

  const { BURN_FEE, proRataToken } = await getProRataToken(
    xassetlevContract,
    inputAmount
  )

  let expectedQty: BigNumber

  if (!sellForEth || symbol === X_ETH_3X) {
    if (symbol === X_BTC_3X) {
      expectedQty = proRataToken.mul('10000000000')
    } else {
      expectedQty = proRataToken
    }
  } else {
    expectedQty = parseEther(
      await getUniswapV3EstimatedQty(
        ETH,
        tokenSymbol,
        formatUnits(proRataToken, tokenSymbol === WBTC ? 8 : 18),
        SELL,
        BigNumber.from('10000'), // 1% Uniswap V3 trade fees
        provider
      )
    )
  }

  return formatEther(expectedQty.mul(BURN_FEE).div(DEC_18))
}

const getProRataToken = async (
  xassetlevContract: XAssetLev,
  amount: BigNumber
) => {
  const [
    { bufferBalance, marketBalance },
    xassetlevSupply,
    { burnFee },
  ] = await Promise.all([
    xassetlevContract.getFundBalances(),
    xassetlevContract.totalSupply(),
    xassetlevContract.feeDivisors(),
  ])

  const BURN_FEE = parseFees(burnFee)
  const proRataToken = bufferBalance
    .add(marketBalance)
    .mul(amount)
    .div(xassetlevSupply)

  return { BURN_FEE, proRataToken }
}
