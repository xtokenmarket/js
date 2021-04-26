import { MaxUint256 } from '@ethersproject/constants'
import { ADDRESSES, BNT, ETH, ETH_BNT_ANCHOR } from '@xtoken/abis'
import { BigNumber } from 'ethers'
import { parseEther } from 'ethers/lib/utils'

export const DEC_18 = parseEther('1')
export const GAS_LIMIT_PERCENTAGE_DEFAULT = 110
export const GAS_LIMIT_PERCENTAGE_ETH = 120
export const MAX_UINT = MaxUint256
export const ZERO_NUMBER = BigNumber.from('0')

// DEX
export enum Exchange {
  BALANCER = 'Balancer',
  BANCOR = 'Bancor',
  INCH = '1Inch',
  KYBER = 'Kyber',
  UNISWAP = 'Uniswap',
  XTOKEN = 'xToken',
}

// Default values
export const DEFAULT_PRICES = Object.freeze({
  aum: 0,
  priceEth: 0,
  priceUsd: 0,
  sellPriceEth: 0,
})

export const DEFAULT_PORTFOLIO_ITEM = Object.freeze({
  price: '0',
  quantity: '0',
  tokenEquivalent: '0',
  value: '0',
})

// BNT->ETH path
export const BNT_ETH_PATH = [
  ADDRESSES[BNT][1],
  ADDRESSES[ETH_BNT_ANCHOR][1],
  ADDRESSES[ETH] as string,
]

// ETH->BNT path
export const ETH_BNT_PATH = [
  ADDRESSES[ETH] as string,
  ADDRESSES[ETH_BNT_ANCHOR][1],
  ADDRESSES[BNT][1],
]
