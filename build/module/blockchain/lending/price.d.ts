import { BaseProvider } from '@ethersproject/providers';
import { ILendingPricing } from '../../types/xToken';
/**
 * Get xAsset Price
 * @param priceName Pricing contract name
 * @param provider
 * @returns
 */
export declare const getLendingPrice: (priceName: ILendingPricing, provider: BaseProvider) => Promise<string>;
