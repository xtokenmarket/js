import { BaseProvider } from '@ethersproject/providers'
import { IPortfolioItem, ITokenSymbols } from '../../types/xToken'
export declare const getPortfolioItemXAlpha: (
  symbol: ITokenSymbols,
  address: string,
  provider: BaseProvider
) => Promise<IPortfolioItem>
