import { BaseProvider } from '@ethersproject/providers'
import { ITokenSymbols, ITradeType } from '../../types/xToken'
export declare const getUniswapV3EstimatedQty: (
  symbol: ITokenSymbols,
  amount: string,
  tradeType: ITradeType,
  provider: BaseProvider
) => Promise<string>
