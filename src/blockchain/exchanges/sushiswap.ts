import { BigNumber } from '@ethersproject/bignumber'
import { JsonRpcProvider } from '@ethersproject/providers'
import {
  ADDRESSES,
  BUY,
  ETH,
  SUSHISWAP_V2_ROUTER,
  WETH as WETH_SYMBOL,
  X_HEGIC_A,
  X_HEGIC_B,
} from '@xtoken/abis'
import { ethers } from 'ethers'

import { DEC_18 } from '../../constants'
import { SushiswapV2Router, UniswapV2Pair } from '../../types'
import { ILiquidityPoolItem, ITradeType } from '../../types/xToken'
import {
  getContract,
  getTokenSymbol,
  getUniswapPoolAddress,
  getUniswapPoolContract,
} from '../utils'
import { getXHegicPrices } from '../xhegic'
import { getXHegicContracts } from '../xhegic/helper'

import { getBalances } from './helper'

const { formatEther, parseEther } = ethers.utils

export const getSushiswapEstimatedQuantity = async (
  tokenIn: typeof ETH | typeof X_HEGIC_A | typeof X_HEGIC_B,
  symbol: typeof X_HEGIC_A | typeof X_HEGIC_B,
  amount: string,
  tradeType: ITradeType,
  provider: JsonRpcProvider
): Promise<string> => {
  const network = await provider.getNetwork()
  const { chainId } = network

  const inputAmount = parseEther(amount)
  const sushiswapV2Router = getContract(
    SUSHISWAP_V2_ROUTER,
    provider,
    network
  ) as SushiswapV2Router

  const token = getTokenSymbol(symbol)

  // Addresses
  const hegicAddress = ADDRESSES[token][chainId]
  const xhegicAddress = ADDRESSES[symbol][chainId]
  let tokenInAddress: string
  let tokenOutAddress: string

  if (tradeType === BUY) {
    tokenInAddress =
      tokenIn === ETH ? ADDRESSES[WETH_SYMBOL][chainId] : hegicAddress
    tokenOutAddress = xhegicAddress
  } else {
    tokenInAddress = xhegicAddress
    tokenOutAddress =
      tokenIn === ETH ? ADDRESSES[WETH_SYMBOL][chainId] : hegicAddress
  }

  const estimateQty = await sushiswapV2Router.getAmountsOut(inputAmount, [
    tokenInAddress,
    tokenOutAddress,
  ])
  return formatEther(estimateQty[1])
}

export const getSushiswapPortfolioItem = async (
  symbol: typeof X_HEGIC_A | typeof X_HEGIC_B,
  address: string,
  provider: JsonRpcProvider
): Promise<ILiquidityPoolItem> => {
  const {
    kyberProxyContract,
    network,
    xhegicContract,
  } = await getXHegicContracts(symbol, provider)
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

  let userBalance = BigNumber.from('0')
  try {
    userBalance = await uniswapPoolContract.balanceOf(address)
  } catch (e) {
    console.error('Error while fetching user balance:', e)
  }

  const { priceUsd } = await getXHegicPrices(
    xhegicContract,
    kyberProxyContract,
    chainId
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

  const xhegicEthPoolSupply = await uniswapPoolContract.totalSupply()
  const poolPrice = parseEther(uniswapPoolBalances.eth.val)
    .mul(2)
    .mul(DEC_18)
    .div(xhegicEthPoolSupply)
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
