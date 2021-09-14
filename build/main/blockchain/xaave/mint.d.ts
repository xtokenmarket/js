import { BigNumber } from '@ethersproject/bignumber'
import { ContractTransaction } from '@ethersproject/contracts'
import { BaseProvider } from '@ethersproject/providers'
import { ITokenSymbols } from '../../types/xToken'
export declare const approveXAave: (
  symbol: ITokenSymbols,
  amount: BigNumber,
  provider: BaseProvider,
  spenderAddress?: string | undefined
) => Promise<ContractTransaction>
export declare const getExpectedQuantityOnMintXAave: (
  symbol: ITokenSymbols,
  tradeWithEth: boolean,
  amount: string,
  provider: BaseProvider
) => Promise<string>
export declare const mintXAave: (
  symbol: ITokenSymbols,
  tradeWithEth: boolean,
  amount: BigNumber,
  affiliate: string,
  provider: BaseProvider
) => Promise<ContractTransaction>