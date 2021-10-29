import { BigNumber } from '@ethersproject/bignumber'
import { Contract, ContractTransaction } from '@ethersproject/contracts'
import { BaseProvider } from '@ethersproject/providers'
import { ADDRESSES, BNT, ETH, KYBER_PROXY } from '@xtoken/abis'
import { ethers } from 'ethers'

import {
  DEC_18,
  GAS_LIMIT_PERCENTAGE_DEFAULT,
  GAS_LIMIT_PERCENTAGE_ETH,
} from '../../constants'
import { KyberProxy, XBNT } from '../../types'
import { ITokenSymbols } from '../../types/xToken'
import { getPercentage } from '../../utils'
import {
  getContract,
  getExpectedRate,
  getSignerAddress,
  parseFees,
} from '../utils'

import { getXBntContracts } from './helper'

const { formatEther, parseEther } = ethers.utils

export const approveXBnt = async (
  symbol: ITokenSymbols,
  amount: BigNumber,
  provider: BaseProvider,
  spenderAddress?: string
): Promise<ContractTransaction> => {
  const { tokenContract, xbntContract } = await getXBntContracts(
    symbol,
    provider
  )

  const address = spenderAddress || xbntContract.address
  const contract = spenderAddress ? xbntContract : tokenContract

  // Estimate `gasLimit`
  const gasLimit = getPercentage(
    await contract.estimateGas.approve(address, amount),
    GAS_LIMIT_PERCENTAGE_DEFAULT
  )

  return contract.approve(address, amount, { gasLimit })
}

export const getExpectedQuantityOnMintXBnt = async (
  symbol: ITokenSymbols,
  tradeWithEth: boolean,
  amount: string,
  provider: BaseProvider
): Promise<string> => {
  const inputAmount = parseEther(amount)
  const { network, xbntContract } = await getXBntContracts(symbol, provider)
  const { chainId } = network

  const kyberProxyContract = getContract(
    KYBER_PROXY,
    provider,
    network
  ) as KyberProxy

  const [bntHoldings, xbntSupply, { mintFee }] = await Promise.all([
    xbntContract.getNav(),
    xbntContract.totalSupply(),
    xbntContract.feeDivisors(),
  ])

  const MINT_FEE = parseFees(mintFee)
  const ethToTrade = inputAmount.mul(MINT_FEE)

  const ethAddress = ADDRESSES[ETH] as string
  const bntAddress = ADDRESSES[BNT][chainId]

  let bntExpected: BigNumber

  if (tradeWithEth) {
    const expectedRate = await getExpectedRate(
      kyberProxyContract,
      ethAddress,
      bntAddress,
      inputAmount
    )
    bntExpected = ethToTrade.mul(expectedRate).div(DEC_18)
  } else {
    bntExpected = ethToTrade
  }

  const xbntExpected = bntExpected.mul(xbntSupply).div(bntHoldings).div(DEC_18)

  return formatEther(xbntExpected)
}

export const mintXBnt = async (
  symbol: ITokenSymbols,
  tradeWithEth: boolean,
  amount: BigNumber,
  provider: BaseProvider
): Promise<ContractTransaction> => {
  const { tokenContract, xbntContract } = await getXBntContracts(
    symbol,
    provider
  )

  if (tradeWithEth) {
    // Estimate `gasLimit`
    const gasLimit = getPercentage(
      await xbntContract.estimateGas.mint('1', {
        value: amount,
      }),
      GAS_LIMIT_PERCENTAGE_ETH
    )

    return xbntContract.mint('1', {
      gasLimit,
      value: amount,
    })
  } else {
    const address = await getSignerAddress(provider)
    const approvedAmount = await _getApprovedAmount(
      tokenContract,
      xbntContract,
      address
    )

    if (approvedAmount.lt(amount)) {
      return Promise.reject(
        new Error('Please approve the tokens before minting')
      )
    }

    // Estimate `gasLimit`
    const gasLimit = getPercentage(
      await xbntContract.estimateGas.mintWithToken(amount),
      GAS_LIMIT_PERCENTAGE_DEFAULT
    )

    return xbntContract.mintWithToken(amount, { gasLimit })
  }
}

const _getApprovedAmount = async (
  tokenContract: Contract,
  xbntContract: XBNT,
  address: string
) => {
  return tokenContract.allowance(address, xbntContract.address)
}
