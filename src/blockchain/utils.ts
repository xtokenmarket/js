import { Contract } from '@ethersproject/contracts'
import { JsonRpcProvider, Network } from '@ethersproject/providers'
import axios from 'axios'
import { BigNumber, ethers } from 'ethers'
import { ContractInterface } from 'ethers/lib/ethers'
import {
  AAVE,
  ADDRESSES,
  EXCHANGE_RATES,
  INCH,
  INCH_LIQUIDITY_PROTOCOL,
  KNC,
  KYBER_PROXY,
  SNX,
  SYNTHETIX_ADDRESS_RESOLVER,
  TRADE_ACCOUNTING,
  X_AAVE_A,
  X_AAVE_A_BALANCER_POOL,
  X_AAVE_B,
  X_AAVE_B_BALANCER_POOL,
  X_INCH_A,
  X_INCH_B,
  X_KNC_A,
  X_KNC_B,
  X_SNX_A,
  X_SNX_A_BALANCER_POOL,
} from 'xtoken-abis'
import AddressResolverAbi from 'xtoken-abis/build/main/abi/AddressResolver.json'
import BalancerPoolAbi from 'xtoken-abis/build/main/abi/BalancerPool.json'
import ERC20Abi from 'xtoken-abis/build/main/abi/ERC20.json'
import ExchangeRatesAbi from 'xtoken-abis/build/main/abi/ExchangeRates.json'
import InchLiquidityProtocolAbi from 'xtoken-abis/build/main/abi/InchLiquidityProtocol.json'
import KyberProxyAbi from 'xtoken-abis/build/main/abi/KyberProxy.json'
import SynthetixAbi from 'xtoken-abis/build/main/abi/Synthetix.json'
import TradeAccountingAbi from 'xtoken-abis/build/main/abi/TradeAccounting.json'
import xAAVEAbi from 'xtoken-abis/build/main/abi/xAAVE.json'
import xINCHAbi from 'xtoken-abis/build/main/abi/xINCH.json'
import xKNCAbi from 'xtoken-abis/build/main/abi/xKNC.json'
import xSNXAbi from 'xtoken-abis/build/main/abi/xSNX.json'

import { KyberProxy } from '../types'
import { IContracts, ITokenSymbols } from '../types/xToken'

const { formatEther, parseEther } = ethers.utils

export const estimateGas = async () => {
  const response = await axios.get(
    'https://ethgasstation.info/json/ethgasAPI.json'
  )
  return ethers.utils
    .parseUnits(String(response.data.fast / 10), 'gwei')
    .toString()
}

const getAbi = (contractName: IContracts) => {
  switch (contractName) {
    case AAVE:
    case INCH:
    case KNC:
      return ERC20Abi as ContractInterface
    case EXCHANGE_RATES:
      return ExchangeRatesAbi as ContractInterface
    case INCH_LIQUIDITY_PROTOCOL:
      return InchLiquidityProtocolAbi as ContractInterface
    case KYBER_PROXY:
      return KyberProxyAbi as ContractInterface
    case SNX:
      return SynthetixAbi as ContractInterface
    case TRADE_ACCOUNTING:
      return TradeAccountingAbi as ContractInterface
    case X_AAVE_A:
    case X_AAVE_B:
      return xAAVEAbi as ContractInterface
    case X_INCH_A:
    case X_INCH_B:
      return xINCHAbi as ContractInterface
    case X_KNC_A:
    case X_KNC_B:
      return (xKNCAbi as unknown) as ContractInterface
    case X_SNX_A:
      return xSNXAbi as ContractInterface
  }
}

export const getBalancerContract = (
  symbol: ITokenSymbols,
  provider: JsonRpcProvider,
  network: Network
) => {
  if (!provider || !symbol) return null

  let poolSymbol
  switch (symbol) {
    case X_AAVE_A:
      poolSymbol = X_AAVE_A_BALANCER_POOL
      break
    case X_AAVE_B:
      poolSymbol = X_AAVE_B_BALANCER_POOL
      break
    case X_SNX_A:
      poolSymbol = X_SNX_A_BALANCER_POOL
      break
    default:
      poolSymbol = null
  }

  if (!poolSymbol) return null

  const address = ADDRESSES[poolSymbol][network.chainId]

  return new ethers.Contract(
    address,
    BalancerPoolAbi,
    process.env.NODE_ENV === 'test' ? provider : provider.getSigner()
  )
}

export const getContract = (
  contractName: IContracts,
  provider: JsonRpcProvider,
  network: Network
) => {
  if (!provider) return null

  const address = ADDRESSES[contractName][network.chainId]
  if (!address) return null

  return new ethers.Contract(
    address,
    getAbi(contractName),
    process.env.NODE_ENV === 'test' ? provider : provider.getSigner()
  )
}

export const getExpectedRate = async (
  kyberProxyContract: KyberProxy,
  inputAsset: string,
  outputAsset: string,
  amount: BigNumber,
  isMinRate = false
) => {
  const { expectedRate } = await kyberProxyContract.getExpectedRate(
    inputAsset,
    outputAsset,
    amount
  )
  return isMinRate ? expectedRate.mul(98).div(100) : expectedRate
}

export const getTokenSymbol = (symbol: ITokenSymbols) => {
  switch (symbol) {
    case X_AAVE_A:
    case X_AAVE_B:
      return AAVE
    case X_INCH_A:
    case X_INCH_B:
      return INCH
    case X_KNC_A:
    case X_KNC_B:
      return KNC
    case X_SNX_A:
      return SNX
  }
}

/** @ignore */
export const parseFees = (fee: BigNumber) => {
  return parseEther(fee.isZero() ? '1' : String(1 - 1 / fee.toNumber()))
}

export const getTokenBalance = async (
  tokenAddress: string,
  userAddress: string,
  provider: JsonRpcProvider
) => {
  const contract = new ethers.Contract(tokenAddress, ERC20Abi, provider)
  return contract.balanceOf(userAddress)
}

export const getUserAvailableTokenBalance = async (
  contract: Contract,
  address: string
) => {
  let bal

  // TODO: Update the check to not be dependent upon `chainId`
  if (contract.address === ADDRESSES[SNX][1]) {
    bal = await contract.transferableSynthetix(address)
  } else {
    bal = await contract.balanceOf(address)
  }
  return Math.floor(Number(formatEther(bal.toString())) * 1000) / 1000
}

export const getExchangeRateContract = async (provider: JsonRpcProvider) => {
  if (!provider) return null

  const resolver = new ethers.Contract(
    ADDRESSES[SYNTHETIX_ADDRESS_RESOLVER][1],
    AddressResolverAbi,
    provider
  )
  const address = resolver.getAddress(
    ethers.utils.formatBytes32String('ExchangeRates')
  )

  if (!address) return null

  return new ethers.Contract(
    address,
    ExchangeRatesAbi,
    process.env.NODE_ENV === 'test' ? provider : provider.getSigner()
  )
}
