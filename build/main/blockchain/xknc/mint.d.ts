import { BigNumber } from '@ethersproject/bignumber';
import { ContractTransaction } from '@ethersproject/contracts';
import { BaseProvider } from '@ethersproject/providers';
import { ITokenSymbols } from '../../types/xToken';
export declare const approveXKnc: (symbol: ITokenSymbols, amount: BigNumber, provider: BaseProvider, spenderAddress?: string | undefined) => Promise<ContractTransaction>;
export declare const getExpectedQuantityOnMintXKnc: (symbol: ITokenSymbols, tradeWithEth: boolean, amount: string, provider: BaseProvider) => Promise<string>;
export declare const mintXKnc: (symbol: ITokenSymbols, tradeWithEth: boolean, amount: BigNumber, provider: BaseProvider) => Promise<ContractTransaction>;
