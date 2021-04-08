import { BigNumber } from '@ethersproject/bignumber'
import { AddressZero } from '@ethersproject/constants'
import { JsonRpcProvider } from '@ethersproject/providers'
import {
  ADDRESSES,
  BUY,
  ETH,
  INCH,
  KYBER_PROXY,
  SELL,
  X_INCH_A,
  X_INCH_B,
} from '@xtoken/abis'
import { ethers } from 'ethers'

import { DEC_18 } from '../../constants'
import { InchLiquidityProtocol, KyberProxy, XINCH } from '../../types'
import { ILiquidityPoolItem, ITradeType } from '../../types/xToken'
import { getContract, getInchPoolAddress, getInchPoolContract } from '../utils'
import { getXInchPrices } from '../xinch'
import { getExpectedRateInch, getXInchContracts } from '../xinch/helper'

import { getBalances } from './helper'

const { formatEther, parseEther } = ethers.utils

export const getInchEstimatedQuantity = async (
  tokenIn: typeof ETH | typeof X_INCH_A | typeof X_INCH_B,
  symbol: typeof X_INCH_A | typeof X_INCH_B,
  amount: string,
  tradeType: ITradeType,
  provider: JsonRpcProvider
): Promise<string> => {
  let inputAmount = parseEther(amount)
  const { inchLiquidityProtocolContract, network } = await getXInchContracts(
    symbol,
    provider
  )
  const { chainId } = network

  // Addresses
  const inchAddress = ADDRESSES[INCH][chainId]
  const xinchAddress = ADDRESSES[symbol][chainId]

  // Contracts
  const inchPoolContract = getInchPoolContract(
    symbol,
    provider,
    chainId
  ) as InchLiquidityProtocol

  let expectedQty

  // Get equivalent `ETH` quantity from the input `1INCH` amount
  if (tradeType === BUY && tokenIn !== ETH) {
    inputAmount = await getExpectedRateInch(
      inchLiquidityProtocolContract,
      inchAddress,
      AddressZero,
      inputAmount
    )
  }

  expectedQty = await inchPoolContract.getReturn(
    tradeType === BUY ? AddressZero : xinchAddress,
    tradeType === BUY ? xinchAddress : AddressZero,
    inputAmount
  )

  // Get final `1INCH` quantity from the estimated `ETH` quantity
  if (tradeType === SELL && tokenIn !== ETH) {
    expectedQty = await getExpectedRateInch(
      inchLiquidityProtocolContract,
      AddressZero,
      inchAddress,
      expectedQty
    )
  }

  return formatEther(expectedQty)
}

export const getInchPortfolioItem = async (
  symbol: typeof X_INCH_A | typeof X_INCH_B,
  address: string,
  provider: JsonRpcProvider
): Promise<ILiquidityPoolItem> => {
  const network = await provider.getNetwork()
  const { chainId } = network

  // Addresses
  const asset = `${symbol}<>${ETH.toUpperCase()}`
  const inchPoolAddress = getInchPoolAddress(symbol, chainId) as string

  // Contracts
  const inchPoolContract = getInchPoolContract(
    symbol,
    provider,
    chainId
  ) as InchLiquidityProtocol
  const kyberProxyContract = getContract(
    KYBER_PROXY,
    provider,
    network
  ) as KyberProxy

  let userBalance = BigNumber.from('0')
  try {
    userBalance = await inchPoolContract.balanceOf(address)
  } catch (e) {
    console.error('Error while fetching user balance:', e)
  }

  const xinchContract = getContract(symbol, provider, network) as XINCH
  const { priceUsd } = await getXInchPrices(
    xinchContract,
    kyberProxyContract,
    chainId
  )

  const inchPoolBalances = await getBalances(
    symbol,
    inchPoolAddress,
    priceUsd,
    provider,
    chainId
  )

  const xinchEthPoolSupply = await inchPoolContract.totalSupply()
  const poolPrice = parseEther(inchPoolBalances.eth.val)
    .mul(2)
    .mul(DEC_18)
    .div(xinchEthPoolSupply)
  const value = poolPrice.mul(userBalance).div(DEC_18)

  return {
    asset,
    balances: inchPoolBalances,
    poolPrice: formatEther(poolPrice),
    quantity: formatEther(userBalance),
    tokenPrice: priceUsd,
    value: formatEther(value),
  }
}
