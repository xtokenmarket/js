import { BigNumber } from '@ethersproject/bignumber';
import { ContractTransaction } from '@ethersproject/contracts';
import { BaseProvider } from '@ethersproject/providers';
import { IAssetId, ILPTokenSymbols } from '../../types/xToken';
export declare const approveXU3LP: (symbol: ILPTokenSymbols, amount: BigNumber, inputAsset: IAssetId, provider: BaseProvider) => Promise<ContractTransaction>;
export declare const getExpectedQuantityOnMintXU3LP: (symbol: ILPTokenSymbols, inputAsset: IAssetId, amount: string, provider: BaseProvider) => Promise<string>;
export declare const mintXU3LP: (symbol: ILPTokenSymbols, inputAsset: IAssetId, amount: BigNumber, provider: BaseProvider) => Promise<ContractTransaction>;
