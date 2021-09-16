import { BaseProvider } from '@ethersproject/providers'
import { ILPTokenSymbols, IPortfolioItem } from '../../types/xToken'
export declare const getPortfolioItemXU3LP: (
  symbol: ILPTokenSymbols,
  address: string,
  provider: BaseProvider
) => Promise<IPortfolioItem>
