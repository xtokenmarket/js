import { BigNumber } from 'ethers'

export const formatNumber = (val: string, digits = 4) => {
  const n = Number(val)
  return Number.isInteger(n) ? n : parseFloat(n.toFixed(digits))
}

export const getPercentage = (amount: BigNumber, percent: number) => {
  return amount.mul(percent).div(100)
}
