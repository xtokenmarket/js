import { Contract } from '@ethersproject/contracts'
import { BaseProvider } from '@ethersproject/providers'
import { BigNumber } from 'ethers'
import { InchLiquidityProtocol, KyberProxy, XINCH } from '../../types'
import { ITokenSymbols } from '../../types/xToken'
export declare const getExpectedRateInch: (
  inchLiquidityProtocolContract: InchLiquidityProtocol,
  inputAsset: string,
  outputAsset: string,
  amount: BigNumber,
  isMinRate?: boolean
) => Promise<BigNumber>
export declare const getXInchContracts: (
  symbol: ITokenSymbols,
  provider: BaseProvider
) => Promise<{
  inchLiquidityProtocolContract: InchLiquidityProtocol
  kyberProxyContract: KyberProxy
  network: import('@ethersproject/providers').Network
  tokenContract: Contract
  xinchContract: XINCH
}>
