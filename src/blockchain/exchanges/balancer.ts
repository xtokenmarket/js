import { BigNumber } from '@ethersproject/bignumber'
import { JsonRpcProvider } from '@ethersproject/providers'
import { Contract, ethers } from 'ethers'
import {
  AAVE,
  Abi,
  ADDRESSES,
  BUY,
  ETH,
  KYBER_PROXY,
  SNX,
  TRADE_ACCOUNTING,
  USDC,
  WETH,
  X_AAVE_A,
  X_AAVE_A_BALANCER_POOL,
  X_AAVE_B,
  X_AAVE_B_BALANCER_POOL,
  X_SNX_A,
  X_SNX_A_ADMIN,
  X_SNX_A_BALANCER_POOL,
} from 'xtoken-abis'

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
  getExpectedRate,
  getTokenSymbol,
} from '../utils'
import { getXAavePrices } from '../xaave'
import { getXSnxPrices } from '../xsnx'

const { formatEther, parseEther } = ethers.utils

export const getBalancerEstimatedQuantity = async (
  tokenIn: typeof ETH | ITokenSymbols,
  symbol: ITokenSymbols,
  amount: string,
  tradeType: ITradeType,
  provider: JsonRpcProvider
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
    process.env.NODE_ENV === 'test' ? provider : provider.getSigner()
  )
  const tokenOutContract = new ethers.Contract(
    tokenOutAddress,
    Abi.ERC20,
    process.env.NODE_ENV === 'test' ? provider : provider.getSigner()
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

const getBalances = async (
  symbol: ITokenSymbols,
  balancerPoolAddress: string,
  tokenPrice: number,
  underlyingPrice: BigNumber,
  kyberProxyContract: KyberProxy,
  provider: JsonRpcProvider,
  chainId: number
) => {
  const tokenSymbol = getTokenSymbol(symbol)
  const underlying = tokenSymbol.toUpperCase()

  // Addresses
  const ethAddress = ADDRESSES[ETH] as string
  const underlyingAddress = ADDRESSES[tokenSymbol][chainId]
  const usdcAddress = ADDRESSES[USDC][chainId]
  const wethAddress = ADDRESSES[WETH][chainId]
  const xTokenAddress = ADDRESSES[symbol][chainId]

  // Contracts
  const underlyingContract = new ethers.Contract(
    underlyingAddress,
    Abi.ERC20,
    provider
  )
  const wethContract = new ethers.Contract(wethAddress, Abi.ERC20, provider)
  const xTokenContract = new ethers.Contract(xTokenAddress, Abi.ERC20, provider)

  // Balances
  const underlyingBalance = await underlyingContract.balanceOf(
    balancerPoolAddress
  )
  const wethBalance = await wethContract.balanceOf(balancerPoolAddress)
  const xTokenBalance = await xTokenContract.balanceOf(balancerPoolAddress)

  const ethPrice = await getExpectedRate(
    kyberProxyContract,
    ethAddress,
    usdcAddress,
    parseEther('0.1')
  )

  const ethVal = wethBalance.mul(ethPrice).div(DEC_18)
  const tokenVal = xTokenBalance
    .mul(parseEther(tokenPrice.toString()))
    .div(DEC_18)
  const underlyingVal = underlyingBalance.mul(underlyingPrice).div(DEC_18)
  const totalVal = ethVal.add(tokenVal).add(underlyingVal)

  return {
    totalVal: formatEther(totalVal),
    token: {
      name: symbol,
      amt: formatEther(xTokenBalance),
      val: formatEther(tokenVal),
    },
    underlying: {
      name: underlying,
      amt: formatEther(underlyingBalance),
      val: formatEther(underlyingVal),
    },
    eth: {
      name: ETH.toUpperCase(),
      amt: formatEther(wethBalance),
      val: formatEther(ethVal),
    },
  }
}

export const getBalancerPortfolioItem = async (
  symbol: ITokenSymbols,
  address: string,
  provider: JsonRpcProvider
): Promise<null | ILiquidityPoolItem> => {
  const network = await provider.getNetwork()
  const { chainId } = network

  const tokenSymbol = getTokenSymbol(symbol)
  const underlying = tokenSymbol.toUpperCase()

  // Addresses
  const asset = `${symbol} - ${ETH.toUpperCase()} - ${underlying}`
  const balancerPoolAddress = getBalancerPoolAddress(symbol, chainId) as string
  const xTokenAddress = ADDRESSES[symbol][chainId]
  const underlyingAddress = ADDRESSES[tokenSymbol][chainId]
  const usdcAddress = ADDRESSES[USDC][chainId]

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

  const userBalance = await balancerPoolContract.balanceOf(address)

  let tokenPrice
  let underlyingPrice

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
      underlyingPrice = await getExpectedRate(
        kyberProxyContract,
        underlyingAddress, // SNX
        usdcAddress,
        parseEther('0.1')
      )
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
      underlyingPrice = await getExpectedRate(
        kyberProxyContract,
        underlyingAddress, // AAVE
        usdcAddress,
        ethers.utils.parseEther('0.1')
      )
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

      underlyingPrice = await getExpectedRate(
        kyberProxyContract,
        underlyingAddress, // AAVE
        usdcAddress,
        ethers.utils.parseEther('0.1')
      )
      break
    }
    default:
      return null
  }

  const balancerContractBalances = await getBalances(
    symbol,
    balancerPoolAddress,
    tokenPrice,
    underlyingPrice,
    kyberProxyContract,
    provider,
    chainId
  )

  const bptTokenSupply = await balancerPoolContract.totalSupply()
  const poolPrice = parseEther(balancerContractBalances.totalVal)
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
