import { BaseProvider } from '@ethersproject/providers'
import { ITokenSymbols } from '../../types/xToken'
export declare const getMaximumRedeemableXAave: (
  symbol: ITokenSymbols,
  provider: BaseProvider
) => Promise<string>
