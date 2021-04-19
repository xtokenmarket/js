import { BigNumber } from '@ethersproject/bignumber'
import { BaseProvider } from '@ethersproject/providers'
import {
  AAVE,
  Abi,
  ADDRESSES,
  BUY,
  ETH,
  KYBER_PROXY,
  SNX,
  TRADE_ACCOUNTING,
  WETH,
  X_AAVE_A,
  X_AAVE_A_BALANCER_POOL,
  X_AAVE_B,
  X_AAVE_B_BALANCER_POOL,
  X_SNX_A,
  X_SNX_A_ADMIN,
  X_SNX_A_BALANCER_POOL,
} from '@xtoken/abis'
import { Contract, ethers } from 'ethers'

import { DEC_18 } from '../../constants'
import {
  BalancerPool,
  ExchangeRates,
  KyberProxy,
  TradeAccounting,
  XAAVE,
  XSNX,
} from '../../types'
import {
  ILiquidityPoolItem,
  ITokenSymbols,
  ITradeType,
} from '../../types/xToken'
import { formatNumber } from '../../utils'
import {
  getBalancerPoolAddress,
  getBalancerPoolContract,
  getContract,
  getExchangeRateContract,
  getSigner,
  getTokenSymbol,
} from '../utils'
import { getXAavePrices } from '../xaave'
import { getXSnxPrices } from '../xsnx'

import { getBalances } from './helper'
import { getEthTokenPrice, getEthUsdcPrice } from './uniswap'

const { formatEther, parseEther } = ethers.utils

export const getBalancerEstimatedQuantity = async (
  tokenIn: typeof ETH | typeof X_AAVE_A | typeof X_AAVE_B | typeof X_SNX_A,
  symbol: typeof X_AAVE_A | typeof X_AAVE_B | typeof X_SNX_A,
  amount: string,
  tradeType: ITradeType,
  provider: BaseProvider
) => {
  const network = await provider.getNetwork()
  const { chainId } = network

  let tokenInSymbol
  let poolSymbol

  switch (symbol) {
    case X_AAVE_A:
      tokenInSymbol = tokenIn === ETH ? WETH : AAVE
      poolSymbol = X_AAVE_A_BALANCER_POOL
      break
    case X_AAVE_B:
      tokenInSymbol = tokenIn === ETH ? WETH : AAVE
      poolSymbol = X_AAVE_B_BALANCER_POOL
      break
    case X_SNX_A:
      tokenInSymbol = tradeType === BUY && tokenIn === X_SNX_A ? SNX : WETH
      poolSymbol = X_SNX_A_BALANCER_POOL
      break
    default:
      return '0'
  }

  const tokenInAddress = ADDRESSES[tokenInSymbol][chainId]
  const tokenOutAddress = ADDRESSES[symbol][chainId]
  const poolAddress = ADDRESSES[poolSymbol][chainId]

  const balancerContract = getBalancerPoolContract(
    symbol,
    provider,
    chainId
  ) as BalancerPool
  const tokenInContract = new ethers.Contract(
    tokenInAddress,
    Abi.ERC20,
    getSigner(provider)
  )
  const tokenOutContract = new ethers.Contract(
    tokenOutAddress,
    Abi.ERC20,
    getSigner(provider)
  )

  const [
    tokenInBalance,
    tokenInWeight,
    tokenOutBalance,
    tokenOutWeight,
    swapFee,
  ] = await Promise.all([
    tokenInContract.balanceOf(poolAddress),
    balancerContract.getDenormalizedWeight(tokenInAddress),
    tokenOutContract.balanceOf(poolAddress),
    balancerContract.getDenormalizedWeight(tokenOutAddress),
    balancerContract.getSwapFee(),
  ])

  const calcOutGivenIn = await balancerContract.calcOutGivenIn(
    tradeType === BUY ? tokenInBalance : tokenOutBalance,
    tradeType === BUY ? tokenInWeight : tokenOutWeight,
    tradeType === BUY ? tokenOutBalance : tokenInBalance,
    tradeType === BUY ? tokenOutWeight : tokenInWeight,
    parseEther(amount),
    swapFee
  )

  return formatNumber(
    formatEther(calcOutGivenIn),
    tradeType === BUY ? 0 : 3
  ).toString()
}

