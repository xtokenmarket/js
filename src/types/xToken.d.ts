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
  XTK_MANAGEMENT_STAKING_MODULE,
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
  X_U3LP_B,
  X_U3LP_C,
  X_U3LP_D,
  X_U3LP_E,
  X_U3LP_F,
  X_U3LP_G,
  X_U3LP_H,
  BUSD,
  DAI,
  FRAX,
  REN_BTC,
  S_ETH,
  S_USD,
  USDC,
  USDT,
  UST,
  WBTC,
  WETH,
  AAVE_X_AAVE_A_CLR,
  BNT_X_BNT_A_CLR,
  INCH_X_INCH_A_CLR,
  INCH_X_INCH_B_CLR,
  X_AAVE_B_AAVE_CLR,
  X_KNC_A_KNC_CLR,
  X_KNC_B_KNC_CLR,
  X_SNX_A_SNX_CLR,
  UNISWAP_LIBRARY,
} from '@xtoken/abis'
import { Exchange, STAKE, UNSTAKE } from '../constants'

export type IContracts =
  | typeof EXCHANGE_RATES
  | typeof INCH_LIQUIDITY_PROTOCOL
  | typeof KYBER_PROXY
  | typeof TRADE_ACCOUNTING
  | typeof UNISWAP_LIBRARY
  | typeof UNISWAP_V2_PAIR
  | typeof XTK_MANAGEMENT_STAKING_MODULE
  | INativeAssets
  | ITokenSymbols
  | ILPTokenSymbols
  | IStableAssets
  | IXAssetCLR

export type INativeAssets =
  | typeof AAVE
  | typeof BNT
  | typeof INCH
  | typeof KNC
  | typeof SNX

export type ITokenSymbols =
  | typeof X_AAVE_A
  | typeof X_AAVE_B
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
  | typeof X_KNC_A_KNC_CLR
  | typeof X_KNC_B_KNC_CLR
  | typeof X_SNX_A_SNX_CLR

export type ITradeType = typeof BUY | typeof SELL

interface IAsset {
  aum: number
  mandate: string
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
  expectedQuantity: string | ICLRBurnQty | ICLRMintQty
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
  0: INativeAssets | ITokenSymbols
  1: INativeAssets | ITokenSymbols
}

export interface ICLRBurnQty {
  0: string
  1: string
}

export interface ICLRMintQty extends ICLRBurnQty {
  expectedQty: string
}
