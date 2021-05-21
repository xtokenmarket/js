import { BigNumber } from '@ethersproject/bignumber'
import { ContractTransaction } from '@ethersproject/contracts'
import { BaseProvider } from '@ethersproject/providers'
import { ILPTokenSymbols, IU3LPAssetId } from '../../types/xToken'
export declare const burnXU3LP: (
  symbol: ILPTokenSymbols,
  outputAsset: IU3LPAssetId,
  amount: BigNumber,
  provider: BaseProvider
) => Promise<ContractTransaction>
export declare const getExpectedQuantityOnBurnXU3LP: (
  symbol: ILPTokenSymbols,
  outputAsset: IU3LPAssetId,
  amount: string,
  provider: BaseProvider
) => Promise<string>
