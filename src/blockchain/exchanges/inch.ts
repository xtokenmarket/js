import { JsonRpcProvider } from '@ethersproject/providers'
import { ethers } from 'ethers'
import {
  ADDRESSES,
  ETH,
  KYBER_PROXY,
  USDC,
  X_INCH_A,
  X_INCH_B,
} from 'xtoken-abis'
import ERC20Abi from 'xtoken-abis/build/main/abi/ERC20.json'

import { DEC_18 } from '../../constants'
import { InchLiquidityProtocol, KyberProxy, XINCH } from '../../types'
import { ITokenSymbols } from '../../types/xToken'
import {
  getContract,
  getExpectedRate,
  getInchPoolAddress,
  getInchPoolContract,
} from '../utils'
import { getXInchPrices } from '../xinch'

const { formatEther, parseEther } = ethers.utils

const getBalances = async (
  symbol: ITokenSymbols,
  inchPoolAddress: string,
  tokenPrice: number,
  kyberProxyContract: KyberProxy,
  provider: JsonRpcProvider,
  chainId: number
) => {
  // Addresses
  const ethAddress = ADDRESSES[ETH] as string
  const usdcAddress = ADDRESSES[USDC][chainId]
  const xTokenAddress = ADDRESSES[symbol][chainId]

  // Contracts
  const xTokenContract = new ethers.Contract(xTokenAddress, ERC20Abi, provider)

  // Balances
  const xTokenBalance = await xTokenContract.balanceOf(inchPoolAddress)

  const ethPrice = await getExpectedRate(
    kyberProxyContract,
    ethAddress,
    usdcAddress,
    parseEther('0.1')
  )

  const tokenVal = xTokenBalance
    .mul(parseEther(tokenPrice.toString()))
    .div(DEC_18)
  const ethVal = tokenVal
  const totalVal = ethVal.add(tokenVal)

  const ethBalance = ethVal.mul(DEC_18).div(ethPrice)

  return {
    totalVal: formatEther(totalVal),
    token: {
      name: symbol,
      amt: formatEther(xTokenBalance),
      val: formatEther(tokenVal),
    },
    eth: {
      name: ETH.toUpperCase(),
      amt: formatEther(ethBalance),
      val: formatEther(ethVal),
    },
  }
}

export const getInchPortfolioItem = async (
  symbol: typeof X_INCH_A | typeof X_INCH_B,
  address: string,
  provider: JsonRpcProvider
) => {
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

  const inchContractBalances = await getBalances(
    symbol,
    inchPoolAddress,
    priceUsd,
    kyberProxyContract,
    provider,
    chainId
  )

  const xinchEthPoolSupply = await inchPoolContract.totalSupply()
  const poolPrice = parseEther(inchContractBalances.totalVal)
    .mul(DEC_18)
    .div(xinchEthPoolSupply)
  const value = poolPrice.mul(userBalance).div(DEC_18)

  return {
    asset,
    balances: inchContractBalances,
    poolPrice: formatEther(poolPrice),
    quantity: formatEther(userBalance),
    tokenPrice: priceUsd,
    value: formatEther(value),
  }
}
