import { BigNumber } from '@ethersproject/bignumber'
import { ContractTransaction } from '@ethersproject/contracts'
import { BaseProvider } from '@ethersproject/providers'
import { ILPTokenSymbols, IU3LPAssetId } from '../../types/xToken'
export declare const approveXU3LP: (
  symbol: ILPTokenSymbols,
  amount: BigNumber,
  inputAsset: IU3LPAssetId,
  provider: BaseProvider
) => Promise<ContractTransaction>
export declare const getExpectedQuantityOnMintXU3LP: (
  symbol: ILPTokenSymbols,
  inputAsset: IU3LPAssetId,
  amount: string,
  provider: BaseProvider
) => Promise<string>
export declare const mintXU3LP: (
  symbol: ILPTokenSymbols,
  inputAsset: IU3LPAssetId,
  amount: BigNumber,
  provider: BaseProvider
) => Promise<ContractTransaction>
