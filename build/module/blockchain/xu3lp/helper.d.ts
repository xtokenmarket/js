import { Contract } from '@ethersproject/contracts'
import { BaseProvider } from '@ethersproject/providers'
import { XU3LP } from '../../types'
import { ILPTokenSymbols } from '../../types/xToken'
export declare const getXU3LPContracts: (
  symbol: ILPTokenSymbols,
  provider: BaseProvider
) => Promise<{
  network: import('@ethersproject/providers').Network
  token0Contract: Contract
  token1Contract: Contract
  xu3lpContract: XU3LP
}>