export const getBalancerPortfolioItem = async (
  symbol: ITokenSymbols,
  address: string,
  provider: BaseProvider
): Promise<ILiquidityPoolItem> => {
  const network = await provider.getNetwork()
  const { chainId } = network

  const tokenSymbol = getTokenSymbol(symbol)
  const underlying = tokenSymbol.toUpperCase()

  // Addresses
  const asset = `${symbol} - ${ETH.toUpperCase()} - ${underlying}`
  const balancerPoolAddress = getBalancerPoolAddress(symbol, chainId) as string
  const xTokenAddress = ADDRESSES[symbol][chainId]
  const underlyingAddress = ADDRESSES[tokenSymbol][chainId]

  // Contracts
  const balancerPoolContract = getBalancerPoolContract(
    symbol,
    provider,
    chainId
  ) as BalancerPool
  const kyberProxyContract = getContract(
    KYBER_PROXY,
    provider,
    network
  ) as KyberProxy
  const tokenContract = new ethers.Contract(xTokenAddress, Abi.ERC20, provider)

  let userBalance = BigNumber.from('0')
  try {
    userBalance = await balancerPoolContract.balanceOf(address)
  } catch (e) {
    console.error('Error while fetching user balance:', e)
  }

  let tokenPrice = 0
  const [ethUsdcPrice, underlyingEthPrice] = await Promise.all([
    getEthUsdcPrice(provider),
    getEthTokenPrice(underlyingAddress, true, provider),
  ])
  const underlyingPrice = parseEther(underlyingEthPrice)
    .mul(parseEther(ethUsdcPrice))
    .div(DEC_18)

  try {
    switch (symbol) {
      case X_SNX_A: {
        const xsnxAdminAddress = ADDRESSES[X_SNX_A_ADMIN][chainId]

        const tradeAccountingContract = getContract(
          TRADE_ACCOUNTING,
          provider,
          network
        ) as TradeAccounting
        const exchangeRatesContract = (await getExchangeRateContract(
          provider
        )) as ExchangeRates
        const snxContract = getContract(SNX, provider, network) as Contract

        const { priceUsd } = await getXSnxPrices(
          tokenContract as XSNX,
          xsnxAdminAddress,
          tradeAccountingContract,
          exchangeRatesContract,
          snxContract,
          provider
        )
        tokenPrice = priceUsd
        break
      }
      case X_AAVE_A: {
        const xaaveaContract = getContract(symbol, provider, network) as XAAVE
        const { priceUsd } = await getXAavePrices(
          xaaveaContract,
          kyberProxyContract,
          chainId
        )
        tokenPrice = priceUsd
        break
      }
      case X_AAVE_B: {
        const xaavebContract = getContract(symbol, provider, network) as XAAVE
        const { priceUsd } = await getXAavePrices(
          xaavebContract,
          kyberProxyContract,
          chainId
        )
        tokenPrice = priceUsd
        break
      }
    }
  } catch (e) {
    console.error(e)
  }

  const balancerContractBalances = await getBalances(
    symbol,
    balancerPoolAddress,
    tokenPrice,
    provider,
    chainId,
    underlyingPrice,
    true
  )

  const bptTokenSupply = await balancerPoolContract.totalSupply()
  const poolPrice = parseEther(balancerContractBalances.eth.val)
    .mul(4)
    .mul(DEC_18)
    .div(bptTokenSupply)
  const value = poolPrice.mul(userBalance).div(DEC_18)

  return {
    asset,
    balances: balancerContractBalances,
    poolPrice: formatEther(poolPrice),
    quantity: formatEther(userBalance),
    tokenPrice,
    underlyingPrice: formatEther(underlyingPrice),
    value: formatEther(value),
  }
}
