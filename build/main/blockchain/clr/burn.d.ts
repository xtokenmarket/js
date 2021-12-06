import { BigNumber } from '@ethersproject/bignumber';
import { ContractTransaction } from '@ethersproject/contracts';
import { BaseProvider } from '@ethersproject/providers';
import { ICLRBurnQty, IXAssetCLR } from '../../types/xToken';
export declare const burnXAssetCLR: (symbol: IXAssetCLR, amount: BigNumber, provider: BaseProvider) => Promise<ContractTransaction>;
export declare const getExpectedQuantityOnBurnXAssetCLR: (symbol: IXAssetCLR, amount: string, provider: BaseProvider) => Promise<ICLRBurnQty>;
