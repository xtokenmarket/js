import { BigNumber } from '@ethersproject/bignumber'
import { Contract, ContractTransaction } from '@ethersproject/contracts'
import { JsonRpcProvider } from '@ethersproject/providers'
import { ADDRESSES, ETH, HEGIC } from '@xtoken/abis'
import { ethers } from 'ethers'

import { DEC_18 } from '../../constants'
import { XAAVE } from '../../types'
import { ITokenSymbols } from '../../types/xToken'
import { getExpectedRate, parseFees } from '../utils'

import { getXHegicContracts } from './helper'

const { formatEther, parseEther } = ethers.utils

export const approveXHegic = async (
  symbol: ITokenSymbols,
  amount: BigNumber,
  provider: JsonRpcProvider
): Promise<ContractTransaction> => {
  const { tokenContract, xhegicContract } = await getXHegicContracts(
    symbol,
    provider
  )
  return tokenContract.approve(xhegicContract.address, amount)
}

export const getExpectedQuantityOnMintXHegic = async (
  symbol: ITokenSymbols,
  tradeWithEth: boolean,
  amount: string,
  provider: JsonRpcProvider
): Promise<string> => {
  const inputAmount = parseEther(amount)
  const {
    kyberProxyContract,
    network,
    xhegicContract,
  } = await getXHegicContracts(symbol, provider)
  const { chainId } = network

  const [hegicHoldings, xhegicSupply, { mintFee }] = await Promise.all([
    xhegicContract.getFundHoldings(),
    xhegicContract.totalSupply(),
    xhegicContract.feeDivisors(),
  ])

  const MINT_FEE = parseFees(mintFee)
  const ethToTrade = inputAmount.mul(MINT_FEE)

  const ethAddress = ADDRESSES[ETH] as string
  const hegicAddress = ADDRESSES[HEGIC][chainId]

  let hegicExpected: BigNumber

  if (tradeWithEth) {
    const expectedRate = await getExpectedRate(
      kyberProxyContract,
      ethAddress,
      hegicAddress,
      inputAmount
    )
    hegicExpected = ethToTrade.mul(expectedRate).div(DEC_18)
  } else {
    hegicExpected = ethToTrade
  }

  const xhegicExpected = hegicExpected
    .mul(xhegicSupply)
    .div(hegicHoldings)
    .div(DEC_18)

  return formatEther(xhegicExpected)
}

export const mintXHegic = async (
  symbol: ITokenSymbols,
  tradeWithEth: boolean,
  amount: BigNumber,
  provider: JsonRpcProvider
): Promise<ContractTransaction> => {
  const {
    kyberProxyContract,
    tokenContract,
    xhegicContract,
  } = await getXHegicContracts(symbol, provider)

  if (tradeWithEth) {
    const minRate = await getExpectedRate(
      kyberProxyContract,
      ADDRESSES[ETH] as string,
      tokenContract.address,
      amount,
      true
    )
    return xhegicContract.mint(minRate.toString(), {
      value: amount,
    })
  } else {
    const signer = provider.getSigner()
    const address = await signer.getAddress()
    const approvedAmount = await _getApprovedAmount(
      tokenContract,
      xhegicContract,
      address
    )

    if (approvedAmount.lt(amount)) {
      return Promise.reject(
        new Error('Please approve the tokens before minting')
      )
    }

    return xhegicContract.mintWithToken(amount)
  }
}

const _getApprovedAmount = async (
  tokenContract: Contract,
  xhegicContract: XAAVE,
  address: string
) => {
  return tokenContract.allowance(address, xhegicContract.address)
}
