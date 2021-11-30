import { BigNumber } from '@ethersproject/bignumber';
import { ContractTransaction } from '@ethersproject/contracts';
import { BaseProvider } from '@ethersproject/providers';
import { IXAssetLev } from '../../types/xToken';
export declare const burnXAssetLev: (symbol: IXAssetLev, sellForEth: boolean, amount: BigNumber, provider: BaseProvider) => Promise<ContractTransaction>;
export declare const getExpectedQuantityOnBurnXAssetLev: (symbol: IXAssetLev, sellForEth: boolean, amount: string, provider: BaseProvider) => Promise<string>;
