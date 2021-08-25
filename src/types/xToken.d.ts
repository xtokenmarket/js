/**
 * @packageDocumentation
 * @module XToken Types
 */

import {
  AAVE,
  AAVE_X_AAVE_A_CLR,
  ALPHA,
  BNT,
  BNT_X_BNT_A_CLR,
  BUSD,
  BUY,
  DAI,
  ETH,
  EXCHANGE_RATES,
  FRAX,
  INCH,
  INCH_LIQUIDITY_PROTOCOL,
  INCH_X_INCH_A_CLR,
  INCH_X_INCH_B_CLR,
  KNC,
  KYBER_PROXY,
  LENDING_COMPTROLLER,
  LENDING_LIQUIDITY_POOL,
  LENDING_LPT,
  LENDING_X_AAVE_A_MARKET,
  LENDING_X_AAVE_A_PRICE,
  LENDING_X_AAVE_B_MARKET,
  LENDING_X_AAVE_B_PRICE,
  LENDING_X_INCH_A_MARKET,
  LENDING_X_INCH_A_PRICE,
  LENDING_X_INCH_B_MARKET,
  LENDING_X_INCH_B_PRICE,
  LENDING_X_KNC_A_MARKET,
  LENDING_X_KNC_A_PRICE,
  LENDING_X_KNC_B_MARKET,
  LENDING_X_KNC_B_PRICE,
  REN_BTC,
  S_ETH,
  S_USD,
  SELL,
  SNX,
  TRADE_ACCOUNTING,
  UNISWAP_LIBRARY,
  UNISWAP_V2_PAIR,
  USDC,
  USDT,
  UST,
  WBTC,
  WETH,
  X_AAVE_A,
  X_AAVE_B,
  X_AAVE_B_AAVE_CLR,
  X_ALPHA_A,
  X_ALPHA_A_ALPHA_CLR,
  X_BNT_A,
  X_INCH_A,
  X_INCH_B,
  X_KNC_A,
  X_KNC_A_KNC_CLR,
  X_KNC_B,
  X_KNC_B_KNC_CLR,
  X_SNX_A,
  X_SNX_A_SNX_CLR,
  X_U3LP_A,
  X_U3LP_B,
  X_U3LP_C,
  X_U3LP_D,
  X_U3LP_E,
  X_U3LP_F,
  X_U3LP_G,
  X_U3LP_H,
  XTK,
  XTK_ETH_CLR,
  XTK_MANAGEMENT_STAKING_MODULE,
} from '@xtoken/abis'
import { Exchange, STAKE, UNSTAKE } from '../constants'

export type IContracts =
  | typeof ETH
  | typeof EXCHANGE_RATES
  | typeof INCH_LIQUIDITY_PROTOCOL
  | typeof KYBER_PROXY
  | typeof TRADE_ACCOUNTING
  | typeof UNISWAP_LIBRARY
  | typeof UNISWAP_V2_PAIR
  | typeof XTK
  | typeof XTK_MANAGEMENT_STAKING_MODULE
  | INativeAssets
  | typeof LENDING_COMPTROLLER
  | typeof LENDING_LIQUIDITY_POOL
  | typeof LENDING_LPT
  | typeof LENDING_X_AAVE_A_MARKET
  | typeof LENDING_X_AAVE_A_PRICE
  | typeof LENDING_X_AAVE_B_MARKET
  | typeof LENDING_X_AAVE_B_PRICE
  | typeof LENDING_X_INCH_A_MARKET
  | typeof LENDING_X_INCH_A_PRICE
  | typeof LENDING_X_INCH_B_MARKET
  | typeof LENDING_X_INCH_B_PRICE
  | typeof LENDING_X_KNC_A_MARKET
  | typeof LENDING_X_KNC_A_PRICE
  | typeof LENDING_X_KNC_B_MARKET
  | typeof LENDING_X_KNC_B_PRICE
  | ITokenSymbols
  | ILPTokenSymbols
  | IStableAssets
  | IXAssetCLR

export type INativeAssets =
  | typeof AAVE
  | typeof ALPHA
  | typeof BNT
  | typeof INCH
  | typeof KNC
  | typeof SNX

export type ITokenSymbols =
  | typeof X_AAVE_A
  | typeof X_AAVE_B
  | typeof X_ALPHA_A
  | typeof X_BNT_A
  | typeof X_INCH_A
  | typeof X_INCH_B
  | typeof X_KNC_A
  | typeof X_KNC_B
  | typeof X_SNX_A

export type ILPTokenSymbols =
  | typeof X_U3LP_A
  | typeof X_U3LP_B
  | typeof X_U3LP_C
  | typeof X_U3LP_D
  | typeof X_U3LP_E
  | typeof X_U3LP_F
  | typeof X_U3LP_G
  | typeof X_U3LP_H

export type IStableAssets =
  | typeof BUSD
  | typeof DAI
  | typeof FRAX
  | typeof REN_BTC
  | typeof S_ETH
  | typeof S_USD
  | typeof USDC
  | typeof USDT
  | typeof UST
  | typeof WBTC
  | typeof WETH

export type IXAssetCLR =
  | typeof AAVE_X_AAVE_A_CLR
  | typeof BNT_X_BNT_A_CLR
  | typeof INCH_X_INCH_A_CLR
  | typeof INCH_X_INCH_B_CLR
  | typeof X_AAVE_B_AAVE_CLR
  | typeof X_ALPHA_A_ALPHA_CLR
  | typeof X_KNC_A_KNC_CLR
  | typeof X_KNC_B_KNC_CLR
  | typeof X_SNX_A_SNX_CLR
  | typeof XTK_ETH_CLR

export type ITradeType = typeof BUY | typeof SELL

interface IAsset {
  aum: number
  mandate: string
  order: number
  price: number
  priceEth: number
  symbol: ITokenSymbols
}

interface ILPAsset extends Omit<IAsset, 'symbol'> {
  assets: string
  priceBtc?: number
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
  symbol: ITokenSymbols | ILPTokenSymbols
  tokenEquivalent?: string
  value: string
}

/*export interface ILPPortfolioItem {
  price: string
  quantity: string
  symbol: ILPTokenSymbols
  value: string
}*/

export interface ITokenPrices {
  aum: number
  priceBtc?: number
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

export type IAssetId = 0 | 1

export type IStakeHistory = {
  readonly time: number
  readonly txHash: string
  readonly label: string
  readonly value: string
}

export type IHistoryType = typeof STAKE | typeof UNSTAKE

export interface ICLRToken {
  0: INativeAssets | ITokenSymbols | typeof XTK
  1: INativeAssets | ITokenSymbols | typeof WETH
}

export interface ICLRBurnQty {
  0: string
  1: string
}

export interface ICLRMintQty extends ICLRBurnQty {
  expectedQty: string
}
