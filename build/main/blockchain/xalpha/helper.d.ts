import { Contract } from '@ethersproject/contracts'
import { BaseProvider } from '@ethersproject/providers'
import { KyberProxy, XALPHA } from '../../types'
import { ITokenSymbols } from '../../types/xToken'
export declare const getXAlphaContracts: (
  symbol: ITokenSymbols,
  provider: BaseProvider
) => Promise<{
  kyberProxyContract: KyberProxy
  network: import('@ethersproject/providers').Network
  tokenContract: Contract
  xalphaContract: XALPHA
}>
