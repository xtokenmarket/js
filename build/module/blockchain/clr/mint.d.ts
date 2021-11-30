import { BigNumber } from '@ethersproject/bignumber';
import { ContractTransaction } from '@ethersproject/contracts';
import { BaseProvider } from '@ethersproject/providers';
import { IAssetId, ICLRMintQty, IXAssetCLR } from '../../types/xToken';
export declare const approveXAssetCLR: (symbol: IXAssetCLR, amount: BigNumber, inputAsset: IAssetId, provider: BaseProvider) => Promise<ContractTransaction>;
export declare const getExpectedQuantityOnMintXAssetCLR: (symbol: IXAssetCLR, inputAsset: IAssetId, amount: string, provider: BaseProvider) => Promise<ICLRMintQty>;
export declare const getPoolRatioXAssetCLR: (symbol: IXAssetCLR, provider: BaseProvider) => Promise<string>;
export declare const mintXAssetCLR: (symbol: IXAssetCLR, inputAsset: IAssetId, amount: BigNumber, provider: BaseProvider) => Promise<ContractTransaction>;
