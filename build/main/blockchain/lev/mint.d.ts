import { BigNumber } from '@ethersproject/bignumber';
import { ContractTransaction } from '@ethersproject/contracts';
import { BaseProvider } from '@ethersproject/providers';
import { IXAssetLev } from '../../types/xToken';
export declare const approveXAssetLev: (symbol: IXAssetLev, amount: BigNumber, provider: BaseProvider, spenderAddress?: string | undefined) => Promise<ContractTransaction>;
export declare const getExpectedQuantityOnMintXAssetLev: (symbol: IXAssetLev, tradeWithEth: boolean, amount: string, provider: BaseProvider) => Promise<string>;
export declare const mintXAssetLev: (symbol: IXAssetLev, tradeWithEth: boolean, amount: BigNumber, provider: BaseProvider) => Promise<ContractTransaction>;
