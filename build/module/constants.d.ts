import { BigNumber } from 'ethers'
export declare const DEC_18: BigNumber
export declare const GAS_LIMIT_PERCENTAGE_DEFAULT = 110
export declare const GAS_LIMIT_PERCENTAGE_ETH = 120
export declare const MAX_UINT: BigNumber
export declare const ZERO_NUMBER: BigNumber
export declare enum Exchange {
  BALANCER = 'Balancer',
  BANCOR = 'Bancor',
  INCH = '1Inch',
  KYBER = 'Kyber',
  UNISWAP = 'Uniswap',
  XTOKEN = 'xToken',
}
export declare const DEFAULT_PRICES: Readonly<{
  aum: number
  priceEth: number
  priceUsd: number
  sellPriceEth: number
}>
export declare const DEFAULT_LP_PORTFOLIO_ITEM: Readonly<{
  price: string
  quantity: string
  value: string
}>
export declare const DEFAULT_PORTFOLIO_ITEM: Readonly<{
  tokenEquivalent: string
  price: string
  quantity: string
  value: string
}>
export declare const DEFAULT_TOKEN_PRICES: Readonly<{
  token0Price: BigNumber
  token1Price: BigNumber
}>
export declare const BNT_ETH_PATH: string[]
export declare const ETH_BNT_PATH: string[]
