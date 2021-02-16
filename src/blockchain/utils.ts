import { Contract } from '@ethersproject/contracts'
import { JsonRpcProvider, Network } from '@ethersproject/providers'
import { BigNumber, ethers } from 'ethers'
import { ContractInterface } from 'ethers/lib/ethers'
import superagent from 'superagent'
import {
  AAVE,
  Abi,
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
  X_INCH_A_INCH_POOL,
  X_INCH_B,
  X_INCH_B_INCH_POOL,
  X_KNC_A,
  X_KNC_B,
  X_SNX_A,
  X_SNX_A_BALANCER_POOL,
} from 'xtoken-abis'

import { Exchange, INCH_API_URL } from '../constants'
import { KyberProxy } from '../types'
import { IContracts, ITokenSymbols } from '../types/xToken'

const { formatEther, parseEther } = ethers.utils

const getAbi = (contractName: IContracts) => {
  switch (contractName) {
    case AAVE:
    case INCH:
    case KNC:
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
    case X_AAVE_A:
    case X_AAVE_B:
      return Abi.xAAVE as ContractInterface
    case X_INCH_A:
    case X_INCH_B:
      return Abi.xINCH as ContractInterface
    case X_KNC_A:
    case X_KNC_B:
      return Abi.xKNC as ContractInterface
    case X_SNX_A:
      return Abi.xSNX as ContractInterface
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
  provider: JsonRpcProvider,
  chainId: number
) => {
  if (!provider || !symbol) return null

  const address = getBalancerPoolAddress(symbol, chainId)

  if (!address) return null

  return new ethers.Contract(
    address,
    Abi.BalancerPool,
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
  exchange: Exchange,
  kyberProxyContract: KyberProxy,
  inputAsset: string,
  outputAsset: string,
  amount: BigNumber,
  isMinRate = false
) => {
  let expectedRate = BigNumber.from('0')

  if (exchange === Exchange.INCH) {
    const res = await superagent.get(
      `${INCH_API_URL}?fromTokenAddress=${inputAsset}&toTokenAddress=${outputAsset}&amount=${parseEther(
        '1'
      )}`
    )

    const {
      toTokenAmount,
      toToken: { decimals },
    } = res.body

    const inchExpectedRate = toTokenAmount / 10 ** decimals
    expectedRate = parseEther(inchExpectedRate.toString())
  } else if (exchange === Exchange.KYBER) {
    expectedRate = (
      await kyberProxyContract.getExpectedRate(inputAsset, outputAsset, amount)
    ).expectedRate
  }

  return isMinRate ? expectedRate.mul(98).div(100) : expectedRate
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
  provider: JsonRpcProvider,
  chainId: number
) => {
  if (!provider || !symbol) return null

  const address = getInchPoolAddress(symbol, chainId) as string

  return new ethers.Contract(
    address,
    Abi.InchLiquidityProtocol,
    process.env.NODE_ENV === 'test' ? provider : provider.getSigner()
  )
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

export const parseFees = (fee: BigNumber) => {
  return parseEther(fee.isZero() ? '1' : String(1 - 1 / fee.toNumber()))
}

export const getTokenBalance = async (
  tokenAddress: string,
  userAddress: string,
  provider: JsonRpcProvider
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

export const getExchangeRateContract = async (provider: JsonRpcProvider) => {
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

  return new ethers.Contract(
    address,
    Abi.ExchangeRates,
    process.env.NODE_ENV === 'test' ? provider : provider.getSigner()
  )
}
