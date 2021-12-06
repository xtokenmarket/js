import { BaseProvider } from '@ethersproject/providers';
import { IPortfolioItem, IXAssetLev } from '../../types/xToken';
export declare const getPortfolioItemXAssetLev: (symbol: IXAssetLev, address: string, provider: BaseProvider) => Promise<IPortfolioItem>;
