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
} from 'xtoken-abis'

export type IContracts =
  | typeof AAVE
  | typeof EXCHANGE_RATES
  | typeof INCH
  | typeof INCH_LIQUIDITY_PROTOCOL
  | typeof KNC
  | typeof KYBER_PROXY
  | typeof SNX
  | typeof TRADE_ACCOUNTING
  | ITokenSymbols

export type ITokenSymbols =
  | typeof X_AAVE_A
  | typeof X_AAVE_B
  | typeof X_INCH_A
  | typeof X_INCH_B
  | typeof X_KNC_A
  | typeof X_KNC_B
  | typeof X_SNX_A

export type ITradeType = typeof BUY | typeof SELL

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

export interface ITokenPrices {
  aum: number
  priceEth: number
  priceUsd: number
  sellPriceEth?: number
  sellPriceUsd?: number
}
