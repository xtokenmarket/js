import { BigNumber } from '@ethersproject/bignumber';
import { ContractTransaction } from '@ethersproject/contracts';
import { BaseProvider } from '@ethersproject/providers';
import { ITokenSymbols } from '../../types/xToken';
export declare const burnXAave: (symbol: ITokenSymbols, sellForEth: boolean, amount: BigNumber, provider: BaseProvider) => Promise<ContractTransaction>;
export declare const getExpectedQuantityOnBurnXAave: (symbol: ITokenSymbols, sellForEth: boolean, amount: string, provider: BaseProvider) => Promise<string>;
