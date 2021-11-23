import { ContractTransaction } from '@ethersproject/contracts'
import { BaseProvider } from '@ethersproject/providers'
import { BigNumber } from 'ethers'
export declare const approveXSnx: (
  amount: BigNumber,
  provider: BaseProvider,
  spenderAddress?: string | undefined
) => Promise<ContractTransaction>
export declare const getExpectedQuantityOnMintXSnx: (
  tradeWithEth: boolean,
  amount: string,
  provider: BaseProvider
) => Promise<string>
export declare const mintXSnx: (
  tradeWithEth: boolean,
  amount: BigNumber,
  provider: BaseProvider
) => Promise<ContractTransaction>
