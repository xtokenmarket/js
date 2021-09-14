import { BigNumber } from '@ethersproject/bignumber'
import { Contract, ContractTransaction } from '@ethersproject/contracts'
import { BaseProvider } from '@ethersproject/providers'
import { BUY, ETH, X_ALPHA_A } from '@xtoken/abis'
import { ethers } from 'ethers'

import {
  DEC_18,
  GAS_LIMIT_PERCENTAGE_DEFAULT,
  GAS_LIMIT_PERCENTAGE_ETH,
} from '../../constants'
import { XALPHA } from '../../types'
import { ITokenSymbols } from '../../types/xToken'
import { getPercentage } from '../../utils'
import { getUniswapV3EstimatedQty } from '../exchanges/uniswapV3'
import { getSignerAddress, parseFees } from '../utils'

import { getXAlphaContracts } from './helper'

const { formatEther, parseEther } = ethers.utils

export const approveXAlpha = async (
  symbol: ITokenSymbols,
  amount: BigNumber,
  provider: BaseProvider,
  spenderAddress?: string
): Promise<ContractTransaction> => {
  const { tokenContract, xalphaContract } = await getXAlphaContracts(
    symbol,
    provider
  )

  const address = spenderAddress || xalphaContract.address

  // estimate gasLimit
  const gasLimit = getPercentage(
    await tokenContract.estimateGas.approve(address, amount),
    GAS_LIMIT_PERCENTAGE_DEFAULT
  )

  return tokenContract.approve(address, amount, { gasLimit })
}

export const getExpectedQuantityOnMintXAlpha = async (
  symbol: ITokenSymbols,
  tradeWithEth: boolean,
  amount: string,
  provider: BaseProvider
): Promise<string> => {
  const inputAmount = parseEther(amount)
  const { xalphaContract } = await getXAlphaContracts(symbol, provider)

  const [alphaHoldings, xalphaSupply, { mintFee }] = await Promise.all([
    xalphaContract.getNav(),
    xalphaContract.totalSupply(),
    xalphaContract.feeDivisors(),
  ])

  const MINT_FEE = parseFees(mintFee)
  const ethToTrade = inputAmount.mul(MINT_FEE)

  let alphaExpected: BigNumber

  if (tradeWithEth) {
    alphaExpected = parseEther(
      await getUniswapV3EstimatedQty(
        ETH,
        X_ALPHA_A,
        amount,
        BUY,
        BigNumber.from('10000'), // 1% Uniswap V3 trade fees
        provider
      )
    ).mul(DEC_18)
  } else {
    alphaExpected = ethToTrade
  }

  const xalphaExpected = alphaExpected
    .mul(xalphaSupply)
    .div(alphaHoldings)
    .div(DEC_18)

  return formatEther(xalphaExpected)
}

export const mintXAlpha = async (
  symbol: ITokenSymbols,
  tradeWithEth: boolean,
  amount: BigNumber,
  provider: BaseProvider
): Promise<ContractTransaction> => {
  const { tokenContract, xalphaContract } = await getXAlphaContracts(
    symbol,
    provider
  )

  if (tradeWithEth) {
    // estimate gasLimit
    const gasLimit = getPercentage(
      await xalphaContract.estimateGas.mint('1', {
        value: amount,
      }),
      GAS_LIMIT_PERCENTAGE_ETH
    )

    return xalphaContract.mint('1', {
      gasLimit,
      value: amount,
    })
  } else {
    const address = await getSignerAddress(provider)
    const approvedAmount = await _getApprovedAmount(
      tokenContract,
      xalphaContract,
      address
    )

    if (approvedAmount.lt(amount)) {
      return Promise.reject(
        new Error('Please approve the tokens before minting')
      )
    }

    // estimate gasLimit
    const gasLimit = getPercentage(
      await xalphaContract.estimateGas.mintWithToken(amount),
      GAS_LIMIT_PERCENTAGE_DEFAULT
    )

    return xalphaContract.mintWithToken(amount, { gasLimit })
  }
}

const _getApprovedAmount = async (
  tokenContract: Contract,
  xalphaContract: XALPHA,
  address: string
) => {
  return tokenContract.allowance(address, xalphaContract.address)
}
