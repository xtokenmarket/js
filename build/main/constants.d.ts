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
  UNISWAP_V3 = 'Uniswap V3',
  XTOKEN = 'xToken',
}
export declare const DEFAULT_PRICES: Readonly<{
  aum: number
  priceBtc: number
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
export declare const X_SNX_A_BALANCER_V2_POOL_ID =
  '0xea39581977325c0833694d51656316ef8a926a62000200000000000000000036'
export declare const SNX_BALANCER_V2_POOL_ID =
  '0x072f14b85add63488ddad88f855fda4a99d6ac9b000200000000000000000027'
export declare const STAKE = 'Stake'
export declare const UNSTAKE = 'UnStake'
