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
} from 'xtoken-abis'

export type IContracts =
  | typeof AAVE
  | typeof EXCHANGE_RATES
  | typeof KNC
  | typeof KYBER_PROXY
  | typeof SNX
  | typeof TRADE_ACCOUNTING
  | ITokenSymbols

export type ITokenSymbols =
  | typeof X_AAVE_A
  | typeof X_AAVE_B
  | typeof X_KNC_A
  | typeof X_KNC_B
  | typeof X_SNX_A

export type ITradeType = typeof BUY | typeof SELL

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
}
