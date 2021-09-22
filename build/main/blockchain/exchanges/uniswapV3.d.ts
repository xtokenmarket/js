import { BaseProvider } from '@ethersproject/providers'
import { X_AAVE_A, X_AAVE_B } from '@xtoken/abis'
import { ITradeType } from '../../types/xToken'
export declare const getUniswapV3EstimatedQty: (
  symbol: typeof X_AAVE_A | typeof X_AAVE_B,
  amount: string,
  tradeType: ITradeType,
  provider: BaseProvider
) => Promise<string>
