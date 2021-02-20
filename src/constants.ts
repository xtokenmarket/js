import { MaxUint256 } from '@ethersproject/constants'
import { parseEther } from 'ethers/lib/utils'

export const DEC_18 = parseEther('1')
export const MAX_UINT = MaxUint256
export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

// DEX
export enum Exchange {
  BALANCER = 'Balancer',
  INCH = '1Inch',
  KYBER = 'Kyber',
  UNISWAP = 'Uniswap',
  XTOKEN = 'xToken',
}
