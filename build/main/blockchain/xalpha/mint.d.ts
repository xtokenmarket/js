import { BigNumber } from '@ethersproject/bignumber'
import { ContractTransaction } from '@ethersproject/contracts'
import { BaseProvider } from '@ethersproject/providers'
import { ITokenSymbols } from '../../types/xToken'
export declare const approveXAlpha: (
  symbol: ITokenSymbols,
  amount: BigNumber,
  provider: BaseProvider
) => Promise<ContractTransaction>
export declare const getExpectedQuantityOnMintXAlpha: (
  symbol: ITokenSymbols,
  tradeWithEth: boolean,
  amount: string,
  provider: BaseProvider
) => Promise<string>
export declare const mintXAlpha: (
  symbol: ITokenSymbols,
  tradeWithEth: boolean,
  amount: BigNumber,
  provider: BaseProvider
) => Promise<ContractTransaction>
