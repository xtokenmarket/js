import { Contract } from '@ethersproject/contracts'
import {
  BaseProvider,
  JsonRpcProvider,
  Network,
} from '@ethersproject/providers'
import {
  AAVE,
  Abi,
  ADDRESSES,
  BNT,
  DAI,
  EXCHANGE_RATES,
  INCH,
  INCH_LIQUIDITY_PROTOCOL,
  KNC,
  KYBER_PROXY,
  S_ETH,
  S_USD,
  SNX,
  SYNTHETIX_ADDRESS_RESOLVER,
  TRADE_ACCOUNTING,
  UNISWAP_V2_PAIR,
  USDC,
  USDT,
  WETH,
  X_AAVE_A,
  X_AAVE_A_BALANCER_POOL,
  X_AAVE_B,
  X_AAVE_B_BALANCER_POOL,
  X_BNT_A,
  X_BNT_A_BANCOR_POOL,
  X_INCH_A,
  X_INCH_A_INCH_POOL,
  X_INCH_B,
  X_INCH_B_INCH_POOL,
  X_KNC_A,
  X_KNC_A_KYBER_POOL,
  X_KNC_A_UNISWAP_POOL,
  X_KNC_B,
  X_KNC_B_UNISWAP_POOL,
  X_SNX_A,
  X_SNX_A_BALANCER_POOL,
  X_U3LP_A,
  X_U3LP_B,
  X_U3LP_C,
  X_U3LP_D,
} from '@xtoken/abis'
import { BigNumber, ethers } from 'ethers'
import { ContractInterface } from 'ethers/lib/ethers'

import { ZERO_NUMBER } from '../constants'
import { KyberProxy } from '../types'
import {
  IContracts,
  ILPTokenSymbols,
  ITokenSymbols,
  IU3LPToken,
} from '../types/xToken'

const { formatEther, parseEther } = ethers.utils

export const getAbi = (contractName: IContracts) => {
  switch (contractName) {
    case AAVE:
    case BNT:
    case INCH:
    case KNC:
    case DAI:
    case S_ETH:
    case S_USD:
    case USDC:
    case USDT:
    case WETH:
      return Abi.ERC20 as ContractInterface
    case EXCHANGE_RATES:
      return Abi.ExchangeRates as ContractInterface
    case INCH_LIQUIDITY_PROTOCOL:
      return Abi.InchLiquidityProtocol as ContractInterface
    case KYBER_PROXY:
      return Abi.KyberProxy as ContractInterface
    case SNX:
      return Abi.Synthetix as ContractInterface
    case TRADE_ACCOUNTING:
      return Abi.TradeAccounting as ContractInterface
    case UNISWAP_V2_PAIR:
      return Abi.UniswapV2Pair as ContractInterface
    case X_AAVE_A:
    case X_AAVE_B:
      return Abi.xAAVE as ContractInterface
    case X_BNT_A:
      return Abi.xBNT as ContractInterface
    case X_INCH_A:
    case X_INCH_B:
      return Abi.xINCH as ContractInterface
    case X_KNC_A:
    case X_KNC_B:
      return Abi.xKNC as ContractInterface
    case X_SNX_A:
      return Abi.xSNX as ContractInterface
    case X_U3LP_A:
    case X_U3LP_B:
    case X_U3LP_C:
    case X_U3LP_D:
      return Abi.xU3LP as ContractInterface
  }
}

export const getBalancerPoolAddress = (
  symbol: ITokenSymbols,
  chainId: number
) => {
  let address
  switch (symbol) {
    case X_AAVE_A:
      address = ADDRESSES[X_AAVE_A_BALANCER_POOL][chainId]
      break
    case X_AAVE_B:
      address = ADDRESSES[X_AAVE_B_BALANCER_POOL][chainId]
      break
    case X_SNX_A:
      address = ADDRESSES[X_SNX_A_BALANCER_POOL][chainId]
      break
    default:
      address = null
  }
  return address
}

export const getBalancerPoolContract = (
  symbol: ITokenSymbols,
  provider: BaseProvider,
  chainId: number
) => {
  if (!provider || !symbol) return null

  const address = getBalancerPoolAddress(symbol, chainId)

  if (!address) return null

  return new ethers.Contract(address, Abi.BalancerPool, getSigner(provider))
}

export const getBancorPoolAddress = (
  symbol: ITokenSymbols,
  chainId: number
) => {
  let address
  switch (symbol) {
    case X_BNT_A:
      address = ADDRESSES[X_BNT_A_BANCOR_POOL][chainId]
      break
    default:
      address = null
  }
  return address
}

export const getBancorPoolContract = (
  symbol: ITokenSymbols,
  provider: BaseProvider,
  chainId: number
) => {
  if (!provider || !symbol) return null

  const address = getBancorPoolAddress(symbol, chainId)

  if (!address) return null

  return new ethers.Contract(address, Abi.BancorSmartToken, getSigner(provider))
}

export const getContract = (
  contractName: IContracts,
  provider: BaseProvider,
  network: Network
) => {
  if (!provider) return null

  const address = ADDRESSES[contractName][network.chainId]
  if (!address) return null

  return new ethers.Contract(address, getAbi(contractName), getSigner(provider))
}

