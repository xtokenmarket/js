import { BigNumber } from '@ethersproject/bignumber'
import { ContractTransaction } from '@ethersproject/contracts'
import { BaseProvider } from '@ethersproject/providers'
import { IAssetId, ILPTokenSymbols } from '../../types/xToken'
export declare const burnXU3LP: (
  symbol: ILPTokenSymbols,
  outputAsset: IAssetId,
  amount: BigNumber,
  provider: BaseProvider
) => Promise<ContractTransaction>
export declare const getExpectedQuantityOnBurnXU3LP: (
  symbol: ILPTokenSymbols,
  outputAsset: IAssetId,
  amount: string,
  provider: BaseProvider
) => Promise<string>
