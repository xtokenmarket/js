import { BigNumber } from '@ethersproject/bignumber'
import { Contract, ContractTransaction } from '@ethersproject/contracts'
import { JsonRpcProvider } from '@ethersproject/providers'
import { ethers } from 'ethers'

import ADDRESSES from '../../addresses'
import { AAVE, DEC_18, ETH } from '../../constants'
import { XAAVE } from '../../types'
import { ITokenSymbols } from '../../types/xToken'
import { estimateGas, getExpectedRate, parseFees } from '../utils'

import { getXAaveContracts } from './helper'

const { formatEther, parseEther } = ethers.utils

export const approveXAave = async (
  symbol: ITokenSymbols,
  amount: string,
  provider: JsonRpcProvider
): Promise<ContractTransaction> => {
  const { tokenContract, xaaveContract } = await getXAaveContracts(
    symbol,
    provider
  )
  const gasPrice = await estimateGas()

  return tokenContract.approve(xaaveContract.address, amount, {
    gasPrice,
  })
}

export const getExpectedQuantityOnMintXAave = async (
  symbol: ITokenSymbols,
  tradeWithEth: boolean,
  amount: string,
  provider: JsonRpcProvider
): Promise<string> => {
  const inputAmount = parseEther(amount)
  const {
    kyberProxyContract,
    network,
    xaaveContract,
  } = await getXAaveContracts(symbol, provider)
  const { chainId } = network

  const [aaveHoldings, xaaveSupply, { mintFee }] = await Promise.all([
    xaaveContract.getFundHoldings(),
    xaaveContract.totalSupply(),
    xaaveContract.feeDivisors(),
  ])

  const MINT_FEE = parseFees(mintFee)
  const ethToTrade = inputAmount.mul(MINT_FEE)

  const ethAddress = ADDRESSES[ETH]
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const aaveAddress = ADDRESSES[AAVE][chainId]

  let aaveExpected: BigNumber

  if (tradeWithEth) {
    const { expectedRate } = await kyberProxyContract.getExpectedRate(
      ethAddress,
      aaveAddress,
      inputAmount
    )
    aaveExpected = ethToTrade.mul(expectedRate).div(DEC_18)
  } else {
    aaveExpected = ethToTrade
  }

  const xaaveExpected = aaveExpected
    .mul(xaaveSupply)
    .div(aaveHoldings)
    .div(DEC_18)
  return formatEther(xaaveExpected)
}

export const mintXAave = async (
  symbol: ITokenSymbols,
  tradeWithEth: boolean,
  amount: string,
  provider: JsonRpcProvider
): Promise<ContractTransaction> => {
  const {
    kyberProxyContract,
    tokenContract,
    xaaveContract,
  } = await getXAaveContracts(symbol, provider)
  const gasPrice = await estimateGas()

  if (tradeWithEth) {
    const minRate = await getExpectedRate(
      kyberProxyContract,
      ADDRESSES[ETH],
      tokenContract.address,
      amount
    )
    return xaaveContract.mint(minRate.toString(), {
      gasPrice,
      value: amount,
    })
  } else {
    const approvedAmount = await _getApprovedAmount(
      tokenContract,
      xaaveContract,
      provider.getSigner()._address
    )
    if (approvedAmount.gt(amount)) {
      return Promise.reject(
        new Error('Please approve the tokens before minting')
      )
    }

    return xaaveContract.mintWithToken(amount, {
      gasPrice,
    })
  }
}

const _getApprovedAmount = async (
  tokenContract: Contract,
  xaaveContract: XAAVE,
  address: string
) => {
  return tokenContract.allowance(address, xaaveContract.address)
}
