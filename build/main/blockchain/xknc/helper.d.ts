import { Contract } from '@ethersproject/contracts'
import { BaseProvider } from '@ethersproject/providers'
import { KyberProxy, XKNC } from '../../types'
import { ITokenSymbols } from '../../types/xToken'
export declare const getXKncContracts: (
  symbol: ITokenSymbols,
  provider: BaseProvider
) => Promise<{
  kncContract: Contract
  kyberProxyContract: KyberProxy
  network: import('@ethersproject/providers').Network
  tokenContract: Contract
  xkncContract: XKNC
}>
