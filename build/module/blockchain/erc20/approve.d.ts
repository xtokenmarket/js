import { ContractTransaction } from '@ethersproject/contracts';
import { BaseProvider } from '@ethersproject/providers';
import { BigNumber } from 'ethers';
import { IStableAssets } from '../../types/xToken';
export declare const approveErc20: (symbol: IStableAssets, amount: BigNumber, spenderAddress: string, provider: BaseProvider) => Promise<ContractTransaction>;
