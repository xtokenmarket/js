import { BaseProvider } from '@ethersproject/providers'
import { IPortfolioItem, ITokenSymbols } from '../../types/xToken'
export declare const getPortfolioItemXBnt: (
  symbol: ITokenSymbols,
  address: string,
  provider: BaseProvider
) => Promise<IPortfolioItem>