export const getExpectedRate = async (
  kyberProxyContract: KyberProxy,
  inputAsset: string,
  outputAsset: string,
  amount: BigNumber,
  isMinRate = false
) => {
  if (isMinRate) {
    return ZERO_NUMBER
  }

  const { expectedRate } = await kyberProxyContract.getExpectedRate(
    inputAsset,
    outputAsset,
    amount
  )
  return expectedRate
}

export const getInchPoolAddress = (
  symbol: typeof X_INCH_A | typeof X_INCH_B,
  chainId: number
) => {
  let address
  switch (symbol) {
    case X_INCH_A:
      address = ADDRESSES[X_INCH_A_INCH_POOL][chainId]
      break
    case X_INCH_B:
      address = ADDRESSES[X_INCH_B_INCH_POOL][chainId]
      break
    default:
      address = null
  }
  return address
}

export const getInchPoolContract = (
  symbol: typeof X_INCH_A | typeof X_INCH_B,
  provider: BaseProvider,
  chainId: number
) => {
  if (!provider || !symbol) return null

  const address = getInchPoolAddress(symbol, chainId) as string

  return new ethers.Contract(
    address,
    Abi.InchLiquidityProtocol,
    getSigner(provider)
  )
}

export const getKyberPoolAddress = (
  symbol: typeof X_KNC_A | typeof X_KNC_B,
  chainId: number
) => {
  let address
  switch (symbol) {
    case X_KNC_A:
      address = ADDRESSES[X_KNC_A_KYBER_POOL][chainId]
      break
    default:
      address = null
  }
  return address
}

export const getKyberPoolContract = (
  symbol: typeof X_KNC_A | typeof X_KNC_B,
  provider: BaseProvider,
  chainId: number
) => {
  if (!provider || !symbol) return null

  const address = getKyberPoolAddress(symbol, chainId) as string

  return new ethers.Contract(address, Abi.DMMPool, getSigner(provider))
}

export const getTokenSymbol = (symbol: ITokenSymbols) => {
  switch (symbol) {
    case X_AAVE_A:
    case X_AAVE_B:
      return AAVE
    case X_BNT_A:
      return BNT
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

export const getLPTokenSymbol = (symbol: ILPTokenSymbols): IU3LPToken => {
  switch (symbol) {
    case X_U3LP_A:
      return { 0: DAI, 1: USDC }
    case X_U3LP_B:
      return { 0: USDC, 1: USDT }
    case X_U3LP_C:
      return { 0: S_USD, 1: USDC }
    case X_U3LP_D:
      return { 0: S_ETH, 1: WETH }
  }
}

export const parseFees = (fee: BigNumber) => {
  return parseEther(fee.isZero() ? '1' : String(1 - 1 / fee.toNumber()))
}

export const getTokenBalance = async (
  tokenAddress: string,
  userAddress: string,
  provider: BaseProvider
) => {
  const contract = new ethers.Contract(tokenAddress, Abi.ERC20, provider)
  return contract.balanceOf(userAddress)
}

export const getUserAvailableTokenBalance = async (
  contract: Contract,
  address: string
) => {
  let balance

  // TODO: Update the check to not be dependent upon `chainId`
  if (contract.address === ADDRESSES[SNX][1]) {
    balance = await contract.transferableSynthetix(address)
  } else {
    balance = await contract.balanceOf(address)
  }
  return Math.floor(Number(formatEther(balance.toString())) * 1000) / 1000
}

export const getExchangeRateContract = async (provider: BaseProvider) => {
  if (!provider) return null

  const resolver = new ethers.Contract(
    ADDRESSES[SYNTHETIX_ADDRESS_RESOLVER][1],
    Abi.AddressResolver,
    provider
  )
  const address = resolver.getAddress(
    ethers.utils.formatBytes32String('ExchangeRates')
  )

  if (!address) return null

  return new ethers.Contract(address, Abi.ExchangeRates, getSigner(provider))
}

export const getUniswapPoolAddress = (
  symbol: typeof X_KNC_A | typeof X_KNC_B,
  chainId: number
) => {
  let address
  switch (symbol) {
    case X_KNC_A:
      address = ADDRESSES[X_KNC_A_UNISWAP_POOL][chainId]
      break
    case X_KNC_B:
      address = ADDRESSES[X_KNC_B_UNISWAP_POOL][chainId]
      break
    default:
      address = null
  }
  return address
}

export const getUniswapPoolContract = (
  symbol: typeof X_KNC_A | typeof X_KNC_B,
  provider: BaseProvider,
  chainId: number
) => {
  if (!provider || !symbol) return null

  const address = getUniswapPoolAddress(symbol, chainId) as string

  return new ethers.Contract(address, Abi.UniswapV2Pair, getSigner(provider))
}

export const getSigner = (provider: BaseProvider) => {
  try {
    return (provider as JsonRpcProvider).getSigner()
  } catch (e) {
    return provider
  }
}

export const getSignerAddress = async (provider: BaseProvider) => {
  const signer = (provider as JsonRpcProvider).getSigner()
  return signer.getAddress()
}
