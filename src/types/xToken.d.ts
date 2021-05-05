/**
 * @packageDocumentation
 * @module XToken Types
 */

import {
  AAVE,
  EXCHANGE_RATES,
  KNC,
  KYBER_PROXY,
  SNX,
  TRADE_ACCOUNTING,
  X_AAVE_A,
  X_AAVE_B,
  X_KNC_A,
  X_KNC_B,
  X_SNX_A,
  BUY,
  SELL,
  INCH,
  X_INCH_A,
  X_INCH_B,
  INCH_LIQUIDITY_PROTOCOL,
  UNISWAP_V2_PAIR,
  X_BNT_A,
  BNT,
  X_U3LP_A,
  DAI,
  USDC,
} from '@xtoken/abis'
import { Exchange } from '../constants'

export type IContracts =
  | typeof AAVE
  | typeof BNT
  | typeof EXCHANGE_RATES
  | typeof INCH
  | typeof INCH_LIQUIDITY_PROTOCOL
  | typeof KNC
  | typeof KYBER_PROXY
  | typeof SNX
  | typeof TRADE_ACCOUNTING
  | typeof UNISWAP_V2_PAIR
  | ITokenSymbols
  | ILPTokenSymbols
  | IStableAssets

export type ITokenSymbols =
  | typeof X_AAVE_A
  | typeof X_AAVE_B
  | typeof X_BNT_A
  | typeof X_INCH_A
  | typeof X_INCH_B
  | typeof X_KNC_A
  | typeof X_KNC_B
  | typeof X_SNX_A

export type ILPTokenSymbols = typeof X_U3LP_A

export type IStableAssets = typeof DAI | typeof USDC

export type ITradeType = typeof BUY | typeof SELL

interface IAsset {
  aum: number
  mandate: string
  price: number
  symbol: ITokenSymbols
}

interface ILPAsset {
  aum: number
  price: number
  symbol: ILPTokenSymbols
}

interface ITokenBalance {
  amt: string
  name: string
  val: string
}

export interface ILiquidityPoolItem {
  asset: string
  balances: {
    eth: ITokenBalance
    token: ITokenBalance
    totalVal: string
    underlying?: ITokenBalance
  }
  poolPrice: string
  quantity: string
  tokenPrice: number
  underlyingPrice?: string
  value: string
}

export interface IPortfolioItem {
  price: string
  quantity: string
  symbol: ITokenSymbols
  tokenEquivalent: string
  value: string
}

export interface ILPPortfolioItem {
  price: string
  quantity: string
  symbol: ILPTokenSymbols
  value: string
}

export interface ITokenPrices {
  aum: number
  priceEth: number
  priceUsd: number
  sellPriceEth?: number
  sellPriceUsd?: number
}

export interface IReturn {
  expectedQuantity: string
  source: Exchange
}

export interface IReturns {
  best: IReturn
  estimates: Array<IReturn>
}

export interface IU3LPToken {
  0: IStableAssets
  1: IStableAssets
}

export type IU3LPAssetId = 0 | 1
