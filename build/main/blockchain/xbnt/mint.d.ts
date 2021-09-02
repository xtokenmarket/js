import { BigNumber } from '@ethersproject/bignumber'
import { ContractTransaction } from '@ethersproject/contracts'
import { BaseProvider } from '@ethersproject/providers'
import { ITokenSymbols } from '../../types/xToken'
export declare const approveXBnt: (
  symbol: ITokenSymbols,
  amount: BigNumber,
  provider: BaseProvider
) => Promise<ContractTransaction>
export declare const getExpectedQuantityOnMintXBnt: (
  symbol: ITokenSymbols,
  tradeWithEth: boolean,
  amount: string,
  provider: BaseProvider
) => Promise<string>
export declare const mintXBnt: (
  symbol: ITokenSymbols,
  tradeWithEth: boolean,
  amount: BigNumber,
  provider: BaseProvider
) => Promise<ContractTransaction>
