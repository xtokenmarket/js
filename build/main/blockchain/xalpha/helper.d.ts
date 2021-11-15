import { Contract } from '@ethersproject/contracts'
import { BaseProvider } from '@ethersproject/providers'
import { XALPHA } from '../../types'
import { ITokenSymbols } from '../../types/xToken'
export declare const getXAlphaContracts: (
  symbol: ITokenSymbols,
  provider: BaseProvider
) => Promise<{
  network: import('@ethersproject/providers').Network
  tokenContract: Contract
  xalphaContract: XALPHA
}>
