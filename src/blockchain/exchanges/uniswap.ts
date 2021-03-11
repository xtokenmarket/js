import { JsonRpcProvider } from '@ethersproject/providers'
import {
  ChainId,
  Fetcher,
  Percent,
  Route,
  Token,
  TokenAmount,
  Trade,
  TradeType,
  WETH,
} from '@uniswap/sdk'
import {
  ADDRESSES,
  BUY,
  ETH,
  USDC,
  WETH as WETH_SYMBOL,
  X_KNC_A,
  X_KNC_B,
} from '@xtoken/abis'
import { Contract, ethers } from 'ethers'

import { DEC_18 } from '../../constants'
import { UniswapV2Pair } from '../../types'
import { ILiquidityPoolItem, ITradeType } from '../../types/xToken'
import {
  getTokenSymbol,
  getUniswapPoolAddress,
  getUniswapPoolContract,
} from '../utils'
import { getXKncPrices } from '../xknc'
import { getXKncContracts } from '../xknc/helper'

import { getBalances } from './helper'

const { formatEther, parseEther } = ethers.utils

export const getEthUsdcPrice = async (
  provider: JsonRpcProvider
): Promise<string> => {
  const network = await provider.getNetwork()
  const { chainId } = network

  const usdcAddress = ADDRESSES[USDC][chainId]
  const usdcToken = new Token(ChainId.MAINNET, usdcAddress, 6)

  const pair = await Fetcher.fetchPairData(
    usdcToken,
    WETH[usdcToken.chainId],
    provider
  )
  const route = new Route([pair], WETH[usdcToken.chainId])

  return route.midPrice.toSignificant(6)
}

export const getEthTokenPrice = async (
  tokenAddress: string,
  isPriceInvert: boolean,
  provider: JsonRpcProvider
): Promise<string> => {
  const token = new Token(ChainId.MAINNET, tokenAddress, 18)
  const pair = await Fetcher.fetchPairData(token, WETH[token.chainId], provider)
  const route = new Route([pair], WETH[token.chainId])
  return isPriceInvert
    ? route.midPrice.invert().toSignificant(6)
    : route.midPrice.toSignificant(6)
}

export const getUniswapEstimatedQuantity = async (
  tokenIn: typeof ETH | typeof X_KNC_A | typeof X_KNC_B,
  symbol: typeof X_KNC_A | typeof X_KNC_B,
  amount: string,
  tradeType: ITradeType,
  provider: JsonRpcProvider
): Promise<string> => {
  const network = await provider.getNetwork()
  const { chainId } = network

  const inputAmount = parseEther(amount)
  const slippageTolerance = new Percent('50', '10000')
  const token = getTokenSymbol(symbol)

  // Addresses
  const kncAddress = ADDRESSES[token][chainId]
  const xkncAddress = ADDRESSES[symbol][chainId]
  let tokenInAddress: string

  if (tradeType === BUY) {
    tokenInAddress =
      tokenIn === ETH ? ADDRESSES[WETH_SYMBOL][chainId] : kncAddress
  } else {
    tokenInAddress = xkncAddress
  }

  const inputToken = new Token(chainId, tokenInAddress, 18)
  const kncToken = new Token(chainId, kncAddress, 18)
  const xKNCToken = new Token(chainId, xkncAddress, 18)

  const ethXKncPair = await Fetcher.fetchPairData(
    WETH[ChainId.MAINNET],
    xKNCToken,
    provider
  )
  const kncEthPair = await Fetcher.fetchPairData(
    kncToken,
    WETH[ChainId.MAINNET],
    provider
  )
  let pairs = [ethXKncPair]

  if (tokenIn !== ETH) {
    pairs =
      tradeType === BUY ? [kncEthPair, ethXKncPair] : [ethXKncPair, kncEthPair]
  }

  const route = new Route(pairs, inputToken)
  const trade = new Trade(
    route,
    new TokenAmount(inputToken, inputAmount.toString()),
    TradeType.EXACT_INPUT
  )

  const amountOutMin = trade.minimumAmountOut(slippageTolerance)
  return amountOutMin.toSignificant(6)
}

export const getUniswapPortfolioItem = async (
  symbol: typeof X_KNC_A | typeof X_KNC_B,
  address: string,
  provider: JsonRpcProvider
): Promise<null | ILiquidityPoolItem> => {
  const {
    kncContract,
    kyberProxyContract,
    network,
    xkncContract,
  } = await getXKncContracts(symbol, provider)
  const { chainId } = network

  // Addresses
  const asset = `${symbol}<>${ETH.toUpperCase()}`
  const uniswapPoolAddress = getUniswapPoolAddress(symbol, chainId) as string

  // Contracts
  const uniswapPoolContract = getUniswapPoolContract(
    symbol,
    provider,
    chainId
  ) as UniswapV2Pair

  const userBalance = await uniswapPoolContract.balanceOf(address)

  const { priceUsd } = await getXKncPrices(
    xkncContract,
    kncContract as Contract,
    kyberProxyContract
  )

  const uniswapPoolBalances = await getBalances(
    symbol,
    uniswapPoolAddress,
    priceUsd,
    provider,
    chainId,
    undefined,
    true
  )

  const xkncEthPoolSupply = await uniswapPoolContract.totalSupply()
  const poolPrice = parseEther(uniswapPoolBalances.eth.val)
    .mul(2)
    .mul(DEC_18)
    .div(xkncEthPoolSupply)
  const value = poolPrice.mul(userBalance).div(DEC_18)

  return {
    asset,
    balances: uniswapPoolBalances,
    poolPrice: formatEther(poolPrice),
    quantity: formatEther(userBalance),
    tokenPrice: priceUsd,
    value: formatEther(value),
  }
}
