import { BigNumber } from '@ethersproject/bignumber'
import { Contract, ContractTransaction } from '@ethersproject/contracts'
import { JsonRpcProvider } from '@ethersproject/providers'
import { ethers } from 'ethers'
import { ADDRESSES, ETH, KNC } from 'xtoken-abis'

import { DEC_18 } from '../../constants'
import { XKNC } from '../../types'
import { ITokenSymbols } from '../../types/xToken'
import { estimateGas, getExpectedRate, parseFees } from '../utils'

import { getXKncContracts } from './helper'

const { formatEther, parseEther } = ethers.utils

export const approveXKnc = async (
  symbol: ITokenSymbols,
  amount: BigNumber,
  provider: JsonRpcProvider
): Promise<ContractTransaction> => {
  const { tokenContract, xkncContract } = await getXKncContracts(
    symbol,
    provider
  )
  const gasPrice = await estimateGas()

  return tokenContract.approve(xkncContract.address, amount, {
    gasPrice,
  })
}

export const getExpectedQuantityOnMintXKnc = async (
  symbol: ITokenSymbols,
  tradeWithEth: boolean,
  amount: string,
  provider: JsonRpcProvider
): Promise<string> => {
  const inputAmount = parseEther(amount)
  const { kyberProxyContract, network, xkncContract } = await getXKncContracts(
    symbol,
    provider
  )
  const { chainId } = network

  const [kncBalBefore, currentSupply, { mintFee }] = await Promise.all([
    xkncContract.getFundKncBalanceTwei(),
    xkncContract.totalSupply(),
    xkncContract.feeStructure(),
  ])

  const MINT_FEE = parseFees(mintFee)
  const ethToTrade = inputAmount.mul(MINT_FEE)

  const ethAddress = ADDRESSES[ETH]
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const kncAddress = ADDRESSES[KNC][chainId]

  let kncBalanceAfter: BigNumber

  if (tradeWithEth) {
    const { expectedRate } = await kyberProxyContract.getExpectedRate(
      ethAddress,
      kncAddress,
      inputAmount
    )
    const kncExpected = ethToTrade.mul(expectedRate)
    kncBalanceAfter = kncExpected.add(kncBalBefore)
  } else {
    kncBalanceAfter = ethToTrade.add(kncBalBefore)
  }

  const mintAmount = kncBalanceAfter
    .sub(kncBalBefore)
    .mul(currentSupply)
    .div(kncBalBefore)
    .div(DEC_18)
  return formatEther(tradeWithEth ? mintAmount.div(DEC_18) : mintAmount)
}

export const mintXKnc = async (
  symbol: ITokenSymbols,
  tradeWithEth: boolean,
  amount: BigNumber,
  provider: JsonRpcProvider
): Promise<ContractTransaction> => {
  const {
    kyberProxyContract,
    tokenContract,
    xkncContract,
  } = await getXKncContracts(symbol, provider)
  const gasPrice = await estimateGas()

  if (tradeWithEth) {
    const minRate = await getExpectedRate(
      kyberProxyContract,
      ADDRESSES[ETH],
      tokenContract.address,
      amount,
      true
    )
    return xkncContract.mint(minRate.toString(), {
      gasPrice,
      value: amount,
    })
  } else {
    const signer = provider.getSigner()
    const address = await signer.getAddress()
    const approvedAmount = await _getApprovedAmount(
      tokenContract,
      xkncContract,
      address
    )
    if (approvedAmount.lt(amount)) {
      return Promise.reject(
        new Error('Please approve the tokens before minting')
      )
    }

    return xkncContract.mintWithKnc(amount, {
      gasPrice,
    })
  }
}

const _getApprovedAmount = async (
  tokenContract: Contract,
  xkncContract: XKNC,
  address: string
) => {
  return tokenContract.allowance(address, xkncContract.address)
}
