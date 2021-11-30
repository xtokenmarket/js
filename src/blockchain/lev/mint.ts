import { BigNumber } from '@ethersproject/bignumber'
import { Contract, ContractTransaction } from '@ethersproject/contracts'
import { BaseProvider } from '@ethersproject/providers'
import { BUY, ETH, WBTC, X_BTC_3X, X_ETH_3X } from '@xtoken/abis'
import { formatEther, parseUnits } from 'ethers/lib/utils'

import {
  DEC_18,
  GAS_LIMIT_PERCENTAGE_DEFAULT,
  GAS_LIMIT_PERCENTAGE_ETH,
  MAX_UINT,
} from '../../constants'
import { XAssetLev } from '../../types'
import { IXAssetLev } from '../../types/xToken'
import { getPercentage } from '../../utils'
import { getUniswapV3EstimatedQty } from '../exchanges/uniswapV3'
import { getSignerAddress, getXAssetLevTokenSymbol, parseFees } from '../utils'

import { getXAssetLevContracts } from './helper'

export const approveXAssetLev = async (
  symbol: IXAssetLev,
  amount: BigNumber,
  provider: BaseProvider,
  spenderAddress?: string
): Promise<ContractTransaction> => {
  const { tokenContract, xassetlevContract } = await getXAssetLevContracts(
    symbol,
    provider
  )

  if (symbol === X_BTC_3X && !amount.eq(MAX_UINT)) {
    amount = amount.div('10000000000')
  }

  const address = spenderAddress || xassetlevContract.address
  const contract = spenderAddress ? xassetlevContract : tokenContract

  // estimate gasLimit
  const gasLimit = getPercentage(
    await contract.estimateGas.approve(address, amount),
    GAS_LIMIT_PERCENTAGE_DEFAULT
  )

  return contract.approve(address, amount, { gasLimit })
}

export const getExpectedQuantityOnMintXAssetLev = async (
  symbol: IXAssetLev,
  tradeWithEth: boolean,
  amount: string,
  provider: BaseProvider
): Promise<string> => {
  const tokenSymbol = getXAssetLevTokenSymbol(symbol)
  const { xassetlevContract } = await getXAssetLevContracts(symbol, provider)

  const [
    { bufferBalance, marketBalance },
    xassetlevSupply,
    { mintFee },
  ] = await Promise.all([
    xassetlevContract.getFundBalances(),
    xassetlevContract.totalSupply(),
    xassetlevContract.feeDivisors(),
  ])

  const MINT_FEE = parseFees(mintFee)
  const inputAmount = parseUnits(amount, tokenSymbol === WBTC ? 8 : 18)
  const ethToTrade = inputAmount.mul(MINT_FEE)

  let tokenExpected: BigNumber

  if (tradeWithEth && symbol !== X_ETH_3X) {
    tokenExpected = parseUnits(
      await getUniswapV3EstimatedQty(
        ETH,
        tokenSymbol,
        amount,
        BUY,
        BigNumber.from('10000'), // 1% Uniswap V3 trade fees
        provider
      ),
      tokenSymbol === WBTC ? 8 : 18
    ).mul(DEC_18)
  } else {
    tokenExpected = ethToTrade
  }

  const xassetlevExpected = tokenExpected
    .mul(xassetlevSupply)
    .div(bufferBalance.add(marketBalance))
    .div(DEC_18)

  return formatEther(xassetlevExpected)
}

export const mintXAssetLev = async (
  symbol: IXAssetLev,
  tradeWithEth: boolean,
  amount: BigNumber,
  provider: BaseProvider
): Promise<ContractTransaction> => {
  const { tokenContract, xassetlevContract } = await getXAssetLevContracts(
    symbol,
    provider
  )

  if (symbol === X_BTC_3X) {
    amount = amount.div('10000000000')
  }

  if (tradeWithEth) {
    // estimate gasLimit
    const gasLimit = getPercentage(
      await xassetlevContract.estimateGas.mint('1', {
        value: amount,
      }),
      GAS_LIMIT_PERCENTAGE_ETH
    )

    return xassetlevContract.mint('1', {
      gasLimit,
      value: amount,
    })
  } else {
    const address = await getSignerAddress(provider)
    const approvedAmount = await _getApprovedAmount(
      tokenContract,
      xassetlevContract,
      address
    )

    if (approvedAmount.lt(amount)) {
      return Promise.reject(
        new Error('Please approve the tokens before minting')
      )
    }

    // estimate gasLimit
    const gasLimit = getPercentage(
      await xassetlevContract.estimateGas.mintWithToken(amount),
      GAS_LIMIT_PERCENTAGE_DEFAULT
    )

    return xassetlevContract.mintWithToken(amount, { gasLimit })
  }
}

const _getApprovedAmount = async (
  tokenContract: Contract,
  xassetlevContract: XAssetLev,
  address: string
) => {
  return tokenContract.allowance(address, xassetlevContract.address)
}
