import { ContractTransaction } from '@ethersproject/contracts';
import { BaseProvider } from '@ethersproject/providers';
import { BigNumber } from 'ethers';
export declare const burnXSnx: (amount: BigNumber, provider: BaseProvider) => Promise<ContractTransaction>;
export declare const getExpectedQuantityOnBurnXSnx: (amount: string, provider: BaseProvider) => Promise<string>;
