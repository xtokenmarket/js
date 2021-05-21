import { BigNumber } from '@ethersproject/bignumber'
import { BaseProvider } from '@ethersproject/providers'
import { ITokenSymbols } from '../../types/xToken'
export declare const getBalances: (
  symbol: ITokenSymbols,
  poolAddress: string,
  tokenPrice: number,
  provider: BaseProvider,
  chainId: number,
  underlyingPrice?: BigNumber | undefined,
  isWeth?: boolean | undefined
) => Promise<{
  totalVal: string
  token: {
    name: ITokenSymbols
    amt: string
    val: string
  }
  underlying:
    | {
        name: string
        amt: string
        val: string
      }
    | undefined
  eth: {
    name: string
    amt: string
    val: string
  }
}>
