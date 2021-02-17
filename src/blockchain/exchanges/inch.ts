import { JsonRpcProvider } from '@ethersproject/providers'
import { ethers } from 'ethers'
import { ETH, KYBER_PROXY, X_INCH_A, X_INCH_B } from 'xtoken-abis'

import { DEC_18 } from '../../constants'
import { InchLiquidityProtocol, KyberProxy, XINCH } from '../../types'
import { ILiquidityPoolItem } from '../../types/xToken'
import { getContract, getInchPoolAddress, getInchPoolContract } from '../utils'
import { getXInchPrices } from '../xinch'

import { getBalances } from './helper'

const { formatEther, parseEther } = ethers.utils

export const getInchPortfolioItem = async (
  symbol: typeof X_INCH_A | typeof X_INCH_B,
  address: string,
  provider: JsonRpcProvider
): Promise<null | ILiquidityPoolItem> => {
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

  const userBalance = await inchPoolContract.balanceOf(address)

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
    kyberProxyContract,
    provider,
    chainId
  )

  const xinchEthPoolSupply = await inchPoolContract.totalSupply()
  const poolPrice = parseEther(inchPoolBalances.totalVal)
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
