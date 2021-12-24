import { BigNumber } from 'ethers'
import { parseEther } from 'ethers/lib/utils'

export const formatNumber = (val: string, digits = 4) => {
  const n = Number(val)
  return Number.isInteger(n) ? n : parseFloat(n.toFixed(digits))
}

export const getPercentage = (amount: BigNumber, percent: number) => {
  return amount.mul(percent).div(100)
}

/**
 * Return actual twap price from ABDK 64.64 representation
 * Used with xU3LP/xAssetCLR getAssetPrice()
 */
export const getTWAP = (twap: BigNumber) => {
  twap = twap.mul(1e8).div(BigNumber.from(2).pow(64))
  return parseEther(twap.div(1e8).toString())
}
