import { BaseProvider } from '@ethersproject/providers'
import { ILPPortfolioItem, ILPTokenSymbols } from '../../types/xToken'
export declare const getPortfolioItemXU3LP: (
  symbol: ILPTokenSymbols,
  address: string,
  provider: BaseProvider
) => Promise<ILPPortfolioItem>
