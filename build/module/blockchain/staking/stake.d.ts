import { BaseProvider } from '@ethersproject/providers';
import { BigNumber } from 'ethers';
export declare const approveXtk: (amount: BigNumber, provider: BaseProvider) => Promise<any>;
export declare const stakeXtk: (amount: string, provider: BaseProvider) => Promise<import("ethers").ContractTransaction>;
