import { BigNumber } from '@ethersproject/bignumber'
import { Contract, ContractTransaction } from '@ethersproject/contracts'
import { JsonRpcProvider } from '@ethersproject/providers'
import { ethers } from 'ethers'
import { AAVE, ADDRESSES, ETH } from 'xtoken-abis'

import { DEC_18, Exchange } from '../../constants'
import { XAAVE } from '../../types'
import { ITokenSymbols } from '../../types/xToken'
import { getExpectedRate, parseFees } from '../utils'

import { getXAaveContracts } from './helper'

const { formatEther, parseEther } = ethers.utils

export const approveXAave = async (
  symbol: ITokenSymbols,
  amount: BigNumber,
  provider: JsonRpcProvider
): Promise<ContractTransaction> => {
  const { tokenContract, xaaveContract } = await getXAaveContracts(
    symbol,
    provider
  )
  return tokenContract.approve(xaaveContract.address, amount)
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

  const ethAddress = ADDRESSES[ETH] as string
  const aaveAddress = ADDRESSES[AAVE][chainId]

  let aaveExpected: BigNumber

  if (tradeWithEth) {
    const expectedRate = await getExpectedRate(
      Exchange.INCH,
      kyberProxyContract,
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
  amount: BigNumber,
  provider: JsonRpcProvider
): Promise<ContractTransaction> => {
  const {
    kyberProxyContract,
    tokenContract,
    xaaveContract,
  } = await getXAaveContracts(symbol, provider)

  if (tradeWithEth) {
    const minRate = await getExpectedRate(
      Exchange.INCH,
      kyberProxyContract,
      ADDRESSES[ETH] as string,
      tokenContract.address,
      amount,
      true
    )
    return xaaveContract.mint(minRate.toString(), {
      value: amount,
    })
  } else {
    const signer = provider.getSigner()
    const address = await signer.getAddress()
    const approvedAmount = await _getApprovedAmount(
      tokenContract,
      xaaveContract,
      address
    )

    if (approvedAmount.lt(amount)) {
      return Promise.reject(
        new Error('Please approve the tokens before minting')
      )
    }

    return xaaveContract.mintWithToken(amount)
  }
}

const _getApprovedAmount = async (
  tokenContract: Contract,
  xaaveContract: XAAVE,
  address: string
) => {
  return tokenContract.allowance(address, xaaveContract.address)
}
