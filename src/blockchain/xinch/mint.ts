import { BigNumber } from '@ethersproject/bignumber'
import { Contract, ContractTransaction } from '@ethersproject/contracts'
import { JsonRpcProvider } from '@ethersproject/providers'
import { ethers } from 'ethers'
import { ADDRESSES, INCH } from 'xtoken-abis'

import { DEC_18, ZERO_ADDRESS } from '../../constants'
import { XINCH } from '../../types'
import { ITokenSymbols } from '../../types/xToken'
import { parseFees } from '../utils'

import { getExpectedRateInch, getXInchContracts } from './helper'

const { formatEther, parseEther } = ethers.utils

export const approveXInch = async (
  symbol: ITokenSymbols,
  amount: BigNumber,
  provider: JsonRpcProvider
): Promise<ContractTransaction> => {
  const { tokenContract, xinchContract } = await getXInchContracts(
    symbol,
    provider
  )
  return tokenContract.approve(xinchContract.address, amount)
}

export const getExpectedQuantityOnMintXInch = async (
  symbol: ITokenSymbols,
  tradeWithEth: boolean,
  amount: string,
  provider: JsonRpcProvider
): Promise<string> => {
  const inputAmount = parseEther(amount)
  const {
    inchLiquidityProtocolContract,
    network,
    xinchContract,
  } = await getXInchContracts(symbol, provider)
  const { chainId } = network

  const [inchHoldings, xinchSupply, { mintFee }] = await Promise.all([
    xinchContract.getNav(),
    xinchContract.totalSupply(),
    xinchContract.feeDivisors(),
  ])

  const MINT_FEE = parseFees(mintFee)
  const ethToTrade = inputAmount.mul(MINT_FEE)

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const inchAddress = ADDRESSES[INCH][chainId]

  let inchExpected: BigNumber

  if (tradeWithEth) {
    inchExpected = await getExpectedRateInch(
      inchLiquidityProtocolContract,
      ZERO_ADDRESS,
      inchAddress,
      inputAmount
    )
  } else {
    inchExpected = ethToTrade
  }

  const xinchExpected = inchExpected
    .mul(xinchSupply)
    .div(inchHoldings)
    .div(DEC_18)
  return formatEther(xinchExpected)
}

export const mintXInch = async (
  symbol: ITokenSymbols,
  tradeWithEth: boolean,
  amount: BigNumber,
  provider: JsonRpcProvider
): Promise<ContractTransaction> => {
  const {
    inchLiquidityProtocolContract,
    tokenContract,
    xinchContract,
  } = await getXInchContracts(symbol, provider)

  if (tradeWithEth) {
    const minRate = await getExpectedRateInch(
      inchLiquidityProtocolContract,
      ZERO_ADDRESS,
      tokenContract.address,
      amount,
      true
    )
    return xinchContract.mint(minRate.toString(), {
      value: amount,
    })
  } else {
    const signer = provider.getSigner()
    const address = await signer.getAddress()
    const approvedAmount = await _getApprovedAmount(
      tokenContract,
      xinchContract,
      address
    )

    if (approvedAmount.lt(amount)) {
      return Promise.reject(
        new Error('Please approve the tokens before minting')
      )
    }

    return xinchContract.mintWithToken(amount)
  }
}

const _getApprovedAmount = async (
  tokenContract: Contract,
  xinchContract: XINCH,
  address: string
) => {
  return tokenContract.allowance(address, xinchContract.address)
}
