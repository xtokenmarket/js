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
} from '@dynamic-amm/sdk'
import { BigNumber } from '@ethersproject/bignumber'
import { BaseProvider } from '@ethersproject/providers'
import {
  ADDRESSES,
  BUY,
  DMM_FACTORY,
  ETH,
  WETH as WETH_SYMBOL,
  X_KNC_A,
} from '@xtoken/abis'
import { ethers } from 'ethers'

import { DEC_18 } from '../../constants'
import { DMMPool } from '../../types'
import { ILiquidityPoolItem, ITradeType } from '../../types/xToken'
import {
  getKyberPoolAddress,
  getKyberPoolContract,
  getTokenSymbol,
} from '../utils'
import { getXKncPrices } from '../xknc'
import { getXKncContracts } from '../xknc/helper'

import { getBalances } from './helper'

const { formatEther, parseEther } = ethers.utils

export const getKyberEstimatedQuantity = async (
  tokenIn: typeof ETH | typeof X_KNC_A,
  symbol: typeof X_KNC_A,
  amount: string,
  tradeType: ITradeType,
  provider: BaseProvider
): Promise<string> => {
  const network = await provider.getNetwork()
  const { chainId } = network

  const inputAmount = parseEther(amount)
  const slippageTolerance = new Percent('50', '10000')
  const token = getTokenSymbol(symbol)

  // Addresses
  const dmmFactoryAddress = ADDRESSES[DMM_FACTORY][chainId]
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
    dmmFactoryAddress,
    provider as never
  )
  const kncEthPair = await Fetcher.fetchPairData(
    kncToken,
    WETH[ChainId.MAINNET],
    dmmFactoryAddress,
    provider as never
  )
  let pairs = [...ethXKncPair]

  if (tokenIn !== ETH) {
    pairs =
      tradeType === BUY
        ? [...kncEthPair, ...ethXKncPair]
        : [...ethXKncPair, ...kncEthPair]
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

export const getKyberPortfolioItem = async (
  symbol: typeof X_KNC_A,
  address: string,
  provider: BaseProvider
): Promise<ILiquidityPoolItem> => {
  const { network, xkncContract } = await getXKncContracts(symbol, provider)
  const { chainId } = network

  // Addresses
  const asset = `${symbol}<>${ETH.toUpperCase()}`
  const kyberPoolAddress = getKyberPoolAddress(symbol, chainId) as string

  // Contracts
  const kyberPoolContract = getKyberPoolContract(
    symbol,
    provider,
    chainId
  ) as DMMPool

  let userBalance = BigNumber.from('0')
  try {
    userBalance = await kyberPoolContract.balanceOf(address)
  } catch (e) {
    console.error('Error while fetching user balance:', e)
  }

  const { priceUsd } = await getXKncPrices(xkncContract)

  const kyberPoolBalances = await getBalances(
    symbol,
    kyberPoolAddress,
    priceUsd,
    provider,
    chainId,
    undefined,
    true
  )

  const xkncEthPoolSupply = await kyberPoolContract.totalSupply()
  const poolPrice = parseEther(kyberPoolBalances.eth.val)
    .mul(2)
    .mul(DEC_18)
    .div(xkncEthPoolSupply)
  const value = poolPrice.mul(userBalance).div(DEC_18)

  return {
    asset,
    balances: kyberPoolBalances,
    poolPrice: formatEther(poolPrice),
    quantity: formatEther(userBalance),
    tokenPrice: priceUsd,
    value: formatEther(value),
  }
}
