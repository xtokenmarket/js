import { BigNumber } from 'ethers'
export declare const formatNumber: (val: string, digits?: number) => number
export declare const getPercentage: (
  amount: BigNumber,
  percent: number
) => BigNumber
/**
 * Return actual twap price from ABDK 64.64 representation
 * Used with xU3LP getAssetPrice()
 */
export declare const getTWAP: (twap: BigNumber) => BigNumber
